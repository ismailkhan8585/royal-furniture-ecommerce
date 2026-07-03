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

export interface Admin {
  id: string;
  email: string;
  password: string;
  name: string;
  is_active: boolean;
  last_login_at: string | null;
  login_attempts: number;
  locked_until: string | null;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  name_urdu: string | null;
  category: Category;
  sub_category: string | null;
  material: string | null;
  dimensions: string | null;
  color: string | null;
  description: string | null;
  description_urdu: string | null;
  photos: string[];
  price_type: PriceType;
  price: number | null;
  compare_price: number | null;
  stock: number;
  stock_type: StockType;
  sku: string | null;
  featured: boolean;
  is_active: boolean;
  warranty: string | null;
  tags: string[];
  rating: number;
  review_count: number;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string | null;
  product_name: string;
  product_photo: string | null;
  quantity: number;
  unit_price: number;
  total_price: number;
}

export interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string | null;
  address: string;
  city: string;
  area: string | null;
  delivery_fee: number;
  subtotal: number;
  total_amount: number;
  payment_method: PaymentMethod;
  payment_screenshot: string | null;
  payment_status: PaymentStatus;
  status: OrderStatus;
  notes: string | null;
  invoice_url: string | null;
  estimated_delivery: string | null;
  delivered_at: string | null;
  created_at: string;
  updated_at: string;
  items: OrderItem[];
}

export interface CustomOrderRequest {
  id: string;
  request_ref: string;
  furniture_type: string;
  room_type: string | null;
  material: string | null;
  budget_range: string | null;
  dimensions: string | null;
  description: string | null;
  reference_images: string[];
  customer_name: string;
  customer_phone: string;
  city: string;
  status: CustomRequestStatus;
  quoted_price: number | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: string;
  product_id: string;
  customer_name: string;
  customer_phone: string;
  rating: number;
  body: string;
  is_approved: boolean;
  created_at: string;
}

export interface GalleryImage {
  id: string;
  image_url: string;
  category: Category | null;
  caption: string | null;
  sort_order: number;
  created_at: string;
}

export interface SiteSettings {
  id: string;
  store_name: string;
  tagline_en: string | null;
  phone: string;
  whatsapp: string;
  jazzcash_number: string | null;
  easypaisa_number: string | null;
  bank_iban: string | null;
  email: string;
  address: string;
  facebook_url: string | null;
  instagram_url: string | null;
  tiktok_url: string | null;
  free_delivery_min: number;
  updated_at: string;
}
