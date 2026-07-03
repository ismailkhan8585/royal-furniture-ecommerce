'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { CheckCircle, Package, Download, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function OrderConfirmationPage() {
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [phone, setPhone] = useState<string | null>(null);

  useEffect(() => {
    setOrderNumber(sessionStorage.getItem('lastOrderNumber'));
    setPhone(sessionStorage.getItem('lastOrderPhone'));
  }, []);

  return (
    <div className="min-h-screen bg-surface-secondary py-16">
      <div className="container-narrow">
        <Card className="text-center">
          <CardContent className="pt-12 pb-8">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="font-display text-3xl font-bold text-walnut-800 mb-4">
              Order Placed Successfully!
            </h1>
            <p className="text-walnut-600 mb-6 max-w-md mx-auto">
              Thank you for your order! We will contact you shortly to confirm delivery details.
            </p>

            {orderNumber && (
              <div className="bg-walnut-50 dark:bg-walnut-900 rounded-lg p-6 mb-8 max-w-sm mx-auto">
                <p className="text-sm text-walnut-500 mb-2">Your Order Number</p>
                <p className="font-mono text-3xl font-bold text-walnut-800 dark:text-gold-400">
                  {orderNumber}
                </p>
                {phone && (
                  <p className="text-sm text-walnut-500 mt-2">
                    Phone: {phone}
                  </p>
                )}
              </div>
            )}

            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4 mb-8 max-w-md mx-auto">
              <div className="flex items-start gap-3">
                <Package className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="text-left">
                  <p className="font-medium text-amber-800 dark:text-amber-300">
                    Save Your Order Details
                  </p>
                  <p className="text-sm text-amber-700 dark:text-amber-400">
                    Use your order number and phone number to track your order status on our Track Order page.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild variant="outline">
                <Link href="/track-order">Track Order</Link>
              </Button>
              <Button asChild>
                <Link href="/">Continue Shopping</Link>
              </Button>
              <Button asChild className="gap-2 bg-green-500 hover:bg-green-600">
                <a
                  href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/[^0-9]/g, '') || '923001234567'}${orderNumber ? `?text=${encodeURIComponent(`Hi, I just placed an order. Order Number: ${orderNumber}`)}` : ''}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
