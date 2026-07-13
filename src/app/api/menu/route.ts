import { NextRequest, NextResponse } from 'next/server';
import { getMenuItems, createMenuItem } from '@/lib/store';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const location = searchParams.get('location') || 'main';
  return NextResponse.json(getMenuItems(location));
}

export async function POST(request: NextRequest) {
  try {
    const { label, url, pageSlug, parentId, sortOrder, location, megaMenu } = await request.json();
    if (!label) {
      return NextResponse.json({ error: 'Label is required' }, { status: 400 });
    }
    const item = createMenuItem({ label, url, pageSlug, parentId, sortOrder, location, megaMenu });
    return NextResponse.json(item);
  } catch {
    return NextResponse.json({ error: 'Failed to create menu item' }, { status: 500 });
  }
}
