import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';

interface QuestionRow { id: number; productId: number; user: string; question: string; answer: string | null; date: string; }

export async function GET(request: NextRequest) {
  const payload = requireAdmin(request);
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const questions = await query<QuestionRow>('SELECT * FROM Question ORDER BY date DESC');
    const productIds = [...new Set(questions.map(q => q.productId))];
    let productMap: Record<number, { name: string; slug: string }> = {};
    if (productIds.length > 0) {
      const ph = productIds.map(() => '?').join(',');
      const products = await query<{ id: number; name: string; slug: string }>(
        `SELECT id, name, slug FROM Product WHERE id IN (${ph})`, productIds as (string | number | null)[]
      );
      productMap = Object.fromEntries(products.map(p => [p.id, { name: p.name, slug: p.slug }]));
    }
    return NextResponse.json(questions.map(q => ({ ...q, product: productMap[q.productId] ?? null })));
  } catch { return NextResponse.json([]); }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    if (!data.productId || !data.user || !data.question) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    await query('INSERT INTO Question (productId, user, question, answer, date) VALUES (?, ?, ?, NULL, NOW())',
      [parseInt(data.productId), data.user, data.question]);
    const created = await query<QuestionRow>('SELECT * FROM Question ORDER BY id DESC LIMIT 1');
    return NextResponse.json(created[0], { status: 201 });
  } catch { return NextResponse.json({ error: 'Failed to submit question' }, { status: 500 }); }
}
