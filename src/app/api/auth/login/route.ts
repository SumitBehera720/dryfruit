import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { comparePassword, signToken } from '@/lib/auth';
import { hashPassword } from '@/lib/auth';
import { COOKIE_NAME } from '@/lib/auth-edge';

const FALLBACK_ADMIN = {
  id: 1,
  email: 'admin@aerth.com',
  name: 'Admin',
  role: 'admin',
  password: '$2b$10$3tj4yjBtGdHHl/lmi8gP0.yib.eijC7ojU5H3l2ISvqkD82dEy8s.',
};

interface UserRow {
  id: number;
  email: string;
  name: string;
  role: string;
  password: string;
}

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    let user: UserRow | null = null;

    try {
      const rows = await query<UserRow>('SELECT id, email, name, role, password FROM User WHERE email = ? LIMIT 1', [email]);
      user = rows[0] ?? null;
    } catch {
      // DB unavailable — fall through to fallback
    }

    // Fallback admin credentials
    if (!user && email === FALLBACK_ADMIN.email) {
      const valid = await comparePassword(password, FALLBACK_ADMIN.password);
      if (!valid) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
      const token = signToken({ userId: FALLBACK_ADMIN.id, email: FALLBACK_ADMIN.email, role: FALLBACK_ADMIN.role });
      const res = NextResponse.json({ token, user: { id: FALLBACK_ADMIN.id, email: FALLBACK_ADMIN.email, name: FALLBACK_ADMIN.name, role: FALLBACK_ADMIN.role } });
      const isSecure = request.nextUrl.protocol === 'https:' || request.headers.get('x-forwarded-proto') === 'https';
      res.cookies.set(COOKIE_NAME, token, { httpOnly: true, secure: isSecure, sameSite: 'lax', path: '/', maxAge: 604800 });
      return res;
    }

    if (!user) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

    const valid = await comparePassword(password, user.password);
    if (!valid) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

    const token = signToken({ userId: user.id, email: user.email, role: user.role });
    const res = NextResponse.json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
    const isSecure = request.nextUrl.protocol === 'https:' || request.headers.get('x-forwarded-proto') === 'https';
    res.cookies.set(COOKIE_NAME, token, { httpOnly: true, secure: isSecure, sameSite: 'lax', path: '/', maxAge: 604800 });
    return res;
  } catch (e) {
    console.error('Login error:', e);
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  // Change password route
  try {
    const { email, currentPassword, newPassword } = await request.json();
    if (!email || !currentPassword || !newPassword) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }
    const rows = await query<UserRow>('SELECT id, email, name, role, password FROM User WHERE email = ? LIMIT 1', [email]);
    const user = rows[0];
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });
    const valid = await comparePassword(currentPassword, user.password);
    if (!valid) return NextResponse.json({ error: 'Invalid current password' }, { status: 401 });
    const hashed = await hashPassword(newPassword);
    await query('UPDATE User SET password = ? WHERE id = ?', [hashed, user.id]);
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error('Password change error:', e);
    return NextResponse.json({ error: 'Failed to change password' }, { status: 500 });
  }
}
