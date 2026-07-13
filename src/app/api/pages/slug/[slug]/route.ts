import { NextResponse } from 'next/server';
import { getPageBySlug } from '@/lib/store';

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getPageBySlug(slug);
  if (!page) return NextResponse.json(null, { status: 404 });
  return NextResponse.json(page);
}
