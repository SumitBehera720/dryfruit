'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ArrowUpRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';

interface Variant {
  id: number;
  colorName: string;
  hex: string;
  image: string;
  gallery: string;
  stock: number;
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

export default function BestSellers() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [activeVariants, setActiveVariants] = useState<Record<number, number>>({});

  useEffect(() => {
    fetch('/api/products?limit=4')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        const defaults: Record<number, number> = {};
        data.forEach((p: Product) => { defaults[p.id] = 0; });
        setActiveVariants(defaults);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSwatchClick = (productId: number, variantIndex: number) => {
    setActiveVariants((prev) => ({ ...prev, [productId]: variantIndex }));
  };

  const toggleWishlist = (productId: number) => {
    const id = String(productId);
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleAddToCart = (product: Product) => {
    const activeIndex = activeVariants[product.id] || 0;
    const variant = product.variants[activeIndex];
    if (!variant) return;

    addToCart({
      id: `${product.slug}-${variant.colorName.toLowerCase().replace(/\s+/g, '-')}-s`,
      name: product.name,
      price: product.price,
      image: variant.image,
      color: variant.colorName,
      size: 'S',
    });
  };

  if (loading) {
    return (
      <section className="w-full bg-white py-16 md:py-24 font-sans">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-center h-64">
            <div className="w-6 h-6 border-2 border-zinc-300 border-t-black rounded-full animate-spin" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-white py-16 md:py-24 font-sans">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto px-4 md:px-8"
      >
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-widest text-black">Best Sellers</h2>
            <p className="text-zinc-500 text-xs md:text-sm mt-1.5 tracking-wider font-light">Loved by thousands. Designed to perform.</p>
          </div>
          <Link href="/shop" className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-black border-b border-black pb-1 hover:opacity-75 transition-opacity">
            View All Products <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {products.map((product) => {
            const activeIdx = activeVariants[product.id] ?? 0;
            const activeVariant = product.variants[activeIdx];
            const isWishlisted = wishlist.includes(String(product.id));
            if (!activeVariant) return null;

            return (
              <div key={product.id} className="flex flex-col group relative">
                <div className="aspect-[3/4] bg-zinc-50 relative overflow-hidden rounded-xl">
                  {product.label && (
                    <span className="absolute top-4 left-4 bg-black text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm z-10">{product.label}</span>
                  )}
                  <button onClick={() => toggleWishlist(product.id)} className="absolute top-4 right-4 bg-white hover:bg-zinc-50 text-zinc-800 hover:text-black p-2 rounded-full border border-zinc-100 shadow-md hover:shadow-lg transition-all duration-300 z-10" aria-label="Wishlist">
                    <Heart className={`w-4 h-4 transition-transform duration-300 ${isWishlisted ? 'fill-red-500 stroke-red-500 scale-110' : 'stroke-zinc-700'}`} />
                  </button>
                  <Link href={`/product/${product.slug}`} className="w-full h-full relative block cursor-pointer">
                    <Image src={activeVariant.image} alt={product.name} fill sizes="(max-w-720px) 100vw, 25vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  </Link>
                  <div className="absolute inset-x-4 bottom-4 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-10">
                    <button onClick={() => handleAddToCart(product)} className="w-full bg-black hover:bg-zinc-900 text-white font-bold text-xs uppercase tracking-widest py-3 shadow-lg transition-colors">Quick Add</button>
                  </div>
                </div>
                <div className="mt-4 flex flex-col space-y-2">
                  <div className="flex gap-2">
                    {product.variants.map((v, index) => (
                      <button key={v.id} onClick={() => handleSwatchClick(product.id, index)}
                        className={`w-4 h-4 rounded-full border relative ${index === activeIdx ? 'border-black ring-1 ring-black' : 'border-zinc-300'}`}
                        style={{ backgroundColor: v.hex }} title={v.colorName} />
                    ))}
                  </div>
                  <div>
                    <Link href={`/product/${product.slug}`} className="hover:underline">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-black">{product.name}</h3>
                    </Link>
                    <p className="text-zinc-500 text-[11px] tracking-wider uppercase mt-0.5">{activeVariant.colorName}</p>
                  </div>
                  <p className="text-sm font-bold text-black mt-1">₹{product.price.toLocaleString('en-IN')}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <Link href="/shop" className="inline-block bg-black hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-widest px-10 py-4 shadow-lg transition-all duration-300 hover:shadow-xl">Shop All Products</Link>
        </div>
      </motion.div>
    </section>
  );
}
