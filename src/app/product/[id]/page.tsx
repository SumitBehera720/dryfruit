'use client';

import React, { use, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Heart, ChevronDown, ChevronUp, HelpCircle, Truck, RotateCcw, Plus, Minus, Zap, ShieldCheck, Sparkles } from 'lucide-react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { useCart } from '../../../context/CartContext';
import { useAuth } from '../../../context/AuthContext';
import SizeFinder from '../../../components/SizeFinder';
import { useRouter } from 'next/navigation';
import { products as catalogProducts } from '../../../data/products';

interface Variant {
  id: number;
  colorName: string;
  hex: string;
  image: string;
  gallery: string;
  stock: number;
}

interface Detail {
  id: number;
  text: string;
  sortOrder: number;
}

interface Review {
  id: number;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  approved: boolean;
}

interface Question {
  id: number;
  user: string;
  question: string;
  date: string;
  answer: string | null;
}

interface Product {
  id: number | string;
  slug: string;
  name: string;
  price: number;
  salePrice?: number | null;
  label: string | null;
  category: string;
  gender: string;
  description: string;
  variants: Variant[];
  details: Detail[];
  reviews: Review[];
  questions: Question[];
}

interface LocalQuestion {
  id: number;
  user: string;
  question: string;
  date: string;
  answer?: string | null;
}

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { addToCart } = useCart();
  const { isAuthenticated, setShowAuthModal } = useAuth();
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeVariantIdx, setActiveVariantIdx] = useState(0);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState('Standard Pack');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({ details: true, shipping: false });
  const [localReviews, setLocalReviews] = useState<Review[]>([]);
  const [localQuestions, setLocalQuestions] = useState<LocalQuestion[]>([]);

  // Review form
  const [newRating, setNewRating] = useState(5);
  const [newTitle, setNewTitle] = useState('');
  const [newComment, setNewComment] = useState('');
  const [newAuthor, setNewAuthor] = useState('');

  // Q&A form
  const [newQuestion, setNewQuestion] = useState('');
  const [newUser, setNewUser] = useState('');

  const loadFromCatalog = (searchId: string): boolean => {
    const match = catalogProducts.find(
      (p) => p.id === searchId || p.id.toLowerCase() === searchId.toLowerCase()
    );
    if (!match) return false;

    const normalizedVariants: Variant[] = match.variants.map((v, idx) => ({
      id: idx + 1,
      colorName: v.colorName,
      hex: v.hex || '#C85A32',
      image: v.image,
      gallery: JSON.stringify(v.images && v.images.length > 0 ? v.images : [v.image]),
      stock: 10,
    }));

    const normalizedDetails: Detail[] = match.details.map((d, idx) => ({
      id: idx + 1,
      text: d,
      sortOrder: idx + 1,
    }));

    const normalizedReviews: Review[] = match.reviews.map((r, idx) => ({
      id: idx + 1,
      author: r.author,
      rating: r.rating,
      date: r.date,
      title: r.title,
      comment: r.comment,
      verified: r.verified,
      approved: true,
    }));

    const normalizedQuestions: Question[] = match.questions.map((q, idx) => ({
      id: idx + 1,
      user: q.user,
      question: q.question,
      date: q.date,
      answer: q.answer || null,
    }));

    const fullProd: Product = {
      id: match.id,
      slug: match.id,
      name: match.name,
      price: match.salePrice || match.price,
      label: match.label || null,
      category: match.category,
      gender: match.gender,
      description: match.description,
      variants: normalizedVariants,
      details: normalizedDetails,
      reviews: normalizedReviews,
      questions: normalizedQuestions,
    };

    setProduct(fullProd);
    setLocalReviews(normalizedReviews);
    setLocalQuestions(normalizedQuestions);
    if (normalizedVariants[0]?.colorName) {
      setSelectedSize(normalizedVariants[0].colorName);
    }
    return true;
  };

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.name) {
          let vars: Variant[] = data.variants || [];
          if (!Array.isArray(vars) || vars.length === 0) {
            vars = [
              {
                id: 1,
                colorName: 'Standard Pack',
                hex: '#C85A32',
                image: data.image || '',
                gallery: JSON.stringify(data.images || (data.image ? [data.image] : [])),
                stock: 10,
              },
            ];
          }
          setProduct({ ...data, variants: vars });
          setLocalReviews(data.reviews || []);
          setLocalQuestions(data.questions || []);
          setLoading(false);
        } else {
          const success = loadFromCatalog(id);
          if (!success) setProduct(null);
          setLoading(false);
        }
      })
      .catch(() => {
        const success = loadFromCatalog(id);
        if (!success) setProduct(null);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-[#FFFDF9]">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-orange-200 border-t-[#C85A32] rounded-full animate-spin" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col min-h-screen bg-[#FFFDF9]">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center py-24 text-center font-sans">
          <HelpCircle className="w-16 h-16 text-[#C85A32] stroke-[1.25]" />
          <h2 className="text-2xl font-extrabold uppercase tracking-widest text-[#1E293B] mt-4 font-serif">Product Not Found</h2>
          <p className="text-slate-500 text-xs mt-2 font-light">The superfood formula you are looking for is currently unavailable.</p>
          <Link href="/shop" className="bg-[#C85A32] hover:bg-[#B04C27] text-white px-8 py-4 text-xs uppercase tracking-widest font-bold mt-6 rounded-xl shadow-lg">Back to Catalog</Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Safe Variant list fallback
  const variantsList: Variant[] = (product.variants && Array.isArray(product.variants) && product.variants.length > 0)
    ? product.variants
    : [{ id: 1, colorName: 'Standard Pack', hex: '#C85A32', image: (product as { image?: string }).image || '', gallery: '[]', stock: 10 }];

  const activeVariant = variantsList[activeVariantIdx] || variantsList[0];

  // Safe Image extraction
  let images: string[] = [];
  try {
    if (typeof activeVariant.gallery === 'string') {
      images = JSON.parse(activeVariant.gallery);
    } else if (Array.isArray((activeVariant as Record<string, unknown>).images)) {
      images = (activeVariant as Record<string, unknown>).images as string[];
    }
  } catch {
    images = [];
  }
  if (!images || images.length === 0) {
    images = activeVariant?.image ? [activeVariant.image] : [];
  }
  const mainImage = images[activeImageIdx] || activeVariant?.image || '';

  // Calculate You May Also Like related products
  const relatedProducts = catalogProducts
    .filter((p) => p.id !== product.slug && p.id !== product.id)
    .slice(0, 4);

  const handleSwatchClick = (idx: number) => {
    setActiveVariantIdx(idx);
    setActiveImageIdx(0);
    if (variantsList[idx]?.colorName) {
      setSelectedSize(variantsList[idx].colorName);
    }
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) { setShowAuthModal(true); return; }
    if (!activeVariant) return;
    addToCart({
      id: `${product.slug}-${activeVariant.colorName.toLowerCase().replace(/\s+/g, '-')}-${selectedSize.toLowerCase()}`,
      name: product.name,
      price: product.price,
      image: activeVariant.image || mainImage,
      color: activeVariant.colorName,
      size: selectedSize,
      quantity,
    });
  };

  const handleBuyNow = () => {
    if (!isAuthenticated) { setShowAuthModal(true); return; }
    if (!activeVariant) return;
    const buyNowItem = {
      id: `${product.slug}-${activeVariant.colorName.toLowerCase().replace(/\s+/g, '-')}-${selectedSize.toLowerCase()}`,
      name: product.name,
      price: product.price,
      image: activeVariant.image || mainImage,
      color: activeVariant.colorName,
      size: selectedSize,
      quantity,
    };
    sessionStorage.setItem('aerth_buynow', JSON.stringify(buyNowItem));
    router.push('/checkout?mode=buynow');
  };

  const handleWishlist = () => {
    if (!isAuthenticated) { setShowAuthModal(true); return; }
    const newState = !isWishlisted;
    setIsWishlisted(newState);
    try {
      const stored = JSON.parse(localStorage.getItem('aerth_wishlist') || '[]');
      if (newState) {
        const item = { id: product.slug, name: product.name, price: product.price, image: activeVariant?.image || mainImage, slug: product.slug };
        localStorage.setItem('aerth_wishlist', JSON.stringify([...stored.filter((w: {id: string}) => w.id !== product.slug), item]));
      } else {
        localStorage.setItem('aerth_wishlist', JSON.stringify(stored.filter((w: {id: string}) => w.id !== product.slug)));
      }
    } catch { /* silent */ }
  };

  const toggleAccordion = (section: string) => {
    setOpenAccordions((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment || !newAuthor) return;

    const added: Review = {
      id: Date.now(),
      author: newAuthor,
      rating: newRating,
      date: new Date().toISOString().split('T')[0],
      title: newTitle || 'Verified Review',
      comment: newComment,
      verified: true,
      approved: true,
    };

    setLocalReviews((prev) => [added, ...prev]);
    setNewAuthor('');
    setNewTitle('');
    setNewComment('');
    alert('Thank you! Your verified review has been submitted successfully.');
  };

  const handleQuestionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion || !newUser) return;

    const added: LocalQuestion = {
      id: Date.now(),
      user: newUser,
      question: newQuestion,
      date: new Date().toISOString().split('T')[0],
    };

    setLocalQuestions((prev) => [added, ...prev]);
    setNewQuestion('');
    setNewUser('');
    alert('Thank you! Your question has been submitted to our nutrition team.');
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FFFDF9] text-[#1E293B]">
      <Header />
      <main className="flex-1 font-sans">
        
        {/* Breadcrumb Navigation */}
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 py-5 text-[10px] md:text-xs uppercase tracking-widest text-slate-400">
          <Link href="/" className="hover:text-[#C85A32] transition-colors">Home</Link><span className="mx-2 text-slate-300">/</span>
          <Link href="/shop" className="hover:text-[#C85A32] transition-colors">Shop</Link><span className="mx-2 text-slate-300">/</span>
          <span className="text-[#1E293B] font-extrabold">{product.name}</span>
        </div>

        {/* Main Product Showcase Section */}
        <section className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 pb-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column: Product Image Gallery */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="aspect-[4/3] sm:aspect-square bg-gradient-to-br from-[#FFF5ED] via-[#FFFDF9] to-[#FFF5ED] relative rounded-3xl overflow-hidden border border-orange-200/80 shadow-xl p-4 flex items-center justify-center">
              <Image 
                src={mainImage} 
                alt={`${product.name} main view`} 
                fill 
                sizes="(max-w-768px) 100vw, 55vw" 
                className="object-contain p-4 drop-shadow-xl transition-all duration-500" 
                priority 
              />
            </div>

            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => setActiveImageIdx(idx)}
                    className={`relative w-20 aspect-square rounded-xl overflow-hidden bg-white border-2 transition-all flex-shrink-0 p-1 ${idx === activeImageIdx ? 'border-[#C85A32] ring-2 ring-[#C85A32]/20 shadow-md' : 'border-stone-200/80 opacity-70 hover:opacity-100'}`}
                  >
                    <Image src={img} alt={`${product.name} thumbnail ${idx}`} fill sizes="80px" className="object-contain p-1" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Details & Purchasing */}
          <div className="lg:col-span-5 flex flex-col space-y-6 lg:sticky lg:top-24 h-fit">
            
            <div className="space-y-2">
              <span className="bg-[#C85A32] text-white text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-md shadow-sm inline-block">
                {product.label || 'CANADIAN CLEAN LABEL'}
              </span>
              <h1 className="text-2xl md:text-4xl font-extrabold uppercase tracking-tight text-[#1E293B] font-serif pt-1 leading-tight">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-2 pt-1">
                <div className="flex text-[#D97706]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <a href="#reviews" className="text-xs text-slate-500 font-bold uppercase tracking-widest hover:text-[#C85A32] transition-colors mt-0.5">
                  ({localReviews.length} verified buyer reports)
                </a>
              </div>
            </div>

            <div className="flex items-baseline gap-3 border-b border-stone-200/80 pb-4">
              <span className="text-2xl md:text-3xl font-black text-[#1E293B]">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.salePrice && product.salePrice > product.price && (
                <span className="text-sm text-slate-400 line-through font-semibold">
                  ₹{product.salePrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-slate-600 text-xs md:text-sm font-light leading-relaxed tracking-wide">
              {product.description}
            </p>

            {/* Variant Selector */}
            {variantsList.length > 1 && (
              <div className="space-y-2.5">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  Pack Variety: <span className="text-[#1E293B] font-extrabold">{activeVariant?.colorName}</span>
                </span>
                <div className="flex gap-3">
                  {variantsList.map((v, idx) => (
                    <button 
                      key={v.id || idx} 
                      onClick={() => handleSwatchClick(idx)}
                      className={`px-4 py-2 text-xs font-bold rounded-xl border transition-all uppercase tracking-wider ${idx === activeVariantIdx ? 'bg-[#FFF5ED] border-[#C85A32] text-[#C85A32] shadow-sm' : 'bg-white border-stone-200 text-slate-600 hover:border-stone-400'}`}
                    >
                      {v.colorName}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Quantity</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-10 h-10 rounded-xl border border-stone-300 flex items-center justify-center hover:border-[#C85A32] transition-colors"
                >
                  <Minus className="w-4 h-4 text-[#1E293B]" />
                </button>
                <span className="text-base font-extrabold w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => Math.min(10, q + 1))}
                  className="w-10 h-10 rounded-xl border border-stone-300 flex items-center justify-center hover:border-[#C85A32] transition-colors"
                >
                  <Plus className="w-4 h-4 text-[#1E293B]" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <button 
                onClick={handleAddToCart} 
                className="flex-1 bg-[#C85A32] hover:bg-[#B04C27] text-white font-bold text-xs uppercase tracking-widest py-4 transition-all shadow-lg hover:shadow-xl rounded-xl"
              >
                Add To Bag
              </button>
              <button 
                onClick={handleBuyNow} 
                className="flex-1 bg-[#1E293B] hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-widest py-4 transition-all shadow-lg hover:shadow-xl rounded-xl flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4 fill-amber-400 text-amber-400" /> Buy Now
              </button>
              <button 
                onClick={handleWishlist} 
                className="bg-white hover:bg-stone-50 text-slate-700 border border-stone-300 p-4 rounded-xl shadow-sm transition-all" 
                aria-label="Add to wishlist"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-slate-600'}`} />
              </button>
            </div>

            {/* Trust Features */}
            <div className="pt-2 grid grid-cols-2 gap-4 border-t border-stone-200/80 mt-2">
              <div className="flex items-center gap-2 text-slate-600">
                <Truck className="w-4 h-4 text-[#C85A32]" />
                <span className="text-[10px] uppercase tracking-widest font-bold">Fast Express Shipping</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <ShieldCheck className="w-4 h-4 text-[#C85A32]" />
                <span className="text-[10px] uppercase tracking-widest font-bold">100% Quality Guaranteed</span>
              </div>
            </div>

            {/* Accordions: Product Highlights & Details */}
            <div className="border-t border-stone-200/80 pt-4 space-y-2">
              <div className="border-b border-stone-200/80 pb-2">
                <button 
                  onClick={() => toggleAccordion('details')} 
                  className="w-full flex justify-between items-center py-2 text-xs font-extrabold uppercase tracking-wider text-[#1E293B] text-left"
                >
                  <span>Product Highlights & Formula Notes</span>
                  {openAccordions.details ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openAccordions.details && (
                  <ul className="list-disc list-inside text-xs text-slate-600 space-y-1.5 pt-2 pl-1 font-light tracking-wide leading-relaxed">
                    {product.details?.map((detail) => (
                      <li key={detail.id}>{detail.text}</li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="border-b border-stone-200/80 pb-2">
                <button 
                  onClick={() => toggleAccordion('shipping')} 
                  className="w-full flex justify-between items-center py-2 text-xs font-extrabold uppercase tracking-wider text-[#1E293B] text-left"
                >
                  <span>Quality Guarantee & Shipping</span>
                  {openAccordions.shipping ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openAccordions.shipping && (
                  <p className="text-xs text-slate-600 pt-2 pl-1 font-light tracking-wide leading-relaxed">
                    Free shipping on orders over ₹500. Vacuum sealed and nitrogen flushed under strict Canadian food-grade standards. 100% Freshness Guaranteed.
                  </p>
                )}
              </div>
            </div>

          </div>
        </section>

        {/* Reviews Section */}
        <section id="reviews" className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 py-16 border-t border-stone-200/80 grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-7 space-y-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight text-[#1E293B] font-serif">Customer Reviews</h2>
              <p className="text-slate-500 text-xs tracking-wider mt-1 uppercase font-bold">
                Showing {localReviews.length} verified buyer reports
              </p>
            </div>

            <div className="space-y-6">
              {localReviews.length === 0 ? (
                <p className="text-xs text-slate-500 font-light italic">No reviews yet. Be the first to review this product!</p>
              ) : (
                localReviews.map((rev) => (
                  <div key={rev.id} className="border-b border-stone-200/80 pb-6 space-y-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-xs font-extrabold uppercase text-[#1E293B]">{rev.author}</span>
                        {rev.verified && (
                          <span className="ml-2 bg-[#F2F7F2] text-[#2D6A4F] text-[9px] font-bold uppercase px-2 py-0.5 rounded border border-emerald-200">Verified Buyer</span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400 font-light">{rev.date}</span>
                    </div>
                    
                    <div className="flex items-center gap-1 text-[#D97706]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-current' : 'text-slate-200'}`} />
                      ))}
                    </div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#1E293B]">{rev.title}</h4>
                    <p className="text-xs text-slate-600 font-light leading-relaxed tracking-wide">{rev.comment}</p>
                  </div>
                ))
              )}
            </div>

            {/* Review Form */}
            <form onSubmit={handleReviewSubmit} className="bg-[#FFF5ED]/60 p-6 rounded-3xl border border-orange-200/80 space-y-4">
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#1E293B] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C85A32]" />
                Share Your Experience
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Your Name</label>
                  <input type="text" value={newAuthor} onChange={(e) => setNewAuthor(e.target.value)} required placeholder="Jane Doe" className="w-full bg-white border border-stone-300 rounded-xl p-3 text-xs focus:outline-none focus:border-[#C85A32] font-sans" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Rating</label>
                  <select value={newRating} onChange={(e) => setNewRating(Number(e.target.value))} className="w-full bg-white border border-stone-300 rounded-xl p-3 text-xs focus:outline-none focus:border-[#C85A32] font-sans">
                    {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{n} Stars</option>)}
                  </select>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Review Title</label>
                <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Delicious and potent!" className="w-full bg-white border border-stone-300 rounded-xl p-3 text-xs focus:outline-none focus:border-[#C85A32] font-sans" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Review Comment</label>
                <textarea rows={4} value={newComment} onChange={(e) => setNewComment(e.target.value)} required placeholder="Tell us how you enjoyed this superfood..." className="w-full bg-white border border-stone-300 rounded-xl p-3 text-xs focus:outline-none focus:border-[#C85A32] font-sans" />
              </div>
              <button type="submit" className="bg-[#C85A32] hover:bg-[#B04C27] text-white font-bold text-xs uppercase tracking-widest px-6 py-3.5 rounded-xl shadow-md">
                Submit Review
              </button>
            </form>
          </div>

          {/* Q&A Section */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight text-[#1E293B] font-serif">Questions & Answers</h2>
              <p className="text-slate-500 text-xs tracking-wider mt-1 uppercase font-bold">Ask a question. Get quick replies from our nutritionists.</p>
            </div>

            <div className="space-y-6">
              {localQuestions.length === 0 ? (
                <p className="text-xs text-slate-500 font-light italic">No questions asked yet. Have a question? Ask below!</p>
              ) : (
                localQuestions.map((q) => (
                  <div key={q.id} className="bg-white border border-stone-200/80 rounded-2xl p-5 space-y-3 shadow-sm">
                    <div>
                      <div className="flex justify-between items-center text-[10px] font-bold uppercase text-slate-400">
                        <span>User: {q.user}</span>
                        <span>{q.date}</span>
                      </div>
                      <p className="text-xs font-bold text-[#1E293B] mt-1 leading-relaxed">Q: {q.question}</p>
                    </div>
                    {q.answer ? (
                      <div className="border-t border-stone-100 pt-2.5">
                        <span className="text-[9px] font-extrabold uppercase text-[#C85A32]">Just Naturals Team Reply</span>
                        <p className="text-xs text-slate-600 font-light mt-0.5 leading-relaxed">{q.answer}</p>
                      </div>
                    ) : (
                      <div className="border-t border-stone-100 pt-2.5">
                        <p className="text-[10px] text-slate-400 italic">This question is pending nutritionist review.</p>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>

            {/* Question Form */}
            <form onSubmit={handleQuestionSubmit} className="bg-[#FFF5ED]/60 p-6 rounded-3xl border border-orange-200/80 space-y-4">
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#1E293B]">Ask A Question</h3>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Your Name</label>
                <input type="text" value={newUser} onChange={(e) => setNewUser(e.target.value)} required placeholder="John Doe" className="w-full bg-white border border-stone-300 rounded-xl p-3 text-xs focus:outline-none focus:border-[#C85A32] font-sans" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Your Question</label>
                <textarea rows={3} value={newQuestion} onChange={(e) => setNewQuestion(e.target.value)} required placeholder="How should I mix this powder into my morning routine?" className="w-full bg-white border border-stone-300 rounded-xl p-3 text-xs focus:outline-none focus:border-[#C85A32] font-sans" />
              </div>
              <button type="submit" className="bg-[#C85A32] hover:bg-[#B04C27] text-white font-bold text-xs uppercase tracking-widest px-6 py-3.5 rounded-xl shadow-md">
                Post Question
              </button>
            </form>
          </div>

        </section>

        {/* You May Also Like (Recommended Superfood Formulas) */}
        <section className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 py-16 border-t border-stone-200/80">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
            <div className="space-y-1">
              <span className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-[#C85A32] font-extrabold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#C85A32]" />
                COMPLEMENTARY NUTRITION
              </span>
              <h2 className="text-2xl md:text-4xl font-extrabold uppercase tracking-tight text-[#1E293B] font-serif">
                You May Also Like
              </h2>
            </div>
            <Link href="/shop" className="text-xs uppercase tracking-widest font-extrabold text-[#C85A32] hover:underline">
              View Full Catalog →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((rel) => (
              <div 
                key={rel.id} 
                className="bg-white rounded-3xl border border-stone-200/80 hover:border-[#C85A32]/60 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                <Link href={`/product/${rel.id}`} className="relative aspect-square w-full bg-gradient-to-b from-[#FFF5ED]/60 to-[#FFFDF9] block p-2">
                  <Image 
                    src={rel.variants[0]?.image || ''} 
                    alt={rel.name} 
                    fill 
                    sizes="300px" 
                    className="object-contain p-2 transition-transform duration-500 group-hover:scale-110 drop-shadow-sm" 
                  />
                </Link>

                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest">
                      {rel.category.replace(/-/g, ' ')}
                    </span>
                    <Link href={`/product/${rel.id}`} className="block group-hover:text-[#C85A32] transition-colors">
                      <h3 className="text-sm font-extrabold uppercase tracking-wide text-[#1E293B] font-serif leading-snug line-clamp-2">
                        {rel.name}
                      </h3>
                    </Link>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-stone-100">
                    <span className="text-base font-extrabold text-[#1E293B]">
                      ₹{rel.price}
                    </span>
                    <Link 
                      href={`/product/${rel.id}`} 
                      className="bg-[#FFF5ED] text-[#C85A32] font-bold text-[10px] uppercase tracking-widest px-3.5 py-2 rounded-xl hover:bg-[#C85A32] hover:text-white transition-colors border border-orange-200/80"
                    >
                      View Formula
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
