import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';

interface ContentRow { id: number; page: string; section: string; title: string | null; body: string | null; image: string | null; sortOrder: number; }

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const payload = requireAdmin(request);
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  const contentId = parseInt(id);
  if (isNaN(contentId)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  try {
    const data = await request.json();
    const existing = await query<ContentRow>('SELECT * FROM ContentSection WHERE id = ? LIMIT 1', [contentId]);
    if (!existing[0]) {
      return NextResponse.json({ error: 'Content section not found' }, { status: 404 });
    }
    const current = existing[0] as unknown as Record<string, unknown>;

    await query(
      'UPDATE ContentSection SET page=?, section=?, title=?, subtitle=?, description=?, image=?, linkUrl=?, linkText=?, sortOrder=?, active=?, updatedAt=NOW() WHERE id=?',
      [
        data.page ?? current.page ?? 'home',
        data.section ?? current.section ?? 'hero',
        data.title !== undefined ? data.title : current.title,
        data.subtitle !== undefined ? data.subtitle : current.subtitle,
        data.description !== undefined ? data.description : current.description,
        data.image !== undefined ? data.image : current.image,
        data.linkUrl !== undefined ? data.linkUrl : current.linkUrl,
        data.linkText !== undefined ? data.linkText : current.linkText,
        data.sortOrder !== undefined ? data.sortOrder : (current.sortOrder ?? 0),
        data.active !== undefined ? (data.active ? 1 : 0) : (current.active ?? 1),
        contentId
      ]
    );
    const updated = await query<ContentRow>('SELECT * FROM ContentSection WHERE id = ? LIMIT 1', [contentId]);
    return NextResponse.json(updated[0]);
  } catch (err) {
    const error = err as Error;
    console.error(`[ERROR] Content Section PUT error for ID ${contentId}:`, error);
    return NextResponse.json({ error: error.message || 'Failed to update content' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const payload = requireAdmin(request);
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  const contentId = parseInt(id);
  if (isNaN(contentId)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  try {
    await query('DELETE FROM ContentSection WHERE id = ?', [contentId]);
    return NextResponse.json({ success: true });
  } catch (err) {
    const error = err as Error;
    console.error(`[ERROR] Content Section DELETE error for ID ${contentId}:`, error);
    return NextResponse.json({ error: error.message || 'Failed to delete content' }, { status: 500 });
  }
}
