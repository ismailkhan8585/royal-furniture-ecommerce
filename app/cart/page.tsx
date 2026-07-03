'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  MessageCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formatPrice } from '@/lib/currency';
import { CURRENCY_SYMBOL, FREE_DELIVERY_THRESHOLD } from '@/lib/constants';
import { toast } from 'sonner';

interface CartItem {
  productId: string;
  productName: string;
  productPhoto: string;
  quantity: number;
  unitPrice: number;
  slug: string;
}

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadCart = () => {
      try {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        setItems(cart);
      } catch {
        setItems([]);
      }
      setLoading(false);
    };

    loadCart();

    const handleUpdate = () => loadCart();
    window.addEventListener('cartUpdated', handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener('cartUpdated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    try {
      const cart = items.map((item) =>
        item.productId === productId
          ? { ...item, quantity: Math.min(99, newQuantity) }
          : item
      );
      localStorage.setItem('cart', JSON.stringify(cart));
      setItems(cart);
      window.dispatchEvent(new Event('cartUpdated'));
    } catch {
      toast.error('Failed to update cart');
    }
  };

  const removeItem = (productId: string) => {
    try {
      const cart = items.filter((item) => item.productId !== productId);
      localStorage.setItem('cart', JSON.stringify(cart));
      setItems(cart);
      window.dispatchEvent(new Event('cartUpdated'));
      toast.success('Item removed from cart');
    } catch {
      toast.error('Failed to remove item');
    }
  };

  const clearCart = () => {
    localStorage.setItem('cart', JSON.stringify([]));
    setItems([]);
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const qualifiesForFreeDelivery = subtotal >= FREE_DELIVERY_THRESHOLD;

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
              <ShoppingCart className="w-8 h-8 text-walnut-700 dark:text-gold-400" />
              <h1 className="font-display text-3xl font-bold text-walnut-800 dark:text-walnut-200">
                Shopping Cart
              </h1>
            </div>
            {items.length > 0 && (
              <Button variant="outline" size="sm" onClick={clearCart}>
                Clear Cart
              </Button>
            )}
          </div>
          <p className="text-walnut-600 dark:text-walnut-400 mt-2">
            {items.length} item{items.length !== 1 ? 's' : ''} in cart
          </p>
        </div>
      </div>

      <div className="container-wide py-8">
        {items.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingCart className="w-16 h-16 text-walnut-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-walnut-700 dark:text-walnut-300 mb-2">
              Your cart is empty
            </h2>
            <p className="text-walnut-500 mb-6">
              Add some items to get started
            </p>
            <Button asChild>
              <Link href="/">Start Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div
                  key={item.productId}
                  className="bg-white dark:bg-walnut-950 rounded-xl p-4 border border-walnut-100 dark:border-walnut-800 flex gap-4"
                >
                  {/* Product Image */}
                  <Link
                    href={`/products/${item.slug}`}
                    className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden"
                  >
                    <img
                      src={item.productPhoto}
                      alt={item.productName}
                      className="w-full h-full object-cover"
                    />
                  </Link>

                  {/* Product Details */}
                  <div className="flex-1">
                    <Link
                      href={`/products/${item.slug}`}
                      className="font-medium text-walnut-800 dark:text-walnut-200 hover:text-gold-600 line-clamp-2 block mb-2"
                    >
                      {item.productName}
                    </Link>
                    <p className="text-walnut-700 dark:text-gold-400 font-bold">
                      {formatPrice(item.unitPrice)}
                    </p>
                  </div>

                  {/* Quantity & Actions */}
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => removeItem(item.productId)}
                      className="text-walnut-400 hover:text-red-500 transition-colors p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        className="w-8 h-8 rounded-lg border border-walnut-200 dark:border-walnut-700 flex items-center justify-center hover:bg-walnut-50 dark:hover:bg-walnut-800"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-10 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        className="w-8 h-8 rounded-lg border border-walnut-200 dark:border-walnut-700 flex items-center justify-center hover:bg-walnut-50 dark:hover:bg-walnut-800"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-sm font-semibold text-walnut-800 dark:text-walnut-200">
                      {formatPrice(item.unitPrice * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}

              {/* Note about inquiry items */}
              <p className="text-sm text-walnut-500 text-center mt-4">
                Price-on-inquiry items are not added to cart. Contact us via WhatsApp for those items.
              </p>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-walnut-950 rounded-xl p-6 border border-walnut-100 dark:border-walnut-800 sticky top-24">
                <h2 className="font-display text-xl font-semibold text-walnut-800 dark:text-walnut-200 mb-4">
                  Order Summary
                </h2>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-walnut-600 dark:text-walnut-400">Subtotal</span>
                    <span className="font-medium text-walnut-800 dark:text-walnut-200">
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-walnut-600 dark:text-walnut-400">Delivery</span>
                    <span className="font-medium text-walnut-800 dark:text-walnut-200">
                      {qualifiesForFreeDelivery ? (
                        <span className="text-green-600">Free</span>
                      ) : (
                        'Calculated at checkout'
                      )}
                    </span>
                  </div>

                  {subtotal < FREE_DELIVERY_THRESHOLD && (
                    <p className="text-xs text-amber-600 bg-amber-50 dark:bg-amber-900/20 p-2 rounded">
                      Add {formatPrice(FREE_DELIVERY_THRESHOLD - subtotal)} more for free delivery
                    </p>
                  )}

                  <div className="border-t border-walnut-100 dark:border-walnut-800 pt-3 flex justify-between">
                    <span className="font-semibold text-walnut-800 dark:text-walnut-200">
                      Estimated Total
                    </span>
                    <span className="font-bold text-lg text-walnut-700 dark:text-gold-400">
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                </div>

                <Button
                  size="lg"
                  className="w-full mt-6 gap-2"
                  onClick={() => router.push('/checkout')}
                >
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4" />
                </Button>

                <div className="mt-4 text-center">
                  <Link
                    href="/"
                    className="text-sm text-walnut-600 dark:text-walnut-400 hover:text-gold-600"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
