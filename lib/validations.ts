import { z } from 'zod';
import {
  PAKISTANI_CITIES,
  ROOM_TYPES,
  BUDGET_RANGES,
  PAYMENT_METHODS,
  ORDER_STATUSES,
  PAYMENT_STATUSES,
  CUSTOM_REQUEST_STATUSES,
  STOCK_TYPES,
  CATEGORIES,
} from './constants';

// Convert readonly arrays to mutable tuples for zod enum
const pakistaniCities = [...PAKISTANI_CITIES] as [string, ...string[]];
const roomTypes = [...ROOM_TYPES] as [string, ...string[]];
const budgetRanges = [...BUDGET_RANGES] as [string, ...string[]];

// Phone number validation (Pakistani format)
const pakistaniPhoneRegex = /^0?3[0-9]{2}-?[0-9]{7}$/;
const phoneSchema = z
  .string()
  .min(10, 'Phone number must be at least 10 digits')
  .max(13, 'Phone number must be at most 13 digits')
  .refine(
    (val) => pakistaniPhoneRegex.test(val.replace(/\s/g, '')),
    'Please enter a valid Pakistani phone number (03XX-XXXXXXX)'
  );

// Order number validation
const orderNumberSchema = z
  .string()
  .regex(/^ORD-\d{4}-\d{5}$/, 'Invalid order number format');

// Custom request reference validation
const customRequestRefSchema = z
  .string()
  .regex(/^CUS-\d{4}-\d{5}$/, 'Invalid custom request reference format');

// Price validation
const priceSchema = z
  .number()
  .min(0, 'Price cannot be negative')
  .max(10000000, 'Price exceeds maximum allowed value');

// Product Schema
export const productSchema = z.object({
  name: z.string().min(2, 'Product name must be at least 2 characters').max(200),
  nameUrdu: z.string().max(200).optional(),
  slug: z.string().min(2).max(200).regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with dashes'),
  category: z.enum([
    CATEGORIES.OFFICE,
    CATEGORIES.LIVING_ROOM,
    CATEGORIES.BEDROOM,
    CATEGORIES.DINING,
    CATEGORIES.STUDY_KIDS,
    CATEGORIES.OUTDOOR,
    CATEGORIES.CUSTOM,
  ]),
  subCategory: z.string().max(100).optional(),
  material: z.string().max(100).optional(),
  dimensions: z.string().max(100).optional(),
  color: z.string().max(50).optional(),
  description: z.string().max(5000).optional(),
  descriptionUrdu: z.string().max(5000).optional(),
  photos: z.array(z.string().url()).min(1, 'At least one photo is required'),
  priceType: z.enum(['FIXED', 'INQUIRY']),
  price: priceSchema.optional(),
  comparePrice: priceSchema.optional(),
  stock: z.number().int().min(0).default(0),
  stockType: z.enum([
    STOCK_TYPES.IN_STOCK,
    STOCK_TYPES.MADE_TO_ORDER,
    STOCK_TYPES.OUT_OF_STOCK,
  ]),
  sku: z.string().max(50).optional(),
  featured: z.boolean().default(false),
  isActive: z.boolean().default(true),
  warranty: z.string().max(100).optional(),
  tags: z.array(z.string().max(50)).default([]),
});

// Checkout Form Schema
export const checkoutFormSchema = z.object({
  customerName: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name is too long'),
  customerPhone: phoneSchema,
  customerEmail: z.string().email('Invalid email address').optional().or(z.literal('')),
  address: z
    .string()
    .min(10, 'Please provide a complete address')
    .max(500, 'Address is too long'),
  city: z.enum(pakistaniCities, {
    errorMap: () => ({ message: 'Please select a city' }),
  }),
  area: z.string().max(100).optional(),
  paymentMethod: z.enum([
    PAYMENT_METHODS.COD,
    PAYMENT_METHODS.JAZZCASH,
    PAYMENT_METHODS.EASYPAISA,
    PAYMENT_METHODS.BANK_TRANSFER,
  ]),
  paymentScreenshot: z.string().url().optional(),
  notes: z.string().max(500).optional(),
});

// Custom Order Form Schema
export const customOrderFormSchema = z.object({
  furnitureType: z
    .string()
    .min(2, 'Please specify furniture type')
    .max(100, 'Furniture type is too long'),
  roomType: z.enum(roomTypes).optional(),
  material: z.string().max(100).optional(),
  budgetRange: z.enum(budgetRanges).optional(),
  dimensions: z.string().max(100).optional(),
  description: z.string().max(2000).optional(),
  referenceImages: z.array(z.string().url()).max(5, 'Maximum 5 reference images'),
  customerName: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100),
  customerPhone: phoneSchema,
  city: z.enum(pakistaniCities),
});

// Review Form Schema
export const reviewFormSchema = z.object({
  customerName: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100),
  customerPhone: phoneSchema,
  rating: z.number().int().min(1, 'Rating must be at least 1').max(5, 'Rating cannot exceed 5'),
  body: z
    .string()
    .min(10, 'Review must be at least 10 characters')
    .max(1000, 'Review is too long'),
});

// Order Tracking Form Schema
export const orderTrackingSchema = z.object({
  orderNumber: orderNumberSchema,
  customerPhone: phoneSchema,
});

// Admin Login Schema
export const adminLoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

// Admin Create Schema
export const adminCreateSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
});

// Order Status Update Schema
export const orderStatusUpdateSchema = z.object({
  status: z.enum([
    ORDER_STATUSES.PENDING,
    ORDER_STATUSES.CONFIRMED,
    ORDER_STATUSES.PROCESSING,
    ORDER_STATUSES.SHIPPED,
    ORDER_STATUSES.DELIVERED,
    ORDER_STATUSES.CANCELLED,
    ORDER_STATUSES.RETURNED,
  ]),
  notes: z.string().max(500).optional(),
});

// Payment Status Update Schema
export const paymentStatusUpdateSchema = z.object({
  paymentStatus: z.enum([
    PAYMENT_STATUSES.UNPAID,
    PAYMENT_STATUSES.PAID,
    PAYMENT_STATUSES.PARTIAL,
    PAYMENT_STATUSES.REFUNDED,
  ]),
});

// Custom Request Status Update Schema
export const customRequestStatusUpdateSchema = z.object({
  status: z.enum([
    CUSTOM_REQUEST_STATUSES.PENDING,
    CUSTOM_REQUEST_STATUSES.QUOTED,
    CUSTOM_REQUEST_STATUSES.APPROVED,
    CUSTOM_REQUEST_STATUSES.IN_PRODUCTION,
    CUSTOM_REQUEST_STATUSES.READY,
    CUSTOM_REQUEST_STATUSES.DELIVERED,
    CUSTOM_REQUEST_STATUSES.CANCELLED,
  ]),
  quotedPrice: priceSchema.optional(),
  notes: z.string().max(500).optional(),
});

// Site Settings Schema
export const siteSettingsSchema = z.object({
  storeName: z.string().min(1, 'Store name is required').max(100),
  taglineEn: z.string().max(200).optional(),
  phone: z.string().min(1, 'Phone number is required'),
  whatsapp: z.string().min(1, 'WhatsApp number is required'),
  jazzcashNumber: z.string().optional(),
  easypaisaNumber: z.string().optional(),
  bankIBAN: z.string().optional(),
  email: z.string().email('Invalid email'),
  address: z.string().min(1, 'Address is required'),
  facebookUrl: z.string().url().optional().or(z.literal('')),
  instagramUrl: z.string().url().optional().or(z.literal('')),
  tiktokUrl: z.string().url().optional().or(z.literal('')),
  freeDeliveryMin: priceSchema,
});

// Contact Form Schema
export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  phone: phoneSchema,
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000),
});

// Cart Item Schema
export const cartItemSchema = z.object({
  productId: z.string().min(1),
  productName: z.string().min(1),
  productPhoto: z.string().url(),
  quantity: z.number().int().min(1).max(99),
  unitPrice: priceSchema,
  slug: z.string().min(1),
});

// Type exports
export type ProductFormData = z.infer<typeof productSchema>;
export type CheckoutFormData = z.infer<typeof checkoutFormSchema>;
export type CustomOrderFormData = z.infer<typeof customOrderFormSchema>;
export type ReviewFormData = z.infer<typeof reviewFormSchema>;
export type OrderTrackingFormData = z.infer<typeof orderTrackingSchema>;
export type AdminLoginFormData = z.infer<typeof adminLoginSchema>;
export type AdminCreateFormData = z.infer<typeof adminCreateSchema>;
export type OrderStatusUpdateData = z.infer<typeof orderStatusUpdateSchema>;
export type PaymentStatusUpdateData = z.infer<typeof paymentStatusUpdateSchema>;
export type CustomRequestStatusUpdateData = z.infer<typeof customRequestStatusUpdateSchema>;
export type SiteSettingsFormData = z.infer<typeof siteSettingsSchema>;
export type ContactFormData = z.infer<typeof contactFormSchema>;
export type CartItemData = z.infer<typeof cartItemSchema>;
