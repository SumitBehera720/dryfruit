'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Truck, Clock, Globe2, AlertCircle } from 'lucide-react';

export default function ShippingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1 bg-zinc-50/50 py-16 font-sans">
        <div className="max-w-4xl mx-auto px-4">
          
          {/* Header */}
          <div className="text-center space-y-4 mb-16">
            <span className="text-xs uppercase tracking-[0.3em] text-zinc-500 font-bold block">logistics</span>
            <h1 className="text-3xl md:text-5xl font-extrabold uppercase tracking-widest text-black">Shipping & Delivery</h1>
            <p className="text-zinc-500 text-xs md:text-sm max-w-lg mx-auto tracking-wide leading-relaxed font-light uppercase">
              How we pack, ship, and deliver your AERTH premium performance wear.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white border border-zinc-100 rounded-2xl shadow-sm p-6 space-y-4">
              <div className="w-10 h-10 bg-zinc-50 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-black" />
              </div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-black">Processing Time</h2>
              <p className="text-xs text-zinc-500 font-light leading-relaxed">
                All standard orders are processed and dispatched within 24 hours of placement (excluding Sundays and public holidays).
              </p>
            </div>

            <div className="bg-white border border-zinc-100 rounded-2xl shadow-sm p-6 space-y-4">
              <div className="w-10 h-10 bg-zinc-50 rounded-lg flex items-center justify-center">
                <Truck className="w-5 h-5 text-black" />
              </div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-black">Domestic Shipping</h2>
              <p className="text-xs text-zinc-500 font-light leading-relaxed">
                Free standard shipping on orders above 3,999. Orders below are charged a flat rate of 150. Delivers in 3-5 business days.
              </p>
            </div>

            <div className="bg-white border border-zinc-100 rounded-2xl shadow-sm p-6 space-y-4">
              <div className="w-10 h-10 bg-zinc-50 rounded-lg flex items-center justify-center">
                <Globe2 className="w-5 h-5 text-black" />
              </div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-black">International Shipping</h2>
              <p className="text-xs text-zinc-500 font-light leading-relaxed">
                We ship to over 150 countries. Shipping charges are calculated at checkout. Delivery takes 7-10 business days.
              </p>
            </div>
          </div>

          {/* Delivery Table & Details */}
          <div className="bg-white border border-zinc-100 rounded-2xl shadow-sm p-6 md:p-8 space-y-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-black border-b border-zinc-100 pb-3">Delivery Estimates</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-sans border-collapse">
                <thead>
                  <tr className="border-b border-zinc-100 text-zinc-400 font-semibold uppercase tracking-wider">
                    <th className="pb-3 pr-4">Region</th>
                    <th className="pb-3 px-4">Courier Partner</th>
                    <th className="pb-3 pl-4 text-right">Est. Delivery Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-50 text-zinc-600 font-light uppercase tracking-wider">
                  <tr>
                    <td className="py-4 pr-4 font-semibold text-black">Metros & Tier 1 Cities</td>
                    <td className="py-4 px-4">BlueDart / Delhivery Express</td>
                    <td className="py-4 pl-4 text-right">2 - 3 Business Days</td>
                  </tr>
                  <tr>
                    <td className="py-4 pr-4 font-semibold text-black">Rest of India</td>
                    <td className="py-4 px-4">Delhivery / Xpressbees</td>
                    <td className="py-4 pl-4 text-right">3 - 5 Business Days</td>
                  </tr>
                  <tr>
                    <td className="py-4 pr-4 font-semibold text-black">North East & J&K</td>
                    <td className="py-4 px-4">India Post Speed Post</td>
                    <td className="py-4 pl-4 text-right">5 - 7 Business Days</td>
                  </tr>
                  <tr>
                    <td className="py-4 pr-4 font-semibold text-black">International</td>
                    <td className="py-4 px-4">DHL Express / FedEx</td>
                    <td className="py-4 pl-4 text-right">7 - 10 Business Days</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex gap-3 bg-zinc-50 border border-zinc-100 rounded-xl p-4 mt-6">
              <AlertCircle className="w-5 h-5 text-black flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-black mb-1">Import Duties & Taxes</h4>
                <p className="text-[11px] text-zinc-500 font-light leading-relaxed">
                  For international orders, custom duties, import taxes, and brokerage fees may be assessed by the customs authority in your country. These charges must be paid by the recipient at delivery.
                </p>
              </div>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
