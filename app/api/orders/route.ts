import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      orderNumber,
      customer,
      payment,
      items,
      deliveryFee,
      subtotal,
      total,
      notes,
    } = body;

    // Get admin client
    const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceKey) {
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, serviceKey, {
      auth: { autoRefreshToken: false, persistSession: false }
    });

    // Create order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        order_number: orderNumber,
        customer_name: customer.name,
        customer_phone: customer.phone,
        customer_email: customer.email,
        address: customer.address,
        city: customer.city,
        area: customer.area,
        delivery_fee: deliveryFee,
        subtotal: subtotal,
        total_amount: total,
        payment_method: payment.method,
        payment_screenshot: payment.screenshot,
        payment_status: 'UNPAID',
        status: 'PENDING',
        notes: notes,
      })
      .select()
      .single();

    if (orderError || !order) {
      console.error('Order creation error:', orderError);
      return NextResponse.json(
        { error: 'Failed to create order' },
        { status: 500 }
      );
    }

    // Create order items
    const orderItems = items.map((item: {
      productId: string;
      productName: string;
      productPhoto: string;
      quantity: number;
      unitPrice: number;
    }) => ({
      order_id: order.id,
      product_id: item.productId,
      product_name: item.productName,
      product_photo: item.productPhoto,
      quantity: item.quantity,
      unit_price: item.unitPrice,
      total_price: item.unitPrice * item.quantity,
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) {
      console.error('Order items error:', itemsError);
      // Rollback order
      await supabase.from('orders').delete().eq('id', order.id);
      return NextResponse.json(
        { error: 'Failed to create order items' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        orderNumber: order.order_number,
      },
    });
  } catch (error) {
    console.error('Order API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
