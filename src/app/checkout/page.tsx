'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { ArrowLeft, Truck, Lock } from 'lucide-react';

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    customerName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });

  useEffect(() => {
    setMounted(true);
    if (cart.length === 0 && mounted) {
      router.push('/shop');
    }
  }, [cart, mounted, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          total: cartTotal,
          items: cart.map((item) => ({
            productName: item.name,
            price: item.price,
            quantity: item.quantity,
            color: item.color,
            size: item.size,
          })),
        }),
      });

      const order = await res.json();

      if (!res.ok) {
        alert('Checkout failed. Please try again.');
        return;
      }

      clearCart();
      router.push(`/order-confirmation?id=${order.id}`);
    } catch {
      alert('Connection error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans">
      <Header />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
          <Link href="/cart" className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-black transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Cart
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left: Checkout Form */}
            <div className="lg:col-span-7">
              <h1 className="text-xl md:text-2xl font-bold uppercase tracking-widest text-black mb-8">Checkout</h1>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-6 space-y-4">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-black">Contact Information</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5 col-span-2">
                      <label className="text-[10px] font-bold uppercase text-zinc-500">Full Name</label>
                      <input name="customerName" value={form.customerName} onChange={handleChange} required className="w-full bg-white border border-zinc-200 rounded-lg p-3 text-xs focus:outline-none focus:border-black" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase text-zinc-500">Email</label>
                      <input name="email" type="email" value={form.email} onChange={handleChange} required className="w-full bg-white border border-zinc-200 rounded-lg p-3 text-xs focus:outline-none focus:border-black" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase text-zinc-500">Phone</label>
                      <input name="phone" type="tel" value={form.phone} onChange={handleChange} required className="w-full bg-white border border-zinc-200 rounded-lg p-3 text-xs focus:outline-none focus:border-black" />
                    </div>
                  </div>
                </div>

                <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-6 space-y-4">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-black">Shipping Address</h2>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase text-zinc-500">Address</label>
                    <input name="address" value={form.address} onChange={handleChange} required className="w-full bg-white border border-zinc-200 rounded-lg p-3 text-xs focus:outline-none focus:border-black" />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase text-zinc-500">City</label>
                      <input name="city" value={form.city} onChange={handleChange} required className="w-full bg-white border border-zinc-200 rounded-lg p-3 text-xs focus:outline-none focus:border-black" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase text-zinc-500">State</label>
                      <input name="state" value={form.state} onChange={handleChange} required className="w-full bg-white border border-zinc-200 rounded-lg p-3 text-xs focus:outline-none focus:border-black" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase text-zinc-500">Pincode</label>
                      <input name="pincode" value={form.pincode} onChange={handleChange} required className="w-full bg-white border border-zinc-200 rounded-lg p-3 text-xs focus:outline-none focus:border-black" />
                    </div>
                  </div>
                </div>

                <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-6 space-y-3">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-green-600" />
                    <span className="text-[10px] font-bold uppercase text-green-600">Free Shipping</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-zinc-400" />
                    <span className="text-[10px] text-zinc-500">Your information is secure</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-black hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-widest py-4 rounded-xl transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <span className="w-5 h-5 border-2 border-zinc-400 border-t-white rounded-full animate-spin" />
                  ) : (
                    `Place Order — ₹${cartTotal.toLocaleString('en-IN')}`
                  )}
                </button>
              </form>
            </div>

            {/* Right: Order Summary */}
            <div className="lg:col-span-5">
              <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-6 sticky top-24">
                <h2 className="text-xs font-bold uppercase tracking-widest text-black mb-4">Order Summary</h2>
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div key={`${item.id}-${item.color}-${item.size}`} className="flex items-center gap-3 pb-3 border-b border-zinc-200 last:border-0">
                      <div className="w-12 h-14 bg-zinc-200 rounded-lg overflow-hidden flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-semibold text-black truncate">{item.name}</p>
                        <p className="text-[9px] text-zinc-500">{item.color} / {item.size} &times; {item.quantity}</p>
                      </div>
                      <p className="text-[11px] font-bold text-black">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-zinc-200 space-y-2">
                  <div className="flex justify-between text-xs text-zinc-500">
                    <span>Subtotal</span>
                    <span>₹{cartTotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-xs text-green-600 font-semibold">
                    <span>Shipping</span>
                    <span>FREE</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-black pt-2 border-t border-zinc-200">
                    <span>Total</span>
                    <span>₹{cartTotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
