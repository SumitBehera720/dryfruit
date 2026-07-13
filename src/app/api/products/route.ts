import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';
import { fallbackProducts } from '@/lib/fallback-data';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const gender = searchParams.get('gender');
    const category = searchParams.get('category');
    const limit = parseInt(searchParams.get('limit') || '50');

    const where: Record<string, unknown> = { active: true };
    if (gender && gender !== 'all') where.gender = gender;
    if (category && category !== 'all') where.category = category;

    const products = await prisma.product.findMany({
      where,
      include: {
        variants: true,
        details: { orderBy: { sortOrder: 'asc' } },
        reviews: { where: { approved: true }, orderBy: { date: 'desc' }, take: 5 },
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });

    return NextResponse.json(products);
  } catch {
    return NextResponse.json(fallbackProducts);
  }
}

export async function POST(request: NextRequest) {
  const payload = requireAdmin(request);
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const data = await request.json();
    const product = await prisma.product.create({
      data: {
        slug: data.slug,
        name: data.name,
        price: parseFloat(data.price),
        label: data.label || null,
        category: data.category,
        gender: data.gender,
        description: data.description,
        variants: data.image ? {
          create: {
            colorName: 'Default',
            hex: '#000000',
            image: data.image,
            gallery: '[]',
            stock: 10,
          },
        } : undefined,
      },
      include: { variants: true },
    });
    return NextResponse.json(product, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
