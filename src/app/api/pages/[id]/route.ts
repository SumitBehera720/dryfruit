import { NextRequest, NextResponse } from 'next/server';
import { updatePage, deletePage } from '@/lib/store';

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const { title, slug, content, active } = await request.json();
    const page = updatePage(parseInt(id), { title, slug, content, active });
    if (!page) return NextResponse.json({ error: 'Page not found' }, { status: 404 });
    return NextResponse.json(page);
  } catch {
    return NextResponse.json({ error: 'Failed to update page' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    if (!deletePage(parseInt(id))) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete page' }, { status: 500 });
  }
}
