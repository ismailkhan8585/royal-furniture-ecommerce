// Database types matching Prisma schema

// Enums
export type Category =
  | 'OFFICE'
  | 'LIVING_ROOM'
  | 'BEDROOM'
  | 'DINING'
  | 'STUDY_KIDS'
  | 'OUTDOOR'
  | 'CUSTOM';

export type PriceType = 'FIXED' | 'INQUIRY';

export type StockType = 'IN_STOCK' | 'MADE_TO_ORDER' | 'OUT_OF_STOCK';

export type OrderStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'PROCESSING'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED'
  | 'RETURNED';

export type PaymentMethod =
  | 'COD'
  | 'JAZZCASH'
  | 'EASYPAISA'
  | 'BANK_TRANSFER';

export type PaymentStatus = 'UNPAID' | 'PAID' | 'PARTIAL' | 'REFUNDED';

export type CustomRequestStatus =
  | 'PENDING'
  | 'QUOTED'
  | 'APPROVED'
  | 'IN_PRODUCTION'
  | 'READY'
  | 'DELIVERED'
  | 'CANCELLED';

// Admin Model
export interface Admin {
  id: string;
  email: string;
  password: string;
  name: string;
  isActive: boolean;
  lastLoginAt: Date | null;
  loginAttempts: number;
  lockedUntil: Date | null;
  createdAt: Date;
}

// Product Model
export interface Product {
  id: string;
  slug: string;
  name: string;
  nameUrdu?: string | null;
  category: Category;
  subCategory?: string | null;
  material?: string | null;
  dimensions?: string | null;
  color?: string | null;
  description?: string | null;
  descriptionUrdu?: string | null;
  photos: string[];
  priceType: PriceType;
  price?: number | null;
  comparePrice?: number | null;
  stock: number;
  stockType: StockType;
  sku?: string | null;
  featured: boolean;
  isActive: boolean;
  warranty?: string | null;
  tags: string[];
  rating: number;
  reviewCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductWithComputed extends Product {
  isAvailable: boolean;
  displayPrice: string;
}

// Order Models
export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  productName: string;
  productPhoto?: string | null;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string | null;
  address: string;
  city: string;
  area?: string | null;
  deliveryFee: number;
  subtotal: number;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  paymentScreenshot?: string | null;
  paymentStatus: PaymentStatus;
  status: OrderStatus;
  notes?: string | null;
  invoiceUrl?: string | null;
  estimatedDelivery?: Date | null;
  deliveredAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
  items: OrderItem[];
}

// Custom Order Request Model
export interface CustomOrderRequest {
  id: string;
  requestRef: string;
  furnitureType: string;
  roomType?: string | null;
  material?: string | null;
  budgetRange?: string | null;
  dimensions?: string | null;
  description?: string | null;
  referenceImages: string[];
  customerName: string;
  customerPhone: string;
  city: string;
  status: CustomRequestStatus;
  quotedPrice?: number | null;
  notes?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// Review Model
export interface Review {
  id: string;
  productId: string;
  customerName: string;
  customerPhone: string;
  rating: number;
  body: string;
  isApproved: boolean;
  createdAt: Date;
}

// Gallery Image Model
export interface GalleryImage {
  id: string;
  imageUrl: string;
  category?: Category | null;
  caption?: string | null;
  sortOrder: number;
  createdAt: Date;
}

// Site Settings Model
export interface SiteSettings {
  id: string;
  storeName: string;
  taglineEn?: string | null;
  phone: string;
  whatsapp: string;
  jazzcashNumber?: string | null;
  easypaisaNumber?: string | null;
  bankIBAN?: string | null;
  email: string;
  address: string;
  facebookUrl?: string | null;
  instagramUrl?: string | null;
  tiktokUrl?: string | null;
  freeDeliveryMin: number;
  updatedAt: Date;
}

// Cart Types (not stored in DB - cookie/session based)
export interface CartItem {
  productId: string;
  productName: string;
  productPhoto: string;
  quantity: number;
  unitPrice: number;
  slug: string;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
}

// Wishlist Types (localStorage based)
export interface WishlistItem {
  productId: string;
  productName: string;
  productPhoto: string;
  price?: number;
  priceType: PriceType;
  slug: string;
  addedAt: string;
}

// Form Types
export interface CheckoutFormData {
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  address: string;
  city: string;
  area?: string;
  paymentMethod: PaymentMethod;
  paymentScreenshot?: string;
  notes?: string;
}

export interface CustomOrderFormData {
  furnitureType: string;
  roomType?: string;
  material?: string;
  budgetRange?: string;
  dimensions?: string;
  description?: string;
  referenceImages: string[];
  customerName: string;
  customerPhone: string;
  city: string;
}

export interface ReviewFormData {
  customerName: string;
  customerPhone: string;
  rating: number;
  body: string;
}

// API Response Types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

// Filter Types
export interface ProductFilters {
  category?: Category;
  subCategory?: string;
  material?: string;
  color?: string;
  priceMin?: number;
  priceMax?: number;
  priceType?: PriceType;
  stockType?: StockType;
  inStockOnly?: boolean;
  featured?: boolean;
  search?: string;
  sortBy?: 'featured' | 'newest' | 'price_asc' | 'price_desc' | 'best_selling';
}

// Admin Session Type
export interface AdminSession {
  id: string;
  email: string;
  name: string;
}
