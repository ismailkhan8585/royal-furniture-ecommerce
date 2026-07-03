import { Metadata } from 'next';
import { CategoryPage } from '@/components/products/CategoryPage';
import { CATEGORY_LABELS, CATEGORIES } from '@/lib/constants';

export const metadata: Metadata = {
  title: `${CATEGORY_LABELS[CATEGORIES.STUDY_KIDS]} | Royal Furniture`,
  description:
    'Shop study tables, bookshelves & kids furniture in Pakistan. Student desks, kids study sets with free delivery across Pakistan.',
};

export default function StudyKidsPage() {
  return <CategoryPage category={CATEGORIES.STUDY_KIDS} />;
}
