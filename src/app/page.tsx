import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Flame,
  Truck,
  HeartHandshake,
  CheckCircle2,
} from 'lucide-react';
import { CATEGORIES, PRODUCTS } from '@/data/seedData';
import { formatPrice } from '@/lib/utils';

export default function HomePage() {
  const featuredCategories = CATEGORIES.slice(0, 6);
  const bestsellers = PRODUCTS.filter((p) => p.isBestseller).slice(0, 4);

  return (
    <div className="space-y-16 pb-12">
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-cream-100 to-cream-200/80 border-b border-gold/25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cream-50 border border-gold/40 shadow-sm text-xs text-primary font-semibold tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5 text-gold" />
                <span>Handcrafted with Love in India</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-deep leading-[1.15]">
                Light up your space with{' '}
                <span className="gold-gradient-text italic font-normal">love &amp; warmth.</span>
              </h1>

              <p className="text-base sm:text-lg text-deep/80 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
                Discover slow-burning artisanal soy candles, hand-hammered festive brass urlis,
                and architectural concrete jars infused with sacred Indian botanical scents.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/collection/all"
                  className="w-full sm:w-auto px-8 py-4 bg-primary text-cream-50 rounded-full font-semibold text-xs uppercase tracking-widest hover:bg-primary-hover shadow-soft transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  <span>Explore All Candles</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/collection/gift-hampers"
                  className="w-full sm:w-auto px-8 py-4 bg-cream-50 border border-gold/40 text-deep rounded-full font-semibold text-xs uppercase tracking-widest hover:bg-cream-200/50 shadow-sm transition-all text-center"
                >
                  Festive Gift Hampers
                </Link>
              </div>

              {/* Quick Trust Highlights */}
              <div className="pt-6 border-t border-gold/20 grid grid-cols-3 gap-4 text-center lg:text-left">
                <div>
                  <p className="font-serif text-lg sm:text-xl font-bold text-primary">100%</p>
                  <p className="text-[11px] text-deep/70">Pure Soy Wax</p>
                </div>
                <div>
                  <p className="font-serif text-lg sm:text-xl font-bold text-primary">50+ Hrs</p>
                  <p className="text-[11px] text-deep/70">Long Soot-free Burn</p>
                </div>
                <div>
                  <p className="font-serif text-lg sm:text-xl font-bold text-primary">Pan-India</p>
                  <p className="text-[11px] text-deep/70">Express Delivery</p>
                </div>
              </div>
            </div>

            {/* Right Visual Image Showcase with Arch Silhouette */}
            <div className="relative flex justify-center">
              <div className="relative w-full max-w-md aspect-[4/5] rounded-[140px_140px_24px_24px] overflow-hidden border-4 border-gold/40 shadow-hover bg-cream-50">
                <Image
                  src="https://images.unsplash.com/photo-1608755728617-aefab37d2edd?q=80&w=1200&auto=format&fit=crop"
                  alt="Ruhara Royal Festive Urli Candle"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep/70 via-transparent to-transparent flex flex-col justify-end p-6 text-cream-50">
                  <span className="text-[10px] tracking-widest font-semibold uppercase text-gold">
                    Festive Edition
                  </span>
                  <h3 className="font-serif text-xl font-bold text-cream-50">
                    Royal Festive Brass Urli
                  </h3>
                  <p className="text-xs text-cream-200/90 mt-1">
                    Hammered brass bowl with 3 crackling wooden wicks • ₹1,299
                  </p>
                </div>
              </div>

              {/* Floating Decorative Badge */}
              <div className="absolute -bottom-6 -left-4 sm:left-4 bg-white/95 backdrop-blur-sm p-4 rounded-2xl shadow-hover border border-gold/30 hidden sm:flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Flame className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-bold text-deep">Zero Paraffin • Lead-free</p>
                  <p className="text-[10px] text-deep/60">Non-toxic clean aromatherapy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shop By Category (Arched Circular Tiles) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-10">
          <p className="text-[11px] font-semibold text-primary uppercase tracking-[0.25em]">
            Artisanal Collections
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-deep">
            Shop by Category
          </h2>
          <div className="w-16 h-0.5 bg-gold mx-auto mt-2" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {featuredCategories.map((cat) => (
            <Link
              key={cat.id}
              href={`/collection/${cat.slug}`}
              className="group flex flex-col items-center text-center space-y-3"
            >
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-2 border-gold/30 p-1 bg-cream-50 shadow-soft group-hover:scale-105 group-hover:border-primary transition-all duration-300">
                <div className="relative w-full h-full rounded-full overflow-hidden">
                  <Image
                    src={cat.imageUrl || ''}
                    alt={cat.name}
                    fill
                    className="object-cover group-hover:rotate-2 transition-transform duration-500"
                  />
                </div>
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-semibold text-deep group-hover:text-primary transition-colors">
                  {cat.name}
                </h3>
                <span className="text-[10px] text-primary/80 font-medium">
                  Explore →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-cream-200/50 border-y border-gold/20 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="space-y-1 flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-cream-100 border border-gold/30 flex items-center justify-center text-primary mb-1">
                <HeartHandshake className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-xs font-bold text-deep uppercase tracking-wider">
                Handcrafted With Love
              </h3>
              <p className="text-[11px] text-deep/70">100% natural organic soy wax</p>
            </div>

            <div className="space-y-1 flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-cream-100 border border-gold/30 flex items-center justify-center text-primary mb-1">
                <Truck className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-xs font-bold text-deep uppercase tracking-wider">
                Fast &amp; Safe Shipping
              </h3>
              <p className="text-[11px] text-deep/70">Free delivery on orders over ₹999</p>
            </div>

            <div className="space-y-1 flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-cream-100 border border-gold/30 flex items-center justify-center text-primary mb-1">
                <ShieldCheck className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-xs font-bold text-deep uppercase tracking-wider">
                100% Secure Checkout
              </h3>
              <p className="text-[11px] text-deep/70">UPI, Cards, Netbanking &amp; COD</p>
            </div>

            <div className="space-y-1 flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-cream-100 border border-gold/30 flex items-center justify-center text-primary mb-1">
                <CheckCircle2 className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-xs font-bold text-deep uppercase tracking-wider">
                Soot-Free Long Burn
              </h3>
              <p className="text-[11px] text-deep/70">Infused with pure essential oils</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bestseller Preview Peek */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-[11px] font-semibold text-primary uppercase tracking-[0.25em]">
              Customer Favorites
            </p>
            <h2 className="font-serif text-3xl font-bold text-deep">
              Bestselling Candles
            </h2>
          </div>
          <Link
            href="/collection/all"
            className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
          >
            <span>View All ({PRODUCTS.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {bestsellers.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl p-3 border border-gold/20 shadow-card hover:shadow-hover transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-square rounded-xl overflow-hidden bg-cream-100 mb-3">
                  <Image
                    src={product.images[0]?.url || ''}
                    alt={product.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {product.baseMrp > product.basePrice && (
                    <span className="absolute top-2 left-2 bg-primary text-cream-50 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      SAVE {Math.round(((product.baseMrp - product.basePrice) / product.baseMrp) * 100)}%
                    </span>
                  )}
                </div>

                <p className="text-[10px] text-primary uppercase tracking-wider font-semibold">
                  {product.categoryName}
                </p>
                <h3 className="font-serif text-sm font-bold text-deep line-clamp-1 mt-0.5 group-hover:text-primary transition-colors">
                  {product.title}
                </h3>
              </div>

              <div className="mt-3 pt-2 border-t border-cream-200 flex items-center justify-between">
                <div>
                  <span className="text-sm font-bold text-deep">
                    {formatPrice(product.basePrice)}
                  </span>
                  {product.baseMrp > product.basePrice && (
                    <span className="text-xs text-deep/40 line-through ml-1.5">
                      {formatPrice(product.baseMrp)}
                    </span>
                  )}
                </div>
                <Link
                  href={`/product/${product.slug}`}
                  className="px-3 py-1 bg-cream-100 text-deep text-xs font-semibold rounded-lg hover:bg-primary hover:text-cream-50 transition-colors"
                >
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
