import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';

interface QuestionRow { id: number; productId: number; user: string; question: string; answer: string | null; date: string; }

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const payload = requireAdmin(request);
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  const questionId = parseInt(id);
  if (isNaN(questionId)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  try {
    const data = await request.json();
    await query('UPDATE Question SET answer = ? WHERE id = ?', [data.answer, questionId]);
    const updated = await query<QuestionRow>('SELECT * FROM Question WHERE id = ? LIMIT 1', [questionId]);
    return NextResponse.json(updated[0]);
  } catch { return NextResponse.json({ error: 'Failed to update question' }, { status: 500 }); }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const payload = requireAdmin(request);
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  const questionId = parseInt(id);
  if (isNaN(questionId)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  try {
    await query('DELETE FROM Question WHERE id = ?', [questionId]);
    return NextResponse.json({ success: true });
  } catch { return NextResponse.json({ error: 'Failed to delete question' }, { status: 500 }); }
}
