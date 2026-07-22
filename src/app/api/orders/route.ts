import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';

interface OrderRow { id: number; customerName: string; email: string; phone: string; address: string; city: string; state: string; pincode: string; total: number; status: string; paymentMethod: string; createdAt: string; }
interface OrderItemRow { id: number; orderId: number; productName: string; price: number; quantity: number; color: string; size: string; }

export async function GET(request: NextRequest) {
  const payload = requireAdmin(request);
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const orders = await query<OrderRow>('SELECT * FROM `Order` ORDER BY createdAt DESC');
    if (orders.length === 0) return NextResponse.json([]);
    const ids = orders.map(o => o.id);
    const placeholders = ids.map(() => '?').join(',');
    const items = await query<OrderItemRow>(`SELECT * FROM OrderItem WHERE orderId IN (${placeholders})`, ids as (string | number | null)[]);
    const itemsMap = new Map<number, OrderItemRow[]>();
    for (const item of items) itemsMap.set(item.orderId, [...(itemsMap.get(item.orderId) || []), item]);
    return NextResponse.json(orders.map(o => ({ ...o, items: itemsMap.get(o.id) || [] })));
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    if (!data.items || data.items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    await query(
      'INSERT INTO `Order` (customerName, email, phone, address, city, state, pincode, total, status, paymentMethod, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())',
      [data.customerName, data.email, data.phone, data.address, data.city, data.state, data.pincode, parseFloat(data.total), 'pending', data.paymentMethod || 'cod']
    );
    const orders = await query<OrderRow>('SELECT * FROM `Order` ORDER BY id DESC LIMIT 1');
    const order = orders[0];
    if (!order) return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });

    for (const item of data.items) {
      await query(
        'INSERT INTO OrderItem (orderId, productName, price, quantity, color, size) VALUES (?, ?, ?, ?, ?, ?)',
        [order.id, item.productName, Number(item.price), item.quantity, item.color, item.size]
      );
    }
    const items = await query<OrderItemRow>('SELECT * FROM OrderItem WHERE orderId = ?', [order.id]);
    return NextResponse.json({ ...order, items }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
