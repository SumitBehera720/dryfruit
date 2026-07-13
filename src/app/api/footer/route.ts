import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';

const FOOTER_SETTINGS_KEY = 'footer_settings';

export async function GET() {
  try {
    const setting = await prisma.siteSetting.findUnique({
      where: { key: FOOTER_SETTINGS_KEY },
    });

    const data = setting ? JSON.parse(setting.value) : {
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
            { label: 'Contact Us', url: '/about' },
          ],
        },
        {
          title: 'Help',
          links: [
            { label: 'FAQs', url: '/about' },
            { label: 'Shipping', url: '/about' },
            { label: 'Returns', url: '/about' },
            { label: 'Size Guide', url: '/about' },
            { label: 'Terms & Conditions', url: '/about' },
            { label: 'Privacy Policy', url: '/about' },
          ],
        },
      ],
      copyright: '© 2026, AERTH. All rights reserved.',
    };

    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ socialLinks: [], columns: [], copyright: '' });
  }
}

export async function PUT(request: NextRequest) {
  const payload = requireAdmin(request);
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const data = await request.json();

    await prisma.siteSetting.upsert({
      where: { key: FOOTER_SETTINGS_KEY },
      update: { value: JSON.stringify(data) },
      create: { key: FOOTER_SETTINGS_KEY, value: JSON.stringify(data) },
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to save footer settings' }, { status: 500 });
  }
}
