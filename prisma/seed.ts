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
    { key: 'site_name', value: 'AERTH' },
    { key: 'maintenance_mode', value: 'false' },
    { key: 'free_shipping_threshold', value: '3999' },
    { key: 'return_policy', value: '14-day hassle-free return and exchange policy.' },
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
    { slug: 'leggings', name: 'Leggings', gender: 'women', sortOrder: 1 },
    { slug: 'shorts', name: 'Shorts', gender: 'women', sortOrder: 2 },
    { slug: 'bras', name: 'Sports Bras', gender: 'women', sortOrder: 3 },
    { slug: 'tops', name: 'Training Tees', gender: 'men', sortOrder: 4 },
    { slug: 'jackets', name: 'Track Jackets', gender: 'men', sortOrder: 5 },
  ];
  for (const c of categories) {
    await prisma.category.upsert({
      where: { slug: c.slug },
      update: {},
      create: c,
    });
  }

  // Create products with all data
  const contourLeggings = await prisma.product.upsert({
    where: { slug: 'contour-leggings' },
    update: {},
    create: {
      slug: 'contour-leggings',
      name: 'Contour Leggings',
      price: 3599,
      label: 'NEW',
      category: 'leggings',
      gender: 'women',
      description: 'Engineered with a high-performance compression waistband, our signature Contour Leggings naturally shape and lift your silhouette. Squat-proof, breathable, and finished with a seamless fit that acts like a second skin.',
      variants: {
        create: [
          {
            colorName: 'Earthstone Plum',
            hex: '#4A3546',
            image: '/images/product_plum_leggings.png',
            gallery: JSON.stringify(['/images/product_plum_leggings.png', '/images/infographic_leggings.png', '/images/hero_bg.png']),
          },
          {
            colorName: 'Obsidian Black',
            hex: '#181818',
            image: '/images/product_black_leggings.png',
            gallery: JSON.stringify(['/images/product_black_leggings.png', '/images/infographic_leggings.png']),
          },
        ],
      },
      details: {
        create: [
          { text: '1.5cm higher waistband for added coverage', sortOrder: 1 },
          { text: 'High compression waistband for tummy control', sortOrder: 2 },
          { text: 'Invisible glute scrunch to naturally lift and shape', sortOrder: 3 },
          { text: 'Squat-proof, four-way stretch fabric', sortOrder: 4 },
          { text: 'Seamless finish prevents friction and irritation', sortOrder: 5 },
        ],
      },
      reviews: {
        create: [
          { author: 'Sarah M.', rating: 5, date: new Date('2026-05-12'), title: 'Absolutely love the fit!', comment: 'These are the best leggings I own. The compression is perfect and they do not slide down during heavy squats. The plum color is stunning!', verified: true, approved: true },
          { author: 'Neha R.', rating: 5, date: new Date('2026-06-02'), title: 'Actually squat proof!', comment: 'I was skeptical about the squat-proof claim, but these leggings are completely opaque. Material feels premium and soft.', verified: true, approved: true },
        ],
      },
      questions: {
        create: [
          { user: 'Pooja K.', question: 'Does the waistband roll down during workouts?', date: new Date('2026-05-20'), answer: 'Hi Pooja! The Contour Leggings feature a double-layered high-compression waistband that is designed to stay firmly in place without rolling down.' },
        ],
      },
    },
  });

  const flareLeggings = await prisma.product.upsert({
    where: { slug: 'aurora-flare-leggings' },
    update: {},
    create: {
      slug: 'aurora-flare-leggings',
      name: 'Aurora Flare Leggings',
      price: 3799,
      label: 'NEW',
      category: 'leggings',
      gender: 'women',
      description: 'Transition seamlessly from the studio to the street. The Aurora Flare Leggings combine high-waisted support with a chic flared hemline, making them as versatile as they are comfortable.',
      variants: {
        create: [
          {
            colorName: 'Obsidian Black',
            hex: '#181818',
            image: '/images/product_black_flare.png',
            gallery: JSON.stringify(['/images/product_black_flare.png', '/images/product_black_leggings.png']),
          },
        ],
      },
      details: {
        create: [
          { text: 'Flattering bootcut flare silhouette', sortOrder: 1 },
          { text: 'Double-layer compression waistband', sortOrder: 2 },
          { text: 'Ultra-soft brushed performance fabric', sortOrder: 3 },
          { text: 'Moisture-wicking and quick-drying', sortOrder: 4 },
          { text: 'Ideal for low to medium-impact activities', sortOrder: 5 },
        ],
      },
      reviews: {
        create: [
          { author: 'Riya S.', rating: 5, date: new Date('2026-06-10'), title: 'Super flattering and comfy', comment: 'The flare is just right, and they hug my waist perfectly. Great for travel and yoga!', verified: true, approved: true },
        ],
      },
      questions: {
        create: [
          { user: 'Tanya G.', question: 'Are these suitable for running?', date: new Date('2026-06-15'), answer: 'Hi Tanya! While they can be worn for runs, they are designed with yoga, training, and lifestyle wear in mind. For high-intensity runs, we recommend our classic compression Contour Leggings.' },
        ],
      },
    },
  });

  await prisma.product.upsert({
    where: { slug: 'contour-shorts' },
    update: {},
    create: {
      slug: 'contour-shorts',
      name: 'Contour Shorts 5"',
      price: 2799,
      label: 'NEW',
      category: 'shorts',
      gender: 'women',
      description: 'Our signature sculpting technology in a mid-thigh active short. Designed to stay in place, prevent riding up, and shape your curves during high-intensity training.',
      variants: {
        create: [
          {
            colorName: 'Obsidian Black',
            hex: '#181818',
            image: '/images/product_black_shorts.png',
            gallery: JSON.stringify(['/images/product_black_shorts.png', '/images/product_black_leggings.png']),
          },
        ],
      },
      details: {
        create: [
          { text: '5-inch inseam prevents riding up', sortOrder: 1 },
          { text: 'Glute sculpting contour design lines', sortOrder: 2 },
          { text: 'High-rise compression waistband', sortOrder: 3 },
          { text: 'Breathable, lightweight four-way stretch fabric', sortOrder: 4 },
          { text: 'Zero front seam for clean lines', sortOrder: 5 },
        ],
      },
      reviews: {
        create: [
          { author: 'Kiara D.', rating: 4, date: new Date('2026-06-11'), title: 'Perfect for summer runs', comment: "Very comfortable and doesn't ride up! Docked one star because I wish there were side pockets.", verified: true, approved: true },
        ],
      },
    },
  });

  const mensTee = await prisma.product.upsert({
    where: { slug: 'mens-aeroweave-tee' },
    update: {},
    create: {
      slug: 'mens-aeroweave-tee',
      name: 'AeroWeave Training Tee',
      price: 2999,
      label: 'NEW',
      category: 'tops',
      gender: 'men',
      description: 'Engineered with high-ventilation AeroWeave mesh, this lightweight training tee offers maximum breathability and sweat-wicking performance for high-intensity training sessions. Features an athletic ergonomic cut for zero distractions.',
      variants: {
        create: [
          {
            colorName: 'Heather Grey',
            hex: '#8C92AC',
            image: '/images/product_mens_tee.png',
            gallery: JSON.stringify(['/images/product_mens_tee.png']),
          },
          {
            colorName: 'Obsidian Black',
            hex: '#181818',
            image: '/images/product_mens_tee.png',
            gallery: JSON.stringify(['/images/product_mens_tee.png']),
          },
        ],
      },
      details: {
        create: [
          { text: 'Ultra-lightweight AeroWeave mesh fabric', sortOrder: 1 },
          { text: 'Sweat-wicking, quick-drying performance yarn', sortOrder: 2 },
          { text: 'Four-way stretch for unrestricted arm movement', sortOrder: 3 },
          { text: 'Flatlock seams prevent chafing during high intensity reps', sortOrder: 4 },
          { text: 'Classic minimalist crewneck design', sortOrder: 5 },
        ],
      },
    },
  });

  // Create content sections
  const contentSections = [
    {
      page: 'home',
      section: 'hero',
      title: 'Made For Movement.',
      subtitle: 'Built Between Air and Earth.',
      description: 'Performance apparel that moves with you. Breathe freely. Stand firm. Progress always.',
      image: '/images/hero_bg.png',
      linkUrl: '/shop?gender=women',
      linkText: 'Shop Women',
      sortOrder: 1,
    },
    {
      page: 'home',
      section: 'brand_story',
      title: 'Inspired by Air. Grounded in Earth.',
      subtitle: 'Our Story',
      description: 'Air represents freedom, energy, and possibility. Earth represents strength, stability, and resilience. Between these forces exists every movement we make, every challenge we face, and every goal we pursue. That balance is the foundation of AERTH.',
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
      title: 'Finding Balance: Between Air and Earth',
      excerpt: 'How mindfulness and high-compression support transformed my morning yoga routine and mental stability.',
      author: 'Priya Sharma',
      category: 'Mindfulness',
      date: new Date('2026-06-25'),
    },
    {
      title: 'Chasing Pace: Half-Marathon Training Essentials',
      excerpt: 'Our runners break down the optimal fit of flare leggings and moisture-wicking bras over long-distance routes.',
      author: 'Jessica Mercer',
      category: 'Running',
      date: new Date('2026-06-18'),
    },
    {
      title: 'Brutalist Architecture & High-Fashion Activewear',
      excerpt: 'Exploring the aesthetic inspiration behind our latest colorways, concrete structures, and seamless silhouettes.',
      author: 'AERTH Design Lab',
      category: 'Design',
      date: new Date('2026-05-29'),
    },
    {
      title: 'The Evolution of Seamless Activewear Knitwear',
      excerpt: 'How engineered knitting technology achieves zero friction, double density stretch, and structural panels without sewing seams.',
      author: 'Dr. Elena Rostova',
      category: 'Technology',
      date: new Date('2026-04-14'),
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
