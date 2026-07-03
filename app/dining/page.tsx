import { Metadata } from 'next';
import { CategoryPage } from '@/components/products/CategoryPage';
import { CATEGORY_LABELS, CATEGORIES } from '@/lib/constants';

export const metadata: Metadata = {
  title: `${CATEGORY_LABELS[CATEGORIES.DINING]} | Royal Furniture`,
  description:
    'Shop premium dining tables, dining sets & chairs in Pakistan. 6-seater & 8-seater dining sets with free delivery and assembly.',
};

export default function DiningPage() {
  return <CategoryPage category={CATEGORIES.DINING} />;
}
