import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const payload = requireAdmin(request);
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const questionId = parseInt(id);
  if (isNaN(questionId)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

  try {
    const data = await request.json();
    const question = await prisma.question.update({
      where: { id: questionId },
      data: { answer: data.answer },
    });
    return NextResponse.json(question);
  } catch {
    return NextResponse.json({ error: 'Failed to update question' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const payload = requireAdmin(request);
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const questionId = parseInt(id);
  if (isNaN(questionId)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

  try {
    await prisma.question.delete({ where: { id: questionId } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete question' }, { status: 500 });
  }
}
