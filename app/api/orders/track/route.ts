import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { serializeOrder } from '@/lib/db-serializers';
import { prisma } from '@/lib/prisma';
import { orderTrackingSchema } from '@/lib/validations';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const data = orderTrackingSchema.parse(await request.json());

    const order = await prisma.order.findFirst({
      where: {
        order_number: data.orderNumber,
        customer_phone: data.customerPhone,
      },
      include: {
        items: true,
      },
    });

    if (!order) {
      return NextResponse.json(
        {
          success: false,
          error:
            'No order found with these details. Please check your order number and phone number.',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: serializeOrder(order),
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid order tracking details',
          details: error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    console.error('Order tracking API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to lookup order' },
      { status: 500 }
    );
  }
}
