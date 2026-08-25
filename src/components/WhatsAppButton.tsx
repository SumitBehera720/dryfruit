'use client';

import React, { useState } from 'react';
import { MessageCircle, X, Send, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface WhatsAppButtonProps {
  phoneNumber?: string;
  defaultMessage?: string;
}

export default function WhatsAppButton({
  phoneNumber = '919876543210',
  defaultMessage = 'Hello Organic Traditions team! I would like to inquire about your premium dry fruits, organic superfoods, and custom gifting options.'
}: WhatsAppButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [userMsg, setUserMsg] = useState('');

  const handleSend = () => {
    const textToSend = userMsg.strip ? userMsg.trim() : userMsg;
    const finalMsg = textToSend || defaultMessage;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(finalMsg)}`;
    window.open(url, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Popover Chat Card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.25 }}
            className="mb-4 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#075E54] text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg">
                  💬
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#075E54]"></span>
                </div>
                <div>
                  <h4 className="font-bold text-sm leading-tight">Organic Traditions Support</h4>
                  <p className="text-[11px] text-emerald-100 flex items-center gap-1 font-light">
                    <CheckCircle2 className="w-3 h-3 text-emerald-300" />
                    <span>Typically replies instantly</span>
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="p-4 bg-[#ECE5DD]/40 space-y-3 min-h-[160px] flex flex-col justify-end">
              <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm max-w-[85%] border border-stone-200/60 text-xs text-slate-800 space-y-1">
                <p className="font-medium text-slate-900">Hello there! 👋</p>
                <p className="text-slate-600 font-light leading-relaxed">
                  How can we help you today with dry fruits, saffron, or bulk gifting orders?
                </p>
                <span className="text-[10px] text-slate-400 block text-right">Just now</span>
              </div>
            </div>

            {/* Input & Send Action */}
            <div className="p-3 bg-white border-t border-stone-100 space-y-2">
              <textarea
                value={userMsg}
                onChange={(e) => setUserMsg(e.target.value)}
                placeholder="Type your inquiry here..."
                rows={2}
                className="w-full text-xs p-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-[#25D366] resize-none text-slate-800"
              />
              <button
                onClick={handleSend}
                className="w-full py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
              >
                <Send className="w-4 h-4" />
                <span>Start WhatsApp Chat</span>
              </button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative group w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center shadow-2xl shadow-[#25D366]/40 transition-all border-2 border-white"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-7 h-7 fill-white stroke-none" />

        {/* Floating Tooltip Pill */}
        {!isOpen && (
          <span className="absolute right-16 bg-slate-900 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Chat on WhatsApp</span>
          </span>
        )}

        {/* Active Pulse Ring */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/40 animate-ping pointer-events-none"></span>
      </motion.button>
    </div>
  );
}
