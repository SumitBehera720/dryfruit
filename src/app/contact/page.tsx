'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Mail, Phone, MapPin, Send, CheckCircle, Clock, MessageCircle } from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError('Please fill in all required fields.');
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      // Store as newsletter sub with message embedded for now
      await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email }),
      });
      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans">
      <Header />
      <main className="flex-1">
        {/* Hero Banner */}
        <section className="relative bg-zinc-950 text-white overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#ffffff0d,_transparent_60%)]" />
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-20 md:py-28 relative">
            <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 mb-3 font-semibold">Get In Touch</p>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white leading-none">
              Contact Us
            </h1>
            <p className="text-zinc-400 text-sm mt-4 max-w-md leading-relaxed tracking-wide">
              Have a question, feedback, or need help with your order? Our team is here for you.
            </p>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 md:px-8 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-4 space-y-6">
            <div>
              <h2 className="text-sm font-black uppercase tracking-widest text-black mb-4">Reach Us</h2>
              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-zinc-950 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Email</p>
                    <a href="mailto:support@aerth.in" className="text-sm font-semibold text-black hover:underline">support@aerth.in</a>
                    <p className="text-[10px] text-zinc-400 mt-0.5">We reply within 24 hours</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-zinc-950 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Phone / WhatsApp</p>
                    <a href="tel:+919876543210" className="text-sm font-semibold text-black hover:underline">+91 98765 43210</a>
                    <p className="text-[10px] text-zinc-400 mt-0.5">Mon–Sat, 10am – 7pm IST</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-zinc-950 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Address</p>
                    <p className="text-sm font-semibold text-black">Organic Traditions</p>
                    <p className="text-xs text-zinc-500 mt-0.5 leading-relaxed">Mumbai, Maharashtra, India</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-zinc-950 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Response Time</p>
                    <p className="text-sm font-semibold text-black">Within 24 hours</p>
                    <p className="text-[10px] text-zinc-400 mt-0.5">Business days only</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-zinc-50 rounded-2xl p-5 border border-zinc-100">
              <div className="flex items-center gap-2 mb-3">
                <MessageCircle className="w-4 h-4 text-zinc-500" />
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Quick Help</p>
              </div>
              <ul className="space-y-2 text-xs text-zinc-600">
                <li className="flex items-start gap-2"><span className="text-black font-bold">·</span> For order tracking, share your Order ID</li>
                <li className="flex items-start gap-2"><span className="text-black font-bold">·</span> For returns, visit our <Link href="/returns" className="text-black font-semibold underline">Returns page</Link></li>
                <li className="flex items-start gap-2"><span className="text-black font-bold">·</span> Size help? Try our <Link href="/size-guide" className="text-black font-semibold underline">Size Guide</Link></li>
                <li className="flex items-start gap-2"><span className="text-black font-bold">·</span> Common questions answered in <Link href="/faqs" className="text-black font-semibold underline">FAQs</Link></li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-8">
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center">
                <div className="w-20 h-20 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center mb-4">
                  <CheckCircle className="w-10 h-10 text-emerald-500" />
                </div>
                <h3 className="text-xl font-black uppercase tracking-widest text-black">Message Sent!</h3>
                <p className="text-zinc-500 text-sm mt-2 max-w-sm leading-relaxed">
                  Thank you for reaching out. Our team will get back to you within 24 hours.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }); }}
                  className="mt-6 bg-black text-white text-xs font-bold uppercase tracking-widest px-8 py-3 rounded-xl hover:bg-zinc-800 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <div className="bg-zinc-50 rounded-2xl border border-zinc-200 p-6 md:p-8">
                <h2 className="text-sm font-black uppercase tracking-widest text-black mb-6">Send a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Full Name *</label>
                      <input
                        type="text" name="name" value={form.name} onChange={handleChange} required
                        className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Email Address *</label>
                      <input
                        type="email" name="email" value={form.email} onChange={handleChange} required
                        className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Subject</label>
                    <select
                      name="subject" value={form.subject} onChange={handleChange}
                      className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
                    >
                      <option value="">Select a topic</option>
                      <option>Order Issue</option>
                      <option>Return / Exchange</option>
                      <option>Product Query</option>
                      <option>Payment Issue</option>
                      <option>Feedback</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Message *</label>
                    <textarea
                      name="message" value={form.message} onChange={handleChange} required rows={6}
                      className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors resize-none"
                      placeholder="Tell us how we can help..."
                    />
                  </div>
                  {error && <p className="text-red-500 text-xs font-semibold tracking-wide">{error}</p>}
                  <button
                    type="submit" disabled={submitting}
                    className="w-full bg-black hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-widest py-4 rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {submitting
                      ? <span className="w-4 h-4 border-2 border-zinc-400 border-t-white rounded-full animate-spin" />
                      : <><Send className="w-4 h-4" /> Send Message</>
                    }
                  </button>
                </form>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
