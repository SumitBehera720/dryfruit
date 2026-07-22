'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CheckCircle2, ShieldAlert, FileText, ArrowRight } from 'lucide-react';

export default function ReturnsPage() {
  const steps = [
    { num: '01', title: 'Initiate Request', desc: 'Visit our online returns portal. Enter your Order ID and Email Address to select the items you wish to return or exchange.' },
    { num: '02', title: 'Pack Your Items', desc: 'Place the items back in their original packaging, ensuring all labels, price tags, and hang-tags are intact.' },
    { num: '03', title: 'Pickup & Quality Check', desc: 'Our courier partner will pick up the package within 24-48 hours. Once received at our warehouse, items undergo a quality check.' },
    { num: '04', title: 'Refund / Exchange Dispatch', desc: 'Approved returns are refunded to the original payment source within 5-7 business days. Exchanges are shipped immediately.' }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1 bg-zinc-50/50 py-16 font-sans">
        <div className="max-w-4xl mx-auto px-4">
          
          {/* Header */}
          <div className="text-center space-y-4 mb-16">
            <span className="text-xs uppercase tracking-[0.3em] text-zinc-500 font-bold block">Assurance</span>
            <h1 className="text-3xl md:text-5xl font-extrabold uppercase tracking-widest text-black">Returns & Exchanges</h1>
            <p className="text-zinc-500 text-xs md:text-sm max-w-lg mx-auto tracking-wide leading-relaxed font-light uppercase">
              Our 14-day hassle-free policy guarantees your satisfaction.
            </p>
          </div>

          {/* Policy Overview Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white border border-zinc-100 rounded-2xl p-6 md:p-8 space-y-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-black" />
                <h2 className="text-xs font-bold uppercase tracking-wider text-black">Eligible Items</h2>
              </div>
              <ul className="space-y-2 text-xs text-zinc-500 font-light list-disc pl-4 leading-relaxed">
                <li>Unworn and unwashed garments.</li>
                <li>Items with original tags and branding materials attached.</li>
                <li>Products returned within 14 days of delivery.</li>
                <li>Incorrect or damaged products received (please attach images in the request).</li>
              </ul>
            </div>

            <div className="bg-white border border-zinc-100 rounded-2xl p-6 md:p-8 space-y-4">
              <div className="flex items-center gap-3">
                <ShieldAlert className="w-5 h-5 text-black" />
                <h2 className="text-xs font-bold uppercase tracking-wider text-black">Non-Eligible Items</h2>
              </div>
              <ul className="space-y-2 text-xs text-zinc-500 font-light list-disc pl-4 leading-relaxed">
                <li>Undergarments, socks, and intimate wear (due to hygiene and sanitary concerns).</li>
                <li>Products purchased during clear-out clearance sale events.</li>
                <li>Items showing visible signs of wear, sweat marks, cosmetics, or perfumes.</li>
              </ul>
            </div>
          </div>

          {/* Timeline Steps */}
          <div className="bg-white border border-zinc-100 rounded-2xl shadow-sm p-6 md:p-8 space-y-8">
            <h2 className="text-sm font-bold uppercase tracking-wider text-black border-b border-zinc-100 pb-3">The Return Process</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((step, idx) => (
                <div key={idx} className="space-y-3 relative group">
                  <span className="text-3xl font-extrabold text-zinc-100 group-hover:text-zinc-200 transition-colors block leading-none">{step.num}</span>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-black">{step.title}</h3>
                  <p className="text-[11px] text-zinc-500 font-light leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>

            {/* CTA Portal Link */}
            <div className="flex flex-col sm:flex-row items-center justify-between bg-zinc-50 border border-zinc-100 rounded-xl p-5 mt-8 gap-4">
              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-black flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-black mb-1">Ready to initiate a return?</h4>
                  <p className="text-[11px] text-zinc-500 font-light">Have your order number and billing details ready.</p>
                </div>
              </div>
              <button className="flex items-center gap-1.5 bg-black hover:bg-zinc-800 text-white font-bold text-[10px] md:text-xs uppercase tracking-widest px-5 py-3 transition-colors cursor-pointer rounded-lg">
                <span>Returns Portal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
