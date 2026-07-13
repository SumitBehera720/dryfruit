import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const payload = requireAdmin(request);
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const reviewId = parseInt(id);
  if (isNaN(reviewId)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

  try {
    const data = await request.json();
    const review = await prisma.review.update({
      where: { id: reviewId },
      data: {
        approved: data.approved !== undefined ? data.approved : undefined,
      },
    });
    return NextResponse.json(review);
  } catch {
    return NextResponse.json({ error: 'Failed to update review' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const payload = requireAdmin(request);
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const reviewId = parseInt(id);
  if (isNaN(reviewId)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

  try {
    await prisma.review.delete({ where: { id: reviewId } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete review' }, { status: 500 });
  }
}
