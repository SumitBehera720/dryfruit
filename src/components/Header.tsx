'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Menu, X, Search, User, ShoppingBag, Plus, Minus, Trash2, LogOut, LayoutDashboard, Sparkles, ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Logo from './Logo';

interface MenuItem {
  id: number | string;
  label: string;
  url: string | null;
  pageSlug: string | null;
  megaMenu?: boolean;
  location?: string;
  children?: MenuItem[];
}

interface SearchProduct {
  id: number | string;
  slug: string;
  name: string;
  price: number;
  category: string;
  variants?: {
    image: string;
  }[];
}

const defaultSuperfoodNav: MenuItem[] = [
  { id: 'n1', label: 'Superfood Powders', url: '/shop?category=superfood-powders', pageSlug: null },
  { id: 'n2', label: 'Wellness Shots', url: '/shop?category=wellness-shots', pageSlug: null },
  { id: 'n3', label: 'Herbal Teas', url: '/shop?category=herbal-teas', pageSlug: null },
  { id: 'n4', label: 'Smoothie Boosters', url: '/shop?category=smoothie-boosters', pageSlug: null },
  { id: 'n5', label: 'Dried Fruit Snacks', url: '/shop?category=dried-fruits', pageSlug: null },
];

export default function Header() {
  const router = useRouter();
  const { cart, cartCount, cartTotal, isOpen, setIsOpen, updateQuantity, removeFromCart } = useCart();
  const { isAuthenticated, user, isAdmin, setShowAuthModal, logout } = useAuth();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mounted, setMounted] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(defaultSuperfoodNav);
  const [liveResults, setLiveResults] = useState<SearchProduct[]>([]);
  const [isLiveLoading, setIsLiveLoading] = useState(false);

  useEffect(() => {
    if (searchQuery.trim().length < 2) {
      setLiveResults([]);
      return;
    }

    setIsLiveLoading(true);
    const delayDebounce = setTimeout(() => {
      fetch(`/api/products?search=${encodeURIComponent(searchQuery.trim())}&limit=6`)
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data) && data.length > 0) {
            setLiveResults(data);
          } else {
            setLiveResults([]);
          }
          setIsLiveLoading(false);
        })
        .catch(() => {
          setIsLiveLoading(false);
        });
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  useEffect(() => {
    setMounted(true);
    Promise.allSettled([
      fetch('/api/menu?location=main').then(async (r) => r.ok ? r.json() : []),
      fetch('/api/menu?location=secondary').then(async (r) => r.ok ? r.json() : []),
    ])
      .then(([main, secondary]) => {
        const mainItems = main.status === 'fulfilled' ? main.value : [];
        const secondaryItems = secondary.status === 'fulfilled' ? secondary.value : [];
        if (mainItems.length > 0 || secondaryItems.length > 0) {
          setMenuItems([...mainItems, ...secondaryItems.map((m: MenuItem) => ({ ...m, location: 'secondary' }))]);
        }
      })
      .catch(() => {});
  }, []);

  const freeShippingThreshold = 500;
  const remainingForFreeShipping = freeShippingThreshold - cartTotal;

  const handleCheckout = () => {
    if (!isAuthenticated) {
      setIsOpen(false);
      setShowAuthModal(true);
      return;
    }
    setIsOpen(false);
    router.push('/checkout');
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <>
      {/* Top Announcement Ticker */}
      <div className="bg-[#FFF5ED] border-b border-orange-200/70 text-[#C85A32] py-2.5 px-4 text-center text-[10px] md:text-xs font-extrabold uppercase tracking-[0.2em] z-50 flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-[#C85A32]" />
        <span>WE&apos;RE SHIPPING THROUGH OUR AMAZON CANADA STORE FOR A SHORT TIME! | 100% CANADIAN GROWN SUPERFOODS</span>
      </div>

      {/* Main Sticky Header */}
      <header className="sticky top-0 bg-white/95 backdrop-blur-xl border-b border-stone-200/80 z-40 transition-all duration-300 shadow-sm font-sans">
        
        {/* Main Row: Left Actions - Centered Brand Logo - Right Actions */}
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 h-16 md:h-20 flex justify-between items-center relative">
          
          {/* Left Actions */}
          <div className="flex items-center gap-2">
            {/* Mobile Menu Toggle */}
            <button 
              className="p-2.5 rounded-full bg-stone-100/70 hover:bg-[#FFF5ED] text-[#1E293B] hover:text-[#C85A32] border border-stone-200/60 lg:hidden transition-all"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Toggle Menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Desktop Search Shortcut Button */}
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-full bg-stone-100/70 hover:bg-[#FFF5ED] text-slate-500 hover:text-[#C85A32] border border-stone-200/60 hover:border-orange-200/80 transition-all text-xs font-bold uppercase tracking-wider"
              aria-label="Search"
            >
              <Search className="w-4 h-4 text-[#C85A32]" />
              <span>Search Formulas...</span>
            </button>
          </div>

          {/* ABSOLUTE CENTER BRAND LOGO */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Link href="/" className="block focus:outline-none transition-transform hover:scale-105" aria-label="Just Naturals Home">
              <Logo className="h-9 md:h-12" />
            </Link>
          </div>

          {/* Right Actions: Mobile Search + Account + Cart */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Mobile Search Icon Button */}
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="p-2.5 rounded-full bg-stone-100/70 hover:bg-[#FFF5ED] text-[#1E293B] hover:text-[#C85A32] border border-stone-200/60 lg:hidden transition-all"
              aria-label="Search"
            >
              <Search className="w-4 h-4 stroke-[2]" />
            </button>
            
            {/* Account Icon Dropdown */}
            <div className="relative">
              <button
                onClick={() => isAuthenticated ? setIsUserMenuOpen(!isUserMenuOpen) : setShowAuthModal(true)}
                className="p-2.5 rounded-full bg-stone-100/70 hover:bg-[#FFF5ED] text-[#1E293B] hover:text-[#C85A32] border border-stone-200/60 hover:border-orange-200/80 transition-all cursor-pointer"
                aria-label="Account"
              >
                <User className="w-4 h-4 md:w-5 md:h-5 stroke-[2]" />
              </button>

              {isUserMenuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsUserMenuOpen(false)} />
                  <div className="absolute right-0 top-full mt-3 w-60 bg-white border border-stone-200/80 shadow-2xl rounded-2xl z-50 p-2 font-sans">
                    <div className="px-4 py-3 border-b border-stone-100">
                      <p className="text-xs font-extrabold text-[#1E293B] uppercase tracking-wider">{user?.name}</p>
                      <p className="text-[10px] text-slate-500 font-light truncate">{user?.email}</p>
                    </div>
                    <Link
                      href="/profile"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#1E293B] hover:bg-[#FFF5ED] hover:text-[#C85A32] rounded-xl transition-colors"
                    >
                      <User className="w-4 h-4" /> My Profile
                    </Link>
                    {isAdmin && (
                      <Link
                        href="/admin"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#1E293B] hover:bg-[#FFF5ED] hover:text-[#C85A32] rounded-xl transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4" /> Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={() => { logout(); setIsUserMenuOpen(false); router.push('/login'); }}
                      className="flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-wider text-red-600 hover:bg-red-50 rounded-xl transition-colors w-full text-left"
                    >
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Shopping Cart Bag Button */}
            <button 
              onClick={() => { if (!isAuthenticated) { setShowAuthModal(true); return; } setIsOpen(true); }}
              className="p-2.5 rounded-full bg-stone-100/70 hover:bg-[#FFF5ED] text-[#1E293B] hover:text-[#C85A32] border border-stone-200/60 hover:border-orange-200/80 transition-all relative cursor-pointer"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4 md:w-5 md:h-5 stroke-[2]" />
              {mounted && cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#C85A32] text-white text-[9px] w-5 h-5 rounded-full flex items-center justify-center font-black shadow-sm ring-2 ring-white">
                  {cartCount}
                </span>
              )}
            </button>

          </div>
        </div>

        {/* CENTERED DESKTOP NAVIGATION BAR */}
        <div className="hidden lg:flex justify-center items-center border-t border-stone-100 py-3 px-4">
          <nav className="flex items-center gap-8 text-xs uppercase tracking-widest text-[#1E293B] font-extrabold">
            <Link 
              href="/" 
              className="hover:text-[#C85A32] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#C85A32] hover:after:w-full after:transition-all"
            >
              Home
            </Link>

            {menuItems.map((item) => {
              const href = item.url || (item.pageSlug ? `/${item.pageSlug}` : '/');
              if (!item.children || item.children.length === 0) {
                return (
                  <Link 
                    key={item.id} 
                    href={href} 
                    className="hover:text-[#C85A32] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#C85A32] hover:after:w-full after:transition-all"
                  >
                    {item.label}
                  </Link>
                );
              }
              return (
                <div key={item.id} className="relative group cursor-pointer py-1">
                  <Link href={href} className="hover:text-[#C85A32] transition-colors flex items-center gap-1">
                    {item.label} <ChevronDown className="w-3 h-3 text-slate-400 group-hover:text-[#C85A32] transition-colors" />
                  </Link>
                  
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 bg-white/95 backdrop-blur-xl border border-stone-200/80 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 p-2 rounded-2xl text-center">
                    {item.children.map((child) => {
                      const childHref = child.url || (child.pageSlug ? `/${child.pageSlug}` : '/');
                      return (
                        <Link 
                          key={child.id} 
                          href={childHref} 
                          className="block px-4 py-2.5 hover:bg-[#FFF5ED] hover:text-[#C85A32] text-xs font-bold tracking-wider uppercase text-[#1E293B] rounded-xl transition-colors"
                        >
                          {child.label}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </nav>
        </div>

      </header>

      {/* Live Search Modal Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-50 flex items-start justify-center pt-16 md:pt-24 px-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: -20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: -20 }}
              className="bg-white rounded-3xl p-6 md:p-8 w-full max-w-2xl shadow-2xl border border-stone-200/80 relative font-sans"
            >
              <button
                onClick={() => setIsSearchOpen(false)}
                className="absolute top-6 right-6 p-2 text-slate-400 hover:text-[#1E293B] rounded-full hover:bg-stone-100 transition-colors"
                aria-label="Close search"
              >
                <X className="w-5 h-5" />
              </button>

              <form onSubmit={handleSearchSubmit} className="space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-[#C85A32]">
                    SEARCH SUPERFOOD CATALOG
                  </span>
                  <h3 className="text-xl font-extrabold uppercase tracking-tight text-[#1E293B] font-serif">
                    Find Formulas & Powders
                  </h3>
                </div>

                <div className="relative flex items-center">
                  <Search className="absolute left-4 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search wild blueberry, beet powder, turmeric shot..."
                    className="w-full bg-[#FFFDF9] border border-stone-300 rounded-2xl pl-12 pr-4 py-4 text-sm font-semibold text-[#1E293B] placeholder-slate-400 focus:outline-none focus:border-[#C85A32] shadow-sm"
                    autoFocus
                  />
                  {isLiveLoading && (
                    <div className="absolute right-4 w-5 h-5 border-2 border-orange-200 border-t-[#C85A32] rounded-full animate-spin" />
                  )}
                </div>
              </form>

              {/* Live Search Results */}
              {liveResults.length > 0 && (
                <div className="mt-6 space-y-3 border-t border-stone-100 pt-4">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block">
                    Matching Formulas ({liveResults.length})
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-60 overflow-y-auto">
                    {liveResults.map((item) => (
                      <Link
                        key={item.id}
                        href={`/product/${item.slug}`}
                        onClick={() => setIsSearchOpen(false)}
                        className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#FFF5ED] transition-colors border border-stone-100"
                      >
                        <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-white flex-shrink-0 border border-stone-200">
                          <Image
                            src={item.variants?.[0]?.image || '/images/just_naturals_logo.png'}
                            alt={item.name}
                            fill
                            className="object-contain p-1"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-extrabold text-[#1E293B] truncate uppercase">
                            {item.name}
                          </p>
                          <p className="text-[10px] text-[#C85A32] font-bold">
                            ₹{item.price}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-md z-50 lg:hidden"
          >
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-4/5 max-w-sm h-full bg-[#FFFDF9] p-6 shadow-2xl flex flex-col justify-between overflow-y-auto font-sans"
            >
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-stone-200/80 pb-4">
                  <Logo className="h-8" />
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 text-slate-400 hover:text-[#1E293B] rounded-full hover:bg-stone-100 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="space-y-3 font-sans text-xs uppercase tracking-widest font-extrabold text-[#1E293B]">
                  <Link
                    href="/"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-2.5 px-3 rounded-xl hover:bg-[#FFF5ED] hover:text-[#C85A32] transition-colors"
                  >
                    Home
                  </Link>

                  {menuItems.map((item) => {
                    const href = item.url || (item.pageSlug ? `/${item.pageSlug}` : '/');
                    return (
                      <Link
                        key={item.id}
                        href={href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block py-2.5 px-3 rounded-xl hover:bg-[#FFF5ED] hover:text-[#C85A32] transition-colors"
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </nav>
              </div>

              <div className="pt-6 border-t border-stone-200/80 text-[10px] text-slate-400 font-extrabold uppercase tracking-widest space-y-1">
                <p>Just Naturals Superfoods™</p>
                <p className="font-light">100% Canadian Clean-Label Nutrition</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Shopping Cart Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-md z-50 flex justify-end"
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-full max-w-md h-full bg-[#FFFDF9] shadow-2xl p-6 flex flex-col justify-between font-sans border-l border-stone-200/80"
            >
              <div>
                <div className="flex justify-between items-center border-b border-stone-200/80 pb-4">
                  <h2 className="text-xl font-extrabold uppercase tracking-tight text-[#1E293B] font-serif">Your Shopping Bag ({cartCount})</h2>
                  <button onClick={() => setIsOpen(false)} className="p-2 text-slate-400 hover:text-[#1E293B] rounded-full hover:bg-stone-100 transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {remainingForFreeShipping > 0 ? (
                  <p className="text-[10px] uppercase font-bold tracking-wider text-[#C85A32] bg-[#FFF5ED] p-2.5 rounded-xl border border-orange-200/80 mt-4 text-center">
                    Add ₹{remainingForFreeShipping} more for FREE shipping!
                  </p>
                ) : (
                  <p className="text-[10px] uppercase font-bold tracking-wider text-[#2D6A4F] bg-[#F2F7F2] p-2.5 rounded-xl border border-emerald-200 mt-4 text-center">
                    🎉 You unlocked FREE Express Shipping!
                  </p>
                )}

                <div className="mt-6 space-y-4 max-h-[50vh] overflow-y-auto pr-1">
                  {cart.length === 0 ? (
                    <p className="text-xs text-slate-400 italic text-center py-12">Your shopping bag is currently empty.</p>
                  ) : (
                    cart.map((item) => (
                      <div key={item.id} className="flex gap-4 p-3 bg-white rounded-2xl border border-stone-200/80 shadow-sm">
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-[#FFF5ED] flex-shrink-0 border border-stone-200">
                          <Image src={item.image} alt={item.name} fill className="object-contain p-1" />
                        </div>
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div>
                            <h4 className="text-xs font-extrabold text-[#1E293B] uppercase truncate">{item.name}</h4>
                            <p className="text-[10px] text-slate-400 font-semibold uppercase">{item.size}</p>
                          </div>
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-xs font-black text-[#C85A32]">₹{item.price * item.quantity}</span>
                            <div className="flex items-center gap-2">
                              <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 rounded-md border border-stone-200 text-slate-600 hover:border-[#C85A32]"><Minus className="w-3 h-3" /></button>
                              <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                              <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 rounded-md border border-stone-200 text-slate-600 hover:border-[#C85A32]"><Plus className="w-3 h-3" /></button>
                              <button onClick={() => removeFromCart(item.id)} className="p-1 text-slate-400 hover:text-red-500 transition-colors ml-1"><Trash2 className="w-3.5 h-3.5" /></button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {cart.length > 0 && (
                <div className="pt-4 border-t border-stone-200/80 space-y-4">
                  <div className="flex justify-between text-sm font-extrabold uppercase text-[#1E293B]">
                    <span>Subtotal</span>
                    <span className="text-base text-[#C85A32]">₹{cartTotal}</span>
                  </div>
                  <button onClick={handleCheckout} className="w-full bg-[#C85A32] hover:bg-[#B04C27] text-white font-bold text-xs uppercase tracking-widest py-4 rounded-xl shadow-lg transition-all">
                    Proceed to Checkout
                  </button>
                </div>
              )}

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
