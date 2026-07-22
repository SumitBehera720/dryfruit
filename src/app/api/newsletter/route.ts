import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';

interface SubscriberRow { id: number; email: string; createdAt: string; }

export async function GET(request: NextRequest) {
  const payload = requireAdmin(request);
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const subscribers = await query<SubscriberRow>('SELECT * FROM NewsletterSubscriber ORDER BY createdAt DESC');
    return NextResponse.json(subscribers);
  } catch { return NextResponse.json([]); }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    if (!data.email) return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    const existing = await query<SubscriberRow>('SELECT id FROM NewsletterSubscriber WHERE email = ? LIMIT 1', [data.email]);
    if (existing.length > 0) return NextResponse.json({ message: 'Already subscribed' });
    await query('INSERT INTO NewsletterSubscriber (email, createdAt) VALUES (?, NOW())', [data.email]);
    const created = await query<SubscriberRow>('SELECT * FROM NewsletterSubscriber WHERE email = ? LIMIT 1', [data.email]);
    return NextResponse.json(created[0], { status: 201 });
  } catch { return NextResponse.json({ error: 'Subscription failed' }, { status: 500 }); }
}

export async function DELETE(request: NextRequest) {
  const payload = requireAdmin(request);
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const { id } = await request.json();
    await query('DELETE FROM NewsletterSubscriber WHERE id = ?', [parseInt(id)]);
    return NextResponse.json({ success: true });
  } catch { return NextResponse.json({ error: 'Failed to remove subscriber' }, { status: 500 }); }
}
