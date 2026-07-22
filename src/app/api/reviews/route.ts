import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';

interface ReviewRow { id: number; productId: number; author: string; rating: number; date: string; title: string; comment: string; verified: number; approved: number; }
interface ProductNameRow { name: string; slug: string; }

export async function GET(request: NextRequest) {
  const payload = requireAdmin(request);
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const reviews = await query<ReviewRow>('SELECT * FROM Review ORDER BY date DESC');
    const productIds = [...new Set(reviews.map(r => r.productId))];
    let productMap: Record<number, ProductNameRow> = {};
    if (productIds.length > 0) {
      const placeholders = productIds.map(() => '?').join(',');
      const products = await query<{ id: number; name: string; slug: string }>(
        `SELECT id, name, slug FROM Product WHERE id IN (${placeholders})`,
        productIds as (string | number | null)[]
      );
      productMap = Object.fromEntries(products.map(p => [p.id, { name: p.name, slug: p.slug }]));
    }
    const result = reviews.map(r => ({ ...r, product: productMap[r.productId] ?? null }));
    return NextResponse.json(result);
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    if (!data.productId || !data.author || !data.comment) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    await query(
      'INSERT INTO Review (productId, author, rating, title, comment, verified, approved, date) VALUES (?, ?, ?, ?, ?, ?, ?, NOW())',
      [parseInt(data.productId), data.author, parseInt(data.rating) || 5, data.title || 'Review', data.comment, 1, 0]
    );
    const created = await query<ReviewRow>('SELECT * FROM Review ORDER BY id DESC LIMIT 1');
    return NextResponse.json(created[0], { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to submit review' }, { status: 500 });
  }
}
