export interface ProductVariant {
  colorName: string;
  hex: string;
  image: string;
  images: string[];
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
  gender: 'men' | 'women' | 'unisex';
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
    gender: 'women',
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
        images: [
          '/images/product_plum_leggings.png',
          '/images/infographic_leggings.png',
          '/images/hero_bg.png'
        ]
      },
      {
        colorName: 'Obsidian Black',
        hex: '#181818',
        image: '/images/product_black_leggings.png',
        images: [
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
    gender: 'women',
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
        images: [
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
    gender: 'women',
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
        images: [
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
    id: 'mens-aeroweave-tee',
    name: 'AeroWeave Training Tee',
    price: 2999,
    label: 'NEW',
    category: 'tops',
    gender: 'men',
    description: 'Engineered with high-ventilation AeroWeave mesh, this lightweight training tee offers maximum breathability and sweat-wicking performance for high-intensity training sessions. Features an athletic ergonomic cut for zero distractions.',
    details: [
      'Ultra-lightweight AeroWeave mesh fabric',
      'Sweat-wicking, quick-drying performance yarn',
      'Four-way stretch for unrestricted arm movement',
      'Flatlock seams prevent chafing during high intensity reps',
      'Classic minimalist crewneck design'
    ],
    variants: [
      {
        colorName: 'Heather Grey',
        hex: '#8C92AC',
        image: '/images/product_mens_tee.png',
        images: ['/images/product_mens_tee.png']
      },
      {
        colorName: 'Obsidian Black',
        hex: '#181818',
        image: '/images/product_mens_tee.png',
        images: ['/images/product_mens_tee.png']
      }
    ],
    reviews: [],
    questions: []
  }
];
