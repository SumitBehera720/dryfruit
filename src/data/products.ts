export interface ProductVariant {
  colorName: string; // Pack size label, e.g. "50g Jar", "100g Pouch"
  hex: string;       // Accent badge color
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
  salePrice?: number;
  label?: string;
  category: 'superfood-powders' | 'wellness-shots' | 'herbal-teas' | 'seeds-boosters' | 'dried-fruits' | 'smoothie-boosters' | 'vegetable-powders';
  gender: 'all' | 'daily' | 'gifting' | 'immunity' | 'energy';
  description: string;
  details: string[];
  variants: ProductVariant[];
  reviews: Review[];
  questions: Question[];
}

export const products: Product[] = [
  {
    id: 'prod_01KQK72S7DV29E6JXEGD8CK59G',
    name: 'Beets & Berries Wellness Powder',
    price: 899,
    salePrice: 849,
    label: 'BESTSELLER',
    category: 'superfood-powders',
    gender: 'energy',
    description: 'A vibrant clean-label superfood powder combining organic dehydrated beetroots, wild Canadian blueberries, and cranberries. High in dietary nitrates, antioxidants, and bioflavonoids to support stamina and healthy blood circulation.',
    details: [
      '100% Gently Dehydrated Beets & Canadian Berries',
      'Rich natural source of dietary nitrates for stamina & stamina',
      'Zero added sugars, zero artificial colors or fillers',
      'Delicious blended into morning smoothies, cold water, or oat bowls',
      'Non-GMO, vegan, gluten-free, and clean-label certified'
    ],
    variants: [
      {
        colorName: '100g Pouch',
        hex: '#C85A32',
        image: 'https://cdn.zyrosite.com/cdn-ecommerce/store_01KQ6GEZ7W8BJAZT8GTJN32Y8K/assets/7d2f74bd-e0b5-4819-ac21-c3bfa725bd23.png',
        images: ['https://cdn.zyrosite.com/cdn-ecommerce/store_01KQ6GEZ7W8BJAZT8GTJN32Y8K/assets/7d2f74bd-e0b5-4819-ac21-c3bfa725bd23.png']
      }
    ],
    reviews: [
      {
        id: 'r1',
        author: 'Sarah Jenkins',
        rating: 5,
        date: '2026-07-12',
        title: 'Instant morning energy boost!',
        comment: 'I drink this every morning before workouts. Mixes instantly and gives me sustained natural energy without caffeine crash.',
        verified: true
      }
    ],
    questions: []
  },
  {
    id: 'prod_01KQK72S76K300GRQ38ADXSED3',
    name: 'Ginger Turmeric Orange Shot Powder',
    price: 749,
    salePrice: 699,
    label: 'WELLNESS SHOTS',
    category: 'wellness-shots',
    gender: 'immunity',
    description: 'A potent daily immunity wellness shot mix formulated with organic ginger, high-curcumin turmeric, whole dehydrated oranges, and black pepper for maximum bio-absorption.',
    details: [
      'Concentrated ginger & high-curcumin turmeric immunity shot',
      'Whole orange vitamin C boost with black pepper piperine',
      'Supports gut health, systemic immunity, and recovery',
      'Simply stir 1 tsp into 50ml water for an instant daily shot',
      '100% natural, non-GMO, zero preservatives'
    ],
    variants: [
      {
        colorName: '70g Jar',
        hex: '#D97706',
        image: 'https://cdn.zyrosite.com/cdn-ecommerce/store_01KQ6GEZ7W8BJAZT8GTJN32Y8K/assets/86b23630-70dc-4217-84a2-bb05b849de48.png',
        images: ['https://cdn.zyrosite.com/cdn-ecommerce/store_01KQ6GEZ7W8BJAZT8GTJN32Y8K/assets/86b23630-70dc-4217-84a2-bb05b849de48.png']
      }
    ],
    reviews: [
      {
        id: 'r2',
        author: 'David Miller',
        rating: 5,
        date: '2026-06-28',
        title: 'Zesty and warming shot!',
        comment: 'So much easier than juicing ginger root every morning. Great kick of heat and orange sweetness.',
        verified: true
      }
    ],
    questions: []
  },
  {
    id: 'prod_01KQK72S7Y3RTM6F3QP8N3FFD8',
    name: 'Wild Blueberry Powder Raw Unsweetened',
    price: 999,
    salePrice: 949,
    label: 'BRAIN SUPPORT',
    category: 'superfood-powders',
    gender: 'immunity',
    description: '100% pure unsweetened powder made from wild Canadian blueberries. Gently dehydrated at low temperatures to lock in concentrated anthocyanins and brain-boosting antioxidants.',
    details: [
      'Wild Canadian Lowbush Blueberries dehydrated whole',
      'Up to 4x higher antioxidant capacity than cultivated blueberries',
      'Supports cognitive function, memory, and eye health',
      'Zero added sugars, zero preservatives',
      'Perfect for yogurt, chia puddings, and morning smoothies'
    ],
    variants: [
      {
        colorName: '100g Pouch',
        hex: '#2563EB',
        image: 'https://cdn.zyrosite.com/cdn-ecommerce/store_01KQ6GEZ7W8BJAZT8GTJN32Y8K/assets/34f19c4e-c99c-4368-b41c-23aac91a46d6.jpg',
        images: ['https://cdn.zyrosite.com/cdn-ecommerce/store_01KQ6GEZ7W8BJAZT8GTJN32Y8K/assets/34f19c4e-c99c-4368-b41c-23aac91a46d6.jpg']
      }
    ],
    reviews: [],
    questions: []
  },
  {
    id: 'prod_01KQK72S7KJM6EJAJJ1PEC7VAV',
    name: 'Organic Celery Powder Dehydrated',
    price: 649,
    salePrice: 599,
    label: 'DETOX & CLEANSE',
    category: 'smoothie-boosters',
    gender: 'daily',
    description: 'Fresh organic celery stalks gently dehydrated and milled into a fine green detox powder. Convenient daily celery juice alternative rich in natural sodium cluster salts and digestive enzymes.',
    details: [
      'Gently dehydrated whole organic celery stalks',
      'Supports digestive alkalizing, gut hydration, and skin clarity',
      'Saves hours of washing, chopping, and juicing celery',
      'Zero fillers, non-GMO, zero sodium additives'
    ],
    variants: [
      {
        colorName: '80g Pouch',
        hex: '#2D6A4F',
        image: 'https://cdn.zyrosite.com/cdn-ecommerce/store_01KQ6GEZ7W8BJAZT8GTJN32Y8K/assets/43deeea0-f7e9-4ddb-8a11-3fa466ef47da.png',
        images: ['https://cdn.zyrosite.com/cdn-ecommerce/store_01KQ6GEZ7W8BJAZT8GTJN32Y8K/assets/43deeea0-f7e9-4ddb-8a11-3fa466ef47da.png']
      }
    ],
    reviews: [],
    questions: []
  },
  {
    id: 'prod_01KQK72SGF9MCTHYA0CZNR1PH6',
    name: 'Apple Cinnamon Bites',
    price: 449,
    salePrice: 399,
    label: 'SNACKING',
    category: 'dried-fruits',
    gender: 'daily',
    description: 'Crisp dehydrated organic Canadian apple slices dusted with Ceylon cinnamon. A delicious chewy snack without added sugar, oils, or artificial flavors.',
    details: [
      'Gently dehydrated organic Canadian apple rings',
      'Dusted with fragrant organic Ceylon Cinnamon',
      'Low calorie, high fiber family snack',
      'No added sugar, zero preservatives',
      'Resealable pouch for long-lasting crunch'
    ],
    variants: [
      {
        colorName: '40g Pouch',
        hex: '#C85A32',
        image: 'https://cdn.zyrosite.com/cdn-ecommerce/store_01KQ6GEZ7W8BJAZT8GTJN32Y8K/assets/83979956-2864-4b17-956b-c1bcae5e8b51.jpg',
        images: ['https://cdn.zyrosite.com/cdn-ecommerce/store_01KQ6GEZ7W8BJAZT8GTJN32Y8K/assets/83979956-2864-4b17-956b-c1bcae5e8b51.jpg']
      }
    ],
    reviews: [],
    questions: []
  },
  {
    id: 'prod_01KQK72SG3VCMKCQMX2HFGZ3VD',
    name: 'Turmeric Ginger Superfood Blend',
    price: 749,
    salePrice: 699,
    label: 'HERBAL LATTE',
    category: 'herbal-teas',
    gender: 'immunity',
    description: 'A comforting golden milk blend featuring organic turmeric, ginger root, and black pepper. Perfect for hot wellness lattes or iced summer refreshers.',
    details: [
      'High-curcumin organic turmeric & warming ginger',
      'Black pepper piperine for maximum bio-absorption',
      'Makes up to 40 warm cups of golden milk',
      'Dairy-free, sugar-free, 100% natural blend'
    ],
    variants: [
      {
        colorName: '70g Jar',
        hex: '#D97706',
        image: 'https://cdn.zyrosite.com/cdn-ecommerce/store_01KQ6GEZ7W8BJAZT8GTJN32Y8K/assets/a2fc82bd-9691-489a-a82f-69518a23cf96.png',
        images: ['https://cdn.zyrosite.com/cdn-ecommerce/store_01KQ6GEZ7W8BJAZT8GTJN32Y8K/assets/a2fc82bd-9691-489a-a82f-69518a23cf96.png']
      }
    ],
    reviews: [],
    questions: []
  },
  {
    id: 'prod_01KQK72S33JMX89EFDT9RMN8GW',
    name: 'Pomegranate Powder',
    price: 849,
    salePrice: 799,
    label: 'ANTIOXIDANT',
    category: 'superfood-powders',
    gender: 'immunity',
    description: '100% pure dehydrated pomegranate arils powder. Packed with punicalagins, polyphenols, and Vitamin C to support cardiovascular health.',
    details: [
      'Raw dehydrated whole Pomegranate arils',
      'Rich in heart-friendly polyphenols & Vitamin C',
      'Sweet and slightly tart natural fruit powder',
      'Ideal for smoothies, dressings, and desserts'
    ],
    variants: [
      {
        colorName: '100g Pouch',
        hex: '#991B1B',
        image: 'https://cdn.zyrosite.com/cdn-ecommerce/store_01KQ6GEZ7W8BJAZT8GTJN32Y8K/assets/4fe5eb9e-13f1-4b28-a2af-6d74b894f3a8.jpg',
        images: ['https://cdn.zyrosite.com/cdn-ecommerce/store_01KQ6GEZ7W8BJAZT8GTJN32Y8K/assets/4fe5eb9e-13f1-4b28-a2af-6d74b894f3a8.jpg']
      }
    ],
    reviews: [],
    questions: []
  },
  {
    id: 'prod_01KQK72S3HEVYR9AXWRQ0M28E7',
    name: 'Ginger Beet Wellness Powder',
    price: 849,
    salePrice: 799,
    label: 'STAMINA & BLOOD FLOW',
    category: 'superfood-powders',
    gender: 'energy',
    description: 'A zesty synergy of organic dehydrated red beets and spicy ginger root. Supports endurance, nitric oxide production, and daily digestion.',
    details: [
      'Synergistic combination of organic beet & ginger root',
      'Promotes blood flow, stamina, and workout recovery',
      'Zesty flavor profile perfect for pre-workout drinks'
    ],
    variants: [
      {
        colorName: '100g Pouch',
        hex: '#C85A32',
        image: 'https://cdn.zyrosite.com/cdn-ecommerce/store_01KQ6GEZ7W8BJAZT8GTJN32Y8K/assets/a079bd5c-c859-4c5a-b6fd-10c816061a69.png',
        images: ['https://cdn.zyrosite.com/cdn-ecommerce/store_01KQ6GEZ7W8BJAZT8GTJN32Y8K/assets/a079bd5c-c859-4c5a-b6fd-10c816061a69.png']
      }
    ],
    reviews: [],
    questions: []
  },
  {
    id: 'prod_01KQK72SC0HZVSHKHTRJNDD0CN',
    name: 'Organic Beetroot Powder',
    price: 699,
    salePrice: 649,
    label: 'NITRATE BOOST',
    category: 'superfood-powders',
    gender: 'energy',
    description: '100% pure organic dehydrated red beetroot powder. Loaded with natural dietary nitrates for healthy blood pressure support and natural energy.',
    details: [
      'Single-origin organic red beetroot',
      'Natural source of potassium & dietary nitrates',
      'Earthy sweet flavor easily added to baking or juices'
    ],
    variants: [
      {
        colorName: '100g Pouch',
        hex: '#991B1B',
        image: 'https://cdn.zyrosite.com/cdn-ecommerce/store_01KQ6GEZ7W8BJAZT8GTJN32Y8K/assets/05407492-606f-4d8f-8de4-33ac851dc01d.jpg',
        images: ['https://cdn.zyrosite.com/cdn-ecommerce/store_01KQ6GEZ7W8BJAZT8GTJN32Y8K/assets/05407492-606f-4d8f-8de4-33ac851dc01d.jpg']
      }
    ],
    reviews: [],
    questions: []
  },
  {
    id: 'prod_01KQK72RZ9B7DSMAGGNEQ76SQT',
    name: 'Organic Cranberry Powder',
    price: 799,
    salePrice: 749,
    label: 'URINARY HEALTH',
    category: 'superfood-powders',
    gender: 'immunity',
    description: 'Unsweetened dehydrated organic Canadian cranberries rich in proanthocyanidins (PACs) to support urinary tract wellness and digestive health.',
    details: [
      'Whole dehydrated Canadian cranberries',
      'High concentration of PACs & Vitamin C',
      'Tart, authentic cranberry taste with zero added sugar'
    ],
    variants: [
      {
        colorName: '100g Pouch',
        hex: '#BE123C',
        image: 'https://cdn.zyrosite.com/cdn-ecommerce/store_01KQ6GEZ7W8BJAZT8GTJN32Y8K/assets/e679b035-2b5b-40d8-a557-b566593e8c9f.png',
        images: ['https://cdn.zyrosite.com/cdn-ecommerce/store_01KQ6GEZ7W8BJAZT8GTJN32Y8K/assets/e679b035-2b5b-40d8-a557-b566593e8c9f.png']
      }
    ],
    reviews: [],
    questions: []
  },
  {
    id: 'prod_01KQK72SBT1N2NJH6Z87Y31J31',
    name: 'Organic Ginger Powder Dried',
    price: 599,
    salePrice: 549,
    label: 'DIGESTIVE RELIEF',
    category: 'herbal-teas',
    gender: 'immunity',
    description: 'Gently dehydrated organic ginger root powder. A warm, spicy kitchen staple for digestive support, nausea relief, and immunity teas.',
    details: [
      'Gently dried organic ginger root',
      'Rich in gingerols and essential oils',
      'Great for teas, stir-fries, and golden milk'
    ],
    variants: [
      {
        colorName: '80g Jar',
        hex: '#D97706',
        image: 'https://cdn.zyrosite.com/cdn-ecommerce/store_01KQ6GEZ7W8BJAZT8GTJN32Y8K/assets/617949af-079c-434e-a6a3-f6a9632038d4.png',
        images: ['https://cdn.zyrosite.com/cdn-ecommerce/store_01KQ6GEZ7W8BJAZT8GTJN32Y8K/assets/617949af-079c-434e-a6a3-f6a9632038d4.png']
      }
    ],
    reviews: [],
    questions: []
  },
  {
    id: 'prod_01KQK72S40JP5GRH7FGRF9ZRMW',
    name: 'Organic Kale Powder',
    price: 649,
    salePrice: 599,
    label: 'DAILY GREENS',
    category: 'smoothie-boosters',
    gender: 'daily',
    description: 'Nutrient-dense dehydrated organic kale leaves powder. Packed with chlorophyll, Vitamin K, Calcium, and Iron to elevate any green smoothie.',
    details: [
      '100% Dehydrated organic kale leaves',
      'High in Vitamin A, K, Calcium, and Iron',
      'Effortless green superfood booster for daily shakes'
    ],
    variants: [
      {
        colorName: '50g Pouch',
        hex: '#15803D',
        image: 'https://cdn.zyrosite.com/cdn-ecommerce/store_01KQ6GEZ7W8BJAZT8GTJN32Y8K/assets/8ebe0618-8893-4c92-b94d-e3aad59918d3.jpg',
        images: ['https://cdn.zyrosite.com/cdn-ecommerce/store_01KQ6GEZ7W8BJAZT8GTJN32Y8K/assets/8ebe0618-8893-4c92-b94d-e3aad59918d3.jpg']
      }
    ],
    reviews: [],
    questions: []
  },
  {
    id: 'prod_01KQK72S7RY2ADS0A25TSA8HVE',
    name: 'Sprouted Fenugreek Seeds Powder',
    price: 499,
    salePrice: 449,
    label: 'BLOOD SUGAR & DIGESTION',
    category: 'seeds-boosters',
    gender: 'daily',
    description: 'Bio-activated sprouted fenugreek seeds ground into a fine powder. Sprouting reduces bitterness and enhances nutrient bioavailability.',
    details: [
      'Bio-activated sprouted organic fenugreek seeds',
      'Supports healthy blood sugar & metabolic digestive balance',
      'Milder, nutty flavor profile'
    ],
    variants: [
      {
        colorName: '100g Pouch',
        hex: '#D97706',
        image: 'https://cdn.zyrosite.com/cdn-ecommerce/store_01KQ6GEZ7W8BJAZT8GTJN32Y8K/assets/03fbf31b-61e4-45bc-8a22-e7a1c2f21ada.png',
        images: ['https://cdn.zyrosite.com/cdn-ecommerce/store_01KQ6GEZ7W8BJAZT8GTJN32Y8K/assets/03fbf31b-61e4-45bc-8a22-e7a1c2f21ada.png']
      }
    ],
    reviews: [],
    questions: []
  },
  {
    id: 'prod_01KQK72S3A7NBJR687XBFWFN88',
    name: 'Whole Orange Powder',
    price: 649,
    salePrice: 599,
    label: 'VITAMIN C BOOST',
    category: 'superfood-powders',
    gender: 'immunity',
    description: 'Dehydrated whole orange powder including flesh and peel for maximum bioflavonoid pectin fiber and immune-boosting Vitamin C.',
    details: [
      'Whole dehydrated non-GMO orange fruit and peel',
      'Rich in Vitamin C, citrus bioflavonoids, and natural pectin',
      'Zesty citrus flavor for smoothies, baking, and teas'
    ],
    variants: [
      {
        colorName: '80g Pouch',
        hex: '#EA580C',
        image: 'https://cdn.zyrosite.com/cdn-ecommerce/store_01KQ6GEZ7W8BJAZT8GTJN32Y8K/assets/fe5ac541-aeab-499d-961d-1e39267e9828.jpg',
        images: ['https://cdn.zyrosite.com/cdn-ecommerce/store_01KQ6GEZ7W8BJAZT8GTJN32Y8K/assets/fe5ac541-aeab-499d-961d-1e39267e9828.jpg']
      }
    ],
    reviews: [],
    questions: []
  },
  {
    id: 'prod_01KQK72S3T7CHH8S1QSQPKJ9Y2',
    name: 'Wild Blueberry Dehydrated Chewy',
    price: 949,
    salePrice: 899,
    label: 'CANADIAN WILD',
    category: 'dried-fruits',
    gender: 'immunity',
    description: 'Gently dehydrated chewy whole wild Canadian blueberries. Naturally sweet, high in fiber, and packed with berry antioxidants.',
    details: [
      '100% Wild Canadian Lowbush Blueberries',
      'Chewy texture, zero added sugar or oils',
      'Perfect topping for oatmeal, pancakes, and salads'
    ],
    variants: [
      {
        colorName: '100g Pouch',
        hex: '#1D4ED8',
        image: 'https://cdn.zyrosite.com/cdn-ecommerce/store_01KQ6GEZ7W8BJAZT8GTJN32Y8K/assets/182aadd4-eb63-440c-9532-1c52154d6c44.png',
        images: ['https://cdn.zyrosite.com/cdn-ecommerce/store_01KQ6GEZ7W8BJAZT8GTJN32Y8K/assets/182aadd4-eb63-440c-9532-1c52154d6c44.png']
      }
    ],
    reviews: [],
    questions: []
  },
  {
    id: 'prod_01KQK72SCHM2JCESFFWJ2QHPDY',
    name: 'Dried Orange Slices',
    price: 549,
    salePrice: 499,
    label: 'CITRUS GARNISH',
    category: 'dried-fruits',
    gender: 'daily',
    description: 'Beautifully dehydrated whole orange slices. Perfect for cocktail garnishes, herbal tea infusions, and festive baking.',
    details: [
      'Gently dried crisp whole orange wheels',
      '100% natural with no added sugar or preservatives',
      'Aromatic citrus aroma for teas and beverages'
    ],
    variants: [
      {
        colorName: '60g Pouch',
        hex: '#EA580C',
        image: 'https://cdn.zyrosite.com/cdn-ecommerce/store_01KQ6GEZ7W8BJAZT8GTJN32Y8K/assets/c96e1a95-6f92-402f-8dfc-c8c853ba28e2.jpg',
        images: ['https://cdn.zyrosite.com/cdn-ecommerce/store_01KQ6GEZ7W8BJAZT8GTJN32Y8K/assets/c96e1a95-6f92-402f-8dfc-c8c853ba28e2.jpg']
      }
    ],
    reviews: [],
    questions: []
  },
  {
    id: 'prod_01KQK72SC61W8B3HDBT40PGJ4E',
    name: 'Organic Flax Seed Whole',
    price: 399,
    salePrice: 349,
    label: 'OMEGA-3 SEEDS',
    category: 'seeds-boosters',
    gender: 'daily',
    description: 'Whole organic brown flax seeds packed with plant-based Omega-3 ALA fatty acids, lignans, and soluble dietary fiber.',
    details: [
      '100% Organic brown flax seeds',
      'High in plant Omega-3 ALA & fiber',
      'Gluten-free, raw, and non-GMO'
    ],
    variants: [
      {
        colorName: '250g Pouch',
        hex: '#78350F',
        image: 'https://cdn.zyrosite.com/cdn-ecommerce/store_01KQ6GEZ7W8BJAZT8GTJN32Y8K/assets/7cf64f8a-aeb8-45b9-be58-2cba9adb22ab.png',
        images: ['https://cdn.zyrosite.com/cdn-ecommerce/store_01KQ6GEZ7W8BJAZT8GTJN32Y8K/assets/7cf64f8a-aeb8-45b9-be58-2cba9adb22ab.png']
      }
    ],
    reviews: [],
    questions: []
  },
  {
    id: 'prod_01KQK72SCCP31M3T37GSJCS8SP',
    name: 'Organic Flax Seed Powder Milled',
    price: 449,
    salePrice: 399,
    label: 'MILLED SEEDS',
    category: 'seeds-boosters',
    gender: 'daily',
    description: 'Cold-milled organic brown flax seed powder for effortless nutrient absorption. Easily stirs into smoothies, oatmeal, and baking.',
    details: [
      'Cold-milled for optimal digestion and nutrient uptake',
      'Rich in dietary fiber and essential plant fats',
      'Great vegan egg substitute for baking'
    ],
    variants: [
      {
        colorName: '200g Pouch',
        hex: '#78350F',
        image: 'https://cdn.zyrosite.com/cdn-ecommerce/store_01KQ6GEZ7W8BJAZT8GTJN32Y8K/assets/bbe49bb5-e34f-4b79-b2c0-d524db33c78c.png',
        images: ['https://cdn.zyrosite.com/cdn-ecommerce/store_01KQ6GEZ7W8BJAZT8GTJN32Y8K/assets/bbe49bb5-e34f-4b79-b2c0-d524db33c78c.png']
      }
    ],
    reviews: [],
    questions: []
  },
  {
    id: 'prod_01KQK72SFXS78NAK0JE3A0Y2VM',
    name: 'Just Apples Dried Apple Slices',
    price: 499,
    salePrice: 449,
    label: 'PURE FRUIT SNACK',
    category: 'dried-fruits',
    gender: 'daily',
    description: 'Unsweetened organic dried apple rings made in Canada. Crisp, naturally sweet, and perfect for family snacking.',
    details: [
      '100% Dehydrated Canadian apples',
      'No added sugar, sulfur, or preservatives',
      'Wholesome clean snack for kids and adults'
    ],
    variants: [
      {
        colorName: '50g Pouch',
        hex: '#C85A32',
        image: 'https://cdn.zyrosite.com/cdn-ecommerce/store_01KQ6GEZ7W8BJAZT8GTJN32Y8K/assets/f2af55ca-3dd2-46c9-9c8d-579f4073a127.jpg',
        images: ['https://cdn.zyrosite.com/cdn-ecommerce/store_01KQ6GEZ7W8BJAZT8GTJN32Y8K/assets/f2af55ca-3dd2-46c9-9c8d-579f4073a127.jpg']
      }
    ],
    reviews: [],
    questions: []
  },
  {
    id: 'prod_01KQK72RZ09SCVXWQGB097XQWY',
    name: 'Organic Onion Powder',
    price: 399,
    salePrice: 349,
    label: 'DEHYDRATED VEGGIE',
    category: 'vegetable-powders',
    gender: 'daily',
    description: 'Pure dehydrated yellow onion powder. Adds rich savory flavor to soups, marinades, season rubs, and dips without chopping.',
    details: [
      '100% Pure dehydrated yellow onion',
      'Zero anti-caking agents or MSG',
      'Savory kitchen essential'
    ],
    variants: [
      {
        colorName: '80g Jar',
        hex: '#D97706',
        image: 'https://cdn.zyrosite.com/cdn-ecommerce/store_01KQ6GEZ7W8BJAZT8GTJN32Y8K/assets/c9fd811e-17aa-4ca8-a482-5a4f84c5bffa.png',
        images: ['https://cdn.zyrosite.com/cdn-ecommerce/store_01KQ6GEZ7W8BJAZT8GTJN32Y8K/assets/c9fd811e-17aa-4ca8-a482-5a4f84c5bffa.png']
      }
    ],
    reviews: [],
    questions: []
  },
  {
    id: 'prod_01KQK72RYT077JEDZPS8C4VTN7',
    name: 'Organic Garlic Powder',
    price: 449,
    salePrice: 399,
    label: 'DEHYDRATED VEGGIE',
    category: 'vegetable-powders',
    gender: 'immunity',
    description: 'Pure dehydrated organic garlic cloves powder. A potent savory spice packed with allicin to elevate cooking and support immune health.',
    details: [
      'Gently dried organic garlic cloves',
      'Rich in immune-supporting allicin compounds',
      'Zero anti-caking agents or fillers'
    ],
    variants: [
      {
        colorName: '80g Jar',
        hex: '#D97706',
        image: 'https://cdn.zyrosite.com/cdn-ecommerce/store_01KQ6GEZ7W8BJAZT8GTJN32Y8K/assets/e1377acf-4ac8-4af7-931b-96b142b86fd0.png',
        images: ['https://cdn.zyrosite.com/cdn-ecommerce/store_01KQ6GEZ7W8BJAZT8GTJN32Y8K/assets/e1377acf-4ac8-4af7-931b-96b142b86fd0.png']
      }
    ],
    reviews: [],
    questions: []
  }
];
