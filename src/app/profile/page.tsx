'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { User, MapPin, Heart, Save, Plus, Trash2, CheckCircle, Phone, Mail, Edit3, X } from 'lucide-react';

interface Address {
  id: number;
  label: string;
  line1: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: number;
}

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  slug: string;
}

type Tab = 'profile' | 'addresses' | 'wishlist';

export default function ProfilePage() {
  const { user, isAuthenticated, token } = useAuth();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<Tab>('profile');
  const [mounted, setMounted] = useState(false);

  // Profile state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileMsg, setProfileMsg] = useState('');

  // Address state
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [addrLoading, setAddrLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAddr, setNewAddr] = useState({ label: 'Home', line1: '', city: '', state: '', pincode: '' });
  const [addrMsg, setAddrMsg] = useState('');

  // Wishlist state
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  const fetchAddresses = useCallback(async () => {
    if (!token) return;
    setAddrLoading(true);
    try {
      const res = await fetch('/api/auth/addresses', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) setAddresses(await res.json());
    } catch { /* silent */ } finally {
      setAddrLoading(false);
    }
  }, [token]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (!isAuthenticated) {
      router.push('/login?redirect=/profile');
      return;
    }
    // Load profile data
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
    }
    // Fetch phone from profile API
    fetch('/api/auth/profile', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.ok ? r.json() : null)
      .then(d => { if (d) { setPhone(d.phone || ''); setName(d.name || user?.name || ''); } })
      .catch(() => {});

    // Load wishlist from localStorage
    try {
      const stored = localStorage.getItem('aerth_wishlist');
      if (stored) setWishlist(JSON.parse(stored));
    } catch { /* silent */ }

    fetchAddresses();
  }, [mounted, isAuthenticated, user, token, router, fetchAddresses]);

  const handleSaveProfile = async () => {
    if (!name.trim()) { setProfileMsg('Name is required'); return; }
    setProfileSaving(true);
    setProfileMsg('');
    try {
      const res = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ name: name.trim(), phone: phone.trim() }),
      });
      if (res.ok) {
        setProfileMsg('Profile updated successfully!');
        setTimeout(() => setProfileMsg(''), 3000);
      } else {
        setProfileMsg('Failed to update profile.');
      }
    } catch { setProfileMsg('Connection error.'); } finally { setProfileSaving(false); }
  };

  const handleAddAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddr.line1 || !newAddr.city || !newAddr.state || !newAddr.pincode) {
      setAddrMsg('All fields are required'); return;
    }
    try {
      const isFirst = addresses.length === 0;
      const res = await fetch('/api/auth/addresses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ ...newAddr, isDefault: isFirst }),
      });
      if (res.ok) {
        setShowAddForm(false);
        setNewAddr({ label: 'Home', line1: '', city: '', state: '', pincode: '' });
        setAddrMsg('Address added!');
        fetchAddresses();
        setTimeout(() => setAddrMsg(''), 2000);
      }
    } catch { setAddrMsg('Error adding address.'); }
  };

  const handleSetDefault = async (id: number) => {
    await fetch('/api/auth/addresses', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ id, action: 'setDefault' }),
    });
    fetchAddresses();
  };

  const handleDeleteAddress = async (id: number) => {
    await fetch('/api/auth/addresses', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ id, action: 'delete' }),
    });
    fetchAddresses();
  };

  const handleRemoveWishlist = (id: string) => {
    const updated = wishlist.filter(w => w.id !== id);
    setWishlist(updated);
    localStorage.setItem('aerth_wishlist', JSON.stringify(updated));
  };

  if (!mounted) return null;
  if (!isAuthenticated) return null;

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: 'profile', label: 'My Profile', icon: <User className="w-4 h-4" /> },
    { key: 'addresses', label: 'Addresses', icon: <MapPin className="w-4 h-4" /> },
    { key: 'wishlist', label: 'Wishlist', icon: <Heart className="w-4 h-4" /> },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 font-sans">
      <Header />
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 md:px-8 py-10">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold uppercase tracking-widest text-black">My Account</h1>
          <p className="text-zinc-500 text-xs tracking-wider mt-1">Manage your profile, addresses and wishlist</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-zinc-100 bg-gradient-to-br from-zinc-900 to-zinc-700 text-white">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-3">
                  <User className="w-6 h-6 text-white" />
                </div>
                <p className="font-bold text-sm tracking-wide truncate">{name || user?.name}</p>
                <p className="text-[10px] text-zinc-300 truncate">{email}</p>
              </div>
              <nav className="py-2">
                {tabs.map(tab => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`w-full flex items-center gap-3 px-5 py-3 text-xs font-semibold uppercase tracking-wider transition-colors text-left ${
                      activeTab === tab.key
                        ? 'bg-black text-white'
                        : 'text-zinc-600 hover:bg-zinc-50 hover:text-black'
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">

            {/* ── Profile Tab ── */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-6 space-y-6">
                <div className="flex items-center gap-2 border-b border-zinc-100 pb-4">
                  <Edit3 className="w-4 h-4 text-zinc-400" />
                  <h2 className="text-sm font-bold uppercase tracking-widest">Edit Profile</h2>
                </div>
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
                      <User className="w-3 h-3" /> Full Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
                      placeholder="Your full name"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
                      <Mail className="w-3 h-3" /> Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      disabled
                      className="w-full bg-zinc-100 border border-zinc-200 rounded-xl px-4 py-3 text-sm text-zinc-400 cursor-not-allowed"
                    />
                    <p className="text-[10px] text-zinc-400">Email cannot be changed.</p>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
                      <Phone className="w-3 h-3" /> Phone Number
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
                      placeholder="+91 9876543210"
                    />
                  </div>
                </div>
                {profileMsg && (
                  <p className={`text-xs font-semibold tracking-wide flex items-center gap-2 ${profileMsg.includes('success') ? 'text-emerald-600' : 'text-red-500'}`}>
                    <CheckCircle className="w-3.5 h-3.5" /> {profileMsg}
                  </p>
                )}
                <button
                  onClick={handleSaveProfile}
                  disabled={profileSaving}
                  className="w-full bg-black hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-widest py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {profileSaving ? <span className="w-4 h-4 border-2 border-zinc-400 border-t-white rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
                  Save Changes
                </button>
              </div>
            )}

            {/* ── Addresses Tab ── */}
            {activeTab === 'addresses' && (
              <div className="space-y-4">
                <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-6">
                  <div className="flex items-center justify-between border-b border-zinc-100 pb-4 mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-zinc-400" />
                      <h2 className="text-sm font-bold uppercase tracking-widest">Saved Addresses</h2>
                    </div>
                    <button
                      onClick={() => setShowAddForm(!showAddForm)}
                      className="flex items-center gap-1.5 bg-black text-white text-[10px] font-bold uppercase tracking-widest px-3 py-2 rounded-lg hover:bg-zinc-800 transition-colors"
                    >
                      {showAddForm ? <X className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                      {showAddForm ? 'Cancel' : 'Add New'}
                    </button>
                  </div>

                  {addrMsg && <p className="text-xs text-emerald-600 font-semibold mb-3">{addrMsg}</p>}

                  {showAddForm && (
                    <form onSubmit={handleAddAddress} className="mb-6 bg-zinc-50 rounded-xl p-4 border border-zinc-200 space-y-3">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2">New Address</p>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="col-span-2 space-y-1">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Label</label>
                          <select
                            value={newAddr.label}
                            onChange={e => setNewAddr({ ...newAddr, label: e.target.value })}
                            className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-black"
                          >
                            <option>Home</option>
                            <option>Office</option>
                            <option>Other</option>
                          </select>
                        </div>
                        <div className="col-span-2 space-y-1">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Address Line</label>
                          <input type="text" value={newAddr.line1} onChange={e => setNewAddr({ ...newAddr, line1: e.target.value })}
                            className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-black"
                            placeholder="House/Flat, Street, Area" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">City</label>
                          <input type="text" value={newAddr.city} onChange={e => setNewAddr({ ...newAddr, city: e.target.value })}
                            className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-black"
                            placeholder="Mumbai" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">State</label>
                          <input type="text" value={newAddr.state} onChange={e => setNewAddr({ ...newAddr, state: e.target.value })}
                            className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-black"
                            placeholder="Maharashtra" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Pincode</label>
                          <input type="text" value={newAddr.pincode} onChange={e => setNewAddr({ ...newAddr, pincode: e.target.value })}
                            className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-black"
                            placeholder="400001" />
                        </div>
                      </div>
                      <button type="submit" className="w-full bg-black text-white text-xs font-bold uppercase tracking-widest py-2.5 rounded-lg hover:bg-zinc-800 transition-colors mt-2">
                        Save Address
                      </button>
                    </form>
                  )}

                  {addrLoading ? (
                    <div className="flex justify-center py-8">
                      <span className="w-6 h-6 border-2 border-zinc-300 border-t-black rounded-full animate-spin" />
                    </div>
                  ) : addresses.length === 0 ? (
                    <div className="text-center py-10 text-zinc-400">
                      <MapPin className="w-10 h-10 mx-auto mb-3 stroke-[1.25]" />
                      <p className="text-xs uppercase tracking-widest font-semibold">No saved addresses</p>
                      <p className="text-[10px] mt-1">Add your first address to speed up checkout</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {addresses.map(addr => (
                        <div key={addr.id} className={`rounded-xl border p-4 relative transition-all ${addr.isDefault ? 'border-black bg-zinc-50' : 'border-zinc-200'}`}>
                          {addr.isDefault === 1 && (
                            <span className="absolute top-3 right-3 bg-black text-white text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full">Default</span>
                          )}
                          <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-1">{addr.label}</p>
                          <p className="text-sm font-semibold text-black">{addr.line1}</p>
                          <p className="text-xs text-zinc-600">{addr.city}, {addr.state} – {addr.pincode}</p>
                          <div className="flex gap-3 mt-3">
                            {addr.isDefault !== 1 && (
                              <button onClick={() => handleSetDefault(addr.id)}
                                className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 hover:text-black underline">
                                Set Default
                              </button>
                            )}
                            <button onClick={() => handleDeleteAddress(addr.id)}
                              className="text-[10px] font-bold uppercase tracking-widest text-red-500 hover:text-red-700 flex items-center gap-1 ml-auto">
                              <Trash2 className="w-3 h-3" /> Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ── Wishlist Tab ── */}
            {activeTab === 'wishlist' && (
              <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-6">
                <div className="flex items-center gap-2 border-b border-zinc-100 pb-4 mb-4">
                  <Heart className="w-4 h-4 text-zinc-400" />
                  <h2 className="text-sm font-bold uppercase tracking-widest">My Wishlist</h2>
                </div>

                {wishlist.length === 0 ? (
                  <div className="text-center py-12 text-zinc-400">
                    <Heart className="w-12 h-12 mx-auto mb-3 stroke-[1.25]" />
                    <p className="text-xs uppercase tracking-widest font-semibold">Your wishlist is empty</p>
                    <p className="text-[10px] mt-1">Tap the heart icon on any product to save it here</p>
                    <Link href="/shop" className="inline-block mt-4 bg-black text-white text-xs font-bold uppercase tracking-widest px-6 py-2.5 rounded-xl hover:bg-zinc-800 transition-colors">
                      Browse Products
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {wishlist.map(item => (
                      <div key={item.id} className="relative group rounded-xl border border-zinc-100 overflow-hidden hover:border-zinc-300 transition-all">
                        <Link href={`/product/${item.slug}`}>
                          <img src={item.image} alt={item.name} className="w-full aspect-[3/4] object-cover bg-zinc-50 group-hover:scale-105 transition-transform duration-300" />
                        </Link>
                        <button
                          onClick={() => handleRemoveWishlist(item.id)}
                          className="absolute top-2 right-2 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-sm border border-zinc-100 hover:bg-red-50 hover:border-red-200 transition-colors"
                        >
                          <X className="w-3.5 h-3.5 text-zinc-500 hover:text-red-500" />
                        </button>
                        <div className="p-3">
                          <p className="text-xs font-bold text-black uppercase tracking-wide truncate">{item.name}</p>
                          <p className="text-xs text-zinc-600 mt-0.5">₹{item.price?.toLocaleString('en-IN')}</p>
                          <Link href={`/product/${item.slug}`}
                            className="mt-2 block text-center text-[10px] font-bold uppercase tracking-widest bg-black text-white py-1.5 rounded-lg hover:bg-zinc-800 transition-colors">
                            View Product
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
