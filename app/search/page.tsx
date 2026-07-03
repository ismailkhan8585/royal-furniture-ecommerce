'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Product } from '@/lib/database.types';
import { ProductCard } from '@/components/products/ProductCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Search, X } from 'lucide-react';

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setSearched(false);
      return;
    }

    setLoading(true);
    setSearched(true);

    try {
      const params = new URLSearchParams({ search: searchQuery });
      const response = await fetch(`/api/products?${params.toString()}`);
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Search failed');
      }

      setResults(result.data || []);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (initialQuery) {
      performSearch(initialQuery);
    }
  }, [initialQuery, performSearch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      performSearch(query.trim());
      // Update URL
      window.history.replaceState({}, '', `/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="min-h-screen bg-surface-secondary">
      {/* Search Header */}
      <div className="bg-white dark:bg-walnut-950 border-b border-walnut-100 dark:border-walnut-800 py-8">
        <div className="container-wide">
          <h1 className="font-display text-3xl font-bold text-walnut-800 dark:text-walnut-200 mb-6">
            Search Products
          </h1>

          <form onSubmit={handleSubmit} className="max-w-2xl">
            <div className="relative">
              <Input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for furniture..."
                className="w-full h-14 pl-12 pr-12 text-lg rounded-xl"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-walnut-400" />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-walnut-400 hover:text-walnut-600"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </form>

          {searched && (
            <p className="mt-4 text-walnut-600 dark:text-walnut-400">
              {loading ? 'Searching...' : `Found ${results.length} product${results.length !== 1 ? 's' : ''}`}
            </p>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="container-wide py-8">
        {!searched && !loading && (
          <div className="text-center py-16">
            <Search className="w-16 h-16 text-walnut-300 mx-auto mb-4" />
            <p className="text-walnut-500 text-lg">
              Enter a search term to find products
            </p>
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-square rounded-xl" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : searched && results.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-walnut-500 text-lg mb-4">
              No products found for &ldquo;{query}&rdquo;
            </p>
            <p className="text-walnut-400 mb-6">
              Try different keywords or browse our categories
            </p>
            <div className="flex items-center justify-center gap-4">
              <Button variant="outline" asChild>
                <Link href="/">Back to Home</Link>
              </Button>
              <Button asChild className="gap-2 bg-green-500 hover:bg-green-600 text-white">
                <a
                  href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/[^0-9]/g, '') || '923001234567'}?text=${encodeURIComponent(`Hi, I'm looking for: ${query}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp Us
                </a>
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {results.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-surface-secondary flex items-center justify-center"><p className="text-walnut-500">Loading...</p></div>}>
      <SearchContent />
    </Suspense>
  );
}
