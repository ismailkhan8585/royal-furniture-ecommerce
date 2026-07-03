'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingCart, MessageCircle, Eye } from 'lucide-react';
import { Product } from '@/lib/database.types';
import { formatPrice } from '@/lib/currency';
import { CURRENCY_SYMBOL } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export function ProductCard({ product, onQuickView }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if product is in wishlist
    try {
      const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      setIsWishlisted(wishlist.some((item: { productId: string }) => item.productId === product.id));
    } catch {
      setIsWishlisted(false);
    }
  }, [product.id]);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      if (isWishlisted) {
        const newWishlist = wishlist.filter((item: { productId: string }) => item.productId !== product.id);
        localStorage.setItem('wishlist', JSON.stringify(newWishlist));
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
        setIsWishlisted(true);
      }
      window.dispatchEvent(new Event('wishlistUpdated'));
      window.dispatchEvent(new StorageEvent('storage'));
    } catch {
      console.error('Failed to update wishlist');
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
      window.dispatchEvent(new StorageEvent('storage'));
    } catch {
      console.error('Failed to add to cart');
    }
  };

  const isFixedPrice = product.price_type === 'FIXED';
  const isInStock = product.stock_type === 'IN_STOCK' && product.stock > 0;
  const isMadeToOrder = product.stock_type === 'MADE_TO_ORDER';

  const whatsappText = encodeURIComponent(
    `Hi, I'm interested in ${product.name}. Is this available?`
  );

  return (
    <div className="group relative bg-white dark:bg-walnut-950 rounded-xl overflow-hidden border border-walnut-100 dark:border-walnut-800 hover:shadow-lg transition-shadow duration-300">
      {/* Image Container */}
      <Link href={`/products/${product.slug}`} className="block relative aspect-square overflow-hidden">
        {/* Category Badge */}
        <div className="absolute top-3 left-3 z-10">
          <span className="px-2 py-1 text-xs font-medium bg-walnut-700 text-white rounded-full">
            {product.category.replace('_', ' ')}
          </span>
        </div>

        {/* Wishlist Button */}
        <button
          onClick={toggleWishlist}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center transition-colors hover:bg-white"
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
            className="absolute top-14 right-3 z-10 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center transition-colors hover:bg-white opacity-0 group-hover:opacity-100"
          >
            <Eye className="w-4 h-4 text-walnut-600" />
          </button>
        )}

        {/* Product Image */}
        <img
          src={product.photos[0] || '/placeholder.png'}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
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
          <div className="absolute bottom-3 left-3 z-10">
            <span className="px-2 py-1 text-xs font-medium bg-amber-500 text-walnut-900 rounded-full">
              Made to Order
            </span>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-4">
        {/* Product Name */}
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-medium text-walnut-800 dark:text-walnut-200 mb-1 line-clamp-2 hover:text-gold-600 transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Specs */}
        {product.material && (
          <p className="text-sm text-walnut-500 dark:text-walnut-400 mb-2">
            {product.material}
            {product.dimensions && ` | ${product.dimensions}`}
          </p>
        )}

        {/* Price */}
        <div className="mb-3">
          {isFixedPrice && product.price ? (
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-walnut-700 dark:text-gold-400">
                {formatPrice(product.price)}
              </span>
              {product.compare_price && product.compare_price > product.price && (
                <span className="text-sm text-walnut-400 line-through">
                  {formatPrice(product.compare_price)}
                </span>
              )}
            </div>
          ) : (
            <span className="px-2 py-1 text-sm font-medium bg-gold-100 text-gold-700 rounded-full">
              Price on Inquiry
            </span>
          )}
        </div>

        {/* Stock Status */}
        <div className="flex items-center gap-2 mb-3">
          {isInStock && (
            <span className="flex items-center gap-1 text-sm text-green-600">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              In Stock
            </span>
          )}
          {isMadeToOrder && (
            <span className="flex items-center gap-1 text-sm text-amber-600">
              <span className="w-2 h-2 bg-amber-500 rounded-full" />
              Made to Order
            </span>
          )}
        </div>

        {/* Action Button */}
        {isFixedPrice && product.price ? (
          <Button
            onClick={addToCart}
            disabled={!isInStock && !isMadeToOrder}
            className="w-full gap-2 bg-walnut-600 hover:bg-walnut-700 text-white"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </Button>
        ) : (
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/[^0-9]/g, '') || '923001234567'}?text=${whatsappText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full"
          >
            <Button className="w-full gap-2 bg-green-500 hover:bg-green-600 text-white">
              <MessageCircle className="w-4 h-4" />
              WhatsApp for Price
            </Button>
          </a>
        )}
      </div>
    </div>
  );
}
