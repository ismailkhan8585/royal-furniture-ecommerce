/*
# Royal Furniture Initial Schema

1. Overview
   This migration creates the complete database schema for Royal Furniture, a Pakistani furniture e-commerce store.
   The app has admin-only authentication (via NextAuth, not Supabase auth), so:
   - Public data (products, gallery, approved reviews) are readable by anon
   - Guest operations (orders, custom requests, reviews) are writable by anon
   - Admin operations use service role key (bypasses RLS) server-side

2. New Tables
   - `admins`: Store admin accounts (email, hashed password, login tracking)
   - `products`: Furniture items with categories, pricing, stock, photos
   - `orders`: Guest orders with customer info and payment details
   - `order_items`: Line items linking orders to products
   - `custom_order_requests`: Custom furniture requests from customers
   - `reviews`: Customer reviews (phone-verified, admin-moderated)
   - `gallery_images`: Showroom and delivered furniture photos
   - `site_settings`: Single-row store configuration

3. Enums
   - `category`: Product categories (OFFICE, LIVING_ROOM, BEDROOM, etc.)
   - `price_type`: FIXED or INQUIRY (price-on-inquiry items)
   - `stock_type`: IN_STOCK, MADE_TO_ORDER, OUT_OF_STOCK
   - `order_status`: Order lifecycle states
   - `payment_method`: COD, JAZZCASH, EASYPAISA, BANK_TRANSFER
   - `payment_status`: UNPAID, PAID, PARTIAL, REFUNDED
   - `custom_request_status`: Custom order lifecycle states

4. Security (RLS)
   - All tables have RLS enabled
   - Products: anon can read active products
   - Orders: anon can insert (guest checkout), no read (admin only via service role)
   - Order items: anon can insert (part of checkout), no read
   - Custom requests: anon can insert, no read
   - Reviews: anon can insert, read approved only
   - Gallery: anon can read all
   - Admin/Settings: no anon access (admin via service role)

5. Indexes
   - Products: category, featured, active, slug
   - Orders: order_number + customer_phone (for guest order tracking)
   - Reviews: product_id, approved
*/

-- Create enums
CREATE TYPE category AS ENUM (
  'OFFICE',
  'LIVING_ROOM',
  'BEDROOM',
  'DINING',
  'STUDY_KIDS',
  'OUTDOOR',
  'CUSTOM'
);

CREATE TYPE price_type AS ENUM ('FIXED', 'INQUIRY');

CREATE TYPE stock_type AS ENUM ('IN_STOCK', 'MADE_TO_ORDER', 'OUT_OF_STOCK');

CREATE TYPE order_status AS ENUM (
  'PENDING',
  'CONFIRMED',
  'PROCESSING',
  'SHIPPED',
  'DELIVERED',
  'CANCELLED',
  'RETURNED'
);

CREATE TYPE payment_method AS ENUM (
  'COD',
  'JAZZCASH',
  'EASYPAISA',
  'BANK_TRANSFER'
);

CREATE TYPE payment_status AS ENUM ('UNPAID', 'PAID', 'PARTIAL', 'REFUNDED');

CREATE TYPE custom_request_status AS ENUM (
  'PENDING',
  'QUOTED',
  'APPROVED',
  'IN_PRODUCTION',
  'READY',
  'DELIVERED',
  'CANCELLED'
);

-- Admins table (for NextAuth credentials provider)
CREATE TABLE IF NOT EXISTS admins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  password text NOT NULL, -- bcrypt hashed
  name text NOT NULL,
  is_active boolean NOT NULL DEFAULT true,
  last_login_at timestamptz,
  login_attempts integer NOT NULL DEFAULT 0,
  locked_until timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  name_urdu text,
  category category NOT NULL DEFAULT 'LIVING_ROOM',
  sub_category text,
  material text,
  dimensions text,
  color text,
  description text,
  description_urdu text,
  photos text[] NOT NULL DEFAULT '{}',
  price_type price_type NOT NULL DEFAULT 'FIXED',
  price numeric(12, 2), -- null for inquiry items
  compare_price numeric(12, 2),
  stock integer NOT NULL DEFAULT 0,
  stock_type stock_type NOT NULL DEFAULT 'IN_STOCK',
  sku text UNIQUE,
  featured boolean NOT NULL DEFAULT false,
  is_active boolean NOT NULL DEFAULT true,
  warranty text,
  tags text[] NOT NULL DEFAULT '{}',
  rating numeric(3, 2) NOT NULL DEFAULT 0,
  review_count integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Orders table (guest checkout - no user accounts)
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number text UNIQUE NOT NULL, -- ORD-2024-XXXXX format
  customer_name text NOT NULL,
  customer_phone text NOT NULL,
  customer_email text,
  address text NOT NULL,
  city text NOT NULL,
  area text,
  delivery_fee numeric(10, 2) NOT NULL,
  subtotal numeric(12, 2) NOT NULL,
  total_amount numeric(12, 2) NOT NULL,
  payment_method payment_method NOT NULL,
  payment_screenshot text, -- Cloudinary URL
  payment_status payment_status NOT NULL DEFAULT 'UNPAID',
  status order_status NOT NULL DEFAULT 'PENDING',
  notes text,
  invoice_url text,
  estimated_delivery date,
  delivered_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Order items table
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id uuid NOT NULL REFERENCES products(id) ON DELETE SET NULL,
  product_name text NOT NULL,
  product_photo text,
  quantity integer NOT NULL,
  unit_price numeric(12, 2) NOT NULL,
  total_price numeric(12, 2) NOT NULL
);

-- Custom order requests table
CREATE TABLE IF NOT EXISTS custom_order_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  request_ref text UNIQUE NOT NULL, -- CUS-2024-XXXXX format
  furniture_type text NOT NULL,
  room_type text,
  material text,
  budget_range text,
  dimensions text,
  description text,
  reference_images text[] NOT NULL DEFAULT '{}',
  customer_name text NOT NULL,
  customer_phone text NOT NULL,
  city text NOT NULL,
  status custom_request_status NOT NULL DEFAULT 'PENDING',
  quoted_price numeric(12, 2),
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Reviews table (phone-verified, admin-moderated)
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  customer_name text NOT NULL,
  customer_phone text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  body text NOT NULL,
  is_approved boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Gallery images table
CREATE TABLE IF NOT EXISTS gallery_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url text NOT NULL,
  category category,
  caption text,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Site settings table (single-row configuration)
CREATE TABLE IF NOT EXISTS site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  store_name text NOT NULL DEFAULT 'Royal Furniture',
  tagline_en text DEFAULT 'Comfort Meets Class',
  phone text NOT NULL,
  whatsapp text NOT NULL,
  jazzcash_number text,
  easypaisa_number text,
  bank_iban text,
  email text NOT NULL,
  address text NOT NULL,
  facebook_url text,
  instagram_url text,
  tiktok_url text,
  free_delivery_min numeric(10, 2) NOT NULL DEFAULT 50000,
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured) WHERE featured = true;
CREATE INDEX IF NOT EXISTS idx_products_active ON products(is_active) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_orders_lookup ON orders(order_number, customer_phone);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_custom_requests_status ON custom_order_requests(status);
CREATE INDEX IF NOT EXISTS idx_reviews_product ON reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_reviews_approved ON reviews(is_approved) WHERE is_approved = true;
CREATE INDEX IF NOT EXISTS idx_gallery_sort ON gallery_images(sort_order);

-- Enable RLS on all tables
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE custom_order_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Admins: No anon access (admin operations use service role)
DROP POLICY IF EXISTS "no_anon_admins" ON admins;
CREATE POLICY "no_anon_admins" ON admins
  FOR ALL TO anon
  USING (false)
  WITH CHECK (false);

-- Products: Anon can read active products only
DROP POLICY IF EXISTS "anon_read_active_products" ON products;
CREATE POLICY "anon_read_active_products" ON products
  FOR SELECT TO anon, authenticated
  USING (is_active = true);

-- Orders: Anon can insert (guest checkout), cannot read (admin only)
DROP POLICY IF EXISTS "anon_insert_orders" ON orders;
CREATE POLICY "anon_insert_orders" ON orders
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "no_anon_read_orders" ON orders;
CREATE POLICY "no_anon_read_orders" ON orders
  FOR SELECT TO anon, authenticated
  USING (false);

-- Order items: Anon can insert, cannot read
DROP POLICY IF EXISTS "anon_insert_order_items" ON order_items;
CREATE POLICY "anon_insert_order_items" ON order_items
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "no_anon_read_order_items" ON order_items;
CREATE POLICY "no_anon_read_order_items" ON order_items
  FOR SELECT TO anon, authenticated
  USING (false);

-- Custom requests: Anon can insert, cannot read
DROP POLICY IF EXISTS "anon_insert_custom_requests" ON custom_order_requests;
CREATE POLICY "anon_insert_custom_requests" ON custom_order_requests
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "no_anon_read_custom_requests" ON custom_order_requests;
CREATE POLICY "no_anon_read_custom_requests" ON custom_order_requests
  FOR SELECT TO anon, authenticated
  USING (false);

-- Reviews: Anon can insert, read approved only
DROP POLICY IF EXISTS "anon_insert_reviews" ON reviews;
CREATE POLICY "anon_insert_reviews" ON reviews
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "anon_read_approved_reviews" ON reviews;
CREATE POLICY "anon_read_approved_reviews" ON reviews
  FOR SELECT TO anon, authenticated
  USING (is_approved = true);

-- Gallery: Anon can read all
DROP POLICY IF EXISTS "anon_read_gallery" ON gallery_images;
CREATE POLICY "anon_read_gallery" ON gallery_images
  FOR SELECT TO anon, authenticated
  USING (true);

-- Site settings: No anon access (admin only via service role)
DROP POLICY IF EXISTS "no_anon_settings" ON site_settings;
CREATE POLICY "no_anon_settings" ON site_settings
  FOR ALL TO anon, authenticated
  USING (false)
  WITH CHECK (false);

-- Insert default site settings
INSERT INTO site_settings (phone, whatsapp, email, address)
VALUES ('+923001234567', '923001234567', 'info@royalfurniture.pk', 'Lahore, Pakistan')
ON CONFLICT DO NOTHING;

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
DROP TRIGGER IF EXISTS update_admins_updated_at ON admins;
CREATE TRIGGER update_admins_updated_at
  BEFORE UPDATE ON admins
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_products_updated_at ON products;
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_orders_updated_at ON orders;
CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_custom_requests_updated_at ON custom_order_requests;
CREATE TRIGGER update_custom_requests_updated_at
  BEFORE UPDATE ON custom_order_requests
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_site_settings_updated_at ON site_settings;
CREATE TRIGGER update_site_settings_updated_at
  BEFORE UPDATE ON site_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();