import { Metadata } from 'next';
import { CategoryPage } from '@/components/products/CategoryPage';
import { CATEGORY_LABELS, CATEGORIES } from '@/lib/constants';

export const metadata: Metadata = {
  title: `${CATEGORY_LABELS[CATEGORIES.BEDROOM]} | Royal Furniture`,
  description:
    'Shop premium beds, wardrobes, dressing tables & bedroom furniture in Pakistan. King size beds, sheesham wood furniture with free delivery.',
};

export default function BedroomPage() {
  return <CategoryPage category={CATEGORIES.BEDROOM} />;
}
