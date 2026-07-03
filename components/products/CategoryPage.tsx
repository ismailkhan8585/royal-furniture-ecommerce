'use client';

import { useState, useEffect, useMemo } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Product } from '@/lib/database.types';
import { Category } from '@/lib/types';
import { CATEGORY_LABELS, CURRENCY_SYMBOL, MATERIALS } from '@/lib/constants';
import { ProductCard } from './ProductCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { ChevronDown, ChevronUp, SlidersHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CategoryPageProps {
  category: Category;
}

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
];

export function CategoryPage({ category }: CategoryPageProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500000]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [priceTypeFilter, setPriceTypeFilter] = useState<'ALL' | 'FIXED' | 'INQUIRY'>('ALL');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const pageSize = 24;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

  // Fetch products
  useEffect(() => {
    async function fetchProducts() {
      if (!supabaseUrl || !supabaseKey) {
        setLoading(false);
        return;
      }

      setLoading(true);
      const supabase = createClient(supabaseUrl, supabaseKey);

      let query = supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .eq('category', category);

      // Apply filters
      if (priceTypeFilter !== 'ALL') {
        query = query.eq('price_type', priceTypeFilter);
      }

      if (inStockOnly) {
        query = query.eq('stock_type', 'IN_STOCK');
      }

      if (selectedMaterials.length > 0) {
        query = query.in('material', selectedMaterials);
      }

      // Apply sorting
      switch (sortBy) {
        case 'newest':
          query = query.order('created_at', { ascending: false });
          break;
        case 'price_asc':
          query = query.order('price', { ascending: true, nullsFirst: false });
          break;
        case 'price_desc':
          query = query.order('price', { ascending: false, nullsFirst: true });
          break;
        default:
          query = query.order('featured', { ascending: false });
      }

      const { data, error } = await query.limit(100);

      if (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      } else {
        // Filter by price range on client side (for fixed price items)
        let filtered = data || [];
        if (priceRange[0] > 0 || priceRange[1] < 500000) {
          filtered = filtered.filter((p) => {
            if (p.price_type === 'INQUIRY') return true; // Show inquiry items regardless
            if (!p.price) return true;
            return p.price >= priceRange[0] && p.price <= priceRange[1];
          });
        }
        setProducts(filtered);
      }

      setLoading(false);
    }

    fetchProducts();
  }, [category, sortBy, priceTypeFilter, inStockOnly, selectedMaterials, priceRange, supabaseUrl, supabaseKey]);

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

  return (
    <div className="min-h-screen bg-surface-secondary">
      {/* Header */}
      <div className="bg-gradient-to-br from-walnut-800 to-walnut-900 text-white py-12">
        <div className="container-wide">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-2">
            {CATEGORY_LABELS[category]}
          </h1>
          <p className="text-walnut-300 text-lg">
            Explore our premium {CATEGORY_LABELS[category].toLowerCase()} collection
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
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-columns-3 xl:grid-cols-4 gap-4 lg:gap-6">
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
