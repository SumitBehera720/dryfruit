import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { getSettings, saveSettings } from '@/lib/settings-store';

const FOOTER_KEY = 'footer_settings';

const defaultFooter = {
  socialLinks: [
    { platform: 'Instagram', url: '', icon: 'instagram' },
    { platform: 'Facebook', url: '', icon: 'facebook' },
    { platform: 'YouTube', url: '', icon: 'youtube' },
    { platform: 'Pinterest', url: '', icon: 'pinterest' },
  ],
  columns: [
    {
      title: 'Shop',
      links: [
        { label: 'All Products', url: '/shop' },
        { label: 'Women', url: '/shop?gender=women' },
        { label: 'Men', url: '/shop?gender=men' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', url: '/about' },
        { label: 'Contact Us', url: '/about#contact' },
      ],
    },
    {
      title: 'Help',
      links: [
        { label: 'FAQs', url: '/faqs' },
        { label: 'Shipping', url: '/shipping' },
        { label: 'Returns', url: '/returns' },
        { label: 'Size Guide', url: '/size-guide' },
        { label: 'Terms & Conditions', url: '/terms' },
        { label: 'Privacy Policy', url: '/privacy' },
      ],
    },
  ],
  copyright: '\u00A9 2026, AERTH. All rights reserved.',
};

export async function GET() {
  try {
    const all = await getSettings();
    if (all[FOOTER_KEY]) {
      return NextResponse.json(JSON.parse(all[FOOTER_KEY]));
    }
    return NextResponse.json(defaultFooter);
  } catch {
    return NextResponse.json(defaultFooter);
  }
}

export async function PUT(request: NextRequest) {
  const payload = requireAdmin(request);
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const data = await request.json();
    await saveSettings({ [FOOTER_KEY]: JSON.stringify(data) });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to save footer settings' }, { status: 500 });
  }
}
