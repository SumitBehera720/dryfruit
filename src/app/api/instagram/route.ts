import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { getSettings, saveSettings } from '@/lib/settings-store';

const INSTAGRAM_KEY = 'instagram_gallery';

const defaultGallery = [
  { id: '1', image: '/images/dryfruit_almonds.png', link: 'https://instagram.com' },
  { id: '2', image: '/images/dryfruit_cashews.png', link: 'https://instagram.com' },
  { id: '3', image: '/images/dryfruit_pistachios.png', link: 'https://instagram.com' },
  { id: '4', image: '/images/dryfruit_dates.png', link: 'https://instagram.com' },
];

export async function GET() {
  try {
    const all = await getSettings();
    if (all[INSTAGRAM_KEY]) {
      return NextResponse.json(JSON.parse(all[INSTAGRAM_KEY]));
    }
    return NextResponse.json(defaultGallery);
  } catch {
    return NextResponse.json(defaultGallery);
  }
}

export async function PUT(request: NextRequest) {
  const payload = requireAdmin(request);
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const data = await request.json();
    await saveSettings({ [INSTAGRAM_KEY]: JSON.stringify(data) });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to save settings' }, { status: 500 });
  }
}
