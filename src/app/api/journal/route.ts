import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';
import { fallbackJournalPosts } from '@/lib/fallback-data';

export async function GET() {
  try {
    const posts = await prisma.journalPost.findMany({
      where: { active: true },
      orderBy: { date: 'desc' },
    });
    return NextResponse.json(posts);
  } catch {
    return NextResponse.json(fallbackJournalPosts);
  }
}

export async function POST(request: NextRequest) {
  const payload = requireAdmin(request);
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const data = await request.json();
    const post = await prisma.journalPost.create({ data });
    return NextResponse.json(post, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to create journal post' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const payload = requireAdmin(request);
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const data = await request.json();
    const post = await prisma.journalPost.update({
      where: { id: parseInt(data.id) },
      data: {
        title: data.title,
        excerpt: data.excerpt,
        author: data.author,
        category: data.category,
        active: data.active,
        image: data.image || null,
      },
    });
    return NextResponse.json(post);
  } catch {
    return NextResponse.json({ error: 'Failed to update journal post' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const payload = requireAdmin(request);
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { id } = await request.json();
    await prisma.journalPost.delete({ where: { id: parseInt(id) } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete journal post' }, { status: 500 });
  }
}
