'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckoutFormData, checkoutFormSchema } from '@/lib/validations';
import { PAKISTANI_CITIES, DELIVERY_FEES, FREE_DELIVERY_THRESHOLD, PAYMENT_METHOD_LABELS } from '@/lib/constants';
import { formatPrice, calculateDeliveryFee } from '@/lib/currency';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Banknote,
  Smartphone,
  Building2,
  Upload,
} from 'lucide-react';
import { toast } from 'sonner';

const paymentMethods = [
  {
    value: 'COD',
    label: 'Cash on Delivery',
    icon: Banknote,
    description: 'Pay when your order arrives',
  },
  {
    value: 'JAZZCASH',
    label: 'JazzCash',
    icon: Smartphone,
    description: 'Send payment via JazzCash',
  },
  {
    value: 'EASYPAISA',
    label: 'EasyPaisa',
    icon: Smartphone,
    description: 'Send payment via EasyPaisa',
  },
  {
    value: 'BANK_TRANSFER',
    label: 'Bank Transfer',
    icon: Building2,
    description: 'Direct bank transfer',
  },
];

interface CartItem {
  productId: string;
  productName: string;
  productPhoto: string;
  quantity: number;
  unitPrice: number;
  slug: string;
}

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const [items, setItems] = useState<CartItem[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      customerName: '',
      customerPhone: '',
      customerEmail: '',
      address: '',
      city: 'Lahore',
      area: '',
      paymentMethod: 'COD',
      paymentScreenshot: '',
      notes: '',
    },
  });

  const selectedCity = watch('city');
  const selectedPayment = watch('paymentMethod');

  // Load cart on mount
  useEffect(() => {
    try {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      if (cart.length === 0) {
        router.push('/cart');
        return;
      }
      setItems(cart);
    } catch {
      router.push('/cart');
    }
  }, [router]);

  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const qualifiesForFreeDelivery = subtotal >= FREE_DELIVERY_THRESHOLD;
  const deliveryFee = qualifiesForFreeDelivery ? 0 : (DELIVERY_FEES[selectedCity] || 1500);
  const total = subtotal + deliveryFee;

  const generateOrderNumber = () => {
    const year = new Date().getFullYear();
    const random = Math.floor(Math.random() * 90000) + 10000;
    return `ORD-${year}-${random}`;
  };

  const onSubmit = async (data: CheckoutFormData) => {
    if (step < 3) {
      setStep(step + 1);
      return;
    }

    setIsSubmitting(true);

    try {
      const orderNumber = generateOrderNumber();

      // Create order via API
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderNumber,
          customer: {
            name: data.customerName,
            phone: data.customerPhone,
            email: data.customerEmail || null,
            address: data.address,
            city: data.city,
            area: data.area || null,
          },
          payment: {
            method: data.paymentMethod,
            screenshot: data.paymentScreenshot || null,
          },
          items: items.map((item) => ({
            productId: item.productId,
            productName: item.productName,
            productPhoto: item.productPhoto,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
          })),
          deliveryFee,
          subtotal,
          total,
          notes: data.notes || null,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      // Clear cart
      localStorage.setItem('cart', JSON.stringify([]));
      window.dispatchEvent(new Event('cartUpdated'));

      // Store order number for confirmation page
      sessionStorage.setItem('lastOrderNumber', orderNumber);
      sessionStorage.setItem('lastOrderPhone', data.customerPhone);

      router.push('/order-confirmation');
    } catch (error) {
      console.error('Order submission error:', error);
      toast.error('Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', 'paymentScreenshots');

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setValue('paymentScreenshot', data.url);
        toast.success('Payment screenshot uploaded');
      }
    } catch {
      toast.error('Failed to upload screenshot');
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-surface-secondary flex items-center justify-center">
        <p className="text-walnut-500">Redirecting to cart...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-secondary">
      {/* Header */}
      <div className="bg-white dark:bg-walnut-950 border-b border-walnut-100 dark:border-walnut-800 py-6">
        <div className="container-wide">
          <h1 className="font-display text-2xl font-bold text-walnut-800 dark:text-walnut-200">
            Checkout
          </h1>
          {/* Progress */}
          <div className="flex items-center gap-4 mt-4">
            {[
              { num: 1, label: 'Delivery' },
              { num: 2, label: 'Payment' },
              { num: 3, label: 'Review' },
            ].map((s, idx) => (
              <div key={s.num} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= s.num
                      ? 'bg-walnut-700 text-white'
                      : 'bg-walnut-100 text-walnut-400'
                  }`}
                >
                  {s.num}
                </div>
                <span
                  className={`ml-2 text-sm ${
                    step >= s.num
                      ? 'text-walnut-700 dark:text-walnut-200'
                      : 'text-walnut-400'
                  }`}
                >
                  {s.label}
                </span>
                {idx < 2 && (
                  <div
                    className={`w-8 h-0.5 mx-3 ${
                      step > s.num ? 'bg-walnut-700' : 'bg-walnut-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container-wide py-8">
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle>Delivery Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Full Name *</Label>
                      <Input {...register('customerName')} placeholder="Your name" />
                      {errors.customerName && (
                        <p className="text-red-500 text-sm">{errors.customerName.message}</p>
                      )}
                    </div>
                    <div>
                      <Label>Phone Number *</Label>
                      <Input {...register('customerPhone')} placeholder="03XX-XXXXXXX" />
                      {errors.customerPhone && (
                        <p className="text-red-500 text-sm">{errors.customerPhone.message}</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <Label>Email (optional)</Label>
                    <Input
                      {...register('customerEmail')}
                      type="email"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <Label>Delivery Address *</Label>
                    <Textarea
                      {...register('address')}
                      placeholder="Complete address with house/apartment number"
                      rows={3}
                    />
                    {errors.address && (
                      <p className="text-red-500 text-sm">{errors.address.message}</p>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>City *</Label>
                      <Select
                        defaultValue="Lahore"
                        onValueChange={(v) => setValue('city', v)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {PAKISTANI_CITIES.map((city) => (
                            <SelectItem key={city} value={city}>
                              {city}
                              {DELIVERY_FEES[city] === 0 && ' (Free Delivery)'}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.city && (
                        <p className="text-red-500 text-sm">{errors.city.message}</p>
                      )}
                    </div>
                    <div>
                      <Label>Area (optional)</Label>
                      <Input {...register('area')} placeholder="Area/Neighborhood" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {step === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {paymentMethods.map((method) => {
                      const Icon = method.icon;
                      return (
                        <label
                          key={method.value}
                          className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                            selectedPayment === method.value
                              ? 'border-walnut-600 bg-walnut-50 dark:bg-walnut-900'
                              : 'border-walnut-200 dark:border-walnut-700 hover:border-walnut-400'
                          }`}
                        >
                          <input
                            type="radio"
                            value={method.value}
                            checked={selectedPayment === method.value}
                            onChange={() => setValue('paymentMethod', method.value as any)}
                            className="mt-1"
                          />
                          <div>
                            <div className="flex items-center gap-2 font-medium text-walnut-800 dark:text-walnut-200">
                              <Icon className="w-5 h-5" />
                              {method.label}
                            </div>
                            <p className="text-sm text-walnut-500">{method.description}</p>
                          </div>
                        </label>
                      );
                    })}
                  </div>

                  {selectedPayment !== 'COD' && (
                    <div className="mt-6 p-4 bg-gold-50 dark:bg-gold-900/20 rounded-lg">
                      <p className="font-medium text-walnut-800 dark:text-walnut-200 mb-2">
                        Payment Instructions:
                      </p>
                      {selectedPayment === 'JAZZCASH' && (
                        <p className="text-walnut-600 dark:text-walnut-400">
                          Send payment to: <strong>{process.env.NEXT_PUBLIC_JAZZCASH_NUMBER || '0300-1234567'}</strong>
                        </p>
                      )}
                      {selectedPayment === 'EASYPAISA' && (
                        <p className="text-walnut-600 dark:text-walnut-400">
                          Send payment to: <strong>{process.env.NEXT_PUBLIC_EASYPAISA_NUMBER || '0300-1234567'}</strong>
                        </p>
                      )}
                      {selectedPayment === 'BANK_TRANSFER' && (
                        <p className="text-walnut-600 dark:text-walnut-400">
                          IBAN: <strong>{process.env.NEXT_PUBLIC_BANK_IBAN || 'PK00BANK0000000000000000'}</strong>
                        </p>
                      )}

                      <div className="mt-4">
                        <Label>Upload Payment Screenshot</Label>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="mt-2"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <Label>Order Notes (optional)</Label>
                    <Textarea
                      {...register('notes')}
                      placeholder="Special instructions for delivery"
                      rows={2}
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {step === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle>Review Your Order</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-walnut-50 dark:bg-walnut-900 rounded-lg p-4">
                    <h3 className="font-medium text-walnut-800 dark:text-walnut-200 mb-2">
                      Delivery Address
                    </h3>
                    <p className="text-walnut-600 dark:text-walnut-400">
                      {watch('customerName')}<br />
                      {watch('address')}<br />
                      {watch('city')}{watch('area') && `, ${watch('area')}`}<br />
                      Phone: {watch('customerPhone')}
                    </p>
                  </div>

                  <div className="bg-walnut-50 dark:bg-walnut-900 rounded-lg p-4">
                    <h3 className="font-medium text-walnut-800 dark:text-walnut-200 mb-2">
                      Payment Method
                    </h3>
                    <p className="text-walnut-600 dark:text-walnut-400">
                      {PAYMENT_METHOD_LABELS[watch('paymentMethod')]}
                    </p>
                  </div>

                  {/* Items Summary */}
                  <div className="border-t border-walnut-200 dark:border-walnut-700 pt-4">
                    <h3 className="font-medium text-walnut-800 dark:text-walnut-200 mb-2">
                      Items ({items.length})
                    </h3>
                    {items.map((item) => (
                      <div key={item.productId} className="flex items-center gap-3 py-2">
                        <img
                          src={item.productPhoto}
                          alt={item.productName}
                          className="w-12 h-12 rounded object-cover"
                        />
                        <div className="flex-1">
                          <p className="text-walnut-700 dark:text-walnut-300 text-sm line-clamp-1">
                            {item.productName}
                          </p>
                          <p className="text-walnut-500 text-sm">
                            {item.quantity} x {formatPrice(item.unitPrice)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-6">
              {step > 1 ? (
                <Button type="button" variant="outline" onClick={() => setStep(step - 1)}>
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
              ) : (
                <Button type="button" variant="ghost" onClick={() => router.push('/cart')}>
                  Back to Cart
                </Button>
              )}

              {step < 3 ? (
                <Button type="submit">
                  Next
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button type="submit" disabled={isSubmitting} className="gap-2">
                  {isSubmitting ? 'Processing...' : 'Place Order'}
                </Button>
              )}
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-walnut-950 rounded-xl p-6 border border-walnut-100 dark:border-walnut-800 sticky top-24">
              <h2 className="font-display text-xl font-semibold text-walnut-800 dark:text-walnut-200 mb-4">
                Order Summary
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-walnut-600 dark:text-walnut-400">Subtotal</span>
                  <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-walnut-600 dark:text-walnut-400">Delivery</span>
                  <span className="font-medium">
                    {deliveryFee === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      formatPrice(deliveryFee)
                    )}
                  </span>
                </div>
                <div className="border-t border-walnut-100 dark:border-walnut-800 pt-3 flex justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold text-lg text-walnut-700 dark:text-gold-400">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
