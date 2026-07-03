import { Metadata } from 'next';
import { CategoryPage } from '@/components/products/CategoryPage';
import { CATEGORY_LABELS, CATEGORIES } from '@/lib/constants';
import { getProducts } from '@/lib/product-queries';

export const metadata: Metadata = {
  title: `${CATEGORY_LABELS[CATEGORIES.BEDROOM]} | Royal Furniture`,
  description:
    'Shop premium beds, wardrobes, dressing tables & bedroom furniture in Pakistan. King size beds, sheesham wood furniture with free delivery.',
};

export const dynamic = 'force-dynamic';

export default async function BedroomPage() {
  const products = await getProducts({ category: CATEGORIES.BEDROOM });

  return <CategoryPage category={CATEGORIES.BEDROOM} initialProducts={products} />;
}
