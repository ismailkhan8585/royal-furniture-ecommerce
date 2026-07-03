'use client';

import { useRef, useState, useEffect } from 'react';
import { Category, Product } from '@/lib/database.types';
import { CATEGORY_LABELS, MATERIALS } from '@/lib/constants';
import { CATEGORY_IMAGES } from '@/lib/media';
import { ProductCard } from './ProductCard';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Skeleton } from '@/components/ui/skeleton';
import { SlidersHorizontal } from 'lucide-react';
import { SafeImage } from '@/components/shared/SafeImage';

interface CategoryPageProps {
  category?: Category;
  title?: string;
  description?: string;
  initialProducts?: Product[];
}

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
];

export function CategoryPage({
  category,
  title,
  description,
  initialProducts = [],
}: CategoryPageProps) {
  const didHydrate = useRef(false);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500000]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [priceTypeFilter, setPriceTypeFilter] = useState<'ALL' | 'FIXED' | 'INQUIRY'>('ALL');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  useEffect(() => {
    if (!didHydrate.current) {
      didHydrate.current = true;
      return;
    }

    const controller = new AbortController();

    async function fetchProducts() {
      setLoading(true);

      try {
        const params = new URLSearchParams({
          sortBy,
          priceType: priceTypeFilter,
          inStockOnly: String(inStockOnly),
          priceMin: String(priceRange[0]),
          priceMax: String(priceRange[1]),
        });

        if (category) {
          params.set('category', category);
        }

        if (selectedMaterials.length > 0) {
          params.set('materials', selectedMaterials.join(','));
        }

        const response = await fetch(`/api/products?${params.toString()}`, {
          signal: controller.signal,
        });
        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.error || 'Failed to fetch products');
        }

        setProducts(result.data || []);
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }
        setProducts([]);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchProducts();

    return () => controller.abort();
  }, [category, sortBy, priceTypeFilter, inStockOnly, selectedMaterials, priceRange]);

  const toggleMaterial = (material: string) => {
    setSelectedMaterials((prev) =>
      prev.includes(material)
        ? prev.filter((m) => m !== material)
        : [...prev, material]
    );
  };

  const clearFilters = () => {
    setPriceRange([0, 500000]);
    setSelectedMaterials([]);
    setPriceTypeFilter('ALL');
    setInStockOnly(false);
    setSortBy('featured');
  };

  const hasActiveFilters =
    priceRange[0] > 0 ||
    priceRange[1] < 500000 ||
    selectedMaterials.length > 0 ||
    priceTypeFilter !== 'ALL' ||
    inStockOnly;

  const pageTitle = title || (category ? CATEGORY_LABELS[category] : 'All Furniture');
  const pageDescription =
    description ||
    (category
      ? `Explore our premium ${CATEGORY_LABELS[category].toLowerCase()} collection`
      : 'Explore every Royal Furniture collection in one place');
  const heroImage = category ? CATEGORY_IMAGES[category] : CATEGORY_IMAGES.LIVING_ROOM;

  return (
    <div className="min-h-screen bg-surface-secondary">
      {/* Header */}
      <div className="relative overflow-hidden bg-walnut-900 py-14 text-white">
        <SafeImage
          src={heroImage}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-walnut-950 via-walnut-900/80 to-walnut-900/35" />
        <div className="container-wide relative">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-gold-300">
            Royal Furniture Collection
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-2">
            {pageTitle}
          </h1>
          <p className="max-w-2xl text-walnut-200 text-lg">
            {pageDescription}
          </p>
        </div>
      </div>

      <div className="container-wide py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              <div className="bg-white dark:bg-walnut-950 rounded-xl p-6 border border-walnut-100 dark:border-walnut-800">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-walnut-800 dark:text-walnut-200">
                    Filters
                  </h3>
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="text-sm text-gold-600 hover:text-gold-700"
                    >
                      Clear all
                    </button>
                  )}
                </div>

                {/* Price Type */}
                <div className="mb-6">
                  <Label className="text-sm font-medium text-walnut-700 dark:text-walnut-300 mb-2 block">
                    Price Type
                  </Label>
                  <div className="space-y-2">
                    {['ALL', 'FIXED', 'INQUIRY'].map((type) => (
                      <label
                        key={type}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="priceType"
                          checked={priceTypeFilter === type}
                          onChange={() => setPriceTypeFilter(type as typeof priceTypeFilter)}
                          className="w-4 h-4 text-walnut-600"
                        />
                        <span className="text-sm text-walnut-600 dark:text-walnut-400">
                          {type === 'ALL'
                            ? 'All'
                            : type === 'FIXED'
                              ? 'Fixed Price'
                              : 'Price on Inquiry'}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* In Stock Only */}
                <div className="mb-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <Switch
                      checked={inStockOnly}
                      onCheckedChange={setInStockOnly}
                    />
                    <span className="text-sm text-walnut-600 dark:text-walnut-400">
                      In Stock Only
                    </span>
                  </label>
                </div>

                {/* Materials */}
                <div className="mb-6">
                  <Label className="text-sm font-medium text-walnut-700 dark:text-walnut-300 mb-2 block">
                    Material
                  </Label>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {MATERIALS.slice(0, 8).map((material) => (
                      <label
                        key={material}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selectedMaterials.includes(material)}
                          onChange={() => toggleMaterial(material)}
                          className="w-4 h-4 rounded text-walnut-600"
                        />
                        <span className="text-sm text-walnut-600 dark:text-walnut-400">
                          {material}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="lg:hidden gap-2"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Filters
                  {hasActiveFilters && (
                    <span className="w-5 h-5 rounded-full bg-walnut-600 text-white text-xs flex items-center justify-center">
                      !
                    </span>
                  )}
                </Button>
                <p className="text-sm text-walnut-600 dark:text-walnut-400">
                  {loading ? 'Loading...' : `${products.length} products`}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Label className="text-sm text-walnut-600 dark:text-walnut-400">
                  Sort by:
                </Label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SORT_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Mobile Filters */}
            {showFilters && (
              <div className="lg:hidden bg-white dark:bg-walnut-950 rounded-xl p-4 mb-6 border border-walnut-100 dark:border-walnut-800">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Price Type</Label>
                    <Select
                      value={priceTypeFilter}
                      onValueChange={(v) =>
                        setPriceTypeFilter(v as typeof priceTypeFilter)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ALL">All</SelectItem>
                        <SelectItem value="FIXED">Fixed Price</SelectItem>
                        <SelectItem value="INQUIRY">Price on Inquiry</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Availability</Label>
                    <label className="flex items-center gap-2 cursor-pointer mt-2">
                      <Switch
                        checked={inStockOnly}
                        onCheckedChange={setInStockOnly}
                      />
                      <span className="text-sm">In Stock Only</span>
                    </label>
                  </div>
                </div>
                {hasActiveFilters && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="mt-4"
                  >
                    Clear all filters
                  </Button>
                )}
              </div>
            )}

            {/* Products Grid */}
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="aspect-square rounded-xl" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-walnut-500 text-lg mb-4">No products found</p>
                <Button variant="outline" onClick={clearFilters}>
                  Clear filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
