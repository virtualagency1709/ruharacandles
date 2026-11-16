'use client';

import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export default function WhatsAppFloating() {
  const [showTooltip, setShowTooltip] = useState(true);
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919876543210';
  const prefilledMessage = encodeURIComponent(
    'Hi Ruhara Candles! I have a question about your handcrafted candle collection.'
  );

  return (
    <div className="fixed bottom-20 lg:bottom-8 right-5 z-40 flex items-end gap-2.5">
      {/* Tooltip speech bubble */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-white px-3.5 py-2 rounded-2xl shadow-hover border border-gold/25 text-xs text-deep animate-in fade-in slide-in-from-right duration-300">
          <span className="font-medium">Need help picking a scent?</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-deep/40 hover:text-deep"
            aria-label="Close tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Button */}
      <a
        href={`https://wa.me/${whatsappNumber}?text=${prefilledMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Ruhara Candles on WhatsApp"
        className="w-13 h-13 sm:w-14 sm:h-14 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group relative border-2 border-white"
      >
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-gold rounded-full border-2 border-white animate-ping" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-gold rounded-full border-2 border-white" />
        <MessageCircle className="w-7 h-7 fill-white/20" />
      </a>
    </div>
  );
}
