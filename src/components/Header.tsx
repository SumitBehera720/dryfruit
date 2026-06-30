'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { Menu, X, Search, User, ShoppingBag, Plus, Minus, Trash2 } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const { cart, cartCount, cartTotal, isOpen, setIsOpen, updateQuantity, removeFromCart } = useCart();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const freeShippingThreshold = 3999;
  const remainingForFreeShipping = freeShippingThreshold - cartTotal;

  // Mock checkout logic (Razorpay Simulation)
  const handleCheckout = () => {
    alert(`Initializing checkout via Razorpay for ₹${cartTotal.toLocaleString('en-IN')}. This is a checkout integration preview.`);
  };

  return (
    <>
      {/* Main Header */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-zinc-100 z-40 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 md:h-20 flex justify-between items-center">
          
          {/* Left Navigation */}
          <div className="hidden md:flex items-center gap-8 font-medium text-sm tracking-widest text-zinc-900">
            <Link href="/" className="hover:text-zinc-600 transition-colors uppercase">Home</Link>
            <div className="relative group cursor-pointer">
              <Link href="/shop" className="hover:text-zinc-600 transition-colors uppercase flex items-center gap-1">
                Collections <span className="text-[8px]">▼</span>
              </Link>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-zinc-100 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 py-2">
                <Link href="/shop?category=leggings" className="block px-4 py-2 hover:bg-zinc-50 text-xs tracking-wider uppercase">Sculpting Line</Link>
                <Link href="/shop?category=shorts" className="block px-4 py-2 hover:bg-zinc-50 text-xs tracking-wider uppercase">Summer Drop</Link>
                <Link href="/shop" className="block px-4 py-2 hover:bg-zinc-50 text-xs tracking-wider uppercase">All Weather</Link>
              </div>
            </div>
          </div>

          {/* Mobile Menu Icon */}
          <button 
            className="md:hidden p-2 text-zinc-900 hover:text-zinc-600"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Center Logo */}
          <div className="flex-1 md:flex-none text-center">
            <Link href="/" className="text-2xl md:text-3xl font-bold tracking-[0.25em] text-black font-sans uppercase">
              AERTH
            </Link>
          </div>

          {/* Right Navigation */}
          <div className="flex items-center gap-4 md:gap-6">
            <div className="hidden md:flex items-center gap-6 font-medium text-sm tracking-widest text-zinc-900 mr-4">
              <Link href="/#about" className="hover:text-zinc-600 transition-colors uppercase">About</Link>
              <Link href="/#journal" className="hover:text-zinc-600 transition-colors uppercase">Journal</Link>
            </div>
            
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-zinc-800 hover:text-zinc-600 transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5 md:w-6 h-6 stroke-[1.5]" />
            </button>
            
            <Link 
              href="#" 
              className="p-2 text-zinc-800 hover:text-zinc-600 transition-colors hidden sm:block"
              aria-label="Account"
            >
              <User className="w-5 h-5 md:w-6 h-6 stroke-[1.5]" />
            </Link>

            <button 
              onClick={() => setIsOpen(true)}
              className="p-2 text-zinc-800 hover:text-zinc-600 transition-colors relative"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5 md:w-6 h-6 stroke-[1.5]" />
              {mounted && cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center pt-24 px-4"
          >
            <motion.div 
              initial={{ y: -50, scale: 0.95 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: -50, scale: 0.95 }}
              className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl p-6 relative overflow-hidden"
            >
              <button 
                onClick={() => setIsSearchOpen(false)}
                className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-zinc-900 rounded-full hover:bg-zinc-50 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-xs uppercase tracking-widest text-zinc-400 mb-3 font-semibold">Search AERTH</h3>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Leggings, Sports Bra, Collections..."
                  className="flex-1 bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-zinc-500 font-sans"
                  autoFocus
                />
                <button className="bg-black text-white px-6 rounded-xl hover:bg-zinc-800 text-xs uppercase tracking-wider font-semibold transition-colors">
                  Search
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 left-0 bottom-0 w-80 bg-white shadow-2xl z-50 p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center mb-10">
                  <div className="text-xl font-bold tracking-[0.2em] uppercase">AERTH</div>
                  <button 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-1 hover:bg-zinc-100 rounded-full"
                  >
                    <X className="w-6 h-6 text-zinc-900" />
                  </button>
                </div>
                <div className="flex flex-col gap-6 text-lg font-medium tracking-widest uppercase text-zinc-900 mt-8">
                  <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-zinc-500">Home</Link>
                  <Link href="/shop" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-zinc-500">Collections</Link>
                  <Link href="/#about" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-zinc-500">About</Link>
                  <Link href="/#journal" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-zinc-500">Journal</Link>
                </div>
              </div>
              
              <div className="border-t border-zinc-100 pt-6">
                <p className="text-[10px] uppercase tracking-widest text-zinc-400 mb-2">My Account</p>
                <div className="flex items-center gap-3 py-2 cursor-pointer hover:text-zinc-600">
                  <User className="w-5 h-5 stroke-[1.5]" />
                  <span className="text-sm tracking-widest uppercase">Sign In / Register</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
            />
            {/* Drawer */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.35 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col justify-between"
            >
              {/* Header */}
              <div className="p-6 border-b border-zinc-100 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-zinc-800" />
                  <span className="font-semibold text-lg tracking-wider uppercase font-sans text-black">
                    Cart ({mounted ? cartCount : 0})
                  </span>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-zinc-100 rounded-full"
                >
                  <X className="w-6 h-6 text-zinc-900" />
                </button>
              </div>

              {/* Free Shipping Progress Indicator */}
              <div className="bg-zinc-50 px-6 py-4 border-b border-zinc-100">
                {remainingForFreeShipping > 0 ? (
                  <p className="text-xs tracking-wider text-zinc-600 font-medium">
                    Add <span className="font-semibold text-black">₹{remainingForFreeShipping.toLocaleString('en-IN')}</span> more for <span className="font-semibold text-black">FREE SHIPPING</span>
                  </p>
                ) : (
                  <p className="text-xs tracking-wider text-green-600 font-semibold flex items-center gap-1.5">
                    🎉 You qualify for FREE SHIPPING!
                  </p>
                )}
                <div className="w-full bg-zinc-200 h-1.5 rounded-full mt-2.5 overflow-hidden">
                  <div 
                    className="bg-black h-full transition-all duration-500 rounded-full"
                    style={{ width: `${Math.min(100, (cartTotal / freeShippingThreshold) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {!mounted || cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                    <ShoppingBag className="w-16 h-16 text-zinc-200 stroke-[1]" />
                    <div>
                      <p className="text-zinc-800 font-semibold uppercase tracking-wider text-sm">Your cart is empty</p>
                      <p className="text-zinc-400 text-xs mt-1">Looks like you haven&apos;t added anything yet.</p>
                    </div>
                    <button 
                      onClick={() => setIsOpen(false)}
                      className="bg-black text-white hover:bg-zinc-800 px-6 py-3 text-xs uppercase tracking-widest font-semibold transition-colors mt-2"
                    >
                      Shop Women
                    </button>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={`${item.id}-${item.color}-${item.size}`} className="flex gap-4 border-b border-zinc-50 pb-6">
                      <div className="relative w-20 h-24 bg-zinc-100 rounded-lg overflow-hidden flex-shrink-0">
                        <Image 
                          src={item.image} 
                          alt={item.name} 
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-black">{item.name}</h4>
                            <span className="text-xs font-semibold text-black">₹{item.price.toLocaleString('en-IN')}</span>
                          </div>
                          <p className="text-[10px] text-zinc-400 uppercase tracking-widest mt-1">
                            Color: {item.color} / Size: {item.size}
                          </p>
                        </div>
                        
                        <div className="flex justify-between items-center mt-2">
                          <div className="flex items-center border border-zinc-200 rounded-lg overflow-hidden">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-2 py-1 text-zinc-500 hover:bg-zinc-50"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-3 text-xs font-medium text-black">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-2 py-1 text-zinc-500 hover:bg-zinc-50"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-zinc-400 hover:text-red-500 p-1 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              {mounted && cart.length > 0 && (
                <div className="p-6 border-t border-zinc-100 bg-zinc-50 space-y-4">
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-zinc-500 text-xs uppercase tracking-wider">
                      <span>Subtotal</span>
                      <span className="font-semibold text-black">₹{cartTotal.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-zinc-500 text-xs uppercase tracking-wider">
                      <span>Shipping</span>
                      <span className="text-green-600 font-semibold">FREE</span>
                    </div>
                    <div className="border-t border-zinc-200 my-2 pt-2 flex justify-between text-black text-sm uppercase tracking-widest font-bold">
                      <span>Total</span>
                      <span>₹{cartTotal.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={handleCheckout}
                    className="w-full bg-black text-white hover:bg-zinc-800 py-4 text-xs uppercase tracking-widest font-bold transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    Proceed to Checkout
                  </button>
                  <p className="text-[9px] text-center text-zinc-400 uppercase tracking-wider">
                    Tax included. Shipping calculated at checkout.
                  </p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
