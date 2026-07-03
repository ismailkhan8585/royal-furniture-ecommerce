import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import bcrypt from 'bcryptjs';
import { prisma } from './prisma';
import {
  LOCKOUT_DURATION_MINUTES,
  MAX_LOGIN_ATTEMPTS,
} from './constants';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Admin Login',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'admin@royalfurniture.pk',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const email = credentials.email.toLowerCase();
        const admin = await prisma.admin.findUnique({
          where: { email },
        });

        if (!admin) {
          return null;
        }

        if (admin.locked_until && admin.locked_until > new Date()) {
          const remainingMinutes = Math.ceil(
            (admin.locked_until.getTime() - Date.now()) / 60000
          );
          throw new Error(
            `Account locked. Try again in ${remainingMinutes} minutes.`
          );
        }

        if (!admin.is_active) {
          throw new Error('Account is disabled. Contact support.');
        }

        const isValidPassword = await bcrypt.compare(
          credentials.password,
          admin.password
        );

        if (!isValidPassword) {
          const newAttempts = admin.login_attempts + 1;

          if (newAttempts >= MAX_LOGIN_ATTEMPTS) {
            const lockedUntil = new Date();
            lockedUntil.setMinutes(
              lockedUntil.getMinutes() + LOCKOUT_DURATION_MINUTES
            );

            await prisma.admin.update({
              where: { id: admin.id },
              data: {
                login_attempts: newAttempts,
                locked_until: lockedUntil,
              },
            });

            throw new Error(
              `Too many failed attempts. Account locked for ${LOCKOUT_DURATION_MINUTES} minutes.`
            );
          }

          await prisma.admin.update({
            where: { id: admin.id },
            data: { login_attempts: newAttempts },
          });

          throw new Error(
            `Invalid credentials. ${MAX_LOGIN_ATTEMPTS - newAttempts} attempts remaining.`
          );
        }

        await prisma.admin.update({
          where: { id: admin.id },
          data: {
            login_attempts: 0,
            locked_until: null,
            last_login_at: new Date(),
          },
        });

        return {
          id: admin.id,
          email: admin.email,
          name: admin.name,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/admin/login',
    error: '/admin/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60,
    updateAge: 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET || 'development-secret-change-in-production',
  debug: process.env.NODE_ENV === 'development',
};
