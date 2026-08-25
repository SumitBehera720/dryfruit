'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PrivacyPage() {
  const sections = [
    { title: '1. Information We Collect', text: 'We collect personal information that you provide directly, such as your name, shipping address, payment credentials, email, and phone number when making a purchase or subscribing to our newsletters.' },
    { title: '2. How We Use Your Data', text: 'We use the collected information to process orders, manage accounts, dispatch products, provide tracking updates, send newsletters, and analyze website performance to offer a better shopping experience.' },
    { title: '3. Data Sharing & Security', text: 'We do not sell your personal data. We only share details with trusted shipping operators (e.g. DHL Express, Delhivery) and secure payment processors (e.g. Stripe, Razorpay) to complete transactions.' },
    { title: '4. Cookies & Trackers', text: 'We use cookies and web beacons to store visitor preferences, record user-specific information on page visits, and customize web page content based on browser types.' },
    { title: '5. Your Rights', text: 'You have the right to request access to the personal data we store, request edits/rectifications, or request deletion of your information from our active databases.' }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1 bg-zinc-50/50 py-16 font-sans">
        <div className="max-w-3xl mx-auto px-4">
          
          {/* Header */}
          <div className="text-center space-y-4 mb-16">
            <span className="text-xs uppercase tracking-[0.3em] text-zinc-500 font-bold block">user privacy</span>
            <h1 className="text-3xl md:text-5xl font-extrabold uppercase tracking-widest text-black">Privacy Policy</h1>
            <p className="text-zinc-500 text-xs md:text-sm tracking-wide leading-relaxed font-light uppercase">
              Last updated: July 2026. Your privacy and data security are our top priorities.
            </p>
          </div>

          {/* Content Document */}
          <div className="bg-white border border-zinc-100 rounded-2xl shadow-sm p-8 md:p-12 space-y-8">
            <p className="text-xs text-zinc-500 font-light leading-relaxed uppercase tracking-wider">
              Organic Traditions is committed to safeguarding your personal privacy. This policy outlines how we collect, store, and utilize data.
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
              For any privacy or data removal requests, please contact our data officer at privacy@aerth.sport.
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
