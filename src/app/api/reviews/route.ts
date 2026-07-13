import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const payload = requireAdmin(request);
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const reviews = await prisma.review.findMany({
    include: { product: { select: { name: true, slug: true } } },
    orderBy: { date: 'desc' },
  });

  return NextResponse.json(reviews);
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    if (!data.productId || !data.author || !data.comment) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const review = await prisma.review.create({
      data: {
        productId: parseInt(data.productId),
        author: data.author,
        rating: parseInt(data.rating) || 5,
        title: data.title || 'Review',
        comment: data.comment,
        verified: true,
        approved: false,
      },
    });

    return NextResponse.json(review, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to submit review' }, { status: 500 });
  }
}
