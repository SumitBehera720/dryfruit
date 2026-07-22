import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';

interface ReviewRow { id: number; productId: number; author: string; rating: number; date: string; title: string; comment: string; verified: number; approved: number; }

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const payload = requireAdmin(request);
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const reviewId = parseInt(id);
  if (isNaN(reviewId)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

  try {
    const data = await request.json();
    if (data.approved !== undefined) {
      await query('UPDATE Review SET approved = ? WHERE id = ?', [data.approved ? 1 : 0, reviewId]);
    }
    const updated = await query<ReviewRow>('SELECT * FROM Review WHERE id = ? LIMIT 1', [reviewId]);
    return NextResponse.json({ ...updated[0], approved: Boolean(updated[0]?.approved) });
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
    await query('DELETE FROM Review WHERE id = ?', [reviewId]);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete review' }, { status: 500 });
  }
}
