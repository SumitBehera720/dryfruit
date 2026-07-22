'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ChevronDown, HelpCircle, Shield, ShoppingBag, Truck } from 'lucide-react';

interface FAQItem {
  q: string;
  a: string;
}

interface FAQCategory {
  title: string;
  icon: React.ReactNode;
  items: FAQItem[];
}

export default function FAQsPage() {
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  const categories: FAQCategory[] = [
    {
      title: 'Orders & Payments',
      icon: <ShoppingBag className="w-5 h-5 text-zinc-400" />,
      items: [
        { q: 'How do I track my order?', a: 'Once your order is shipped, you will receive a tracking link via email and SMS. You can also view details under your account dashboard.' },
        { q: 'What payment methods do you accept?', a: 'We accept all major credit/debit cards, UPI (GPay, PhonePe, Paytm), Netbanking, and popular digital wallets.' },
        { q: 'Can I cancel or modify my order?', a: 'Orders can be cancelled or modified within 1 hour of placing them. Please contact our support team immediately.' },
      ]
    },
    {
      title: 'Shipping & Delivery',
      icon: <Truck className="w-5 h-5 text-zinc-400" />,
      items: [
        { q: 'How long does shipping take?', a: 'Domestic orders are processed within 24 hours and delivered in 3-5 business days. International shipping takes 7-10 business days.' },
        { q: 'Do you offer free shipping?', a: 'Yes! We offer free standard shipping on all domestic orders above 3,999. Orders below this threshold incur a flat delivery fee.' },
      ]
    },
    {
      title: 'Returns & Exchanges',
      icon: <Shield className="w-5 h-5 text-zinc-400" />,
      items: [
        { q: 'What is your return policy?', a: 'We offer a 14-day hassle-free return and exchange policy. Items must be unworn, unwashed, and in their original packaging with tags intact.' },
        { q: 'How do I start a return?', a: 'To start a return, visit our Returns page, enter your order number and email, and select the item you want to return.' },
      ]
    },
    {
      title: 'Products & Sizing',
      icon: <HelpCircle className="w-5 h-5 text-zinc-400" />,
      items: [
        { q: 'How do I find my size?', a: 'Please refer to our interactive Size Guide page. We provide detailed measurement tables for both men and women.' },
        { q: 'How should I wash my sportswear?', a: 'We recommend machine washing in cold water with similar colors. Avoid fabric softeners and tumble dry on low to preserve compression technology.' },
      ]
    }
  ];

  const toggleFAQ = (catIdx: number, itemIdx: number) => {
    const key = `${catIdx}-${itemIdx}`;
    setOpenIndex(openIndex === key ? null : key);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1 bg-zinc-50/50 py-16 font-sans">
        <div className="max-w-4xl mx-auto px-4">
          
          {/* Header */}
          <div className="text-center space-y-4 mb-16">
            <span className="text-xs uppercase tracking-[0.3em] text-zinc-500 font-bold block">Support Hub</span>
            <h1 className="text-3xl md:text-5xl font-extrabold uppercase tracking-widest text-black">Frequently Asked Questions</h1>
            <p className="text-zinc-500 text-xs md:text-sm max-w-lg mx-auto tracking-wide leading-relaxed font-light uppercase">
              Find instant answers to common questions about orders, shipping, and sizing.
            </p>
          </div>

          {/* Accordion Categories */}
          <div className="space-y-10">
            {categories.map((cat, catIdx) => (
              <div key={catIdx} className="bg-white border border-zinc-100 rounded-2xl shadow-sm p-6 md:p-8">
                <div className="flex items-center gap-3 border-b border-zinc-100 pb-4 mb-6">
                  {cat.icon}
                  <h2 className="text-sm font-bold uppercase tracking-wider text-black">{cat.title}</h2>
                </div>
                
                <div className="divide-y divide-zinc-100">
                  {cat.items.map((item, itemIdx) => {
                    const isOpen = openIndex === `${catIdx}-${itemIdx}`;
                    return (
                      <div key={itemIdx} className="py-4 first:pt-0 last:pb-0">
                        <button
                          onClick={() => toggleFAQ(catIdx, itemIdx)}
                          className="w-full flex justify-between items-center text-left py-2 focus:outline-none group"
                        >
                          <span className="text-xs md:text-sm font-semibold text-zinc-800 group-hover:text-black transition-colors uppercase tracking-wider">
                            {item.q}
                          </span>
                          <ChevronDown className={`w-4 h-4 text-zinc-400 group-hover:text-black transition-transform duration-300 ${isOpen ? 'rotate-180 text-black' : ''}`} />
                        </button>
                        {isOpen && (
                          <p className="mt-2 text-xs md:text-sm text-zinc-500 font-light leading-relaxed pr-6 animate-fadeIn">
                            {item.a}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
