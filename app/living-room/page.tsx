import { Metadata } from 'next';
import { CategoryPage } from '@/components/products/CategoryPage';
import { CATEGORY_LABELS, CATEGORIES } from '@/lib/constants';
import { getProducts } from '@/lib/product-queries';

export const metadata: Metadata = {
  title: `${CATEGORY_LABELS[CATEGORIES.LIVING_ROOM]} | Royal Furniture`,
  description:
    'Shop premium sofas, recliners, coffee tables & living room furniture in Pakistan. 7-seater sets, L-shape sofas & more. Free delivery in major cities.',
};

export const dynamic = 'force-dynamic';

export default async function LivingRoomPage() {
  const products = await getProducts({ category: CATEGORIES.LIVING_ROOM });

  return <CategoryPage category={CATEGORIES.LIVING_ROOM} initialProducts={products} />;
}
