'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import Link from 'next/link';

const ANNOUNCEMENTS = [
  {
    text: '✨ Festive Season Sale – Up to 60% Off | Use Code FESTIVE20',
    link: '/collection/festival-candles',
  },
  {
    text: '🪔 Complimentary Handcrafted Diya Set on orders above ₹1,499',
    link: '/collection/gift-hampers',
  },
  {
    text: '🚚 Free Express Shipping across India on orders above ₹999',
    link: '/collection/glass-jar-candles',
  },
];

export default function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 28, seconds: 45 });

  // Rotating announcement
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  // Simple countdown ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const current = ANNOUNCEMENTS[currentIndex];

  return (
    <div className="bg-deep text-cream-100 text-xs py-2 px-3 relative border-b border-gold/30 overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Decorative Flame/Sparkle */}
        <div className="hidden md:flex items-center gap-1.5 text-gold text-[11px] tracking-wide uppercase font-medium">
          <Sparkles className="w-3.5 h-3.5 animate-pulse text-gold" />
          <span>Handcrafted in India</span>
        </div>

        {/* Center: Rotating announcement with link */}
        <div className="flex-1 flex items-center justify-center text-center px-4">
          <Link
            href={current.link}
            className="hover:underline flex items-center gap-2 transition-all duration-300 font-medium tracking-wide text-[11px] sm:text-xs"
          >
            <span>{current.text}</span>
          </Link>
        </div>

        {/* Right: Festive Countdown Timer */}
        <div className="hidden lg:flex items-center gap-2 text-[11px] font-medium text-cream-200">
          <Clock className="w-3 h-3 text-gold" />
          <span>Sale ends in:</span>
          <div className="flex items-center gap-1 font-mono text-gold-light bg-deep-dark/60 px-2 py-0.5 rounded border border-gold/20">
            <span>{String(timeLeft.hours).padStart(2, '0')}h</span>:
            <span>{String(timeLeft.minutes).padStart(2, '0')}m</span>:
            <span>{String(timeLeft.seconds).padStart(2, '0')}s</span>
          </div>
        </div>
      </div>
    </div>
  );
}
