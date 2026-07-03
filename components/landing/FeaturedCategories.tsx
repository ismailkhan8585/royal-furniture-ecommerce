import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { CATEGORY_SLUGS, CATEGORY_LABELS, CATEGORIES } from '@/lib/constants';
import { CATEGORY_IMAGES } from '@/lib/media';

const categories = [
  {
    key: CATEGORIES.OFFICE,
    name: CATEGORY_LABELS[CATEGORIES.OFFICE],
    href: `/${CATEGORY_SLUGS[CATEGORIES.OFFICE]}`,
    image: CATEGORY_IMAGES[CATEGORIES.OFFICE],
  },
  {
    key: CATEGORIES.LIVING_ROOM,
    name: CATEGORY_LABELS[CATEGORIES.LIVING_ROOM],
    href: `/${CATEGORY_SLUGS[CATEGORIES.LIVING_ROOM]}`,
    image: CATEGORY_IMAGES[CATEGORIES.LIVING_ROOM],
  },
  {
    key: CATEGORIES.BEDROOM,
    name: CATEGORY_LABELS[CATEGORIES.BEDROOM],
    href: `/${CATEGORY_SLUGS[CATEGORIES.BEDROOM]}`,
    image: CATEGORY_IMAGES[CATEGORIES.BEDROOM],
  },
  {
    key: CATEGORIES.DINING,
    name: CATEGORY_LABELS[CATEGORIES.DINING],
    href: `/${CATEGORY_SLUGS[CATEGORIES.DINING]}`,
    image: CATEGORY_IMAGES[CATEGORIES.DINING],
  },
  {
    key: CATEGORIES.STUDY_KIDS,
    name: CATEGORY_LABELS[CATEGORIES.STUDY_KIDS],
    href: `/${CATEGORY_SLUGS[CATEGORIES.STUDY_KIDS]}`,
    image: CATEGORY_IMAGES[CATEGORIES.STUDY_KIDS],
  },
  {
    key: CATEGORIES.OUTDOOR,
    name: CATEGORY_LABELS[CATEGORIES.OUTDOOR],
    href: `/${CATEGORY_SLUGS[CATEGORIES.OUTDOOR]}`,
    image: CATEGORY_IMAGES[CATEGORIES.OUTDOOR],
  },
  {
    key: CATEGORIES.CUSTOM,
    name: CATEGORY_LABELS[CATEGORIES.CUSTOM],
    href: `/${CATEGORY_SLUGS[CATEGORIES.CUSTOM]}`,
    image: CATEGORY_IMAGES[CATEGORIES.CUSTOM],
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
              className="group relative aspect-[4/3] overflow-hidden rounded-lg shadow-sm ring-1 ring-walnut-900/5"
            >
              {/* Background Image */}
              <Image
                src={category.image}
                alt={category.name}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
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
