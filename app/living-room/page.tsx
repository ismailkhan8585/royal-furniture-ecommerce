import { Metadata } from 'next';
import { CategoryPage } from '@/components/products/CategoryPage';
import { CATEGORY_LABELS, CATEGORIES } from '@/lib/constants';

export const metadata: Metadata = {
  title: `${CATEGORY_LABELS[CATEGORIES.LIVING_ROOM]} | Royal Furniture`,
  description:
    'Shop premium sofas, recliners, coffee tables & living room furniture in Pakistan. 7-seater sets, L-shape sofas & more. Free delivery in major cities.',
};

export default function LivingRoomPage() {
  return <CategoryPage category={CATEGORIES.LIVING_ROOM} />;
}
