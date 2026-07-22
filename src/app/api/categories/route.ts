import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';
import { fallbackCategories } from '@/lib/fallback-data';

interface CategoryRow { id: number; name: string; slug: string; gender: string; sortOrder: number; }

export async function GET() {
  try {
    const categories = await query<CategoryRow>('SELECT * FROM Category ORDER BY sortOrder ASC');
    return NextResponse.json(categories);
  } catch {
    return NextResponse.json(fallbackCategories);
  }
}

export async function POST(request: NextRequest) {
  const payload = requireAdmin(request);
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const data = await request.json();
    await query('INSERT INTO Category (name, slug, gender, sortOrder) VALUES (?, ?, ?, ?)',
      [data.name, data.slug, data.gender, data.sortOrder ?? 0]);
    const created = await query<CategoryRow>('SELECT * FROM Category WHERE slug = ? LIMIT 1', [data.slug]);
    return NextResponse.json(created[0], { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const payload = requireAdmin(request);
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const data = await request.json();
    await query('UPDATE Category SET name=?, slug=?, gender=?, sortOrder=? WHERE id=?',
      [data.name, data.slug, data.gender, data.sortOrder, data.id]);
    const updated = await query<CategoryRow>('SELECT * FROM Category WHERE id = ? LIMIT 1', [data.id]);
    return NextResponse.json(updated[0]);
  } catch {
    return NextResponse.json({ error: 'Failed to update category' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const payload = requireAdmin(request);
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { id } = await request.json();
    await query('DELETE FROM Category WHERE id = ?', [parseInt(id)]);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 });
  }
}
