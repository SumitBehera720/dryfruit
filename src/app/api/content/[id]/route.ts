import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const payload = requireAdmin(request);
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const contentId = parseInt(id);
  if (isNaN(contentId)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

  try {
    const data = await request.json();
    const content = await prisma.contentSection.update({
      where: { id: contentId },
      data,
    });
    return NextResponse.json(content);
  } catch {
    return NextResponse.json({ error: 'Failed to update content' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const payload = requireAdmin(request);
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const contentId = parseInt(id);
  if (isNaN(contentId)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

  try {
    await prisma.contentSection.delete({ where: { id: contentId } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete content' }, { status: 500 });
  }
}
