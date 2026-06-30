'use client';

import React, { use, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Star, 
  Heart, 
  ChevronDown, 
  ChevronUp, 
  HelpCircle, 
  Truck, 
  RotateCcw
} from 'lucide-react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { useCart } from '../../../context/CartContext';
import { products, Review, Question } from '../../../data/products';

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { addToCart } = useCart();

  const product = products.find((p) => p.id === id);

  const [activeVariantIdx, setActiveVariantIdx] = useState(0);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState('S');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    details: true,
    shipping: false,
  });

  // Review Form state
  const [newRating, setNewRating] = useState(5);
  const [newTitle, setNewTitle] = useState('');
  const [newComment, setNewComment] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [localReviews, setLocalReviews] = useState<Review[]>([]);

  // Q&A state
  const [newQuestion, setNewQuestion] = useState('');
  const [newUser, setNewUser] = useState('');
  const [localQuestions, setLocalQuestions] = useState<Question[]>([]);

  useEffect(() => {
    if (product) {
      setActiveVariantIdx(0);
      setActiveImageIdx(0);
      setLocalReviews(product.reviews);
      setLocalQuestions(product.questions);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center py-24 text-center font-sans">
          <HelpCircle className="w-16 h-16 text-zinc-300 stroke-[1.25]" />
          <h2 className="text-xl font-bold uppercase tracking-widest text-black mt-4">Product Not Found</h2>
          <p className="text-zinc-500 text-xs mt-2">The product you are looking for does not exist.</p>
          <Link href="/shop" className="bg-black text-white px-8 py-3 text-xs uppercase tracking-widest font-semibold mt-6">
            Back to Shop
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const activeVariant = product.variants[activeVariantIdx] || product.variants[0];
  const images = activeVariant.gallery;
  const mainImage = images[activeImageIdx] || activeVariant.image;

  const handleSwatchClick = (idx: number) => {
    setActiveVariantIdx(idx);
    setActiveImageIdx(0); // Reset gallery index
  };

  const handleAddToCart = () => {
    addToCart({
      id: `${product.id}-${activeVariant.colorName.toLowerCase().replace(' ', '-')}-${selectedSize.toLowerCase()}`,
      name: product.name,
      price: product.price,
      image: activeVariant.image,
      color: activeVariant.colorName,
      size: selectedSize,
    });
  };

  const toggleAccordion = (section: string) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Submit Review
  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment || !newAuthor) return;

    const added: Review = {
      id: `local-r-${Date.now()}`,
      author: newAuthor,
      rating: newRating,
      date: new Date().toISOString().split('T')[0],
      title: newTitle || 'Verified Review',
      comment: newComment,
      verified: true
    };

    setLocalReviews((prev) => [added, ...prev]);
    setNewAuthor('');
    setNewTitle('');
    setNewComment('');
    alert('Thank you! Your review has been submitted successfully.');
  };

  // Submit Question
  const handleQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion || !newUser) return;

    const added: Question = {
      id: `local-q-${Date.now()}`,
      user: newUser,
      question: newQuestion,
      date: new Date().toISOString().split('T')[0],
    };

    setLocalQuestions((prev) => [added, ...prev]);
    setNewQuestion('');
    setNewUser('');
    alert('Thank you! Your question has been submitted and is pending team review.');
  };

  // Similar Products filtering
  const similarProducts = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="flex-1 font-sans">
        
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 text-[10px] md:text-xs uppercase tracking-widest text-zinc-400">
          <Link href="/" className="hover:text-black transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/shop" className="hover:text-black transition-colors">Shop</Link>
          <span className="mx-2">/</span>
          <span className="text-black font-semibold">{product.name}</span>
        </div>

        {/* Product Details Section */}
        <section className="max-w-7xl mx-auto px-4 md:px-8 pb-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* Main Stage */}
            <div className="aspect-[3/4] bg-zinc-50 relative rounded-2xl overflow-hidden border border-zinc-100 shadow-sm">
              <Image 
                src={mainImage}
                alt={`${product.name} active display`}
                fill
                sizes="(max-w-768px) 100vw, 55vw"
                className="object-cover object-center"
                priority
              />
            </div>
            {/* Gallery Thumbnails */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`relative w-20 aspect-[3/4] rounded-lg overflow-hidden bg-zinc-100 border-2 transition-all flex-shrink-0 ${
                    idx === activeImageIdx ? 'border-black ring-1 ring-black' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image 
                    src={img}
                    alt={`${product.name} thumbnail ${idx}`}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Dynamic E-commerce Checkout Drawer */}
          <div className="lg:col-span-5 flex flex-col space-y-6 lg:sticky lg:top-24 h-fit">
            
            {/* Info */}
            <div className="space-y-2">
              {product.label && (
                <span className="bg-black text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm">
                  {product.label}
                </span>
              )}
              <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-wider text-black pt-1">
                {product.name}
              </h1>
              
              {/* Rating stars overview */}
              <div className="flex items-center gap-1.5 pt-1">
                <div className="flex text-black">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-black stroke-black" />
                  ))}
                </div>
                <a href="#reviews" className="text-[10px] text-zinc-500 uppercase tracking-widest hover:underline font-semibold mt-0.5">
                  ({localReviews.length} customer reviews)
                </a>
              </div>
            </div>

            {/* Price */}
            <p className="text-xl md:text-2xl font-bold text-black border-b border-zinc-100 pb-4">
              ₹{product.price.toLocaleString('en-IN')}
            </p>

            {/* Swatch Selector */}
            <div className="space-y-2.5">
              <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">
                Color: <span className="text-black">{activeVariant.colorName}</span>
              </span>
              <div className="flex gap-3">
                {product.variants.map((v, idx) => (
                  <button
                    key={v.colorName}
                    onClick={() => handleSwatchClick(idx)}
                    className={`w-7 h-7 rounded-full border-2 transition-all flex items-center justify-center ${
                      idx === activeVariantIdx ? 'border-black ring-1 ring-black scale-110' : 'border-zinc-300 hover:border-zinc-500'
                    }`}
                    style={{ backgroundColor: v.hex }}
                    title={v.colorName}
                  />
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="space-y-2.5">
              <div className="flex justify-between items-center">
                <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">
                  Size: <span className="text-black">{selectedSize}</span>
                </span>
                <button className="text-[10px] uppercase tracking-widest text-zinc-500 hover:text-black font-semibold underline">
                  Size Guide
                </button>
              </div>
              <div className="flex gap-2">
                {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 py-2 text-xs font-semibold rounded-lg border transition-all uppercase tracking-wider ${
                      size === selectedSize
                        ? 'bg-black border-black text-white shadow-md'
                        : 'bg-white border-zinc-200 text-zinc-700 hover:border-zinc-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-black hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-widest py-4.5 transition-all shadow-md hover:shadow-lg rounded-xl"
              >
                Add To Bag
              </button>
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="bg-white hover:bg-zinc-50 text-zinc-800 border border-zinc-200 p-4 rounded-xl shadow-sm transition-all"
                aria-label="Add to wishlist"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 stroke-red-500' : 'stroke-zinc-600'}`} />
              </button>
            </div>

            {/* Info Badges */}
            <div className="pt-2 grid grid-cols-2 gap-4 border-t border-zinc-100 mt-2">
              <div className="flex items-center gap-2 text-zinc-500">
                <Truck className="w-4 h-4" />
                <span className="text-[10px] uppercase tracking-widest font-semibold">Shiprocket Fast</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-500">
                <RotateCcw className="w-4 h-4" />
                <span className="text-[10px] uppercase tracking-widest font-semibold">14-Day Returns</span>
              </div>
            </div>

            {/* Accordion List */}
            <div className="border-t border-zinc-100 pt-4 space-y-2">
              {/* Features / Details */}
              <div className="border-b border-zinc-100 pb-2">
                <button
                  onClick={() => toggleAccordion('details')}
                  className="w-full flex justify-between items-center py-2 text-xs font-bold uppercase tracking-wider text-black text-left"
                >
                  <span>Product Highlights</span>
                  {openAccordions.details ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openAccordions.details && (
                  <ul className="list-disc list-inside text-xs text-zinc-600 space-y-1.5 pt-2 pl-1 font-light tracking-wide leading-relaxed">
                    {product.details ? (
                      product.details.map((detail, idx) => <li key={idx}>{detail}</li>)
                    ) : (
                      <li>Premium activewear fabric detailing</li>
                    )}
                  </ul>
                )}
              </div>

              {/* Shipping / Returns info */}
              <div className="border-b border-zinc-100 pb-2">
                <button
                  onClick={() => toggleAccordion('shipping')}
                  className="w-full flex justify-between items-center py-2 text-xs font-bold uppercase tracking-wider text-black text-left"
                >
                  <span>Shipping & Returns</span>
                  {openAccordions.shipping ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openAccordions.shipping && (
                  <p className="text-xs text-zinc-600 pt-2 pl-1 font-light tracking-wide leading-relaxed">
                    Free shipping on all orders over ₹3,999. Shipping is integrated via **Shiprocket** with real-time tracking updates sent right to your phone. We offer a hassle-free 14-day return and exchange policy.
                  </p>
                )}
              </div>
            </div>

          </div>

        </section>

        {/* Similar Products Carousel */}
        {similarProducts.length > 0 && (
          <section className="bg-zinc-50 border-t border-zinc-100 py-16">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
              <h2 className="text-xl md:text-2xl font-bold uppercase tracking-widest text-black mb-8">
                Similar Products
              </h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {similarProducts.map((p) => (
                  <div key={p.id} className="flex flex-col relative group">
                    <div className="aspect-[3/4] bg-white relative rounded-xl overflow-hidden shadow-sm border border-zinc-100">
                      <Link href={`/product/${p.id}`} className="w-full h-full block">
                        <Image 
                          src={p.variants[0].image}
                          alt={p.name}
                          fill
                          sizes="20vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </Link>
                    </div>
                    <div className="mt-3">
                      <Link href={`/product/${p.id}`} className="hover:underline">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-black">{p.name}</h4>
                      </Link>
                      <p className="text-xs text-zinc-500 font-bold mt-1">₹{p.price.toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Customer Reviews & Questions Section */}
        <section id="reviews" className="max-w-7xl mx-auto px-4 md:px-8 py-16 border-t border-zinc-100 grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Reviews List Column (Left) */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <h2 className="text-xl md:text-2xl font-bold uppercase tracking-widest text-black">
                Customer Reviews
              </h2>
              <p className="text-zinc-500 text-xs tracking-wider mt-1.5 uppercase font-semibold">
                Showing {localReviews.length} verified buyer reports
              </p>
            </div>

            <div className="space-y-6">
              {localReviews.length === 0 ? (
                <p className="text-xs text-zinc-500 font-light italic">No reviews yet. Be the first to review this product!</p>
              ) : (
                localReviews.map((rev) => (
                  <div key={rev.id} className="border-b border-zinc-100 pb-6 space-y-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-xs font-bold uppercase text-black">{rev.author}</span>
                        {rev.verified && (
                          <span className="ml-2 bg-green-50 text-green-700 text-[8px] font-bold uppercase px-2 py-0.5 rounded border border-green-200">
                            Verified Buyer
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-zinc-400 font-light">{rev.date}</span>
                    </div>

                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-3.5 h-3.5 ${
                            i < rev.rating ? 'fill-black stroke-black' : 'stroke-zinc-200'
                          }`} 
                        />
                      ))}
                    </div>

                    <h4 className="text-xs font-bold uppercase tracking-wider text-black">{rev.title}</h4>
                    <p className="text-xs text-zinc-600 font-light leading-relaxed tracking-wide">
                      {rev.comment}
                    </p>
                  </div>
                ))
              )}
            </div>

            {/* Write a review form */}
            <form onSubmit={handleReviewSubmit} className="bg-zinc-50 p-6 rounded-2xl border border-zinc-100 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-black">Share Your Experience</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Name</label>
                  <input 
                    type="text" 
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    required
                    placeholder="Jane Doe"
                    className="w-full bg-white border border-zinc-200 rounded-lg p-2 text-xs focus:outline-none focus:border-black font-sans"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Rating</label>
                  <select 
                    value={newRating}
                    onChange={(e) => setNewRating(Number(e.target.value))}
                    className="w-full bg-white border border-zinc-200 rounded-lg p-2 text-xs focus:outline-none focus:border-black font-sans"
                  >
                    <option value={5}>5 Stars</option>
                    <option value={4}>4 Stars</option>
                    <option value={3}>3 Stars</option>
                    <option value={2}>2 Stars</option>
                    <option value={1}>1 Star</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Review Title</label>
                <input 
                  type="text" 
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Perfect leggings"
                  className="w-full bg-white border border-zinc-200 rounded-lg p-2 text-xs focus:outline-none focus:border-black font-sans"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Review Comment</label>
                <textarea 
                  rows={4}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  required
                  placeholder="Tell us what you liked or disliked..."
                  className="w-full bg-white border border-zinc-200 rounded-lg p-2 text-xs focus:outline-none focus:border-black font-sans"
                />
              </div>

              <button 
                type="submit"
                className="bg-black hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-lg"
              >
                Submit Review
              </button>
            </form>
          </div>

          {/* Q&A Column (Right) */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h2 className="text-xl md:text-2xl font-bold uppercase tracking-widest text-black">
                Questions & Answers
              </h2>
              <p className="text-zinc-500 text-xs tracking-wider mt-1.5 uppercase font-semibold">
                Ask a question. Get quick replies.
              </p>
            </div>

            <div className="space-y-6">
              {localQuestions.length === 0 ? (
                <p className="text-xs text-zinc-500 font-light italic">No questions asked yet. Have a question? Ask below!</p>
              ) : (
                localQuestions.map((q) => (
                  <div key={q.id} className="bg-zinc-50 border border-zinc-100 rounded-xl p-4 space-y-3 shadow-sm">
                    <div>
                      <div className="flex justify-between items-center text-[10px] font-bold uppercase text-zinc-400">
                        <span>User: {q.user}</span>
                        <span>{q.date}</span>
                      </div>
                      <p className="text-xs font-semibold text-black mt-1 leading-relaxed">
                        Q: {q.question}
                      </p>
                    </div>

                    {q.answer ? (
                      <div className="border-t border-zinc-200/50 pt-2.5">
                        <span className="text-[9px] font-bold uppercase text-zinc-400">AERTH Team Reply</span>
                        <p className="text-xs text-zinc-600 font-light mt-0.5 leading-relaxed">
                          {q.answer}
                        </p>
                      </div>
                    ) : (
                      <div className="border-t border-zinc-200/50 pt-2.5">
                        <p className="text-[10px] text-zinc-400 italic">This question is pending review by our support team.</p>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>

            {/* Ask a Question Form */}
            <form onSubmit={handleQuestionSubmit} className="bg-zinc-50 p-6 rounded-2xl border border-zinc-100 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-black">Ask a Question</h3>
              
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Your Name</label>
                <input 
                  type="text" 
                  value={newUser}
                  onChange={(e) => setNewUser(e.target.value)}
                  required
                  placeholder="John Doe"
                  className="w-full bg-white border border-zinc-200 rounded-lg p-2 text-xs focus:outline-none focus:border-black font-sans"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Your Question</label>
                <textarea 
                  rows={3}
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  required
                  placeholder="Is this product running true to size?"
                  className="w-full bg-white border border-zinc-200 rounded-lg p-2 text-xs focus:outline-none focus:border-black font-sans"
                />
              </div>

              <button 
                type="submit"
                className="bg-black hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-lg"
              >
                Post Question
              </button>
            </form>
          </div>

        </section>

      </main>

      <Footer />
    </div>
  );
}
