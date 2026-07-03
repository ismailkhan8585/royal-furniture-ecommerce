export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      admins: {
        Row: {
          id: string;
          email: string;
          password: string;
          name: string;
          is_active: boolean;
          last_login_at: string | null;
          login_attempts: number;
          locked_until: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          password: string;
          name: string;
          is_active?: boolean;
          last_login_at?: string | null;
          login_attempts?: number;
          locked_until?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          password?: string;
          name?: string;
          is_active?: boolean;
          last_login_at?: string | null;
          login_attempts?: number;
          locked_until?: string | null;
        };
      };
      products: {
        Row: {
          id: string;
          slug: string;
          name: string;
          name_urdu: string | null;
          category: Database['public']['Enums']['category'];
          sub_category: string | null;
          material: string | null;
          dimensions: string | null;
          color: string | null;
          description: string | null;
          description_urdu: string | null;
          photos: string[];
          price_type: Database['public']['Enums']['price_type'];
          price: number | null;
          compare_price: number | null;
          stock: number;
          stock_type: Database['public']['Enums']['stock_type'];
          sku: string | null;
          featured: boolean;
          is_active: boolean;
          warranty: string | null;
          tags: string[];
          rating: number;
          review_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          name: string;
          name_urdu?: string | null;
          category?: Database['public']['Enums']['category'];
          sub_category?: string | null;
          material?: string | null;
          dimensions?: string | null;
          color?: string | null;
          description?: string | null;
          description_urdu?: string | null;
          photos?: string[];
          price_type?: Database['public']['Enums']['price_type'];
          price?: number | null;
          compare_price?: number | null;
          stock?: number;
          stock_type?: Database['public']['Enums']['stock_type'];
          sku?: string | null;
          featured?: boolean;
          is_active?: boolean;
          warranty?: string | null;
          tags?: string[];
          rating?: number;
          review_count?: number;
        };
        Update: {
          id?: string;
          slug?: string;
          name?: string;
          name_urdu?: string | null;
          category?: Database['public']['Enums']['category'];
          sub_category?: string | null;
          material?: string | null;
          dimensions?: string | null;
          color?: string | null;
          description?: string | null;
          description_urdu?: string | null;
          photos?: string[];
          price_type?: Database['public']['Enums']['price_type'];
          price?: number | null;
          compare_price?: number | null;
          stock?: number;
          stock_type?: Database['public']['Enums']['stock_type'];
          sku?: string | null;
          featured?: boolean;
          is_active?: boolean;
          warranty?: string | null;
          tags?: string[];
          rating?: number;
          review_count?: number;
        };
      };
      orders: {
        Row: {
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
          payment_method: Database['public']['Enums']['payment_method'];
          payment_screenshot: string | null;
          payment_status: Database['public']['Enums']['payment_status'];
          status: Database['public']['Enums']['order_status'];
          notes: string | null;
          invoice_url: string | null;
          estimated_delivery: string | null;
          delivered_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          order_number: string;
          customer_name: string;
          customer_phone: string;
          customer_email?: string | null;
          address: string;
          city: string;
          area?: string | null;
          delivery_fee: number;
          subtotal: number;
          total_amount: number;
          payment_method: Database['public']['Enums']['payment_method'];
          payment_screenshot?: string | null;
          payment_status?: Database['public']['Enums']['payment_status'];
          status?: Database['public']['Enums']['order_status'];
          notes?: string | null;
          invoice_url?: string | null;
          estimated_delivery?: string | null;
          delivered_at?: string | null;
        };
        Update: {
          id?: string;
          order_number?: string;
          customer_name?: string;
          customer_phone?: string;
          customer_email?: string | null;
          address?: string;
          city?: string;
          area?: string | null;
          delivery_fee?: number;
          subtotal?: number;
          total_amount?: number;
          payment_method?: Database['public']['Enums']['payment_method'];
          payment_screenshot?: string | null;
          payment_status?: Database['public']['Enums']['payment_status'];
          status?: Database['public']['Enums']['order_status'];
          notes?: string | null;
          invoice_url?: string | null;
          estimated_delivery?: string | null;
          delivered_at?: string | null;
        };
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          product_id: string;
          product_name: string;
          product_photo: string | null;
          quantity: number;
          unit_price: number;
          total_price: number;
        };
        Insert: {
          id?: string;
          order_id: string;
          product_id: string;
          product_name: string;
          product_photo?: string | null;
          quantity: number;
          unit_price: number;
          total_price: number;
        };
        Update: {
          id?: string;
          order_id?: string;
          product_id?: string;
          product_name?: string;
          product_photo?: string | null;
          quantity?: number;
          unit_price?: number;
          total_price?: number;
        };
      };
      custom_order_requests: {
        Row: {
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
          status: Database['public']['Enums']['custom_request_status'];
          quoted_price: number | null;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          request_ref: string;
          furniture_type: string;
          room_type?: string | null;
          material?: string | null;
          budget_range?: string | null;
          dimensions?: string | null;
          description?: string | null;
          reference_images?: string[];
          customer_name: string;
          customer_phone: string;
          city: string;
          status?: Database['public']['Enums']['custom_request_status'];
          quoted_price?: number | null;
          notes?: string | null;
        };
        Update: {
          id?: string;
          request_ref?: string;
          furniture_type?: string;
          room_type?: string | null;
          material?: string | null;
          budget_range?: string | null;
          dimensions?: string | null;
          description?: string | null;
          reference_images?: string[];
          customer_name?: string;
          customer_phone?: string;
          city?: string;
          status?: Database['public']['Enums']['custom_request_status'];
          quoted_price?: number | null;
          notes?: string | null;
        };
      };
      reviews: {
        Row: {
          id: string;
          product_id: string;
          customer_name: string;
          customer_phone: string;
          rating: number;
          body: string;
          is_approved: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          product_id: string;
          customer_name: string;
          customer_phone: string;
          rating: number;
          body: string;
          is_approved?: boolean;
        };
        Update: {
          id?: string;
          product_id?: string;
          customer_name?: string;
          customer_phone?: string;
          rating?: number;
          body?: string;
          is_approved?: boolean;
        };
      };
      gallery_images: {
        Row: {
          id: string;
          image_url: string;
          category: Database['public']['Enums']['category'] | null;
          caption: string | null;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          image_url: string;
          category?: Database['public']['Enums']['category'] | null;
          caption?: string | null;
          sort_order?: number;
        };
        Update: {
          id?: string;
          image_url?: string;
          category?: Database['public']['Enums']['category'] | null;
          caption?: string | null;
          sort_order?: number;
        };
      };
      site_settings: {
        Row: {
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
        };
        Insert: {
          id?: string;
          store_name?: string;
          tagline_en?: string | null;
          phone: string;
          whatsapp: string;
          jazzcash_number?: string | null;
          easypaisa_number?: string | null;
          bank_iban?: string | null;
          email: string;
          address: string;
          facebook_url?: string | null;
          instagram_url?: string | null;
          tiktok_url?: string | null;
          free_delivery_min?: number;
        };
        Update: {
          id?: string;
          store_name?: string;
          tagline_en?: string | null;
          phone?: string;
          whatsapp?: string;
          jazzcash_number?: string | null;
          easypaisa_number?: string | null;
          bank_iban?: string | null;
          email?: string;
          address?: string;
          facebook_url?: string | null;
          instagram_url?: string | null;
          tiktok_url?: string | null;
          free_delivery_min?: number;
        };
      };
    };
    Enums: {
      category:
        | 'OFFICE'
        | 'LIVING_ROOM'
        | 'BEDROOM'
        | 'DINING'
        | 'STUDY_KIDS'
        | 'OUTDOOR'
        | 'CUSTOM';
      price_type: 'FIXED' | 'INQUIRY';
      stock_type: 'IN_STOCK' | 'MADE_TO_ORDER' | 'OUT_OF_STOCK';
      order_status:
        | 'PENDING'
        | 'CONFIRMED'
        | 'PROCESSING'
        | 'SHIPPED'
        | 'DELIVERED'
        | 'CANCELLED'
        | 'RETURNED';
      payment_method: 'COD' | 'JAZZCASH' | 'EASYPAISA' | 'BANK_TRANSFER';
      payment_status: 'UNPAID' | 'PAID' | 'PARTIAL' | 'REFUNDED';
      custom_request_status:
        | 'PENDING'
        | 'QUOTED'
        | 'APPROVED'
        | 'IN_PRODUCTION'
        | 'READY'
        | 'DELIVERED'
        | 'CANCELLED';
    };
  };
}

// Convenience type aliases
export type Admin = Database['public']['Tables']['admins']['Row'];
export type Product = Database['public']['Tables']['products']['Row'];
export type Order = Database['public']['Tables']['orders']['Row'];
export type OrderItem = Database['public']['Tables']['order_items']['Row'];
export type CustomOrderRequest =
  Database['public']['Tables']['custom_order_requests']['Row'];
export type Review = Database['public']['Tables']['reviews']['Row'];
export type GalleryImage = Database['public']['Tables']['gallery_images']['Row'];
export type SiteSettings = Database['public']['Tables']['site_settings']['Row'];

// Insert types
export type AdminInsert = Database['public']['Tables']['admins']['Insert'];
export type ProductInsert = Database['public']['Tables']['products']['Insert'];
export type OrderInsert = Database['public']['Tables']['orders']['Insert'];
export type OrderItemInsert = Database['public']['Tables']['order_items']['Insert'];
export type CustomOrderRequestInsert =
  Database['public']['Tables']['custom_order_requests']['Insert'];
export type ReviewInsert = Database['public']['Tables']['reviews']['Insert'];
export type GalleryImageInsert =
  Database['public']['Tables']['gallery_images']['Insert'];

// Enum types
export type Category = Database['public']['Enums']['category'];
export type PriceType = Database['public']['Enums']['price_type'];
export type StockType = Database['public']['Enums']['stock_type'];
export type OrderStatus = Database['public']['Enums']['order_status'];
export type PaymentMethod = Database['public']['Enums']['payment_method'];
export type PaymentStatus = Database['public']['Enums']['payment_status'];
export type CustomRequestStatus =
  Database['public']['Enums']['custom_request_status'];
