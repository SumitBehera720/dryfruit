import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';
import { fallbackJournalPosts } from '@/lib/fallback-data';

interface JournalRow { id: number; title: string; excerpt: string; author: string; category: string; active: number; image: string | null; date: string; }

export async function GET() {
  try {
    const posts = await query<JournalRow>('SELECT * FROM JournalPost WHERE active = 1 ORDER BY date DESC');
    return NextResponse.json(posts.map(p => ({ ...p, active: Boolean(p.active) })));
  } catch {
    return NextResponse.json(fallbackJournalPosts);
  }
}

export async function POST(request: NextRequest) {
  const payload = requireAdmin(request);
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const data = await request.json();
    await query('INSERT INTO JournalPost (title, excerpt, author, category, active, image, date) VALUES (?, ?, ?, ?, ?, ?, NOW())',
      [data.title, data.excerpt, data.author, data.category, data.active ? 1 : 0, data.image || null]);
    const created = await query<JournalRow>('SELECT * FROM JournalPost ORDER BY id DESC LIMIT 1');
    return NextResponse.json(created[0], { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to create journal post' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const payload = requireAdmin(request);
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const data = await request.json();
    await query('UPDATE JournalPost SET title=?, excerpt=?, author=?, category=?, active=?, image=? WHERE id=?',
      [data.title, data.excerpt, data.author, data.category, data.active ? 1 : 0, data.image || null, parseInt(data.id)]);
    const updated = await query<JournalRow>('SELECT * FROM JournalPost WHERE id = ? LIMIT 1', [parseInt(data.id)]);
    return NextResponse.json({ ...updated[0], active: Boolean(updated[0]?.active) });
  } catch {
    return NextResponse.json({ error: 'Failed to update journal post' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const payload = requireAdmin(request);
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const { id } = await request.json();
    await query('DELETE FROM JournalPost WHERE id = ?', [parseInt(id)]);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete journal post' }, { status: 500 });
  }
}
