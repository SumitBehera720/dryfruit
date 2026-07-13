'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { CheckCircle, ShoppingBag } from 'lucide-react';

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('id');

  return (
    <div className="flex-1 flex flex-col items-center justify-center py-24 text-center px-4">
      <div className="bg-green-50 border border-green-200 rounded-full p-4 mb-6">
        <CheckCircle className="w-10 h-10 text-green-600" />
      </div>
      <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-widest text-black">Order Placed!</h1>
      <p className="text-zinc-500 text-sm mt-3 max-w-md leading-relaxed">
        Thank you for your purchase. Your order has been placed successfully.
      </p>
      {orderId && (
        <p className="text-xs text-zinc-400 mt-2 font-semibold">
          Order Reference: #{orderId}
        </p>
      )}
      <p className="text-xs text-zinc-400 mt-1">
        A confirmation email will be sent shortly.
      </p>
      <div className="flex gap-4 mt-8">
        <Link
          href="/shop"
          className="bg-black text-white hover:bg-zinc-800 font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-xl transition-colors flex items-center gap-2"
        >
          <ShoppingBag className="w-4 h-4" /> Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white font-sans">
      <Header />
      <main className="flex-1">
        <Suspense fallback={
          <div className="flex-1 flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-zinc-300 border-t-black rounded-full animate-spin" />
          </div>
        }>
          <ConfirmationContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
