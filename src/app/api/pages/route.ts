import { NextRequest, NextResponse } from 'next/server';
import { getPages, createPage } from '@/lib/store';

export async function GET() {
  return NextResponse.json(getPages());
}

export async function POST(request: NextRequest) {
  try {
    const { title, slug, content, active } = await request.json();
    if (!title || !slug) {
      return NextResponse.json({ error: 'Title and slug are required' }, { status: 400 });
    }
    const page = createPage({ title, slug, content: content || '', active: active ?? true });
    return NextResponse.json(page);
  } catch {
    return NextResponse.json({ error: 'Failed to create page' }, { status: 500 });
  }
}
