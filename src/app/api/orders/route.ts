import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const payload = requireAdmin(request);
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const orders = await prisma.order.findMany({
    include: { items: true },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(orders);
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    if (!data.items || data.items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    const order = await prisma.order.create({
      data: {
        customerName: data.customerName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        city: data.city,
        state: data.state,
        pincode: data.pincode,
        total: parseFloat(data.total),
        paymentMethod: data.paymentMethod || 'cod',
        items: {
          create: data.items.map((item: { productName: string; price: number | string; quantity: number; color: string; size: string }) => ({
            productName: item.productName,
            price: Number(item.price),
            quantity: item.quantity,
            color: item.color,
            size: item.size,
          })),
        },
      },
      include: { items: true },
    });

    return NextResponse.json(order, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
