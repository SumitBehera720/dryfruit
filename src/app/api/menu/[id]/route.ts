import { NextRequest, NextResponse } from 'next/server';
import { updateMenuItem, deleteMenuItem } from '@/lib/store';

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const data = await request.json();
    const item = updateMenuItem(parseInt(id), data);
    if (!item) return NextResponse.json({ error: 'Menu item not found' }, { status: 404 });
    return NextResponse.json(item);
  } catch {
    return NextResponse.json({ error: 'Failed to update menu item' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    if (!deleteMenuItem(parseInt(id))) {
      return NextResponse.json({ error: 'Menu item not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete menu item' }, { status: 500 });
  }
}
