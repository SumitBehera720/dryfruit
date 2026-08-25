import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const hashed = await bcrypt.hash('admin123', 10);
  await prisma.user.upsert({
    where: { email: 'admin@aerth.com' },
    update: {},
    create: {
      email: 'admin@aerth.com',
      password: hashed,
      name: 'AERTH Admin',
      role: 'admin',
    },
  });

  // Create site settings
  const settings = [
    { key: 'site_name', value: 'Organic Traditions' },
    { key: 'maintenance_mode', value: 'false' },
    { key: 'free_shipping_threshold', value: '1499' },
    { key: 'return_policy', value: 'Freshness Guaranteed. 7-day hassle-free replacement or return.' },
  ];
  for (const s of settings) {
    await prisma.siteSetting.upsert({
      where: { key: s.key },
      update: { value: s.value },
      create: s,
    });
  }

  // Create categories
  const categories = [
    { slug: 'nuts', name: 'Nuts & Kernels', gender: 'all', sortOrder: 1 },
    { slug: 'dried-fruits', name: 'Dried Fruits & Dates', gender: 'all', sortOrder: 2 },
    { slug: 'adaptogens', name: 'Adaptogens & Powders', gender: 'all', sortOrder: 3 },
    { slug: 'elixirs', name: 'Functional Elixirs', gender: 'all', sortOrder: 4 },
    { slug: 'seeds', name: 'Seeds & Mixes', gender: 'all', sortOrder: 5 },
    { slug: 'trail-mixes', name: 'Trail Mixes & Snacks', gender: 'all', sortOrder: 6 },
    { slug: 'gifting', name: 'Artisanal Gifting', gender: 'all', sortOrder: 7 },
  ];
  for (const c of categories) {
    await prisma.category.upsert({
      where: { slug: c.slug },
      update: {},
      create: c,
    });
  }

  // Create products with all data
  await prisma.product.upsert({
    where: { slug: 'royal-californian-almonds' },
    update: {},
    create: {
      slug: 'royal-californian-almonds',
      name: 'Royal Californian Mamra Almonds',
      price: 899,
      salePrice: 799,
      label: 'BESTSELLER',
      category: 'nuts',
      gender: 'daily',
      description: 'Handpicked premium Californian Mamra Almonds rich in Vitamin E, Magnesium, and plant-based protein. Slow-roasted to perfection for an irresistible crunch and buttery taste.',
      variants: {
        create: [
          {
            colorName: '500g Pack',
            hex: '#D97706',
            image: '/images/product_plum_leggings.png',
            images: JSON.stringify(['/images/product_plum_leggings.png', '/images/hero_bg.png']),
          },
          {
            colorName: '1kg Value Pack',
            hex: '#92400E',
            image: '/images/product_black_leggings.png',
            images: JSON.stringify(['/images/product_black_leggings.png']),
          },
        ],
      },
      details: {
        create: [
          { text: '100% Raw, Organic & Sun-dried Mamra Almonds', sortOrder: 1 },
          { text: 'Rich in Vitamin E, Omega-3 fatty acids, and Antioxidants', sortOrder: 2 },
          { text: 'Boosts brain activity, memory retention, and heart health', sortOrder: 3 },
          { text: 'Zero cholesterol, non-GMO, and gluten-free', sortOrder: 4 },
          { text: 'Vacuum-sealed packaging to preserve natural freshness and crunch', sortOrder: 5 },
        ],
      },
      reviews: {
        create: [
          { author: 'Rohan Sharma', rating: 5, date: new Date('2026-06-15'), title: 'Superb quality and freshness!', comment: 'These almonds are noticeably larger and crunchier than regular store bought ones. Very crisp and buttery taste!', verified: true, approved: true },
        ],
      },
      questions: {
        create: [
          { user: 'Pooja K.', question: 'Are these almonds raw or roasted?', date: new Date('2026-06-18'), answer: 'Our Royal Mamra Almonds are 100% raw, unroasted, and free from any added salt or oils.' },
        ],
      },
    },
  });

  await prisma.product.upsert({
    where: { slug: 'king-jumbo-cashews' },
    update: {},
    create: {
      slug: 'king-jumbo-cashews',
      name: 'King Jumbo W240 Cashews',
      price: 999,
      salePrice: 899,
      label: 'PREMIUM',
      category: 'nuts',
      gender: 'daily',
      description: 'Whole, unbroken W240 grade King Jumbo Cashews sourced directly from organic orchards. Naturally sweet, creamy, and packed with essential minerals.',
      variants: {
        create: [
          {
            colorName: '500g Pack',
            hex: '#F59E0B',
            image: '/images/product_black_flare.png',
            images: JSON.stringify(['/images/product_black_flare.png']),
          },
        ],
      },
      details: {
        create: [
          { text: 'Grade W240 King Size Whole Cashew Nuts', sortOrder: 1 },
          { text: 'Rich source of Zinc, Copper, and healthy monounsaturated fats', sortOrder: 2 },
          { text: 'Creamy texture with no artificial flavorings or preservatives', sortOrder: 3 },
        ],
      },
      reviews: {
        create: [
          { author: 'Vikram Mehta', rating: 5, date: new Date('2026-06-10'), title: 'Huge size and rich taste', comment: 'Every single cashew in the box is whole and large. Premium quality packaging!', verified: true, approved: true },
        ],
      },
      questions: {
        create: [
          { user: 'Siddharth M.', question: 'Is there any salt added?', date: new Date('2026-06-12'), answer: 'No, these King Jumbo Cashews are completely plain and unsalted.' },
        ],
      },
    },
  });

  // Create content sections
  const contentSections = [
    {
      page: 'home',
      section: 'hero',
      title: 'Purity From Earth.',
      subtitle: '100% Organic Dry Fruits & Superfoods.',
      description: 'Handpicked raw almonds, jumbo cashews, dates, and artisanal superfoods packed fresh for your daily health.',
      image: '/images/hero_bg.png',
      linkUrl: '/shop',
      linkText: 'Explore Catalog',
      sortOrder: 1,
    },
    {
      page: 'home',
      section: 'brand_story',
      title: 'Nurtured by Nature. Delivered Pure.',
      subtitle: 'Our Promise',
      description: 'We source directly from certified organic orchards across California, Kashmir, Arabia, and Iran to deliver farm-fresh dry fruits with zero additives or preservatives.',
      image: '/images/story_bg.png',
      sortOrder: 2,
    },
  ];

  for (const cs of contentSections) {
    await prisma.contentSection.create({ data: cs });
  }

  // Create journal posts
  const journalPosts = [
    {
      title: '5 Daily Superfoods to Boost Immunity & Natural Energy',
      excerpt: 'Discover how integrating raw almonds, walnuts, and chia seeds into your daily diet unlocks lasting energy.',
      author: 'Dr. Ananya Roy',
      category: 'Wellness',
      date: new Date('2026-06-25'),
    },
    {
      title: 'Why Raw Walnuts & Almonds Are the Ultimate Brain Food',
      excerpt: 'Scientific research highlights the cognitive benefits of Omega-3 rich dry fruits for focus and memory.',
      author: 'Chef Kabir Sharma',
      category: 'Nutrition',
      date: new Date('2026-06-18'),
    },
    {
      title: 'The Art of Artisanal Dry Fruit Gifting for Celebrations',
      excerpt: 'How curated hampers of raw nuts, dates, and saffron elevate festive occasions and corporate gifting.',
      author: 'AERTH Gourmet Lab',
      category: 'Lifestyle',
      date: new Date('2026-05-29'),
    },
  ];

  for (const jp of journalPosts) {
    await prisma.journalPost.create({ data: jp });
  }

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
