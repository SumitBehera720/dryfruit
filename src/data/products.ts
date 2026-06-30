export interface ProductVariant {
  colorName: string;
  hex: string;
  image: string;
  gallery: string[];
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
}

export interface Question {
  id: string;
  user: string;
  question: string;
  date: string;
  answer?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  label?: string;
  category: 'leggings' | 'shorts' | 'bras' | 'tops' | 'jackets';
  description: string;
  details: string[];
  variants: ProductVariant[];
  reviews: Review[];
  questions: Question[];
}

export const products: Product[] = [
  {
    id: 'contour-leggings',
    name: 'Contour Leggings',
    price: 3599,
    label: 'NEW',
    category: 'leggings',
    description: 'Engineered with a high-performance compression waistband, our signature Contour Leggings naturally shape and lift your silhouette. Squat-proof, breathable, and finished with a seamless fit that acts like a second skin.',
    details: [
      '1.5cm higher waistband for added coverage',
      'High compression waistband for tummy control',
      'Invisible glute scrunch to naturally lift and shape',
      'Squat-proof, four-way stretch fabric',
      'Seamless finish prevents friction and irritation'
    ],
    variants: [
      {
        colorName: 'Earthstone Plum',
        hex: '#4A3546',
        image: '/images/product_plum_leggings.png',
        gallery: [
          '/images/product_plum_leggings.png',
          '/images/infographic_leggings.png',
          '/images/hero_bg.png'
        ]
      },
      {
        colorName: 'Obsidian Black',
        hex: '#181818',
        image: '/images/product_black_leggings.png',
        gallery: [
          '/images/product_black_leggings.png',
          '/images/infographic_leggings.png'
        ]
      }
    ],
    reviews: [
      {
        id: 'r1',
        author: 'Sarah M.',
        rating: 5,
        date: '2026-05-12',
        title: 'Absolutely love the fit!',
        comment: 'These are the best leggings I own. The compression is perfect and they do not slide down during heavy squats. The plum color is stunning!',
        verified: true
      },
      {
        id: 'r2',
        author: 'Neha R.',
        rating: 5,
        date: '2026-06-02',
        title: 'Actually squat proof!',
        comment: 'I was skeptical about the squat-proof claim, but these leggings are completely opaque. Material feels premium and soft.',
        verified: true
      }
    ],
    questions: [
      {
        id: 'q1',
        user: 'Pooja K.',
        question: 'Does the waistband roll down during workouts?',
        date: '2026-05-20',
        answer: 'Hi Pooja! The Contour Leggings feature a double-layered high-compression waistband that is designed to stay firmly in place without rolling down.'
      }
    ]
  },
  {
    id: 'aurora-flare-leggings',
    name: 'Aurora Flare Leggings',
    price: 3799,
    label: 'NEW',
    category: 'leggings',
    description: 'Transition seamlessly from the studio to the street. The Aurora Flare Leggings combine high-waisted support with a chic flared hemline, making them as versatile as they are comfortable.',
    details: [
      'Flattering bootcut flare silhouette',
      'Double-layer compression waistband',
      'Ultra-soft brushed performance fabric',
      'Moisture-wicking and quick-drying',
      'Ideal for low to medium-impact activities'
    ],
    variants: [
      {
        colorName: 'Obsidian Black',
        hex: '#181818',
        image: '/images/product_black_flare.png',
        gallery: [
          '/images/product_black_flare.png',
          '/images/product_black_leggings.png'
        ]
      }
    ],
    reviews: [
      {
        id: 'r3',
        author: 'Riya S.',
        rating: 5,
        date: '2026-06-10',
        title: 'Super flattering and comfy',
        comment: 'The flare is just right, and they hug my waist perfectly. Great for travel and yoga!',
        verified: true
      }
    ],
    questions: [
      {
        id: 'q2',
        user: 'Tanya G.',
        question: 'Are these suitable for running?',
        date: '2026-06-15',
        answer: 'Hi Tanya! While they can be worn for runs, they are designed with yoga, training, and lifestyle wear in mind. For high-intensity runs, we recommend our classic compression Contour Leggings.'
      }
    ]
  },
  {
    id: 'contour-shorts',
    name: 'Contour Shorts 5"',
    price: 2799,
    label: 'NEW',
    category: 'shorts',
    description: 'Our signature sculpting technology in a mid-thigh active short. Designed to stay in place, prevent riding up, and shape your curves during high-intensity training.',
    details: [
      '5-inch inseam prevents riding up',
      'Glute sculpting contour design lines',
      'High-rise compression waistband',
      'Breathable, lightweight four-way stretch fabric',
      'Zero front seam for clean lines'
    ],
    variants: [
      {
        colorName: 'Obsidian Black',
        hex: '#181818',
        image: '/images/product_black_shorts.png',
        gallery: [
          '/images/product_black_shorts.png',
          '/images/product_black_leggings.png'
        ]
      }
    ],
    reviews: [
      {
        id: 'r4',
        author: 'Kiara D.',
        rating: 4,
        date: '2026-06-11',
        title: 'Perfect for summer runs',
        comment: 'Very comfortable and doesn’t ride up! Docked one star because I wish there were side pockets.',
        verified: true
      }
    ],
    questions: []
  },
  {
    id: 'move-sports-bra',
    name: 'Move Sports Bra',
    price: 2499,
    category: 'bras',
    description: 'Designed for medium-impact support, the Move Sports Bra features a classic scoop neckline and dynamic keyhole back design. Made from our premium sweat-wicking knit.',
    details: [
      'Medium support with removable cups',
      'Cross-strap keyhole back for ventilation',
      'Wide supportive under-bust band',
      'Moisture-wicking, anti-odor performance',
      'Chafe-free flatlock seams'
    ],
    variants: [
      {
        colorName: 'Earthstone Plum',
        hex: '#4A3546',
        image: '/images/product_plum_bra.png',
        gallery: [
          '/images/product_plum_bra.png',
          '/images/product_plum_leggings.png'
        ]
      },
      {
        colorName: 'Obsidian Black',
        hex: '#181818',
        image: '/images/product_black_bra.png',
        gallery: [
          '/images/product_black_bra.png',
          '/images/product_black_flare.png'
        ]
      }
    ],
    reviews: [
      {
        id: 'r5',
        author: 'Anjali V.',
        rating: 5,
        date: '2026-05-28',
        title: 'Comfy and stylish',
        comment: 'This bra holds everything in place without digging into my shoulders. The keyhole back is a really cute detail.',
        verified: true
      }
    ],
    questions: []
  },
  {
    id: 'sculpt-shorts',
    name: 'Sculpt High-Waist Shorts 3"',
    price: 2599,
    category: 'shorts',
    description: 'A shorter 3-inch active cut designed for ultimate agility. Offers lightweight shape contouring, high compression, and clean aesthetic lines.',
    details: [
      '3-inch agile inseam length',
      'High-waisted compression contouring',
      'Zero front seam design',
      'Super-soft moisture wicking yarn'
    ],
    variants: [
      {
        colorName: 'Obsidian Black',
        hex: '#181818',
        image: '/images/product_black_shorts.png', // Fallback image
        gallery: ['/images/product_black_shorts.png']
      }
    ],
    reviews: [],
    questions: []
  },
  {
    id: 'elevate-sports-bra',
    name: 'Elevate Sports Bra',
    price: 2299,
    category: 'bras',
    description: 'Lightweight support with delicate strap details, perfect for studio yoga, pilates, or casual lifestyle layering.',
    details: [
      'Lightweight breathable fabric',
      'Multi-strap back design details',
      'Elastic under-bust band for gentle hold'
    ],
    variants: [
      {
        colorName: 'Earthstone Plum',
        hex: '#4A3546',
        image: '/images/product_plum_bra.png', // Fallback
        gallery: ['/images/product_plum_bra.png']
      }
    ],
    reviews: [],
    questions: []
  }
];
