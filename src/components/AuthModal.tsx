'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Mail, Lock, LogIn, UserPlus, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Logo from './Logo';

export default function AuthModal() {
  const { showAuthModal, setShowAuthModal, login, register } = useAuth();
  const [tab, setTab] = useState<'login' | 'register'>('login');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (tab === 'login') {
        await login(email, password);
      } else {
        if (!name.trim()) {
          setError('Name is required');
          setLoading(false);
          return;
        }
        await register(name, email, password);
      }
      setShowAuthModal(false);
      setEmail('');
      setPassword('');
      setName('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const switchTab = (newTab: 'login' | 'register') => {
    setTab(newTab);
    setError('');
  };

  return (
    <AnimatePresence>
      {showAuthModal && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAuthModal(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setShowAuthModal(false)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl w-full max-w-md p-8 shadow-2xl relative"
            >
              <button
                onClick={() => setShowAuthModal(false)}
                className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-zinc-900 rounded-full hover:bg-zinc-50 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-6">
                <div className="flex justify-center mb-3">
                  <Logo className="h-6 text-black" />
                </div>
                <h2 className="text-lg font-bold uppercase tracking-widest text-black">
                  {tab === 'login' ? 'Welcome Back' : 'Create Account'}
                </h2>
                <p className="text-zinc-500 text-xs mt-1 tracking-wider">
                  {tab === 'login' ? 'Sign in to your account' : 'Join the AERTH community'}
                </p>
              </div>

              {/* Tabs */}
              <div className="flex border border-zinc-200 rounded-lg p-1 mb-6">
                <button
                  onClick={() => switchTab('login')}
                  className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-md transition-all ${
                    tab === 'login' ? 'bg-black text-white' : 'text-zinc-500 hover:text-black'
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => switchTab('register')}
                  className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-md transition-all ${
                    tab === 'register' ? 'bg-black text-white' : 'text-zinc-500 hover:text-black'
                  }`}
                >
                  Register
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {tab === 'register' && (
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-lg pl-10 pr-4 py-3 text-xs focus:outline-none focus:border-black"
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="your@email.com"
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-lg pl-10 pr-4 py-3 text-xs focus:outline-none focus:border-black"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="Enter password"
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-lg pl-10 pr-10 py-3 text-xs focus:outline-none focus:border-black"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {error && (
                  <p className="text-red-500 text-[10px] uppercase tracking-wider font-semibold text-center">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-black hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-widest py-3.5 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <span className="w-4 h-4 border-2 border-zinc-400 border-t-white rounded-full animate-spin" />
                  ) : tab === 'login' ? (
                    <>
                      <LogIn className="w-4 h-4" /> Sign In
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4" /> Create Account
                    </>
                  )}
                </button>
              </form>

              <p className="text-[9px] text-zinc-400 text-center mt-4">
                {tab === 'login' ? (
                  <>Don&apos;t have an account?{' '}
                    <button onClick={() => switchTab('register')} className="text-black underline font-semibold">
                      Register
                    </button>
                  </>
                ) : (
                  <>Already have an account?{' '}
                    <button onClick={() => switchTab('login')} className="text-black underline font-semibold">
                      Sign In
                    </button>
                  </>
                )}
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
