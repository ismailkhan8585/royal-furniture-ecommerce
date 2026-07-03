import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Ruler } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MEDIA } from '@/lib/media';

export function CustomOrderBanner() {
  return (
    <section className="py-12 lg:py-16 bg-gradient-to-r from-gold-50 via-surface-secondary to-gold-50">
      <div className="container-wide">
        <div className="flex flex-col items-center gap-8 rounded-lg border border-gold-200 bg-white p-6 shadow-lg dark:border-gold-800 dark:bg-walnut-900 md:flex-row lg:p-10">
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-100 dark:bg-gold-900 text-gold-700 dark:text-gold-300 text-sm font-medium mb-4">
              <Ruler className="w-4 h-4" />
              Custom Furniture
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-walnut-800 dark:text-walnut-200 mb-3">
              Can&apos;t find what you&apos;re looking for?
            </h2>
            <p className="text-walnut-600 dark:text-walnut-400 text-lg mb-6 max-w-xl">
              We build it for you. Custom-made furniture designed to your exact specifications,
              delivered across Pakistan.
            </p>
            <Link href="/custom-orders">
              <Button size="lg" className="gap-2 bg-gold-500 hover:bg-gold-600 text-walnut-900">
                Request Custom Order
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
          <div className="flex-shrink-0 w-full md:w-auto">
            <div className="relative h-64 w-full overflow-hidden rounded-lg shadow-md md:w-80">
              <Image
                src={MEDIA.receptionDesk}
                alt="Custom reception desk and made-to-order furniture"
                fill
                sizes="(min-width: 768px) 320px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
