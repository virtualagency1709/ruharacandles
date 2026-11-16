'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  X,
  ChevronDown,
  ChevronRight,
  Package,
  Heart,
  User,
  PhoneCall,
  Sparkles,
  Gift,
  Flame,
} from 'lucide-react';
import { CATEGORIES } from '@/data/seedData';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  const [candlesExpanded, setCandlesExpanded] = useState(true);
  const [decorExpanded, setDecorExpanded] = useState(false);

  if (!isOpen) return null;

  const candleCategories = CATEGORIES.filter(
    (c) =>
      c.slug !== 'home-decor' &&
      c.slug !== 'gift-hampers' &&
      c.slug !== 'empty-jars-diy'
  );

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-deep/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer content */}
      <div className="relative w-4/5 max-w-sm bg-cream-50 h-full shadow-2xl flex flex-col z-10 overflow-y-auto">
        {/* Drawer Header */}
        <div className="p-5 border-b border-gold/20 flex items-center justify-between bg-cream-100">
          <Link href="/" onClick={onClose} className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full border border-gold/40 p-0.5 bg-white">
              <Image
                src="/images/logo.svg"
                alt="Ruhara Candles"
                width={36}
                height={36}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <span className="font-serif text-xl font-bold tracking-wider text-deep block">
                RUHARA
              </span>
              <span className="text-[8px] font-sans font-medium text-primary tracking-widest uppercase block">
                Candles &amp; Home Decor
              </span>
            </div>
          </Link>

          <button
            onClick={onClose}
            className="p-2 text-deep/70 hover:text-deep rounded-full hover:bg-cream-200"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <div className="p-4 flex-1 space-y-2 text-sm">
          {/* HOME */}
          <Link
            href="/"
            onClick={onClose}
            className="flex items-center justify-between p-3 rounded-xl hover:bg-cream-200/60 font-medium text-deep"
          >
            <span>Home</span>
            <ChevronRight className="w-4 h-4 text-deep/40" />
          </Link>

          {/* CANDLES ACCORDION */}
          <div className="rounded-xl border border-gold/20 overflow-hidden bg-white/60">
            <button
              onClick={() => setCandlesExpanded(!candlesExpanded)}
              className="w-full flex items-center justify-between p-3 font-semibold text-deep bg-cream-100/70"
            >
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-primary" />
                <span>Candles Collection</span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-primary transition-transform duration-200 ${
                  candlesExpanded ? 'rotate-180' : ''
                }`}
              />
            </button>

            {candlesExpanded && (
              <div className="p-2 space-y-1 bg-white">
                <Link
                  href="/collection/all"
                  onClick={onClose}
                  className="block px-3 py-2 text-xs font-bold text-primary hover:bg-cream-50 rounded-lg"
                >
                  ✨ View All Candles ({candleCategories.length} Categories)
                </Link>
                {candleCategories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/collection/${cat.slug}`}
                    onClick={onClose}
                    className="flex items-center justify-between px-3 py-2 text-xs text-deep/80 hover:text-primary hover:bg-cream-50 rounded-lg"
                  >
                    <span>{cat.name}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-deep/30" />
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* HOME DECOR ACCORDION */}
          <div className="rounded-xl border border-gold/20 overflow-hidden bg-white/60">
            <button
              onClick={() => setDecorExpanded(!decorExpanded)}
              className="w-full flex items-center justify-between p-3 font-semibold text-deep bg-cream-100/70"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                <span>Home Decor</span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-primary transition-transform duration-200 ${
                  decorExpanded ? 'rotate-180' : ''
                }`}
              />
            </button>

            {decorExpanded && (
              <div className="p-2 space-y-1 bg-white">
                <Link
                  href="/collection/home-decor"
                  onClick={onClose}
                  className="block px-3 py-2 text-xs font-bold text-primary hover:bg-cream-50 rounded-lg"
                >
                  All Home Decor
                </Link>
                <Link
                  href="/collection/home-decor?type=vases"
                  onClick={onClose}
                  className="block px-3 py-2 text-xs text-deep/80 hover:text-primary hover:bg-cream-50 rounded-lg"
                >
                  Ceramic Vases
                </Link>
                <Link
                  href="/collection/home-decor?type=trays"
                  onClick={onClose}
                  className="block px-3 py-2 text-xs text-deep/80 hover:text-primary hover:bg-cream-50 rounded-lg"
                >
                  Artisanal Brass Trays
                </Link>
                <Link
                  href="/collection/home-decor?type=pooja-essentials"
                  onClick={onClose}
                  className="block px-3 py-2 text-xs text-deep/80 hover:text-primary hover:bg-cream-50 rounded-lg"
                >
                  Pooja Essentials
                </Link>
              </div>
            )}
          </div>

          {/* GIFT HAMPERS */}
          <Link
            href="/collection/gift-hampers"
            onClick={onClose}
            className="flex items-center justify-between p-3 rounded-xl hover:bg-cream-200/60 font-medium text-deep"
          >
            <div className="flex items-center gap-2">
              <Gift className="w-4 h-4 text-gold" />
              <span>Gift Hampers</span>
            </div>
            <span className="bg-primary text-cream-50 text-[10px] px-2 py-0.5 rounded-full font-bold">
              Sale
            </span>
          </Link>

          {/* EMPTY JARS / DIY */}
          <Link
            href="/collection/empty-jars-diy"
            onClick={onClose}
            className="flex items-center justify-between p-3 rounded-xl hover:bg-cream-200/60 font-medium text-deep"
          >
            <span>Empty Jars / DIY</span>
            <ChevronRight className="w-4 h-4 text-deep/40" />
          </Link>

          {/* QUICK LINKS SECTION */}
          <div className="pt-4 border-t border-gold/20 space-y-1">
            <Link
              href="/account/orders"
              onClick={onClose}
              className="flex items-center gap-3 p-2.5 text-xs font-medium text-deep/80 hover:text-primary rounded-lg"
            >
              <Package className="w-4 h-4 text-primary" />
              <span>Track Orders</span>
            </Link>
            <Link
              href="/account/wishlist"
              onClick={onClose}
              className="flex items-center gap-3 p-2.5 text-xs font-medium text-deep/80 hover:text-primary rounded-lg"
            >
              <Heart className="w-4 h-4 text-primary" />
              <span>My Wishlist</span>
            </Link>
            <Link
              href="/account/login"
              onClick={onClose}
              className="flex items-center gap-3 p-2.5 text-xs font-medium text-deep/80 hover:text-primary rounded-lg"
            >
              <User className="w-4 h-4 text-primary" />
              <span>Customer Account</span>
            </Link>
            <a
              href="https://wa.me/919876543210?text=Hi%20Ruhara%20Candles!%20I%20have%20an%20inquiry."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-2.5 text-xs font-medium text-emerald-700 hover:text-emerald-800 rounded-lg bg-emerald-50"
            >
              <PhoneCall className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp Us (+91 98765 43210)</span>
            </a>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-gold/20 bg-cream-100 text-center">
          <p className="font-serif italic text-xs text-primary">
            &ldquo;Light up your space with love&rdquo;
          </p>
          <p className="text-[10px] text-deep/60 mt-1">
            Handcrafted with 100% Pure Organic Soy Wax
          </p>
        </div>
      </div>
    </div>
  );
}
