import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const payload = requireAdmin(request);
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const [
      totalOrders,
      totalRevenue,
      totalProducts,
      totalSubscribers,
      recentOrders,
      ordersByStatus,
    ] = await Promise.all([
      prisma.order.count(),
      prisma.order.aggregate({ _sum: { total: true } }),
      prisma.product.count({ where: { active: true } }),
      prisma.newsletterSubscriber.count(),
      prisma.order.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' },
        include: { items: true },
      }),
      prisma.order.groupBy({
        by: ['status'],
        _count: true,
      }),
    ]);

    return NextResponse.json({
      totalOrders,
      totalRevenue: totalRevenue._sum.total || 0,
      totalProducts,
      totalSubscribers,
      recentOrders,
      ordersByStatus,
    });
  } catch {
    return NextResponse.json({
      totalOrders: 0,
      totalRevenue: 0,
      totalProducts: 4,
      totalSubscribers: 0,
      recentOrders: [],
      ordersByStatus: [],
    });
  }
}
