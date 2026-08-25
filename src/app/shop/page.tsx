'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ChevronDown, SlidersHorizontal } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useCart } from '../../context/CartContext';

interface Variant {
  id: number;
  colorName: string;
  hex: string;
  image: string;
  gallery: string;
}

interface Product {
  id: number;
  slug: string;
  name: string;
  price: number;
  label: string | null;
  category: string;
  gender: string;
  description: string;
  variants: Variant[];
}

const bannerData: Record<string, { image: string; title: string; subtitle: string; desc: string }> = {
  all: { image: '/images/dryfruit_hero.png', title: 'All Organic Superfoods', subtitle: 'Pantry Catalog', desc: 'Handpicked raw almonds, jumbo cashews, organic ashwagandha, Medjool dates, and functional lattes.' },
  nuts: { image: '/images/dryfruit_almonds.png', title: 'Raw Nuts & Kernels', subtitle: 'Raw & Roasted', desc: 'Premium Mamra Almonds, King Jumbo Cashews, Kashmiri Walnuts, and Roasted Pistachios.' },
  'dried-fruits': { image: '/images/dryfruit_dates.png', title: 'Dried Fruits & Dates', subtitle: 'Natural Sweetness', desc: 'Arabian Medjool Dates, Afghan Figs, Golden Berries, and Sun-dried Apricots.' },
  adaptogens: { image: '/images/dryfruit_cashews.png', title: 'Adaptogens & Powders', subtitle: 'Wellness & Stamina', desc: 'Raw Organic Ashwagandha, Gelatinized Peruvian Maca, and Moringa Leaf Powder.' },
  elixirs: { image: '/images/dryfruit_pistachios.png', title: 'Functional Elixirs', subtitle: 'Ayurvedic Lattes', desc: 'Golden Turmeric Milk, Cacao Bliss, and Functional Wellness Elixirs.' },
  seeds: { image: '/images/dryfruit_hero.png', title: 'Seeds & Superfood Mixes', subtitle: 'Immunity Boosters', desc: 'Raw Organic Chia Seeds, Pumpkin Seeds, Sunflower Seeds, and Wellness Blends.' },
  'trail-mixes': { image: '/images/dryfruit_hero.png', title: 'Trail Mixes & Snacks', subtitle: 'Clean Energy', desc: 'Chef-crafted raw nut and superberry trail mixes for workout and travel.' },
  gifting: { image: '/images/dryfruit_giftbox.png', title: 'Artisanal Festive Gifting', subtitle: 'Luxury Hampers', desc: 'Handcrafted luxury hampers and heirloom wooden dry fruit gift boxes.' }
};

const categories = [
  { value: 'all', label: 'All Superfoods' },
  { value: 'nuts', label: 'Nuts & Kernels' },
  { value: 'dried-fruits', label: 'Dried Fruits' },
  { value: 'adaptogens', label: 'Adaptogens' },
  { value: 'elixirs', label: 'Elixirs & Lattes' },
  { value: 'seeds', label: 'Seeds' },
  { value: 'trail-mixes', label: 'Trail Mixes' },
  { value: 'gifting', label: 'Artisanal Gifting' },
];

export default function ShopPage() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [activeVariants, setActiveVariants] = useState<Record<number, number>>({});
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setMounted(true);
    const params = new URLSearchParams(window.location.search);
    const category = params.get('category');
    const q = params.get('search') || params.get('q');
    if (category) setSelectedCategory(category);
    if (q) setSearchQuery(q);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedCategory !== 'all') params.set('category', selectedCategory);
    if (searchQuery.trim() !== '') params.set('search', searchQuery);

    setLoading(true);
    fetch(`/api/products?${params.toString()}`)
      .then((res) => res.json())
      .then((data: Product[]) => {
        setProducts(data);
        const defaults: Record<number, number> = {};
        data.forEach((p) => { defaults[p.id] = 0; });
        setActiveVariants(defaults);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [selectedCategory, searchQuery]);

  const handleSwatchClick = (productId: number, variantIndex: number) => {
    setActiveVariants((prev) => ({ ...prev, [productId]: variantIndex }));
  };

  const toggleWishlist = (productId: number) => {
    const id = String(productId);
    setWishlist((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);
  };

  const handleAddToCart = (product: Product) => {
    const activeIndex = activeVariants[product.id] || 0;
    const variant = product.variants[activeIndex];
    if (!variant) return;

    addToCart({
      id: `${product.slug}-${variant.colorName.toLowerCase().replace(/\s+/g, '-')}`,
      name: product.name,
      price: product.price,
      image: variant.image,
      color: variant.colorName,
      size: '500g',
    });
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    return 0;
  });

  const categories = [
    { value: 'all', label: 'All Products' },
    { value: 'nuts', label: 'Nuts & Kernels' },
    { value: 'dried-fruits', label: 'Dried Fruits & Dates' },
    { value: 'seeds', label: 'Seeds & Mixes' },
    { value: 'gifting', label: 'Exotic Gifting' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1 font-sans">
        <section className="w-full h-[260px] md:h-[340px] relative overflow-hidden flex items-center justify-center text-center text-white border-b border-zinc-900">
          <div className="absolute inset-0 z-0">
            <Image src={bannerData[selectedCategory]?.image || bannerData.all.image} alt={bannerData[selectedCategory]?.title || bannerData.all.title} fill priority className="object-cover object-center brightness-[0.45] transition-all duration-700 ease-in-out scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/70" />
          </div>
          <div className="max-w-7xl mx-auto px-4 relative z-10 space-y-3">
            <span className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-amber-400 font-bold block">
              {searchQuery ? 'Search' : (bannerData[selectedCategory]?.subtitle || bannerData.all.subtitle)}
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold uppercase tracking-widest leading-none">
              {searchQuery ? 'Search Results' : (bannerData[selectedCategory]?.title || bannerData.all.title)}
            </h1>
            <p className="text-zinc-300 text-xs md:text-sm max-w-lg mx-auto tracking-widest font-light leading-relaxed uppercase">
              {searchQuery ? `Showing results for "${searchQuery}"` : (bannerData[selectedCategory]?.desc || bannerData.all.desc)}
            </p>
            {searchQuery && (
              <button 
                onClick={() => {
                  setSearchQuery('');
                  window.history.replaceState({}, '', '/shop');
                }}
                className="inline-block mt-2 px-4 py-1.5 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full text-[10px] uppercase tracking-widest font-semibold text-white transition-all cursor-pointer"
              >
                Clear Search
              </button>
            )}
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 md:px-8 py-12">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-zinc-100 pb-6 mb-8 gap-4">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button key={cat.value} onClick={() => setSelectedCategory(cat.value)}
                  className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold border transition-all duration-300 rounded-lg ${selectedCategory === cat.value ? 'bg-black border-black text-white' : 'bg-white border-zinc-200 text-zinc-600 hover:border-zinc-400'}`}>
                  {cat.label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-500 uppercase tracking-wider"><SlidersHorizontal className="w-4 h-4" /><span>Sort By:</span></div>
              <div className="relative border border-zinc-200 rounded-lg px-3 py-1.5 bg-white text-xs font-semibold tracking-wider text-black">
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="bg-transparent pr-8 focus:outline-none cursor-pointer appearance-none uppercase">
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500" />
              </div>
            </div>
          </div>

          {!mounted || loading ? (
            <div className="py-24 text-center"><p className="text-zinc-500 uppercase tracking-widest text-sm font-semibold">Loading catalog...</p></div>
          ) : sortedProducts.length === 0 ? (
            <div className="py-24 text-center"><p className="text-zinc-500 uppercase tracking-widest text-sm font-semibold">No products found matching filters</p></div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-12">
              {sortedProducts.map((product) => {
                const activeIdx = activeVariants[product.id] ?? 0;
                const activeVariant = product.variants[activeIdx] || product.variants[0];
                const isWishlisted = wishlist.includes(String(product.id));
                if (!activeVariant) return null;

                return (
                  <div key={product.id} className="flex flex-col group relative">
                    <div className="aspect-[3/4] bg-zinc-50 relative overflow-hidden rounded-xl">
                      {product.label && <span className="absolute top-3 left-3 bg-amber-600 text-white text-[8px] md:text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm z-10">{product.label}</span>}
                      <button onClick={() => toggleWishlist(product.id)} className="absolute top-3 right-3 bg-white text-zinc-800 p-2 rounded-full border border-zinc-100 shadow-md hover:shadow-lg transition-all duration-300 z-10" aria-label="Wishlist">
                        <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-red-500 stroke-red-500 scale-110' : 'stroke-zinc-700'}`} />
                      </button>
                      <Link href={`/product/${product.slug}`} className="w-full h-full relative block cursor-pointer">
                        <Image src={activeVariant.image} alt={product.name} fill sizes="(max-w-768px) 50vw, 25vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                      </Link>
                      <div className="absolute inset-x-3 bottom-3 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-10">
                        <button onClick={() => handleAddToCart(product)} className="w-full bg-black hover:bg-zinc-900 text-white font-bold text-[10px] md:text-xs uppercase tracking-widest py-2.5 shadow-lg transition-colors rounded-lg">Quick Add</button>
                      </div>
                    </div>
                    <div className="mt-4 flex flex-col space-y-1.5">
                      <div className="flex gap-1.5">
                        {product.variants.map((v, index) => (
                          <button key={v.id} onClick={() => handleSwatchClick(product.id, index)}
                            className={`w-3.5 h-3.5 rounded-full border relative ${index === activeIdx ? 'border-black ring-1 ring-black' : 'border-zinc-300'}`}
                            style={{ backgroundColor: v.hex }} title={v.colorName} />
                        ))}
                      </div>
                      <div>
                        <Link href={`/product/${product.slug}`} className="hover:underline">
                          <h3 className="text-xs md:text-sm font-bold uppercase tracking-wider text-black">{product.name}</h3>
                        </Link>
                        <p className="text-zinc-500 text-[10px] tracking-wider uppercase mt-0.5">{activeVariant.colorName}</p>
                      </div>
                      <p className="text-xs md:text-sm font-bold text-black">₹{product.price.toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
