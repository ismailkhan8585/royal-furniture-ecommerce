import { ShoppingCart } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { formatPrice } from '@/lib/currency';
import {
  ORDER_STATUS_LABELS,
  PAYMENT_METHOD_LABELS,
} from '@/lib/constants';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export const dynamic = 'force-dynamic';

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    include: { items: true },
    orderBy: { created_at: 'desc' },
    take: 100,
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold text-walnut-800 dark:text-walnut-200">
          Orders
        </h1>
        <p className="mt-2 text-walnut-500 dark:text-walnut-400">
          Review customer orders, payments, delivery details, and current status.
        </p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <ShoppingCart className="h-5 w-5" />
            Order Management
          </CardTitle>
          <Badge variant="secondary">{orders.length} orders</Badge>
        </CardHeader>
        <CardContent>
          {orders.length === 0 ? (
            <p className="py-8 text-center text-walnut-500">No orders found.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-walnut-800 dark:text-walnut-200">
                          {order.order_number}
                        </p>
                        <p className="text-xs text-walnut-500">
                          {order.created_at.toLocaleDateString()}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p>{order.customer_name}</p>
                        <p className="text-xs text-walnut-500">{order.customer_phone}</p>
                        <p className="text-xs text-walnut-500">{order.city}</p>
                      </div>
                    </TableCell>
                    <TableCell>{order.items.length}</TableCell>
                    <TableCell>{formatPrice(Number(order.total_amount))}</TableCell>
                    <TableCell>
                      <div>
                        <p>{PAYMENT_METHOD_LABELS[order.payment_method]}</p>
                        <p className="text-xs text-walnut-500">
                          {order.payment_status.replace(/_/g, ' ')}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{ORDER_STATUS_LABELS[order.status]}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
