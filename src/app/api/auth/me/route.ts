import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { query } from '@/lib/db';

const FALLBACK_USER = { id: 1, email: 'admin@aerth.com', name: 'Admin', role: 'admin' };

interface UserRow { id: number; email: string; name: string; role: string; }

export async function GET(request: NextRequest) {
  const payload = requireAdmin(request);
  if (!payload) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const rows = await query<UserRow>('SELECT id, email, name, role FROM User WHERE id = ? LIMIT 1', [payload.userId]);
    const user = rows[0];
    if (!user) return NextResponse.json(FALLBACK_USER);
    return NextResponse.json(user);
  } catch {
    return NextResponse.json(FALLBACK_USER);
  }
}
