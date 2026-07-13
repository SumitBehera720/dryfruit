import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const payload = requireAdmin(request);
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const subscribers = await prisma.newsletterSubscriber.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(subscribers);
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    if (!data.email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    const existing = await prisma.newsletterSubscriber.findUnique({
      where: { email: data.email },
    });

    if (existing) {
      return NextResponse.json({ message: 'Already subscribed' });
    }

    const subscriber = await prisma.newsletterSubscriber.create({
      data: { email: data.email },
    });

    return NextResponse.json(subscriber, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Subscription failed' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const payload = requireAdmin(request);
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { id } = await request.json();
    await prisma.newsletterSubscriber.delete({ where: { id: parseInt(id) } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to remove subscriber' }, { status: 500 });
  }
}
