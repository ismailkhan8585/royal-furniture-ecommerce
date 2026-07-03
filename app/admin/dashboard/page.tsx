'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  DollarSign,
  ShoppingCart,
  Package,
  MessageSquare,
  TrendingUp,
  ArrowRight,
  Clock,
} from 'lucide-react';
import { formatPrice } from '@/lib/currency';
import { ORDER_STATUS_LABELS, CUSTOM_REQUEST_STATUS_LABELS } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface DashboardStats {
  revenueThisMonth: number;
  ordersToday: number;
  productsListed: number;
  customRequestsPending: number;
}

interface RecentOrder {
  id: string;
  order_number: string;
  customer_name: string;
  total_amount: number;
  status: string;
  created_at: string;
}

interface CustomRequest {
  id: string;
  request_ref: string;
  furniture_type: string;
  customer_name: string;
  status: string;
  created_at: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    revenueThisMonth: 0,
    ordersToday: 0,
    productsListed: 0,
    customRequestsPending: 0,
  });
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [pendingCustomRequests, setPendingCustomRequests] = useState<CustomRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '';
      const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

      if (!supabaseUrl || !serviceKey) {
        setLoading(false);
        return;
      }

      const supabase = createClient(supabaseUrl, serviceKey, {
        auth: { autoRefreshToken: false, persistSession: false }
      });

      // Get current month start
      const now = new Date();
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
      const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());

      // Fetch stats
      const { data: monthOrders } = await supabase
        .from('orders')
        .select('total_amount')
        .gte('created_at', monthStart.toISOString())
        .in('status', ['CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED']);

      const { count: ordersToday } = await supabase
        .from('orders')
        .select('id', { count: 'exact' })
        .gte('created_at', todayStart.toISOString());

      const { count: productsListed } = await supabase
        .from('products')
        .select('id', { count: 'exact' })
        .eq('is_active', true);

      const { count: customRequestsPending } = await supabase
        .from('custom_order_requests')
        .select('id', { count: 'exact' })
        .eq('status', 'PENDING');

      setStats({
        revenueThisMonth: monthOrders?.reduce((sum, o) => sum + Number(o.total_amount), 0) || 0,
        ordersToday: ordersToday || 0,
        productsListed: productsListed || 0,
        customRequestsPending: customRequestsPending || 0,
      });

      // Fetch recent orders
      const { data: ordersData } = await supabase
        .from('orders')
        .select('id, order_number, customer_name, total_amount, status, created_at')
        .order('created_at', { ascending: false })
        .limit(10);

      setRecentOrders(ordersData || []);

      // Fetch pending custom requests
      const { data: customData } = await supabase
        .from('custom_order_requests')
        .select('id, request_ref, furniture_type, customer_name, status, created_at')
        .eq('status', 'PENDING')
        .order('created_at', { ascending: false })
        .limit(5);

      setPendingCustomRequests(customData || []);
      setLoading(false);
    };

    fetchData();
  }, []);

  const statCards = [
    {
      title: 'Revenue This Month',
      value: formatPrice(stats.revenueThisMonth),
      icon: DollarSign,
      borderColor: 'border-l-walnut-500',
    },
    {
      title: 'Orders Today',
      value: stats.ordersToday.toString(),
      icon: ShoppingCart,
      borderColor: 'border-l-green-600',
    },
    {
      title: 'Products Listed',
      value: stats.productsListed.toString(),
      icon: Package,
      borderColor: 'border-l-amber-500',
    },
    {
      title: 'Custom Requests Pending',
      value: stats.customRequestsPending.toString(),
      icon: MessageSquare,
      borderColor: 'border-l-purple-600',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold text-walnut-800 dark:text-walnut-200">
          Dashboard
        </h1>
        <p className="text-walnut-500 dark:text-walnut-400 mt-2">
          Welcome back! Here&apos;s what&apos;s happening with your store.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className={cn('border-l-4', stat.borderColor)}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-walnut-500 dark:text-walnut-400">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-walnut-800 dark:text-walnut-200 mt-1">
                      {stat.value}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-walnut-100 dark:bg-walnut-800 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-walnut-600 dark:text-walnut-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Recent Orders</CardTitle>
            <Link href="/admin/orders">
              <Button variant="ghost" size="sm" className="gap-1">
                View All <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-walnut-500">Loading...</p>
            ) : recentOrders.length === 0 ? (
              <p className="text-walnut-500 text-center py-8">No recent orders</p>
            ) : (
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-walnut-50 dark:bg-walnut-900"
                  >
                    <div>
                      <p className="font-medium text-walnut-800 dark:text-walnut-200">
                        {order.order_number}
                      </p>
                      <p className="text-sm text-walnut-500">{order.customer_name}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-walnut-700 dark:text-gold-400">
                        {formatPrice(order.total_amount)}
                      </p>
                      <p className="text-xs text-walnut-500">
                        {ORDER_STATUS_LABELS[order.status]}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pending Custom Requests */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Pending Custom Requests</CardTitle>
            <Link href="/admin/custom-requests">
              <Button variant="ghost" size="sm" className="gap-1">
                View All <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-walnut-500">Loading...</p>
            ) : pendingCustomRequests.length === 0 ? (
              <p className="text-walnut-500 text-center py-8">
                No pending custom requests
              </p>
            ) : (
              <div className="space-y-4">
                {pendingCustomRequests.map((request) => (
                  <div
                    key={request.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-walnut-50 dark:bg-walnut-900"
                  >
                    <div>
                      <p className="font-medium text-walnut-800 dark:text-walnut-200">
                        {request.request_ref}
                      </p>
                      <p className="text-sm text-walnut-500">
                        {request.furniture_type}
                      </p>
                    </div>
                    <div className="text-right flex items-center gap-2">
                      <Clock className="w-4 h-4 text-amber-500" />
                      <span className="text-sm text-walnut-500">
                        {new Date(request.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Link href="/admin/products/new">
              <Button>Add New Product</Button>
            </Link>
            <Link href="/admin/custom-requests">
              <Button variant="outline">Review Custom Requests</Button>
            </Link>
            <Link href="/admin/settings">
              <Button variant="outline">Update Store Settings</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
