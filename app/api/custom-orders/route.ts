import { NextRequest, NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import { z } from 'zod';
import { customOrderFormSchema } from '@/lib/validations';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

const requestSchema = customOrderFormSchema.extend({
  referenceImages: z.array(z.string().url()).max(5).default([]),
});

function generateRequestRef() {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 90000) + 10000;
  return `CUS-${year}-${random}`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = requestSchema.parse({
      ...body,
      referenceImages: body.referenceImages ?? [],
    });

    for (let attempt = 0; attempt < 5; attempt += 1) {
      const requestRef = generateRequestRef();

      try {
        const customRequest = await prisma.customOrderRequest.create({
          data: {
            request_ref: requestRef,
            furniture_type: data.furnitureType,
            room_type: data.roomType || null,
            material: data.material || null,
            budget_range: data.budgetRange || null,
            dimensions: data.dimensions || null,
            description: data.description || null,
            reference_images: data.referenceImages,
            customer_name: data.customerName,
            customer_phone: data.customerPhone,
            city: data.city,
            status: 'PENDING',
          },
          select: {
            id: true,
            request_ref: true,
          },
        });

        return NextResponse.json({
          success: true,
          data: {
            id: customRequest.id,
            requestRef: customRequest.request_ref,
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
      { success: false, error: 'Failed to generate request reference' },
      { status: 500 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid custom order request',
          details: error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    console.error('Custom order API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit custom order request' },
      { status: 500 }
    );
  }
}
