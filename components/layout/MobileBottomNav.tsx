'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, Heart, ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Search', href: '/search', icon: Search },
  { name: 'Wishlist', href: '/wishlist', icon: Heart },
  { name: 'Cart', href: '/cart', icon: ShoppingCart },
];

export function MobileBottomNav() {
  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const updateCounts = () => {
      try {
        const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
        setWishlistCount(wishlist.length);
      } catch {
        setWishlistCount(0);
      }

      try {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        setCartCount(
          cart.reduce(
            (sum: number, item: { quantity: number }) => sum + item.quantity,
            0
          )
        );
      } catch {
        setCartCount(0);
      }
    };

    updateCounts();
    window.addEventListener('storage', updateCounts);

    // Custom event for cart updates within same tab
    const handleCartUpdate = () => updateCounts();
    window.addEventListener('cartUpdated', handleCartUpdate);
    window.addEventListener('wishlistUpdated', handleCartUpdate);

    return () => {
      window.removeEventListener('storage', updateCounts);
      window.removeEventListener('cartUpdated', handleCartUpdate);
      window.removeEventListener('wishlistUpdated', handleCartUpdate);
    };
  }, []);

  const getItemCount = (name: string) => {
    if (name === 'Wishlist') return wishlistCount;
    if (name === 'Cart') return cartCount;
    return 0;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-walnut-100 bg-white/95 shadow-[0_-8px_24px_rgba(38,24,14,0.08)] backdrop-blur-md [padding-bottom:env(safe-area-inset-bottom)] dark:border-walnut-800 dark:bg-walnut-950/95 lg:hidden">
      <div className="flex h-16 items-center justify-around px-2">
        {navItems.map((item) => {
          const isActive =
            item.href === '/'
              ? pathname === '/'
              : pathname.startsWith(item.href);
          const count = getItemCount(item.name);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'relative flex h-full flex-1 flex-col items-center justify-center rounded-lg transition-colors',
                isActive
                  ? 'text-walnut-800 dark:text-gold-400'
                  : 'text-walnut-500 hover:text-walnut-700 dark:text-walnut-400 dark:hover:text-walnut-200'
              )}
            >
              <div className="relative">
                <Icon className="w-5 h-5" />
                {count > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] bg-walnut-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                    {count > 99 ? '99+' : count}
                  </span>
                )}
              </div>
              <span className="mt-1 text-[10px] font-medium leading-none">{item.name}</span>
              {isActive && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-walnut-600 dark:bg-gold-400 rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
