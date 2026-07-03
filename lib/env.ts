import { z } from 'zod';

const envSchema = z.object({
  // Database
  DATABASE_URL: z.string().url().optional(),
  SUPABASE_URL: z.string().url().optional(),
  SUPABASE_ANON_KEY: z.string().optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional(),
  SUPABASE_DB_URL: z.string().url().optional(),

  // NextAuth
  NEXTAUTH_SECRET: z.string().min(1, 'NEXTAUTH_SECRET is required'),
  NEXTAUTH_URL: z.string().url().optional(),

  // Cloudinary
  CLOUDINARY_CLOUD_NAME: z.string().min(1, 'CLOUDINARY_CLOUD_NAME is required'),
  CLOUDINARY_API_KEY: z.string().optional(),
  CLOUDINARY_API_SECRET: z.string().optional(),
  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: z.string().min(1),

  // Next.js
  NEXT_PUBLIC_APP_URL: z.string().url().optional(),
  NEXT_PUBLIC_APP_NAME: z.string().default('Royal Furniture'),

  // Contact Info
  NEXT_PUBLIC_WHATSAPP_NUMBER: z.string().optional(),
  NEXT_PUBLIC_PHONE_NUMBER: z.string().optional(),
  NEXT_PUBLIC_EMAIL: z.string().email().optional(),
  NEXT_PUBLIC_ADDRESS: z.string().optional(),

  // Payment Info
  NEXT_PUBLIC_JAZZCASH_NUMBER: z.string().optional(),
  NEXT_PUBLIC_EASYPAISA_NUMBER: z.string().optional(),
  NEXT_PUBLIC_BANK_IBAN: z.string().optional(),

  // Social URLs
  NEXT_PUBLIC_FACEBOOK_URL: z.string().url().optional().or(z.literal('')),
  NEXT_PUBLIC_INSTAGRAM_URL: z.string().url().optional().or(z.literal('')),
  NEXT_PUBLIC_TIKTOK_URL: z.string().url().optional().or(z.literal('')),

  // Email (Resend)
  RESEND_API_KEY: z.string().optional(),

  // SMS (Twilio)
  TWILIO_ACCOUNT_SID: z.string().optional(),
  TWILIO_AUTH_TOKEN: z.string().optional(),
  TWILIO_PHONE_NUMBER: z.string().optional(),

  // Admin seed credentials
  ADMIN_SEED_EMAIL: z.string().email().optional(),
  ADMIN_SEED_PASSWORD: z.string().optional(),
});

// Parse environment variables with safe defaults for required fields during build
function parseEnv() {
  try {
    return envSchema.parse({
      DATABASE_URL: process.env.DATABASE_URL,
      SUPABASE_URL: process.env.SUPABASE_URL,
      SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
      SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
      SUPABASE_DB_URL: process.env.SUPABASE_DB_URL,
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || 'development-secret-change-in-production',
      NEXTAUTH_URL: process.env.NEXTAUTH_URL,
      CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || 'demo',
      CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
      CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
      NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'demo',
      NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
      NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
      NEXT_PUBLIC_WHATSAPP_NUMBER: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
      NEXT_PUBLIC_PHONE_NUMBER: process.env.NEXT_PUBLIC_PHONE_NUMBER,
      NEXT_PUBLIC_EMAIL: process.env.NEXT_PUBLIC_EMAIL,
      NEXT_PUBLIC_ADDRESS: process.env.NEXT_PUBLIC_ADDRESS,
      NEXT_PUBLIC_JAZZCASH_NUMBER: process.env.NEXT_PUBLIC_JAZZCASH_NUMBER,
      NEXT_PUBLIC_EASYPAISA_NUMBER: process.env.NEXT_PUBLIC_EASYPAISA_NUMBER,
      NEXT_PUBLIC_BANK_IBAN: process.env.NEXT_PUBLIC_BANK_IBAN,
      NEXT_PUBLIC_FACEBOOK_URL: process.env.NEXT_PUBLIC_FACEBOOK_URL,
      NEXT_PUBLIC_INSTAGRAM_URL: process.env.NEXT_PUBLIC_INSTAGRAM_URL,
      NEXT_PUBLIC_TIKTOK_URL: process.env.NEXT_PUBLIC_TIKTOK_URL,
      RESEND_API_KEY: process.env.RESEND_API_KEY,
      TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
      TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
      TWILIO_PHONE_NUMBER: process.env.TWILIO_PHONE_NUMBER,
      ADMIN_SEED_EMAIL: process.env.ADMIN_SEED_EMAIL,
      ADMIN_SEED_PASSWORD: process.env.ADMIN_SEED_PASSWORD,
    });
  } catch {
    // Return defaults for build time
    return {
      NEXTAUTH_SECRET: 'development-secret-change-in-production',
      CLOUDINARY_CLOUD_NAME: 'demo',
      NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: 'demo',
      NEXT_PUBLIC_APP_NAME: 'Royal Furniture',
    } as z.infer<typeof envSchema>;
  }
}

export const env = parseEnv();
export type Env = z.infer<typeof envSchema>;
