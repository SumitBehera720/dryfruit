'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ChevronDown, SlidersHorizontal } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useCart } from '../../context/CartContext';
import { products, Product } from '../../data/products';

export default function ShopPage() {
  const { addToCart } = useCart();
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [activeVariants, setActiveVariants] = useState<Record<string, number>>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Initialize default active variant index to 0 for all products
    const defaults: Record<string, number> = {};
    products.forEach((p) => {
      defaults[p.id] = 0;
    });
    setActiveVariants(defaults);
  }, []);

  const handleSwatchClick = (productId: string, variantIndex: number) => {
    setActiveVariants((prev) => ({
      ...prev,
      [productId]: variantIndex,
    }));
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const handleAddToCart = (product: Product) => {
    const activeIndex = activeVariants[product.id] || 0;
    const variant = product.variants[activeIndex];
    
    addToCart({
      id: `${product.id}-${variant.colorName.toLowerCase().replace(' ', '-')}`,
      name: product.name,
      price: product.price,
      image: variant.image,
      color: variant.colorName,
      size: 'S',
    });
  };

  // Filter & Sort Logic
  const filteredProducts = products.filter((p) => {
    if (selectedCategory === 'all') return true;
    return p.category === selectedCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    return 0; // Featured/Default
  });

  const categories = [
    { value: 'all', label: 'All Products' },
    { value: 'leggings', label: 'Leggings' },
    { value: 'shorts', label: 'Shorts' },
    { value: 'bras', label: 'Sports Bras' }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      
      <main className="flex-1 font-sans">
        
        {/* Banner Section */}
        <section className="w-full bg-[#0c0c0c] text-white py-12 md:py-16 text-center border-b border-zinc-900">
          <div className="max-w-7xl mx-auto px-4">
            <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-zinc-500 font-semibold">Collections</span>
            <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-widest mt-2">All Products</h1>
            <p className="text-zinc-400 text-xs md:text-sm mt-3 max-w-md mx-auto tracking-wide leading-relaxed font-light">
              High-performance training gear designed to elevate your form. Engineered between air and earth.
            </p>
          </div>
        </section>

        {/* Filter and Content Grid */}
        <section className="max-w-7xl mx-auto px-4 md:px-8 py-12">
          
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-zinc-100 pb-6 mb-8 gap-4">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold border transition-all duration-300 ${
                    selectedCategory === cat.value
                      ? 'bg-black border-black text-white'
                      : 'bg-white border-zinc-200 text-zinc-600 hover:border-zinc-400'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                <SlidersHorizontal className="w-4 h-4" />
                <span>Sort By:</span>
              </div>
              <div className="relative border border-zinc-200 rounded px-3 py-1.5 bg-white text-xs font-semibold tracking-wider text-black">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent pr-8 focus:outline-none cursor-pointer appearance-none uppercase"
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500" />
              </div>
            </div>
          </div>

          {/* Product Grid */}
          {!mounted || sortedProducts.length === 0 ? (
            <div className="py-24 text-center">
              <p className="text-zinc-500 uppercase tracking-widest text-sm font-semibold">
                {!mounted ? 'Loading catalog...' : 'No products found matching filters'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-12">
              {sortedProducts.map((product) => {
                const activeIdx = activeVariants[product.id] ?? 0;
                const activeVariant = product.variants[activeIdx] || product.variants[0];
                const isWishlisted = wishlist.includes(product.id);

                return (
                  <div key={product.id} className="flex flex-col group relative">
                    
                    {/* Image Box */}
                    <div className="aspect-[3/4] bg-zinc-50 relative overflow-hidden rounded-xl">
                      {product.label && (
                        <span className="absolute top-3 left-3 bg-black text-white text-[8px] md:text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm z-10">
                          {product.label}
                        </span>
                      )}

                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className="absolute top-3 right-3 bg-white text-zinc-800 p-2 rounded-full border border-zinc-100 shadow-md hover:shadow-lg transition-all duration-300 z-10"
                        aria-label="Wishlist"
                      >
                        <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-red-500 stroke-red-500 scale-110' : 'stroke-zinc-700'}`} />
                      </button>

                      <Link href={`/product/${product.id}`} className="w-full h-full relative block cursor-pointer">
                        <Image
                          src={activeVariant.image}
                          alt={product.name}
                          fill
                          sizes="(max-w-768px) 50vw, 25vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </Link>

                      <div className="absolute inset-x-3 bottom-3 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-10">
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="w-full bg-black hover:bg-zinc-900 text-white font-bold text-[10px] md:text-xs uppercase tracking-widest py-2.5 shadow-lg transition-colors"
                        >
                          Quick Add
                        </button>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="mt-4 flex flex-col space-y-1.5">
                      <div className="flex gap-1.5">
                        {product.variants.map((v, index) => (
                          <button
                            key={v.colorName}
                            onClick={() => handleSwatchClick(product.id, index)}
                            className={`w-3.5 h-3.5 rounded-full border relative ${
                              index === activeIdx ? 'border-black ring-1 ring-black' : 'border-zinc-300'
                            }`}
                            style={{ backgroundColor: v.hex }}
                            title={v.colorName}
                          />
                        ))}
                      </div>

                      <div>
                        <Link href={`/product/${product.id}`} className="hover:underline">
                          <h3 className="text-xs md:text-sm font-bold uppercase tracking-wider text-black">
                            {product.name}
                          </h3>
                        </Link>
                        <p className="text-zinc-500 text-[10px] tracking-wider uppercase mt-0.5">
                          {activeVariant.colorName}
                        </p>
                      </div>

                      <p className="text-xs md:text-sm font-bold text-black">
                        ₹{product.price.toLocaleString('en-IN')}
                      </p>
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
