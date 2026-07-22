import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';

interface OrderRow { id: number; customerName: string; email: string; phone: string; address: string; city: string; state: string; pincode: string; total: number; status: string; paymentMethod: string; createdAt: string; }
interface OrderItemRow { id: number; orderId: number; productName: string; price: number; quantity: number; color: string; size: string; }

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const payload = requireAdmin(request);
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const orderId = parseInt(id);
  if (isNaN(orderId)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

  try {
    const orders = await query<OrderRow>('SELECT * FROM `Order` WHERE id = ? LIMIT 1', [orderId]);
    if (!orders[0]) return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    const items = await query<OrderItemRow>('SELECT * FROM OrderItem WHERE orderId = ?', [orderId]);
    return NextResponse.json({ ...orders[0], items });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch order' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const payload = requireAdmin(request);
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const orderId = parseInt(id);
  if (isNaN(orderId)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

  try {
    const data = await request.json();
    await query('UPDATE `Order` SET status = ?, updatedAt = NOW() WHERE id = ?', [data.status, orderId]);
    const orders = await query<OrderRow>('SELECT * FROM `Order` WHERE id = ? LIMIT 1', [orderId]);
    return NextResponse.json(orders[0]);
  } catch {
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
  }
}
