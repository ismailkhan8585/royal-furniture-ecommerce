'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Search,
  Heart,
  ShoppingCart,
  MessageCircle,
  Menu,
} from 'lucide-react';
import { Logo, LogoCompact } from '@/components/shared/Logo';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const navigation = [
  { name: 'Office Furniture', href: '/office-furniture' },
  { name: 'Living Room', href: '/living-room' },
  { name: 'Bedroom', href: '/bedroom' },
  { name: 'Dining', href: '/dining' },
  { name: 'Custom Orders', href: '/custom-orders' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    let frame = 0;

    const handleScroll = () => {
      if (frame) return;

      frame = window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 20);
        frame = 0;
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
        setCartCount(cart.reduce((sum: number, item: { quantity: number }) => sum + item.quantity, 0));
      } catch {
        setCartCount(0);
      }
    };

    updateCounts();

    window.addEventListener('storage', updateCounts);
    window.addEventListener('cartUpdated', updateCounts);
    window.addEventListener('wishlistUpdated', updateCounts);

    return () => {
      window.removeEventListener('storage', updateCounts);
      window.removeEventListener('cartUpdated', updateCounts);
      window.removeEventListener('wishlistUpdated', updateCounts);
    };
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white/95 dark:bg-walnut-950/95 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      )}
    >
      <nav className="container-wide">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Logo className="hidden lg:flex" />
            <LogoCompact className="lg:hidden" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                  pathname === item.href || pathname.startsWith(item.href + '/')
                    ? 'text-walnut-700 bg-walnut-50 dark:text-walnut-300 dark:bg-walnut-900'
                    : 'text-walnut-600 hover:text-walnut-800 hover:bg-walnut-50/50 dark:text-walnut-400 dark:hover:text-walnut-200'
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right side icons */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Search */}
            <Link
              href="/search"
              className="hidden lg:flex p-2 rounded-lg text-walnut-600 hover:text-walnut-800 hover:bg-walnut-50 dark:text-walnut-400 dark:hover:text-walnut-200 dark:hover:bg-walnut-900 transition-colors"
            >
              <Search className="w-5 h-5" />
              <span className="sr-only">Search</span>
            </Link>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="hidden lg:flex relative p-2 rounded-lg text-walnut-600 hover:text-walnut-800 hover:bg-walnut-50 dark:text-walnut-400 dark:hover:text-walnut-200 dark:hover:bg-walnut-900 transition-colors"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-gold-500 text-walnut-900 text-xs font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
              <span className="sr-only">Wishlist</span>
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="hidden lg:flex relative p-2 rounded-lg text-walnut-600 hover:text-walnut-800 hover:bg-walnut-50 dark:text-walnut-400 dark:hover:text-walnut-200 dark:hover:bg-walnut-900 transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-walnut-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
              <span className="sr-only">Cart</span>
            </Link>



            {/* Mobile menu button */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" className="p-2">
                  <Menu className="w-6 h-6 text-walnut-700 dark:text-walnut-300" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[350px]">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <Logo />
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-6 flex flex-col gap-1">
                  {navigation.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        'px-4 py-3 rounded-lg text-base font-medium transition-colors',
                        pathname === item.href || pathname.startsWith(item.href + '/')
                          ? 'text-walnut-700 bg-walnut-50 dark:text-walnut-300 dark:bg-walnut-900'
                          : 'text-walnut-600 hover:text-walnut-800 hover:bg-walnut-50 dark:text-walnut-400'
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-walnut-100 dark:border-walnut-800">
                  <a
                    href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/[^0-9]/g, '') || '923001234567'}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg bg-green-500 text-white font-medium hover:bg-green-600 transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" />
                    WhatsApp Us
                  </a>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}
