'use client';

import React, { useState } from 'react';
import { 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  RefreshCw, 
  HelpCircle 
} from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Email is required');
      return;
    }
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      setError('Please enter a valid email');
      return;
    }
    
    // Simulate successful subscription
    setError('');
    setSubscribed(true);
    setEmail('');
    setTimeout(() => {
      setSubscribed(false);
    }, 4000);
  };

  const socialLinks = [
    { 
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051C.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
        </svg>
      ), 
      url: '#' 
    },
    { 
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ), 
      url: '#' 
    },
    { 
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.508 9.388.508 9.388.508s7.518 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ), 
      url: '#' 
    },
    { 
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.088 3.16 9.429 7.633 11.167-.07-.9-.12-2.27.02-3.23l1.19-5.07s-.3-.6-.3-1.48c0-1.39.8-2.42 1.8-2.42.85 0 1.26.64 1.26 1.41 0 .85-.54 2.13-.82 3.31-.23.99.49 1.8 1.47 1.8 1.77 0 3.13-1.87 3.13-4.57 0-2.39-1.72-4.06-4.17-4.06-2.85 0-4.51 2.13-4.51 4.33 0 .86.33 1.78.74 2.28a.3.3 0 0 1 .07.28l-.27 1.13c-.04.18-.15.23-.34.14-1.27-.59-2.07-2.44-2.07-3.93 0-3.19 2.32-6.13 6.69-6.13 3.51 0 6.24 2.5 6.24 5.85 0 3.49-2.2 6.3-5.26 6.3-.99 0-1.92-.51-2.24-1.11l-.61 2.33c-.22.85-.81 1.91-1.21 2.56 1.12.35 2.31.54 3.54.54 6.63 0 12-5.37 12-12S18.63 0 12 0z"/>
        </svg>
      ), 
      url: '#' 
    }
  ];

  return (
    <footer className="w-full bg-[#0c0c0c] text-white font-sans border-t border-zinc-900">
      
      {/* Bottom Trust Bar */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 border-b border-zinc-900 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center lg:text-left">
        <div className="flex flex-col lg:flex-row items-center gap-3">
          <Truck className="w-5 h-5 text-white/80 stroke-[1.5]" />
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">Free Shipping</h4>
            <p className="text-[10px] text-zinc-500 tracking-wider mt-0.5">On all orders above ₹3,999</p>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row items-center gap-3">
          <RefreshCw className="w-5 h-5 text-white/80 stroke-[1.5]" />
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">Easy Returns</h4>
            <p className="text-[10px] text-zinc-500 tracking-wider mt-0.5">14-day return policy</p>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-white/80 stroke-[1.5]" />
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">Secure Payments</h4>
            <p className="text-[10px] text-zinc-500 tracking-wider mt-0.5">100% secure checkout</p>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row items-center gap-3">
          <HelpCircle className="w-5 h-5 text-white/80 stroke-[1.5]" />
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">Customer Support</h4>
            <p className="text-[10px] text-zinc-500 tracking-wider mt-0.5">We&apos;re here to help</p>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-12">
        
        {/* Brand Column */}
        <div className="lg:col-span-3 space-y-4">
          <span className="text-2xl font-bold tracking-[0.25em] text-white">AERTH</span>
          <p className="text-xs text-zinc-400 tracking-wider font-light">Move with the Elements.</p>
          <div className="flex gap-4 pt-2">
            {socialLinks.map((social, idx) => (
              <a 
                key={idx} 
                href={social.url} 
                className="bg-zinc-900 border border-zinc-800 p-2.5 rounded-full hover:bg-zinc-800 hover:text-zinc-200 transition-colors"
                aria-label="Social link"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Shop Links */}
        <div className="lg:col-span-2">
          <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-4 text-white">Shop</h4>
          <ul className="space-y-2 text-xs text-zinc-400 font-light tracking-widest uppercase">
            <li><Link href="/shop" className="hover:text-white transition-colors">All Products</Link></li>
            <li><Link href="/shop?category=leggings" className="hover:text-white transition-colors">Leggings</Link></li>
            <li><Link href="/shop?category=shorts" className="hover:text-white transition-colors">Shorts</Link></li>
            <li><Link href="/shop?category=bras" className="hover:text-white transition-colors">Sports Bras</Link></li>
            <li><Link href="/shop" className="hover:text-white transition-colors">Tops</Link></li>
            <li><Link href="/shop" className="hover:text-white transition-colors">Accessories</Link></li>
          </ul>
        </div>

        {/* Company Links */}
        <div className="lg:col-span-2">
          <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-4 text-white">Company</h4>
          <ul className="space-y-2 text-xs text-zinc-400 font-light tracking-widest uppercase">
            <li><Link href="/#about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link href="/#about" className="hover:text-white transition-colors">Our Mission</Link></li>
            <li><Link href="/#about" className="hover:text-white transition-colors">Sustainability</Link></li>
            <li><Link href="/#about" className="hover:text-white transition-colors">Careers</Link></li>
            <li><Link href="/#about" className="hover:text-white transition-colors">Contact Us</Link></li>
          </ul>
        </div>

        {/* Help Links */}
        <div className="lg:col-span-2">
          <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-4 text-white">Help</h4>
          <ul className="space-y-2 text-xs text-zinc-400 font-light tracking-widest uppercase">
            <li><Link href="/#about" className="hover:text-white transition-colors">FAQs</Link></li>
            <li><Link href="/#about" className="hover:text-white transition-colors">Shipping</Link></li>
            <li><Link href="/#about" className="hover:text-white transition-colors">Returns</Link></li>
            <li><Link href="/#about" className="hover:text-white transition-colors">Size Guide</Link></li>
            <li><Link href="/#about" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
            <li><Link href="/#about" className="hover:text-white transition-colors">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Newsletter Column */}
        <div className="lg:col-span-3 space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white">Stay Connected</h4>
          <p className="text-xs text-zinc-400 font-light tracking-wider leading-relaxed">
            New drops. Exclusive offers.
          </p>
          
          <form onSubmit={handleSubscribe} className="relative mt-2">
            <input 
              type="email" 
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
              placeholder="Enter your email"
              className="w-full bg-zinc-900 border border-zinc-800 focus:outline-none focus:border-zinc-500 rounded-lg px-4 py-3.5 pr-12 text-xs font-sans text-white placeholder-zinc-500"
            />
            <button 
              type="submit" 
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white text-black hover:bg-zinc-100 p-2 rounded-md transition-colors"
              aria-label="Subscribe"
            >
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {subscribed && (
            <p className="text-[10px] text-green-500 font-semibold tracking-wider uppercase animate-pulse">
              🎉 Thanks for subscribing!
            </p>
          )}
          {error && (
            <p className="text-[10px] text-red-500 font-semibold tracking-wider uppercase">
              ⚠️ {error}
            </p>
          )}

          {/* Payment Icons */}
          <div className="pt-4 flex flex-wrap gap-2">
            <span className="bg-zinc-950 border border-zinc-900 px-3 py-1 rounded text-[8px] font-bold tracking-widest text-zinc-400 uppercase">Visa</span>
            <span className="bg-zinc-950 border border-zinc-900 px-3 py-1 rounded text-[8px] font-bold tracking-widest text-zinc-400 uppercase">Mastercard</span>
            <span className="bg-zinc-950 border border-zinc-900 px-3 py-1 rounded text-[8px] font-bold tracking-widest text-zinc-400 uppercase">UPI</span>
            <span className="bg-zinc-950 border border-zinc-900 px-3 py-1 rounded text-[8px] font-bold tracking-widest text-zinc-400 uppercase">G-Pay</span>
          </div>
        </div>

      </div>

      {/* Copyright Bar */}
      <div className="w-full bg-[#080808] border-t border-zinc-900/60 py-6 text-center text-[10px] text-zinc-500 tracking-wider">
        © 2026, AERTH. All rights reserved.
      </div>

    </footer>
  );
}
