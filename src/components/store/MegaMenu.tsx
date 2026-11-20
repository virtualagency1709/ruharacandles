'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, Sparkles, Gift, ArrowRight } from 'lucide-react';
import { CATEGORIES } from '@/data/seedData';

export default function MegaMenu() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const candleCategories = CATEGORIES.filter(
    (c) =>
      c.slug !== 'home-decor' &&
      c.slug !== 'gift-hampers' &&
      c.slug !== 'empty-jars-diy' &&
      c.slug !== 'terracotta-candles'
  );

  const homeDecorCategory = CATEGORIES.find((c) => c.slug === 'home-decor');
  const giftHampersCategory = CATEGORIES.find((c) => c.slug === 'gift-hampers');
  const diyCategory = CATEGORIES.find((c) => c.slug === 'empty-jars-diy');

  return (
    <nav className="hidden lg:block border-t border-cream-200/60 bg-cream-100/90 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ul className="flex items-center justify-center space-x-10 py-3 text-xs tracking-[0.18em] font-medium uppercase text-deep">
          {/* HOME */}
          <li>
            <Link
              href="/"
              className="py-2 hover:text-primary transition-colors relative group"
            >
              <span>Home</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
          </li>

          {/* CANDLES - WITH MEGA DROPDOWN */}
          <li
            className="relative"
            onMouseEnter={() => setActiveDropdown('candles')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <Link
              href="/collection/all"
              className="py-2 flex items-center gap-1 hover:text-primary transition-colors group"
            >
              <span>Candles</span>
              <ChevronDown className="w-3.5 h-3.5 text-primary transition-transform duration-200 group-hover:rotate-180" />
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>

            {/* CANDLES MEGA DROPDOWN PANEL */}
            {activeDropdown === 'candles' && (
              <div className="absolute left-1/2 -translate-x-1/2 top-full w-screen max-w-5xl bg-white rounded-b-2xl shadow-hover border border-gold/20 p-8 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="grid grid-cols-4 gap-8">
                  {/* Category Grid (Columns 1-3) */}
                  <div className="col-span-3">
                    <div className="flex items-center justify-between pb-3 border-b border-cream-200 mb-6">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-gold" />
                        <span className="font-serif text-base tracking-normal text-deep font-semibold normal-case">
                          Explore Handcrafted Candles
                        </span>
                      </div>
                      <Link
                        href="/collection/all"
                        className="text-xs text-primary font-semibold hover:underline flex items-center gap-1 normal-case tracking-normal"
                      >
                        <span>View All Candles ({candleCategories.length} Collections)</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>

                    <div className="grid grid-cols-3 gap-y-4 gap-x-6">
                      {candleCategories.map((cat) => (
                        <Link
                          key={cat.id}
                          href={`/collection/${cat.slug}`}
                          className="flex items-center gap-3 p-2 rounded-xl hover:bg-cream-50 transition-all group"
                        >
                          <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-cream-100 border border-gold/20 shadow-sm group-hover:scale-105 transition-transform">
                            <Image
                              src={cat.imageUrl || ''}
                              alt={cat.name}
                              fill
                              unoptimized={Boolean(cat.imageUrl?.endsWith('.svg'))}
                              className="object-cover"
                            />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs font-semibold text-deep normal-case tracking-normal group-hover:text-primary transition-colors">
                              {cat.name}
                            </span>
                            <span className="text-[10px] text-deep/60 lowercase normal-case tracking-normal line-clamp-1">
                              {cat.description}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Featured Spotlight Card (Column 4) */}
                  <div className="col-span-1 bg-cream-100 rounded-2xl p-5 border border-gold/30 flex flex-col justify-between">
                    <div>
                      <span className="inline-block bg-primary text-cream-50 text-[10px] font-semibold tracking-wider px-2 py-0.5 rounded-full mb-3 uppercase">
                        Festive Star
                      </span>
                      <h4 className="font-serif text-sm font-bold text-deep normal-case tracking-normal mb-1">
                        Royal Festive Brass Urli
                      </h4>
                      <p className="text-[11px] text-deep/70 normal-case tracking-normal leading-relaxed mb-4">
                        Triple-wick pure soy candle with natural marigold &amp; oudh aroma.
                      </p>
                    </div>
                    <div className="relative h-28 w-full rounded-xl overflow-hidden mb-3 shadow-inner">
                      <Image
                        src="/placeholders/3-5in-metal-urli-candle-with-lotus-and-mogra-flower.svg"
                        alt="Royal Festive Brass Urli"
                        fill
                        unoptimized={true}
                        className="object-cover"
                      />
                    </div>
                    <Link
                      href="/product/royal-festive-brass-urli-candle"
                      className="w-full text-center py-2 bg-primary text-cream-50 rounded-lg text-[11px] font-medium tracking-normal hover:bg-primary-hover transition-colors normal-case"
                    >
                      Shop Featured Urli
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </li>

          {/* HOME DECOR */}
          <li
            className="relative"
            onMouseEnter={() => setActiveDropdown('decor')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <Link
              href="/collection/home-decor"
              className="py-2 flex items-center gap-1 hover:text-primary transition-colors group"
            >
              <span>Home Decor</span>
              <ChevronDown className="w-3.5 h-3.5 text-primary transition-transform duration-200 group-hover:rotate-180" />
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>

            {activeDropdown === 'decor' && (
              <div className="absolute left-0 top-full w-72 bg-white rounded-b-xl shadow-hover border border-gold/20 p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="space-y-2">
                  <Link
                    href="/collection/home-decor"
                    className="block p-2 rounded-lg hover:bg-cream-50 transition-colors font-medium text-xs normal-case tracking-normal text-deep hover:text-primary"
                  >
                    All Home Decor
                  </Link>
                  <Link
                    href="/collection/concrete-jar-candles"
                    className="block p-2 rounded-lg hover:bg-cream-50 transition-colors text-xs normal-case tracking-normal text-deep/80 hover:text-primary"
                  >
                    Concrete Jar Candles
                  </Link>
                  <div className="pt-2 border-t border-cream-200">
                    <Link
                      href="/product/heritage-brass-candle-snuffer-wick-trimmer-set"
                      className="block p-2 rounded-lg hover:bg-cream-50 transition-colors text-xs normal-case tracking-normal text-primary font-medium"
                    >
                      ✨ Brass Candle Snuffers &amp; Care
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </li>

          {/* GIFT HAMPERS */}
          <li>
            <Link
              href="/collection/gift-hampers"
              className="py-2 flex items-center gap-1.5 hover:text-primary transition-colors relative group"
            >
              <Gift className="w-3.5 h-3.5 text-gold" />
              <span>Gift Hampers</span>
              <span className="bg-primary/10 text-primary text-[9px] font-bold px-1.5 py-0.2 rounded-full lowercase">
                festive
              </span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
          </li>

          {/* EMPTY JARS / DIY */}
          <li>
            <Link
              href="/collection/empty-jars-diy"
              className="py-2 hover:text-primary transition-colors relative group"
            >
              <span>Empty Jars / DIY</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
