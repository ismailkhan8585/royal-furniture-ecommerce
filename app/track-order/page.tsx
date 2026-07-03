'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { orderTrackingSchema, OrderTrackingFormData } from '@/lib/validations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Package,
  Search,
  CheckCircle,
  Clock,
  Truck,
  Home,
  XCircle,
  MessageCircle,
} from 'lucide-react';
import { PAYMENT_METHOD_LABELS } from '@/lib/constants';
import { formatPrice } from '@/lib/currency';
import { cn } from '@/lib/utils';
import { SafeImage } from '@/components/shared/SafeImage';

interface OrderWithItems {
  id: string;
  order_number: string;
  customer_name: string;
  customer_phone: string;
  address: string;
  city: string;
  status: string;
  payment_method: string;
  payment_status: string;
  total_amount: number;
  subtotal: number;
  delivery_fee: number;
  created_at: string;
  estimated_delivery: string | null;
  delivered_at: string | null;
  items: Array<{
    product_name: string;
    product_photo: string | null;
    quantity: number;
    unit_price: number;
  }>;
}

const statusTimeline = [
  { status: 'PENDING', label: 'Order Placed', icon: Clock },
  { status: 'CONFIRMED', label: 'Confirmed', icon: CheckCircle },
  { status: 'PROCESSING', label: 'Processing', icon: Package },
  { status: 'SHIPPED', label: 'Shipped', icon: Truck },
  { status: 'DELIVERED', label: 'Delivered', icon: Home },
];

export default function TrackOrderPage() {
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<OrderWithItems | null>(null);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OrderTrackingFormData>({
    resolver: zodResolver(orderTrackingSchema),
  });

  const onSubmit = async (data: OrderTrackingFormData) => {
    setLoading(true);
    setError(null);
    setOrder(null);

    try {
      const response = await fetch('/api/orders/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        setError(
          result.error ||
            'No order found with these details. Please check your order number and phone number.'
        );
        return;
      }

      setOrder(result.data as OrderWithItems);
    } catch (err) {
      setError('Failed to lookup order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusIndex = (status: string) => {
    const idx = statusTimeline.findIndex((s) => s.status === status);
    return idx >= 0 ? idx : 0;
  };

  const currentStatusIndex = order ? getStatusIndex(order.status) : 0;

  return (
    <div className="min-h-screen bg-surface-secondary py-8">
      <div className="container-narrow">
        <div className="text-center mb-8">
          <Package className="w-12 h-12 text-walnut-600 mx-auto mb-4" />
          <h1 className="font-display text-3xl font-bold text-walnut-800 dark:text-walnut-200">
            Track Your Order
          </h1>
          <p className="text-walnut-600 dark:text-walnut-400 mt-2">
            Enter your order number and phone number to check delivery status
          </p>
        </div>

        {/* Search Form */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Order Number</Label>
                  <Input
                    {...register('orderNumber')}
                    placeholder="ORD-2024-XXXXX"
                  />
                  {errors.orderNumber && (
                    <p className="text-red-500 text-sm">{errors.orderNumber.message}</p>
                  )}
                </div>
                <div>
                  <Label>Phone Number</Label>
                  <Input
                    {...register('customerPhone')}
                    placeholder="03XX-XXXXXXX"
                  />
                  {errors.customerPhone && (
                    <p className="text-red-500 text-sm">{errors.customerPhone.message}</p>
                  )}
                </div>
              </div>
              <Button type="submit" disabled={loading} className="w-full gap-2">
                <Search className="w-4 h-4" />
                {loading ? 'Searching...' : 'Track Order'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Error */}
        {error && (
          <Card className="mb-8 border-red-200 bg-red-50">
            <CardContent className="pt-6 text-center">
              <XCircle className="w-10 h-10 text-red-500 mx-auto mb-3" />
              <p className="text-red-700">{error}</p>
              <p className="text-red-600 text-sm mt-2">
                Need help?{' '}
                <a
                  href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/[^0-9]/g, '') || '923001234567'}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  Contact us on WhatsApp
                </a>
              </p>
            </CardContent>
          </Card>
        )}

        {/* Order Details */}
        {order && (
          <div className="space-y-6">
            {/* Status Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Order Status
                  <span className="text-sm font-normal text-walnut-500">
                    Order: {order.order_number}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  {/* Progress Line */}
                  <div className="absolute top-5 left-5 right-5 h-0.5 bg-walnut-200 dark:bg-walnut-700">
                    <div
                      className="h-full bg-green-500 transition-all"
                      style={{
                        width: `${(currentStatusIndex / (statusTimeline.length - 1)) * 100}%`,
                      }}
                    />
                  </div>

                  {/* Status Points */}
                  <div className="relative flex justify-between">
                    {statusTimeline.map((s, idx) => {
                      const Icon = s.icon;
                      const isCompleted = idx <= currentStatusIndex;
                      const isCurrent = idx === currentStatusIndex;

                      return (
                        <div
                          key={s.status}
                          className="flex flex-col items-center"
                        >
                          <div
                            className={cn(
                              'w-10 h-10 rounded-full flex items-center justify-center z-10 transition-colors',
                              isCompleted
                                ? 'bg-green-500 text-white'
                                : 'bg-walnut-200 dark:bg-walnut-700 text-walnut-400 dark:text-walnut-500'
                            )}
                          >
                            <Icon className="w-5 h-5" />
                          </div>
                          <p
                            className={cn(
                              'text-xs mt-2 text-center',
                              isCurrent
                                ? 'font-semibold text-walnut-800 dark:text-walnut-200'
                                : 'text-walnut-500'
                            )}
                          >
                            {s.label}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Info */}
            <Card>
              <CardHeader>
                <CardTitle>Order Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-walnut-500">Customer</p>
                    <p className="font-medium">{order.customer_name}</p>
                  </div>
                  <div>
                    <p className="text-walnut-500">Phone</p>
                    <p className="font-medium">{order.customer_phone}</p>
                  </div>
                  <div>
                    <p className="text-walnut-500">Delivery Address</p>
                    <p className="font-medium">{order.address}, {order.city}</p>
                  </div>
                  <div>
                    <p className="text-walnut-500">Order Date</p>
                    <p className="font-medium">
                      {new Date(order.created_at).toLocaleDateString('en-PK', {
                        dateStyle: 'long',
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-walnut-500">Payment Method</p>
                    <p className="font-medium">
                      {PAYMENT_METHOD_LABELS[order.payment_method]}
                    </p>
                  </div>
                  <div>
                    <p className="text-walnut-500">Payment Status</p>
                    <p
                      className={cn(
                        'font-medium',
                        order.payment_status === 'PAID'
                          ? 'text-green-600'
                          : 'text-amber-600'
                      )}
                    >
                      {order.payment_status}
                    </p>
                  </div>
                  {order.estimated_delivery && (
                    <div>
                      <p className="text-walnut-500">Estimated Delivery</p>
                      <p className="font-medium">
                        {new Date(order.estimated_delivery).toLocaleDateString('en-PK', {
                          dateStyle: 'long',
                        })}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Items */}
            <Card>
              <CardHeader>
                <CardTitle>Items ({order.items?.length || 0})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.items?.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                      {item.product_photo && (
                        <SafeImage
                          src={item.product_photo}
                          alt={item.product_name}
                          width={64}
                          height={64}
                          sizes="64px"
                          className="h-16 w-16 rounded object-cover"
                        />
                      )}
                      <div className="flex-1">
                        <p className="font-medium text-walnut-800 dark:text-walnut-200">
                          {item.product_name}
                        </p>
                        <p className="text-sm text-walnut-500">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="font-medium text-walnut-700 dark:text-gold-400">
                        {formatPrice(item.unit_price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-walnut-200 dark:border-walnut-700 mt-4 pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-walnut-500">Subtotal</span>
                    <span>{formatPrice(order.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-walnut-500">Delivery</span>
                    <span>
                      {order.delivery_fee === 0 ? 'Free' : formatPrice(order.delivery_fee)}
                    </span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg pt-2 border-t border-walnut-100 dark:border-walnut-800">
                    <span>Total</span>
                    <span className="text-walnut-700 dark:text-gold-400">
                      {formatPrice(order.total_amount)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Need Help */}
            <div className="text-center">
              <p className="text-walnut-500 mb-3">Need help with your order?</p>
              <Button asChild variant="outline" className="gap-2">
                <a
                  href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/[^0-9]/g, '') || '923001234567'}?text=${encodeURIComponent(`Hi, I have a question about order ${order.order_number}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="w-4 h-4" />
                  Contact Support
                </a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
