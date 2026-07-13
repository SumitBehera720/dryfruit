import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const payload = requireAdmin(request);
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const questions = await prisma.question.findMany({
    include: { product: { select: { name: true, slug: true } } },
    orderBy: { date: 'desc' },
  });

  return NextResponse.json(questions);
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    if (!data.productId || !data.user || !data.question) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const question = await prisma.question.create({
      data: {
        productId: parseInt(data.productId),
        user: data.user,
        question: data.question,
      },
    });

    return NextResponse.json(question, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to submit question' }, { status: 500 });
  }
}
