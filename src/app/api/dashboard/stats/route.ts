import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';

interface CountRow { cnt: number; }
interface RevenueRow { total: number | null; }
interface StatusRow { status: string; cnt: number; }
interface OrderRow { id: number; customerName: string; email: string; total: number; status: string; paymentMethod: string; createdAt: string; }
interface OrderItemRow { id: number; orderId: number; productName: string; price: number; quantity: number; color: string; size: string; }

export async function GET(request: NextRequest) {
  const payload = requireAdmin(request);
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const [[orderCount], [revenue], [productCount], [subscriberCount], recentOrders, ordersByStatus] = await Promise.all([
      query<CountRow>('SELECT COUNT(*) as cnt FROM `Order`'),
      query<RevenueRow>('SELECT SUM(total) as total FROM `Order`'),
      query<CountRow>('SELECT COUNT(*) as cnt FROM Product WHERE active = 1'),
      query<CountRow>('SELECT COUNT(*) as cnt FROM NewsletterSubscriber'),
      query<OrderRow>('SELECT * FROM `Order` ORDER BY createdAt DESC LIMIT 10'),
      query<StatusRow>('SELECT status, COUNT(*) as cnt FROM `Order` GROUP BY status'),
    ]);

    const orderIds = recentOrders.map(o => o.id);
    const itemsMap = new Map<number, OrderItemRow[]>();
    if (orderIds.length > 0) {
      const ph = orderIds.map(() => '?').join(',');
      const items = await query<OrderItemRow>(`SELECT * FROM OrderItem WHERE orderId IN (${ph})`, orderIds as (string | number | null)[]);
      for (const item of items) itemsMap.set(item.orderId, [...(itemsMap.get(item.orderId) || []), item]);
    }

    return NextResponse.json({
      totalOrders: orderCount?.cnt ?? 0,
      totalRevenue: revenue?.total ?? 0,
      totalProducts: productCount?.cnt ?? 0,
      totalSubscribers: subscriberCount?.cnt ?? 0,
      recentOrders: recentOrders.map(o => ({ ...o, items: itemsMap.get(o.id) || [] })),
      ordersByStatus: ordersByStatus.map(s => ({ status: s.status, _count: s.cnt })),
    });
  } catch {
    return NextResponse.json({ totalOrders: 0, totalRevenue: 0, totalProducts: 0, totalSubscribers: 0, recentOrders: [], ordersByStatus: [] });
  }
}
