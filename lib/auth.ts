import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { createClient } from '@supabase/supabase-js';
import {
  MAX_LOGIN_ATTEMPTS,
  LOCKOUT_DURATION_MINUTES,
} from './constants';

import bcrypt from 'bcryptjs';

// Admin type for database operations
interface AdminRow {
  id: string;
  email: string;
  password: string;
  name: string;
  is_active: boolean;
  last_login_at: string | null;
  login_attempts: number;
  locked_until: string | null;
  created_at: string;
}

// Create admin client inline to avoid type issues
function getAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceKey) return null;

  return createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false }
  });
}

export const authOptions: NextAuthOptions = {
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

        const adminClient = getAdminClient();
        if (!adminClient) {
          console.error('Supabase admin client not available');
          return null;
        }

        // Look up admin by email
        const { data: admin, error } = await adminClient
          .from('admins')
          .select('*')
          .eq('email', credentials.email.toLowerCase())
          .single();

        if (error || !admin) {
          console.error('Admin not found');
          return null;
        }

        const adminData = admin as AdminRow;

        // Check if account is locked
        if (adminData.locked_until && new Date(adminData.locked_until) > new Date()) {
          const remainingMinutes = Math.ceil(
            (new Date(adminData.locked_until).getTime() - Date.now()) / 60000
          );
          throw new Error(
            `Account locked. Try again in ${remainingMinutes} minutes.`
          );
        }

        // Check if admin is active
        if (!adminData.is_active) {
          throw new Error('Account is disabled. Contact support.');
        }

        // Verify password
        const isValidPassword = await bcrypt.compare(
          credentials.password,
          adminData.password
        );

        if (!isValidPassword) {
          // Increment login attempts
          const newAttempts = adminData.login_attempts + 1;

          // Lock account if max attempts reached
          if (newAttempts >= MAX_LOGIN_ATTEMPTS) {
            const lockoutTime = new Date();
            lockoutTime.setMinutes(
              lockoutTime.getMinutes() + LOCKOUT_DURATION_MINUTES
            );

            await adminClient
              .from('admins')
              .update({
                login_attempts: newAttempts,
                locked_until: lockoutTime.toISOString(),
              })
              .eq('id', adminData.id);

            throw new Error(
              `Too many failed attempts. Account locked for ${LOCKOUT_DURATION_MINUTES} minutes.`
            );
          }

          await adminClient
            .from('admins')
            .update({ login_attempts: newAttempts })
            .eq('id', adminData.id);

          throw new Error(
            `Invalid credentials. ${MAX_LOGIN_ATTEMPTS - newAttempts} attempts remaining.`
          );
        }

        // Reset login attempts and update last login
        await adminClient
          .from('admins')
          .update({
            login_attempts: 0,
            locked_until: null,
            last_login_at: new Date().toISOString(),
          })
          .eq('id', adminData.id);

        return {
          id: adminData.id,
          email: adminData.email,
          name: adminData.name,
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
    maxAge: 24 * 60 * 60, // 24 hours
    updateAge: 60 * 60, // Update every hour
  },
  secret: process.env.NEXTAUTH_SECRET || 'development-secret-change-in-production',
  debug: process.env.NODE_ENV === 'development',
};
