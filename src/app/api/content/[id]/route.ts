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
    await query('UPDATE ContentSection SET page=?, section=?, title=?, body=?, image=?, sortOrder=? WHERE id=?',
      [data.page, data.section, data.title || null, data.body || null, data.image || null, data.sortOrder ?? 0, contentId]);
    const updated = await query<ContentRow>('SELECT * FROM ContentSection WHERE id = ? LIMIT 1', [contentId]);
    return NextResponse.json(updated[0]);
  } catch { return NextResponse.json({ error: 'Failed to update content' }, { status: 500 }); }
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
  } catch { return NextResponse.json({ error: 'Failed to delete content' }, { status: 500 }); }
}
