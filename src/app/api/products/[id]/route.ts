import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';
import { fallbackProducts } from '@/lib/fallback-data';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const slug = id;

  try {
    const product = await prisma.product.findFirst({
      where: { OR: [{ slug }, { id: parseInt(id) || 0 }] },
      include: {
        variants: true,
        details: { orderBy: { sortOrder: 'asc' } },
        reviews: { orderBy: { date: 'desc' } },
        questions: { orderBy: { date: 'desc' } },
      },
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch {
    const found = fallbackProducts.find(p => p.slug === slug);
    if (!found) return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    return NextResponse.json(found);
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const payload = requireAdmin(request);
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const productId = parseInt(id);
  if (isNaN(productId)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

  try {
    const data = await request.json();
    const product = await prisma.product.update({
      where: { id: productId },
      data: {
        name: data.name,
        slug: data.slug,
        price: parseFloat(data.price),
        label: data.label || null,
        category: data.category,
        gender: data.gender,
        description: data.description,
        active: data.active !== undefined ? data.active : undefined,
      },
    });

    if (data.image) {
      const existingVariant = await prisma.productVariant.findFirst({
        where: { productId },
        orderBy: { id: 'asc' },
      });
      if (existingVariant) {
        await prisma.productVariant.update({
          where: { id: existingVariant.id },
          data: { image: data.image },
        });
      } else {
        await prisma.productVariant.create({
          data: {
            productId,
            colorName: 'Default',
            hex: '#000000',
            image: data.image,
            gallery: '[]',
            stock: 10,
          },
        });
      }
    }

    const updated = await prisma.product.findUnique({
      where: { id: productId },
      include: { variants: true },
    });

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const payload = requireAdmin(request);
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const productId = parseInt(id);
  if (isNaN(productId)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

  try {
    await prisma.product.delete({ where: { id: productId } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
