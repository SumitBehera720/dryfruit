export const fallbackProducts = [
  {
    id: 1, slug: 'contour-leggings', name: 'Contour Leggings', price: 3599, label: 'NEW',
    category: 'leggings', gender: 'women', active: true,
    description: 'Engineered with a high-performance compression waistband, our signature Contour Leggings naturally shape and lift your silhouette. Squat-proof, breathable, and finished with a seamless fit that acts like a second skin.',
    variants: [
      { id: 1, colorName: 'Earthstone Plum', hex: '#4A3546', image: '/images/product_plum_leggings.png', images: '["/images/product_plum_leggings.png","/images/infographic_leggings.png","/images/hero_bg.png"]', stock: 10 },
      { id: 2, colorName: 'Obsidian Black', hex: '#181818', image: '/images/product_black_leggings.png', images: '["/images/product_black_leggings.png","/images/infographic_leggings.png"]', stock: 10 },
    ],
    details: [
      { id: 1, text: '1.5cm higher waistband for added coverage', sortOrder: 1 },
      { id: 2, text: 'High compression waistband for tummy control', sortOrder: 2 },
      { id: 3, text: 'Invisible glute scrunch to naturally lift and shape', sortOrder: 3 },
      { id: 4, text: 'Squat-proof, four-way stretch fabric', sortOrder: 4 },
      { id: 5, text: 'Seamless finish prevents friction and irritation', sortOrder: 5 },
    ],
    reviews: [
      { id: 1, author: 'Sarah M.', rating: 5, date: '2026-05-12', title: 'Absolutely love the fit!', comment: 'The best leggings I own. Compression is perfect and they do not slide down during heavy squats.', verified: true, approved: true },
    ],
    questions: [
      { id: 1, user: 'Pooja K.', question: 'Does the waistband roll down during workouts?', date: '2026-05-20', answer: 'The Contour Leggings feature a double-layered high-compression waistband designed to stay firmly in place.' },
    ],
  },
  {
    id: 2, slug: 'aurora-flare-leggings', name: 'Aurora Flare Leggings', price: 3799, label: 'NEW',
    category: 'leggings', gender: 'women', active: true,
    description: 'Transition seamlessly from the studio to the street. The Aurora Flare Leggings combine high-waisted support with a chic flared hemline.',
    variants: [
      { id: 3, colorName: 'Obsidian Black', hex: '#181818', image: '/images/product_black_flare.png', images: '["/images/product_black_flare.png","/images/product_black_leggings.png"]', stock: 10 },
    ],
    details: [
      { id: 6, text: 'Flattering bootcut flare silhouette', sortOrder: 1 },
      { id: 7, text: 'Double-layer compression waistband', sortOrder: 2 },
      { id: 8, text: 'Ultra-soft brushed performance fabric', sortOrder: 3 },
    ],
    reviews: [
      { id: 3, author: 'Riya S.', rating: 5, date: '2026-06-10', title: 'Super flattering and comfy', comment: 'The flare is just right, and they hug my waist perfectly.', verified: true, approved: true },
    ],
    questions: [
      { id: 2, user: 'Tanya G.', question: 'Are these suitable for running?', date: '2026-06-15', answer: 'While they can be worn for runs, they are designed with yoga and lifestyle wear in mind.' },
    ],
  },
  {
    id: 3, slug: 'contour-shorts', name: 'Contour Shorts 5"', price: 2799, label: 'NEW',
    category: 'shorts', gender: 'women', active: true,
    description: 'Our signature sculpting technology in a mid-thigh active short.',
    variants: [
      { id: 4, colorName: 'Obsidian Black', hex: '#181818', image: '/images/product_black_shorts.png', images: '["/images/product_black_shorts.png","/images/product_black_leggings.png"]', stock: 10 },
    ],
    details: [
      { id: 11, text: '5-inch inseam prevents riding up', sortOrder: 1 },
      { id: 12, text: 'Glute sculpting contour design lines', sortOrder: 2 },
    ],
    reviews: [],
    questions: [],
  },
  {
    id: 4, slug: 'mens-aeroweave-tee', name: 'AeroWeave Training Tee', price: 2999, label: 'NEW',
    category: 'tops', gender: 'men', active: true,
    description: 'Engineered with high-ventilation AeroWeave mesh.',
    variants: [
      { id: 5, colorName: 'Heather Grey', hex: '#8C92AC', image: '/images/product_mens_tee.png', images: '["/images/product_mens_tee.png"]', stock: 10 },
      { id: 6, colorName: 'Obsidian Black', hex: '#181818', image: '/images/product_mens_tee.png', images: '["/images/product_mens_tee.png"]', stock: 10 },
    ],
    details: [
      { id: 16, text: 'Ultra-lightweight AeroWeave mesh fabric', sortOrder: 1 },
      { id: 17, text: 'Sweat-wicking, quick-drying performance yarn', sortOrder: 2 },
    ],
    reviews: [],
    questions: [],
  },
];

export const fallbackSettings: Record<string, string> = {
  site_name: 'AERTH',
  maintenance_mode: 'false',
  free_shipping_threshold: '3999',
  return_policy: '14-day hassle-free return and exchange policy.',
};

export const fallbackJournalPosts = [
  { id: 1, title: 'Finding Balance: Between Air and Earth', excerpt: 'How mindfulness and high-compression support transformed my morning yoga routine and mental stability.', author: 'Priya Sharma', category: 'Mindfulness', date: '2026-06-25', active: true },
  { id: 2, title: 'Chasing Pace: Half-Marathon Training Essentials', excerpt: 'Our runners break down the optimal fit of flare leggings and moisture-wicking bras over long-distance routes.', author: 'Jessica Mercer', category: 'Running', date: '2026-06-18', active: true },
  { id: 3, title: 'Brutalist Architecture & High-Fashion Activewear', excerpt: 'Exploring the aesthetic inspiration behind our latest colorways.', author: 'AERTH Design Lab', category: 'Design', date: '2026-05-29', active: true },
  { id: 4, title: 'The Evolution of Seamless Activewear Knitwear', excerpt: 'How engineered knitting technology achieves zero friction.', author: 'Dr. Elena Rostova', category: 'Technology', date: '2026-04-14', active: true },
];

export const fallbackCategories = [
  { id: 1, slug: 'leggings', name: 'Leggings', gender: 'women', sortOrder: 1 },
  { id: 2, slug: 'shorts', name: 'Shorts', gender: 'women', sortOrder: 2 },
  { id: 3, slug: 'bras', name: 'Sports Bras', gender: 'women', sortOrder: 3 },
  { id: 4, slug: 'tops', name: 'Training Tees', gender: 'men', sortOrder: 4 },
  { id: 5, slug: 'jackets', name: 'Track Jackets', gender: 'men', sortOrder: 5 },
];

export const fallbackContent = [
  { id: 1, page: 'home', section: 'hero', title: 'Made For Movement.', subtitle: 'Built Between Air and Earth.', description: 'Performance apparel that moves with you.', image: '/images/hero_bg.png', linkUrl: '/shop?gender=women', linkText: 'Shop Women', sortOrder: 1, active: true },
  { id: 2, page: 'home', section: 'brand_story', title: 'Inspired by Air. Grounded in Earth.', subtitle: 'Our Story', description: 'Air represents freedom, energy, and possibility. Earth represents strength, stability, and resilience.', image: '/images/story_bg.png', sortOrder: 2, active: true },
];
