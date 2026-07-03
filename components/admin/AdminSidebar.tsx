'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Crown, LayoutDashboard, Package, ShoppingCart, FileText, Images, MessageSquare, Settings, LogOut, ChevronLeft, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { signOut, useSession } from 'next-auth/react';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Products', href: '/admin/products', icon: Package },
  { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
  { name: 'Custom Requests', href: '/admin/custom-requests', icon: FileText },
  { name: 'Gallery', href: '/admin/gallery', icon: Images },
  { name: 'Reviews', href: '/admin/reviews', icon: MessageSquare },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        'hidden lg:flex flex-col bg-walnut-900 text-white transition-all duration-300',
        collapsed ? 'w-20' : 'w-64'
      )}
    >
      {/* Logo */}
      <div className="p-4 border-b border-walnut-800 flex items-center justify-between">
        <Link href="/admin/dashboard" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center">
            <Crown className="w-5 h-5 text-walnut-900" />
          </div>
          {!collapsed && (
            <span className="font-display font-bold text-lg">Admin</span>
          )}
        </Link>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded hover:bg-walnut-800 transition-colors"
        >
          <ChevronLeft
            className={cn('w-5 h-5 transition-transform', collapsed && 'rotate-180')}
          />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors',
                isActive
                  ? 'bg-gold-500 text-walnut-900 font-medium'
                  : 'text-walnut-300 hover:bg-walnut-800 hover:text-white'
              )}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span>{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* User and Logout */}
      <div className="p-4 border-t border-walnut-800">
        {!collapsed && (
          <div className="mb-3">
            <p className="font-medium text-sm">{session?.user?.name}</p>
            <p className="text-xs text-walnut-400">{session?.user?.email}</p>
          </div>
        )}
        <Button
          variant="ghost"
          size={collapsed ? 'icon' : 'default'}
          onClick={() => signOut({ callbackUrl: '/admin/login' })}
          className={cn(
            'w-full text-walnut-300 hover:text-white hover:bg-walnut-800',
            collapsed && 'justify-center'
          )}
        >
          <LogOut className="w-4 h-4" />
          {!collapsed && <span className="ml-2">Sign Out</span>}
        </Button>
      </div>
    </aside>
  );
}

export function AdminMobileNav() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-walnut-900 text-white h-16 flex items-center justify-between px-4">
      <Link href="/admin/dashboard" className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center">
          <Crown className="w-5 h-5 text-walnut-900" />
        </div>
        <span className="font-display font-bold text-lg">Admin</span>
      </Link>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="text-white">
            <Menu className="w-6 h-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-72 bg-walnut-900 text-white">
          <div className="mt-6">
            <p className="font-medium">{session?.user?.name}</p>
            <p className="text-sm text-walnut-400">{session?.user?.email}</p>
          </div>
          <nav className="mt-6 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/');

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors',
                    isActive
                      ? 'bg-gold-500 text-walnut-900 font-medium'
                      : 'text-walnut-300 hover:bg-walnut-800'
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
          <div className="mt-6 pt-6 border-t border-walnut-800">
            <Button
              variant="ghost"
              onClick={() => signOut({ callbackUrl: '/admin/login' })}
              className="w-full text-walnut-300 hover:text-white hover:bg-walnut-800"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
