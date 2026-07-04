'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingCart, MessageCircle, Eye } from 'lucide-react';
import { Product } from '@/lib/database.types';
import { formatPrice } from '@/lib/currency';
import { FALLBACK_IMAGE } from '@/lib/media';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

let wishlistIdsCache: Set<string> | null = null;

function getWishlistIds() {
  if (wishlistIdsCache) {
    return wishlistIdsCache;
  }

  try {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    wishlistIdsCache = new Set(
      wishlist.map((item: { productId: string }) => item.productId)
    );
  } catch {
    wishlistIdsCache = new Set();
  }

  return wishlistIdsCache;
}

function invalidateWishlistCache() {
  wishlistIdsCache = null;
}

export function ProductCard({ product, onQuickView }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageSrc, setImageSrc] = useState(product.photos[0] || FALLBACK_IMAGE);

  useEffect(() => {
    setIsWishlisted(getWishlistIds().has(product.id));
  }, [product.id]);

  useEffect(() => {
    setImageSrc(product.photos[0] || FALLBACK_IMAGE);
  }, [product.photos]);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      if (isWishlisted) {
        const newWishlist = wishlist.filter((item: { productId: string }) => item.productId !== product.id);
        localStorage.setItem('wishlist', JSON.stringify(newWishlist));
        invalidateWishlistCache();
        setIsWishlisted(false);
      } else {
        wishlist.push({
          productId: product.id,
          productName: product.name,
          productPhoto: product.photos[0],
          price: product.price,
          priceType: product.price_type,
          slug: product.slug,
          addedAt: new Date().toISOString(),
        });
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        invalidateWishlistCache();
        setIsWishlisted(true);
      }
      window.dispatchEvent(new Event('wishlistUpdated'));
    } catch {
      setIsWishlisted(false);
    }
  };

  const addToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (product.price_type !== 'FIXED' || !product.price) return;

    try {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const existingItem = cart.find((item: { productId: string }) => item.productId === product.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({
          productId: product.id,
          productName: product.name,
          productPhoto: product.photos[0],
          quantity: 1,
          unitPrice: product.price,
          slug: product.slug,
        });
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      window.dispatchEvent(new Event('cartUpdated'));
    } catch {
      return;
    }
  };

  const isFixedPrice = product.price_type === 'FIXED';
  const isInStock = product.stock_type === 'IN_STOCK' && product.stock > 0;
  const isMadeToOrder = product.stock_type === 'MADE_TO_ORDER';

  const whatsappText = encodeURIComponent(
    `Hi, I'm interested in ${product.name}. Is this available?`
  );

  return (
    <div className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-lg border border-walnut-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg dark:border-walnut-800 dark:bg-walnut-950">
      {/* Image Container */}
      <Link href={`/products/${product.slug}`} className="block relative aspect-square overflow-hidden">
        {/* Category Badge */}
        <div className="absolute left-2 top-2 z-10 sm:left-3 sm:top-3">
          <span className="block max-w-[calc(100vw-5rem)] truncate rounded-full bg-walnut-700 px-2 py-1 text-[10px] font-medium uppercase leading-none text-white min-[420px]:max-w-[7rem] sm:max-w-[9rem] sm:text-xs">
            {product.category.replace('_', ' ')}
          </span>
        </div>

        {/* Wishlist Button */}
        <button
          onClick={toggleWishlist}
          className="absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/85 backdrop-blur-sm transition-colors hover:bg-white sm:right-3 sm:top-3"
        >
          <Heart
            className={cn(
              'w-4 h-4 transition-colors',
              isWishlisted ? 'fill-red-500 text-red-500' : 'text-walnut-600'
            )}
          />
        </button>

        {/* Quick View Button */}
        {onQuickView && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onQuickView(product);
            }}
            className="absolute right-2 top-12 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/85 opacity-0 backdrop-blur-sm transition-colors hover:bg-white group-hover:opacity-100 sm:right-3 sm:top-14"
          >
            <Eye className="w-4 h-4 text-walnut-600" />
          </button>
        )}

        {/* Product Image */}
        <Image
          src={imageSrc}
          alt={product.name}
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 768px) 33vw, (min-width: 420px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          onError={() => setImageSrc(FALLBACK_IMAGE)}
        />

        {/* Stock Badge */}
        {!isInStock && !isMadeToOrder && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="px-3 py-1.5 bg-red-500 text-white text-sm font-medium rounded-lg">
              Out of Stock
            </span>
          </div>
        )}
        {isMadeToOrder && (
          <div className="absolute bottom-2 left-2 z-10 sm:bottom-3 sm:left-3">
            <span className="block max-w-[9rem] truncate rounded-full bg-amber-500 px-2 py-1 text-[10px] font-medium leading-none text-walnut-900 sm:text-xs">
              Made to Order
            </span>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col p-3 sm:p-4">
        {/* Product Name */}
        <Link href={`/products/${product.slug}`}>
          <h3 className="mb-1 line-clamp-2 min-h-[2.5rem] text-sm font-medium leading-snug text-walnut-800 transition-colors hover:text-gold-600 dark:text-walnut-200 sm:min-h-[2.75rem] sm:text-base">
            {product.name}
          </h3>
        </Link>

        {/* Specs */}
        {product.material && (
          <p className="mb-2 line-clamp-2 min-h-[2.25rem] text-xs leading-snug text-walnut-500 dark:text-walnut-400 sm:min-h-[2.5rem] sm:text-sm">
            {product.material}
            {product.dimensions && ` | ${product.dimensions}`}
          </p>
        )}

        {/* Price */}
        <div className="mb-3 min-w-0">
          {isFixedPrice && product.price ? (
            <div className="flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-1">
              <span className="text-lg font-bold leading-tight text-walnut-700 dark:text-gold-400 sm:text-xl">
                {formatPrice(product.price)}
              </span>
              {product.compare_price && product.compare_price > product.price && (
                <span className="text-xs text-walnut-400 line-through sm:text-sm">
                  {formatPrice(product.compare_price)}
                </span>
              )}
            </div>
          ) : (
            <span className="inline-flex max-w-full rounded-full bg-gold-100 px-2 py-1 text-xs font-medium text-gold-700 sm:text-sm">
              Price on Inquiry
            </span>
          )}
        </div>

        {/* Stock Status */}
        <div className="mb-3 flex min-h-[1.25rem] items-center gap-2">
          {isInStock && (
            <span className="flex items-center gap-1 text-xs text-green-600 sm:text-sm">
              <span className="h-2 w-2 flex-shrink-0 rounded-full bg-green-500" />
              In Stock
            </span>
          )}
          {isMadeToOrder && (
            <span className="flex items-center gap-1 text-xs text-amber-600 sm:text-sm">
              <span className="h-2 w-2 flex-shrink-0 rounded-full bg-amber-500" />
              Made to Order
            </span>
          )}
        </div>

        {/* Action Button */}
        {isFixedPrice && product.price ? (
          <Button
            onClick={addToCart}
            disabled={!isInStock && !isMadeToOrder}
            className="mt-auto w-full gap-1.5 px-2 text-xs bg-walnut-600 hover:bg-walnut-700 text-white sm:gap-2 sm:px-4 sm:text-sm"
          >
            <ShoppingCart className="h-4 w-4 flex-shrink-0" />
            <span className="truncate">Add to Cart</span>
          </Button>
        ) : (
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/[^0-9]/g, '') || '923001234567'}?text=${whatsappText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto flex w-full"
          >
            <Button className="mt-auto w-full gap-1.5 px-2 text-xs bg-green-500 hover:bg-green-600 text-white sm:gap-2 sm:px-4 sm:text-sm">
              <MessageCircle className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">WhatsApp for Price</span>
            </Button>
          </a>
        )}
      </div>
    </div>
  );
}
