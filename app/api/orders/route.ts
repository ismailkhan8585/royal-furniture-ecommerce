import { NextRequest, NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

const orderItemSchema = z.object({
  productId: z.string().uuid(),
  productName: z.string().min(1),
  productPhoto: z.string().min(1).nullable().optional(),
  quantity: z.number().int().min(1).max(99),
  unitPrice: z.number().min(0),
});

const createOrderSchema = z.object({
  orderNumber: z
    .string()
    .regex(/^ORD-\d{4}-\d{5}$/)
    .optional(),
  customer: z.object({
    name: z.string().min(2),
    phone: z.string().min(10),
    email: z.string().email().nullable().optional(),
    address: z.string().min(10),
    city: z.string().min(1),
    area: z.string().nullable().optional(),
  }),
  payment: z.object({
    method: z.enum(['COD', 'JAZZCASH', 'EASYPAISA', 'BANK_TRANSFER']),
    screenshot: z.string().url().nullable().optional(),
  }),
  items: z.array(orderItemSchema).min(1),
  deliveryFee: z.number().min(0),
  subtotal: z.number().min(0),
  total: z.number().min(0),
  notes: z.string().nullable().optional(),
});

function generateOrderNumber() {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 90000) + 10000;
  return `ORD-${year}-${random}`;
}

export async function POST(request: NextRequest) {
  try {
    const data = createOrderSchema.parse(await request.json());

    for (let attempt = 0; attempt < 5; attempt += 1) {
      const orderNumber =
        attempt === 0 && data.orderNumber ? data.orderNumber : generateOrderNumber();

      try {
        const order = await prisma.order.create({
          data: {
            order_number: orderNumber,
            customer_name: data.customer.name,
            customer_phone: data.customer.phone,
            customer_email: data.customer.email || null,
            address: data.customer.address,
            city: data.customer.city,
            area: data.customer.area || null,
            delivery_fee: data.deliveryFee,
            subtotal: data.subtotal,
            total_amount: data.total,
            payment_method: data.payment.method,
            payment_screenshot: data.payment.screenshot || null,
            payment_status: 'UNPAID',
            status: 'PENDING',
            notes: data.notes || null,
            items: {
              create: data.items.map((item) => ({
                product_id: item.productId,
                product_name: item.productName,
                product_photo: item.productPhoto || null,
                quantity: item.quantity,
                unit_price: item.unitPrice,
                total_price: item.unitPrice * item.quantity,
              })),
            },
          },
          select: {
            id: true,
            order_number: true,
          },
        });

        return NextResponse.json({
          success: true,
          data: {
            order: {
              id: order.id,
              orderNumber: order.order_number,
            },
          },
        });
      } catch (error) {
        if (
          error instanceof Prisma.PrismaClientKnownRequestError &&
          error.code === 'P2002'
        ) {
          continue;
        }

        throw error;
      }
    }

    return NextResponse.json(
      { success: false, error: 'Failed to generate order number' },
      { status: 500 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid order data',
          details: error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    console.error('Order API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create order' },
      { status: 500 }
    );
  }
}
