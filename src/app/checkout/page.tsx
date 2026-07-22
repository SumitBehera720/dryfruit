'use client';

import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCart, CartItem } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { ArrowLeft, Truck, Lock, Zap } from 'lucide-react';

function CheckoutContent() {
  const { cart, clearCart } = useCart();
  const { isAuthenticated, token, user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isBuyNow = searchParams.get('mode') === 'buynow';

  const [mounted, setMounted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [buyNowItem, setBuyNowItem] = useState<CartItem | null>(null);

  const [form, setForm] = useState({
    customerName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });

  // Items to show in order summary
  const checkoutItems: CartItem[] = isBuyNow && buyNowItem ? [buyNowItem] : cart;
  const checkoutTotal = checkoutItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const prefillFromProfile = useCallback(async () => {
    if (!token) return;
    try {
      const [profileRes, addrRes] = await Promise.all([
        fetch('/api/auth/profile', { headers: { Authorization: `Bearer ${token}` } }),
        fetch('/api/auth/addresses', { headers: { Authorization: `Bearer ${token}` } }),
      ]);
      const profile = profileRes.ok ? await profileRes.json() : null;
      const addrs = addrRes.ok ? await addrRes.json() : [];
      const defaultAddr = addrs.find((a: { isDefault: number }) => a.isDefault) || addrs[0];

      setForm(f => ({
        ...f,
        customerName: profile?.name || user?.name || f.customerName,
        email: profile?.email || user?.email || f.email,
        phone: profile?.phone || f.phone,
        address: defaultAddr?.line1 || f.address,
        city: defaultAddr?.city || f.city,
        state: defaultAddr?.state || f.state,
        pincode: defaultAddr?.pincode || f.pincode,
      }));
    } catch { /* silent */ }
  }, [token, user]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Auth guard
    if (!isAuthenticated) {
      router.push('/login?redirect=/checkout' + (isBuyNow ? '?mode=buynow' : ''));
      return;
    }

    // Load Buy Now item
    if (isBuyNow) {
      try {
        const stored = sessionStorage.getItem('aerth_buynow');
        if (stored) setBuyNowItem(JSON.parse(stored));
        else router.push('/shop'); // no buynow item → go to shop
      } catch { router.push('/shop'); }
    } else {
      // Regular cart mode — redirect if empty
      if (cart.length === 0) {
        router.push('/shop');
        return;
      }
    }

    prefillFromProfile();
  }, [mounted, isAuthenticated, isBuyNow, cart.length, router, prefillFromProfile]);

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
          total: checkoutTotal,
          items: checkoutItems.map((item) => ({
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

      if (isBuyNow) {
        sessionStorage.removeItem('aerth_buynow');
      } else {
        clearCart();
      }

      router.push(`/order-confirmation?id=${order.id}`);
    } catch {
      alert('Connection error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!mounted) return null;
  if (!isAuthenticated) return null;

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans">
      <Header />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
          <button
            onClick={() => isBuyNow ? router.back() : router.push('/shop')}
            className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-black transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> {isBuyNow ? 'Back to Product' : 'Continue Shopping'}
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left: Checkout Form */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-8">
                {isBuyNow && <span className="flex items-center gap-1.5 bg-yellow-50 border border-yellow-200 text-yellow-700 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full"><Zap className="w-3 h-3 fill-yellow-500 stroke-yellow-500" /> Buy Now</span>}
                <h1 className="text-xl md:text-2xl font-bold uppercase tracking-widest text-black">Checkout</h1>
              </div>

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
                    `Place Order — ₹${checkoutTotal.toLocaleString('en-IN')}`
                  )}
                </button>
              </form>
            </div>

            {/* Right: Order Summary */}
            <div className="lg:col-span-5">
              <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-6 sticky top-24">
                <h2 className="text-xs font-bold uppercase tracking-widest text-black mb-4">
                  Order Summary {isBuyNow && <span className="text-yellow-600 ml-1">(Buy Now)</span>}
                </h2>
                <div className="space-y-3">
                  {checkoutItems.map((item) => (
                    <div key={`${item.id}-${item.color}-${item.size}`} className="flex items-center gap-3 pb-3 border-b border-zinc-200 last:border-0">
                      <div className="w-12 h-14 bg-zinc-200 rounded-lg overflow-hidden flex-shrink-0">
                        {item.image && <img src={item.image} alt={item.name} className="w-full h-full object-cover" />}
                      </div>
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
                    <span>₹{checkoutTotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-xs text-green-600 font-semibold">
                    <span>Shipping</span>
                    <span>FREE</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-black pt-2 border-t border-zinc-200">
                    <span>Total</span>
                    <span>₹{checkoutTotal.toLocaleString('en-IN')}</span>
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

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><span className="w-8 h-8 border-2 border-zinc-300 border-t-black rounded-full animate-spin" /></div>}>
      <CheckoutContent />
    </Suspense>
  );
}
