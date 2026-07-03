import { Metadata } from 'next';
import { CategoryPage } from '@/components/products/CategoryPage';
import { getProducts } from '@/lib/product-queries';

export const metadata: Metadata = {
  title: 'All Furniture | Royal Furniture',
  description:
    'Browse all Royal Furniture products including office furniture, living room sets, bedroom furniture, dining sets, outdoor furniture, and custom pieces.',
};

export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <CategoryPage
      title="All Furniture"
      description="Browse every collection in one place"
      initialProducts={products}
    />
  );
}
