import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';
import { fallbackContent } from '@/lib/fallback-data';

interface ContentRow { id: number; page: string; section: string; title: string | null; body: string | null; image: string | null; sortOrder: number; }

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page');
    if (page) {
      const content = await query<ContentRow>('SELECT * FROM ContentSection WHERE page = ? ORDER BY page ASC, sortOrder ASC', [page]);
      return NextResponse.json(content);
    }
    const content = await query<ContentRow>('SELECT * FROM ContentSection ORDER BY page ASC, sortOrder ASC');
    return NextResponse.json(content);
  } catch {
    return NextResponse.json(fallbackContent);
  }
}

export async function POST(request: NextRequest) {
  const payload = requireAdmin(request);
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const data = await request.json();
    await query('INSERT INTO ContentSection (page, section, title, body, image, sortOrder) VALUES (?, ?, ?, ?, ?, ?)',
      [data.page, data.section, data.title || null, data.body || null, data.image || null, data.sortOrder ?? 0]);
    const created = await query<ContentRow>('SELECT * FROM ContentSection ORDER BY id DESC LIMIT 1');
    return NextResponse.json(created[0], { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to create content' }, { status: 500 });
  }
}
