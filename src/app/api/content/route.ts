import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';
import { fallbackContent } from '@/lib/fallback-data';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page');

    const where: Record<string, unknown> = {};
    if (page) where.page = page;

    const content = await prisma.contentSection.findMany({
      where,
      orderBy: [{ page: 'asc' }, { sortOrder: 'asc' }],
    });

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
    const content = await prisma.contentSection.create({ data });
    return NextResponse.json(content, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to create content' }, { status: 500 });
  }
}
