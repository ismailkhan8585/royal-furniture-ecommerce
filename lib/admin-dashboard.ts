import { OrderStatus } from '@prisma/client';
import { prisma } from './prisma';

const revenueStatuses: OrderStatus[] = [
  'CONFIRMED',
  'PROCESSING',
  'SHIPPED',
  'DELIVERED',
];

export async function getAdminDashboardData() {
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const [
    monthOrders,
    ordersToday,
    productsListed,
    customRequestsPending,
    recentOrders,
    pendingCustomRequests,
  ] = await Promise.all([
    prisma.order.findMany({
      where: {
        created_at: { gte: monthStart },
        status: { in: revenueStatuses },
      },
      select: { total_amount: true },
    }),
    prisma.order.count({
      where: { created_at: { gte: todayStart } },
    }),
    prisma.product.count({
      where: { is_active: true },
    }),
    prisma.customOrderRequest.count({
      where: { status: 'PENDING' },
    }),
    prisma.order.findMany({
      select: {
        id: true,
        order_number: true,
        customer_name: true,
        total_amount: true,
        status: true,
        created_at: true,
      },
      orderBy: { created_at: 'desc' },
      take: 10,
    }),
    prisma.customOrderRequest.findMany({
      where: { status: 'PENDING' },
      select: {
        id: true,
        request_ref: true,
        furniture_type: true,
        customer_name: true,
        status: true,
        created_at: true,
      },
      orderBy: { created_at: 'desc' },
      take: 5,
    }),
  ]);

  return {
    stats: {
      revenueThisMonth: monthOrders.reduce(
        (sum, order) => sum + Number(order.total_amount),
        0
      ),
      ordersToday,
      productsListed,
      customRequestsPending,
    },
    recentOrders: recentOrders.map((order) => ({
      ...order,
      total_amount: Number(order.total_amount),
      created_at: order.created_at.toISOString(),
    })),
    pendingCustomRequests: pendingCustomRequests.map((request) => ({
      ...request,
      created_at: request.created_at.toISOString(),
    })),
  };
}
