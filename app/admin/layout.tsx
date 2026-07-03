'use client';

import { SessionProvider } from 'next-auth/react';
import { AdminSidebar, AdminMobileNav } from '@/components/admin/AdminSidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <div className="min-h-screen bg-surface-secondary flex">
        <AdminSidebar />
        <div className="flex-1 flex flex-col">
          <AdminMobileNav />
          <main className="flex-1 p-4 lg:p-8 mt-16 lg:mt-0 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SessionProvider>
  );
}
