import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { query } from '@/lib/db';

interface UserRow { id: number; email: string; name: string; phone: string | null; role: string; }

export async function GET(request: NextRequest) {
  const payload = requireAuth(request);
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const rows = await query<UserRow>(
      'SELECT id, email, name, phone, role FROM User WHERE id = ? LIMIT 1',
      [payload.userId]
    );
    const user = rows[0];
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });
    return NextResponse.json(user);
  } catch {
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const payload = requireAuth(request);
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const { name, phone } = body;

    if (!name || !name.trim()) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    await query(
      'UPDATE User SET name = ?, phone = ? WHERE id = ?',
      [name.trim(), phone?.trim() || null, payload.userId]
    );

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
