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
import { prisma } from '@/lib/prisma';
import { serializeProduct } from '@/lib/db-serializers';

export const dynamic = 'force-dynamic';

async function getProducts() {
  try {
    const [featured, newProducts, officeProducts] = await Promise.all([
      prisma.product.findMany({
        where: { is_active: true, featured: true },
        orderBy: { created_at: 'desc' },
        take: 12,
      }),
      prisma.product.findMany({
        where: { is_active: true },
        orderBy: { created_at: 'desc' },
        take: 8,
      }),
      prisma.product.findMany({
        where: { is_active: true, category: 'OFFICE' },
        orderBy: { created_at: 'desc' },
        take: 6,
      }),
    ]);

    return {
      featured: featured.map(serializeProduct),
      new: newProducts.map(serializeProduct),
      office: officeProducts.map(serializeProduct),
    };
  } catch (error) {
    console.error('Failed to fetch homepage products:', error);
    return { featured: [], new: [], office: [] };
  }
}

export default async function HomePage() {
  const products = await getProducts();

  return (
    <>
      <HeroSlider />
      <TrustBadges />
      <FeaturedCategories />
      <Bestsellers products={products.featured} />
      <OfficeSpotlight products={products.office} />
      <NewArrivals products={products.new} />
      <WhyChooseUs />
      <CustomOrderBanner />
      <Testimonials />
      <ContactSection />
    </>
  );
}
