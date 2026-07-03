'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Heart, Trash2, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/currency';
import { SafeImage } from '@/components/shared/SafeImage';

interface WishlistItem {
  productId: string;
  productName: string;
  productPhoto: string;
  price?: number;
  priceType: string;
  slug: string;
  addedAt: string;
}

export default function WishlistPage() {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadWishlist = () => {
      try {
        const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
        setItems(wishlist);
      } catch {
        setItems([]);
      }
      setLoading(false);
    };

    loadWishlist();

    const handleUpdate = () => loadWishlist();
    window.addEventListener('wishlistUpdated', handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener('wishlistUpdated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const removeItem = (productId: string) => {
    try {
      const wishlist = items.filter((item) => item.productId !== productId);
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      setItems(wishlist);
      window.dispatchEvent(new Event('wishlistUpdated'));
    } catch {
      // Handle error silently
    }
  };

  const addToCart = (item: WishlistItem) => {
    if (item.priceType !== 'FIXED' || !item.price) return;

    try {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const existingItem = cart.find(
        (i: { productId: string }) => i.productId === item.productId
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({
          productId: item.productId,
          productName: item.productName,
          productPhoto: item.productPhoto,
          quantity: 1,
          unitPrice: item.price,
          slug: item.slug,
        });
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      window.dispatchEvent(new Event('cartUpdated'));

      // Remove from wishlist after adding to cart
      removeItem(item.productId);
    } catch {
      // Handle error silently
    }
  };

  const clearWishlist = () => {
    localStorage.setItem('wishlist', JSON.stringify([]));
    setItems([]);
    window.dispatchEvent(new Event('wishlistUpdated'));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-surface-secondary py-8">
        <div className="container-wide">
          <p className="text-walnut-500">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-secondary">
      {/* Header */}
      <div className="bg-white dark:bg-walnut-950 border-b border-walnut-100 dark:border-walnut-800 py-8">
        <div className="container-wide">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Heart className="w-8 h-8 text-gold-500" />
              <h1 className="font-display text-3xl font-bold text-walnut-800 dark:text-walnut-200">
                My Wishlist
              </h1>
            </div>
            {items.length > 0 && (
              <Button variant="outline" size="sm" onClick={clearWishlist}>
                Clear All
              </Button>
            )}
          </div>
          <p className="text-walnut-600 dark:text-walnut-400 mt-2">
            {items.length} item{items.length !== 1 ? 's' : ''} saved
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container-wide py-8">
        {items.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="w-16 h-16 text-walnut-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-walnut-700 dark:text-walnut-300 mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-walnut-500 mb-6">
              Start browsing and save items you love
            </p>
            <Button asChild>
              <Link href="/">Start Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <div
                key={item.productId}
                className="bg-white dark:bg-walnut-950 rounded-xl overflow-hidden border border-walnut-100 dark:border-walnut-800 shadow-sm"
              >
                <Link href={`/products/${item.slug}`}>
                  <SafeImage
                    src={item.productPhoto}
                    alt={item.productName}
                    width={600}
                    height={600}
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="aspect-square w-full object-cover"
                  />
                </Link>

                <div className="p-4">
                  <Link
                    href={`/products/${item.slug}`}
                    className="font-medium text-walnut-800 dark:text-walnut-200 hover:text-gold-600 line-clamp-2 block mb-2"
                  >
                    {item.productName}
                  </Link>

                  {item.priceType === 'FIXED' && item.price ? (
                    <p className="text-lg font-bold text-walnut-700 dark:text-gold-400 mb-3">
                      {formatPrice(item.price)}
                    </p>
                  ) : (
                    <span className="px-2 py-1 text-sm font-medium bg-gold-100 text-gold-700 rounded-full inline-block mb-3">
                      Price on Inquiry
                    </span>
                  )}

                  <div className="flex items-center gap-2">
                    {item.priceType === 'FIXED' && item.price && (
                      <Button
                        size="sm"
                        onClick={() => addToCart(item)}
                        className="flex-1 gap-1"
                      >
                        <ShoppingBag className="w-4 h-4" />
                        Add to Cart
                      </Button>
                    )}
                    {item.priceType === 'INQUIRY' && (
                      <Button
                        size="sm"
                        asChild
                        className="flex-1 gap-1 bg-green-500 hover:bg-green-600"
                      >
                        <a
                          href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/[^0-9]/g, '') || '923001234567'}?text=${encodeURIComponent(`Hi, I'm interested in ${item.productName}`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          WhatsApp
                        </a>
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeItem(item.productId)}
                      className="text-red-500 hover:text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
