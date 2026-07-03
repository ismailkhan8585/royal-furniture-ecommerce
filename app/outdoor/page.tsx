import { Metadata } from 'next';
import { CategoryPage } from '@/components/products/CategoryPage';
import { CATEGORY_LABELS, CATEGORIES } from '@/lib/constants';

export const metadata: Metadata = {
  title: `${CATEGORY_LABELS[CATEGORIES.OUTDOOR]} | Royal Furniture`,
  description:
    'Shop outdoor & garden furniture in Pakistan. Garden swings, patio sets, outdoor chairs with weather-resistant materials.',
};

export default function OutdoorPage() {
  return <CategoryPage category={CATEGORIES.OUTDOOR} />;
}
