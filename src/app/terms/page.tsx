'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function TermsPage() {
  const sections = [
    { title: '1. Agreement to Terms', text: 'By accessing or purchasing from our website yourdomain.com, you agree to be bound by these Terms and Conditions. If you do not agree to all terms, please refrain from using our services.' },
    { title: '2. Product Description & Prices', text: 'We strive for accuracy in product details, descriptions, and pricing. In the event of a listing error, we reserve the right to correct pricing errors, cancel orders, or refuse service.' },
    { title: '3. Orders & Payment', text: 'All orders are subject to availability and acceptance. Payment details must be valid. We reserve the right to decline transactions that show signs of fraudulent activity.' },
    { title: '4. Shipping & Delivery', text: 'Delivery timelines are estimates. We are not liable for packages delayed by courier partners or international customs processes.' },
    { title: '5. Intellectual Property', text: 'All content, logos, graphics, text, and product packaging designs on this site are the exclusive property of Just Naturals and are protected under international copyright laws.' },
    { title: '6. Limitation of Liability', text: 'Just Naturals is not liable for indirect, incidental, or consequential damages resulting from the use or consumption of our products.' }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1 bg-zinc-50/50 py-16 font-sans">
        <div className="max-w-3xl mx-auto px-4">
          
          {/* Header */}
          <div className="text-center space-y-4 mb-16">
            <span className="text-xs uppercase tracking-[0.3em] text-zinc-500 font-bold block">Legal agreement</span>
            <h1 className="text-3xl md:text-5xl font-extrabold uppercase tracking-widest text-black">Terms & Conditions</h1>
            <p className="text-zinc-500 text-xs md:text-sm tracking-wide leading-relaxed font-light uppercase">
              Last updated: August 2026. Please read our service agreement terms carefully.
            </p>
          </div>

          {/* Content Document */}
          <div className="bg-white border border-zinc-100 rounded-2xl shadow-sm p-8 md:p-12 space-y-8">
            <p className="text-xs text-zinc-500 font-light leading-relaxed uppercase tracking-wider">
              Welcome to Just Naturals. These Terms and Conditions govern your relationship and usage of the site and products provided by Just Naturals.
            </p>
            
            <div className="space-y-6">
              {sections.map((sec, idx) => (
                <div key={idx} className="space-y-2">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-black">{sec.title}</h2>
                  <p className="text-xs md:text-sm text-zinc-500 font-light leading-relaxed">
                    {sec.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t border-zinc-100 pt-6 text-[11px] text-zinc-400 font-light">
              For any questions regarding these Terms & Conditions, please contact us at support@justnaturals.com.
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
