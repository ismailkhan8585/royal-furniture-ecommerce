import { Metadata } from 'next';
import { CategoryPage } from '@/components/products/CategoryPage';
import { CATEGORY_LABELS, CATEGORIES } from '@/lib/constants';

export const metadata: Metadata = {
  title: `${CATEGORY_LABELS[CATEGORIES.OFFICE]} | Royal Furniture`,
  description:
    'Shop premium office furniture in Pakistan. Executive chairs, office desks, conference tables, filing cabinets & more. Quality craftsmanship with nationwide delivery.',
};

export default function OfficeFurniturePage() {
  return <CategoryPage category={CATEGORIES.OFFICE} />;
}
