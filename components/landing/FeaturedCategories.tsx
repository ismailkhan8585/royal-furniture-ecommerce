import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { CATEGORY_SLUGS, CATEGORY_LABELS, CATEGORIES } from '@/lib/constants';

const categories = [
  {
    key: CATEGORIES.OFFICE,
    name: CATEGORY_LABELS[CATEGORIES.OFFICE],
    href: `/${CATEGORY_SLUGS[CATEGORIES.OFFICE]}`,
    image: 'https://images.pexels.com/photos/195780/pexels-photo-195780.jpeg?w=600',
  },
  {
    key: CATEGORIES.LIVING_ROOM,
    name: CATEGORY_LABELS[CATEGORIES.LIVING_ROOM],
    href: `/${CATEGORY_SLUGS[CATEGORIES.LIVING_ROOM]}`,
    image: 'https://images.pexels.com/photos/1571459/pexels-photo-1571459.jpeg?w=600',
  },
  {
    key: CATEGORIES.BEDROOM,
    name: CATEGORY_LABELS[CATEGORIES.BEDROOM],
    href: `/${CATEGORY_SLUGS[CATEGORIES.BEDROOM]}`,
    image: 'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?w=600',
  },
  {
    key: CATEGORIES.DINING,
    name: CATEGORY_LABELS[CATEGORIES.DINING],
    href: `/${CATEGORY_SLUGS[CATEGORIES.DINING]}`,
    image: 'https://images.pexels.com/photos/245159/pexels-photo-245159.jpeg?w=600',
  },
  {
    key: CATEGORIES.STUDY_KIDS,
    name: CATEGORY_LABELS[CATEGORIES.STUDY_KIDS],
    href: `/${CATEGORY_SLUGS[CATEGORIES.STUDY_KIDS]}`,
    image: 'https://images.pexels.com/photos/1766477/pexels-photo-1766477.jpeg?w=600',
  },
  {
    key: CATEGORIES.OUTDOOR,
    name: CATEGORY_LABELS[CATEGORIES.OUTDOOR],
    href: `/${CATEGORY_SLUGS[CATEGORIES.OUTDOOR]}`,
    image: 'https://images.pexels.com/photos/2029714/pexels-photo-2029714.jpeg?w=600',
  },
  {
    key: CATEGORIES.CUSTOM,
    name: CATEGORY_LABELS[CATEGORIES.CUSTOM],
    href: `/${CATEGORY_SLUGS[CATEGORIES.CUSTOM]}`,
    image: 'https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg?w=600',
  },
];

export function FeaturedCategories() {
  return (
    <section className="py-12 lg:py-16 bg-surface-secondary">
      <div className="container-wide">
        <div className="text-center mb-10">
          <h2 className="section-heading mb-2">Shop by Category</h2>
          <p className="section-subheading">
            Explore our premium furniture collections
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {categories.map((category) => (
            <Link
              key={category.key}
              href={category.href}
              className="group relative aspect-[4/3] rounded-xl overflow-hidden"
            >
              {/* Background Image */}
              <img
                src={category.image}
                alt={category.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-walnut-900/90 via-walnut-900/30 to-transparent" />
              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-end p-4">
                <h3 className="text-white font-display text-lg font-semibold mb-2 text-center">
                  {category.name}
                </h3>
                <span className="flex items-center gap-1 text-gold-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Shop Now <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
