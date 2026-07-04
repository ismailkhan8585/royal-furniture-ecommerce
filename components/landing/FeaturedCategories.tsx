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
    <section className="bg-surface-secondary py-10 pb-14 lg:py-16">
      <div className="container-wide">
        <div className="mb-8 text-center lg:mb-10">
          <h2 className="section-heading mb-2">Shop by Category</h2>
          <p className="section-subheading">
            Explore our premium furniture collections
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 min-[380px]:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
          {categories.map((category) => (
            <Link
              key={category.key}
              href={category.href}
              className="group relative min-h-[170px] overflow-hidden rounded-xl shadow-sm ring-1 ring-walnut-900/5 min-[380px]:aspect-[4/5] sm:aspect-[4/3] sm:min-h-0 lg:aspect-[4/3] lg:rounded-lg"
            >
              {/* Background Image */}
              <Image
                src={category.image}
                alt={category.name}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 380px) 50vw, 100vw"
                className="object-cover object-center transition-transform duration-500 group-hover:scale-110"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-walnut-950/95 via-walnut-900/45 to-walnut-900/5 lg:from-walnut-900/90 lg:via-walnut-900/30 lg:to-transparent" />
              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-start justify-end p-3.5 sm:p-4 lg:items-center">
                <h3 className="mb-2 text-left font-display text-base font-semibold leading-tight text-white drop-shadow-sm sm:text-lg lg:text-center">
                  {category.name}
                </h3>
                <span className="flex items-center gap-1 text-sm font-medium text-gold-300 opacity-100 transition-opacity duration-300 lg:text-gold-400 lg:opacity-0 lg:group-hover:opacity-100">
                  Shop Now <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
