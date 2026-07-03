'use client';

import Link from 'next/link';
import { Crown } from 'lucide-react';

export function Logo({ className = '' }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2 ${className}`}>
      <div className="relative w-10 h-10 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-walnut-600 to-walnut-800" />
        <div className="absolute inset-[2px] rounded-full bg-gradient-to-br from-silver-300 to-silver-500" />
        <Crown className="relative z-10 w-5 h-5 text-walnut-700" />
      </div>
      <div className="flex flex-col">
        <span className="font-display font-bold text-walnut-800 dark:text-walnut-200 text-lg leading-tight">
          Royal Furniture
        </span>
        <span className="text-[10px] text-walnut-500 dark:text-walnut-400 tracking-wider uppercase">
          Comfort Meets Class
        </span>
      </div>
    </Link>
  );
}

export function LogoCompact({ className = '' }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2 ${className}`}>
      <div className="relative w-9 h-9 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-walnut-600 to-walnut-800" />
        <div className="absolute inset-[2px] rounded-full bg-gradient-to-br from-silver-300 to-silver-500" />
        <Crown className="relative z-10 w-4 h-4 text-walnut-700" />
      </div>
      <span className="font-display font-bold text-walnut-800 dark:text-walnut-200 text-lg hidden sm:block">
        Royal Furniture
      </span>
    </Link>
  );
}
