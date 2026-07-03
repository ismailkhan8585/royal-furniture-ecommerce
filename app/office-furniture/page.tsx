import { Metadata } from 'next';
import { CategoryPage } from '@/components/products/CategoryPage';
import { CATEGORY_LABELS, CATEGORIES } from '@/lib/constants';
import { getProducts } from '@/lib/product-queries';

export const metadata: Metadata = {
  title: `${CATEGORY_LABELS[CATEGORIES.OFFICE]} | Royal Furniture`,
  description:
    'Shop premium office furniture in Pakistan. Executive chairs, office desks, conference tables, filing cabinets & more. Quality craftsmanship with nationwide delivery.',
};

export const dynamic = 'force-dynamic';

export default async function OfficeFurniturePage() {
  const products = await getProducts({ category: CATEGORIES.OFFICE });

  return <CategoryPage category={CATEGORIES.OFFICE} initialProducts={products} />;
}
