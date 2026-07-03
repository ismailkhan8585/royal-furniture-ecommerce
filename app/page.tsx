import { createClient } from '@supabase/supabase-js';
import {
  HeroSlider,
  TrustBadges,
  FeaturedCategories,
  Bestsellers,
  NewArrivals,
  OfficeSpotlight,
  WhyChooseUs,
  CustomOrderBanner,
  Testimonials,
  ContactSection,
} from '@/components/landing';

// Create Supabase client for server-side data fetching
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || '';

async function getProducts() {
  if (!supabaseUrl || !supabaseKey) {
    return { featured: [], new: [], office: [] };
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  // Fetch featured products
  const { data: featured } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .eq('featured', true)
    .order('created_at', { ascending: false })
    .limit(12);

  // Fetch new arrivals
  const { data: newProducts } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(8);

  // Fetch office furniture
  const { data: officeProducts } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .eq('category', 'OFFICE')
    .order('created_at', { ascending: false })
    .limit(6);

  return {
    featured: featured || [],
    new: newProducts || [],
    office: officeProducts || [],
  };
}

export default async function HomePage() {
  const products = await getProducts();

  return (
    <>
      {/* Hero Slider */}
      <HeroSlider />

      {/* Trust Badges */}
      <TrustBadges />

      {/* Featured Categories */}
      <FeaturedCategories />

      {/* Bestsellers */}
      <Bestsellers products={products.featured} />

      {/* Office Furniture Spotlight */}
      <OfficeSpotlight products={products.office} />

      {/* New Arrivals */}
      <NewArrivals products={products.new} />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Custom Order Banner */}
      <CustomOrderBanner />

      {/* Testimonials */}
      <Testimonials />

      {/* Contact Section */}
      <ContactSection />
    </>
  );
}
