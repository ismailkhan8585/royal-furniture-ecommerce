import Link from 'next/link';
import { ArrowRight, Ruler } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CustomOrderBanner() {
  return (
    <section className="py-12 lg:py-16 bg-gradient-to-r from-gold-50 via-surface-secondary to-gold-50">
      <div className="container-wide">
        <div className="flex flex-col md:flex-row items-center gap-8 p-8 lg:p-12 rounded-2xl bg-white dark:bg-walnut-900 border border-gold-200 dark:border-gold-800 shadow-lg">
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
            <img
              src="https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg?w=400"
              alt="Custom furniture"
              className="w-full md:w-80 h-64 object-cover rounded-xl shadow-md"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
