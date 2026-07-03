import { Metadata } from 'next';
import { CategoryPage } from '@/components/products/CategoryPage';
import { CATEGORY_LABELS, CATEGORIES } from '@/lib/constants';
import { getProducts } from '@/lib/product-queries';

export const metadata: Metadata = {
  title: `${CATEGORY_LABELS[CATEGORIES.OUTDOOR]} | Royal Furniture`,
  description:
    'Shop outdoor & garden furniture in Pakistan. Garden swings, patio sets, outdoor chairs with weather-resistant materials.',
};

export const dynamic = 'force-dynamic';

export default async function OutdoorPage() {
  const products = await getProducts({ category: CATEGORIES.OUTDOOR });

  return <CategoryPage category={CATEGORIES.OUTDOOR} initialProducts={products} />;
}
