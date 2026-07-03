import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ProductCard } from '@/components/products/ProductCard';
import { Product } from '@/lib/database.types';
import { Button } from '@/components/ui/button';

interface BestsellersProps {
  products: Product[];
}

export function Bestsellers({ products }: BestsellersProps) {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className="py-12 lg:py-16">
      <div className="container-wide">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="section-heading mb-2">Bestselling Products</h2>
            <p className="section-subheading">
              Our most popular furniture pieces
            </p>
          </div>
          <Link href="/products">
            <Button variant="outline" className="gap-2">
              View All
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {products.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function NewArrivals({ products }: BestsellersProps) {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className="py-12 lg:py-16 bg-surface-secondary">
      <div className="container-wide">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="section-heading mb-2">New Arrivals</h2>
            <p className="section-subheading">
              Fresh additions to our collection
            </p>
          </div>
          <Link href="/products?sort=newest">
            <Button variant="outline" className="gap-2">
              View All
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {products.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function OfficeSpotlight({ products }: BestsellersProps) {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className="py-12 lg:py-16 bg-gradient-to-br from-walnut-800 to-walnut-900 text-white">
      <div className="container-wide">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">
              Office Furniture Spotlight
            </h2>
            <p className="text-walnut-300 text-lg">
              Premium workspaces start here
            </p>
          </div>
          <Link href="/office-furniture">
            <Button
              variant="outline"
              className="gap-2 border-gold-500 text-gold-400 hover:bg-gold-500 hover:text-walnut-900"
            >
              Shop Office
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {products.slice(0, 6).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
