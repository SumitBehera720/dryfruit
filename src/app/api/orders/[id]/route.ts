import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const payload = requireAdmin(request);
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const orderId = parseInt(id);
  if (isNaN(orderId)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { items: true },
  });

  if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 });

  return NextResponse.json(order);
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const payload = requireAdmin(request);
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const orderId = parseInt(id);
  if (isNaN(orderId)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

  try {
    const data = await request.json();
    const order = await prisma.order.update({
      where: { id: orderId },
      data: { status: data.status },
    });
    return NextResponse.json(order);
  } catch {
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
  }
}
