'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Sparkles,
  ArrowRight,
  Flame,
  Truck,
  ShieldCheck,
  RotateCcw,
  Star,
  CheckCircle2,
  Heart,
  ShoppingBag,
  Plus,
  Gift,
  Clock,
  Instagram,
  ChevronRight,
} from 'lucide-react';
import { CATEGORIES, PRODUCTS, REVIEWS } from '@/data/seedData';
import { formatPrice, calculateDiscount } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ArchImage } from '@/components/ui/ArchImage';
import { RotatingSeal } from '@/components/ui/RotatingSeal';
import { RatingStars } from '@/components/ui/RatingStars';
import ProductCard from '@/components/store/ProductCard';
import { useCartStore } from '@/store/cartStore';

export default function LuxuryHomePage() {
  const { addItem } = useCartStore();
  const [bestsellerTab, setBestsellerTab] = useState<'candles' | 'decor' | 'hampers'>('candles');

  // Interactive Hamper Builder State
  const [hamperCandle, setHamperCandle] = useState(PRODUCTS[0]);
  const [hamperVase, setHamperVase] = useState(PRODUCTS[15]);
  const [hamperTray, setHamperTray] = useState(PRODUCTS[16]);

  // Shop the Look Hotspots state
  const [activeHotspot, setActiveHotspot] = useState<number | null>(0);

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Filtered Products for Bestseller Tabs
  const tabProducts = PRODUCTS.filter((p) => {
    if (bestsellerTab === 'candles') return p.categoryId.startsWith('cat-1') || p.categoryId.startsWith('cat-2') || p.categoryId.startsWith('cat-3') || p.categoryId.startsWith('cat-4');
    if (bestsellerTab === 'decor') return p.categoryId === 'cat-8';
    return p.categoryId === 'cat-9';
  }).slice(0, 4);

  // Festive products
  const festiveProducts = PRODUCTS.filter((p) => p.categoryId === 'cat-4' || p.categoryId === 'cat-7').slice(0, 4);

  // Quick add helper
  const handleQuickAdd = (product: typeof PRODUCTS[0]) => {
    addItem({
      productId: product.id,
      title: product.title,
      slug: product.slug,
      price: product.basePrice,
      mrp: product.baseMrp,
      imageUrl: product.images[0]?.url || '',
      stock: 10,
      quantity: 1,
    });
  };

  return (
    <div className="space-y-24 sm:space-y-32 pb-24 overflow-hidden">
      {/* =========================================================================
          SECTION 1: FULL-VIEWPORT (100svh) CINEMATIC HERO SECTION
          ========================================================================= */}
      <section className="relative min-h-[92vh] sm:min-h-screen flex items-center bg-gradient-to-b from-cream-100 via-cream-50 to-cream border-b border-gold/25 pt-4 pb-12">
        {/* Ambient Warm Gradient Blobs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-blush/20 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 sm:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* LEFT 55% (7 cols on desktop) */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Gold Pill Label */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-ivory border border-gold/45 shadow-warm-sm text-xs font-semibold text-deep tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5 text-gold" />
                <span>Handcrafted in India • 100% Pure Soy Wax</span>
              </div>

              {/* Huge Serif Headline with Italic Gold Word */}
              <h1 className="text-fluid-hero font-serif font-bold text-deep tracking-tight">
                Light up your <em className="gold-gradient-text font-normal not-italic italic">space</em> with love.
              </h1>

              {/* Muted Sub-copy */}
              <p className="text-sm sm:text-base lg:text-lg text-deep/80 max-w-xl mx-auto lg:mx-0 font-light leading-relaxed">
                Slow-poured in small batches in our studio with pure botanical essences,
                crackling wooden wicks, and reusable keepsake vessels to elevate your home.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link href="/collection/all" className="w-full sm:w-auto">
                  <Button
                    variant="primary"
                    size="xl"
                    className="w-full sm:w-auto"
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    Shop Candles
                  </Button>
                </Link>

                <Link href="/collection/gift-hampers" className="w-full sm:w-auto">
                  <Button
                    variant="secondary"
                    size="xl"
                    className="w-full sm:w-auto"
                    leftIcon={<Gift className="w-4 h-4 text-gold" />}
                  >
                    Explore Gift Hampers
                  </Button>
                </Link>
              </div>

              {/* Mini Trust Row Under CTAs */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 text-xs text-deep/75 font-medium border-t border-gold/20">
                <div className="flex items-center gap-1.5">
                  <RatingStars rating={4.9} showCount={false} size="sm" />
                  <span><strong>4.9/5</strong> (2,000+ Happy Homes)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-primary" />
                  <span>Free Shipping above ₹999</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                  <span>Secure UPI &amp; COD</span>
                </div>
              </div>
            </div>

            {/* RIGHT 45% (5 cols on desktop): Large Arch Mask with Floating Mini-Cards */}
            <div className="lg:col-span-5 relative flex justify-center">
              {/* Rotating Circular Text Hallmark Seal */}
              <div className="absolute -top-8 -right-4 sm:-right-8 z-20">
                <RotatingSeal size={110} />
              </div>

              {/* Main Arch-Masked Hero Image */}
              <div className="w-full max-w-sm sm:max-w-md">
                <ArchImage
                  src="https://images.unsplash.com/photo-1608755728617-aefab37d2edd?q=80&w=1200"
                  alt="Ruhara Royal Festive Urli Candle"
                  aspectRatio="portrait"
                  priority={true}
                  showGlow={true}
                  showOffsetBorder={true}
                >
                  <div className="p-6 text-cream-50 flex flex-col justify-end h-full">
                    <span className="text-[10px] tracking-widest font-bold uppercase text-gold">
                      Masterpiece
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold">
                      Royal Festive Brass Urli
                    </h3>
                    <p className="text-xs text-cream-200/90 mt-1">
                      Pure Marigold &amp; Oudh • 3 Crackling Wood Wicks
                    </p>
                  </div>
                </ArchImage>
              </div>

              {/* Floating Product Mini-Card 1 (Left Overlap) */}
              <div className="absolute -bottom-6 -left-4 sm:-left-8 bg-ivory/95 backdrop-blur-md p-3 rounded-2xl border border-gold/35 shadow-warm-lg flex items-center gap-3 z-20 animate-float-slow">
                <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-cream-100 flex-shrink-0 border border-gold/20">
                  <Image
                    src="https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=400"
                    alt="Peony Bloom"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="pr-2">
                  <p className="font-serif text-xs font-bold text-deep leading-snug">Peony Bloom</p>
                  <p className="text-[10px] text-primary font-bold">₹699</p>
                </div>
                <button
                  onClick={() => handleQuickAdd(PRODUCTS[0])}
                  className="w-7 h-7 rounded-full bg-deep text-cream-50 flex items-center justify-center hover:bg-deep-dark shadow-sm"
                  title="Quick Add"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Floating Product Mini-Card 2 (Right Overlap) */}
              <div className="hidden sm:flex absolute top-1/3 -right-6 bg-ivory/95 backdrop-blur-md p-3 rounded-2xl border border-gold/35 shadow-warm-lg items-center gap-3 z-20 animate-float-delayed">
                <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-cream-100 flex-shrink-0 border border-gold/20">
                  <Image
                    src="https://images.unsplash.com/photo-1596433809252-260c2745dfdd?q=80&w=400"
                    alt="Lavender Jar"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="pr-2">
                  <p className="font-serif text-xs font-bold text-deep leading-snug">French Lavender</p>
                  <p className="text-[10px] text-primary font-bold">₹599</p>
                </div>
                <button
                  onClick={() => handleQuickAdd(PRODUCTS[5])}
                  className="w-7 h-7 rounded-full bg-deep text-cream-50 flex items-center justify-center hover:bg-deep-dark shadow-sm"
                  title="Quick Add"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: INFINITE MARQUEE TRUST STRIP
          ========================================================================= */}
      <div className="bg-deep text-cream-100 py-3.5 overflow-hidden border-y border-gold/30">
        <div className="flex whitespace-nowrap animate-marquee items-center text-xs tracking-widest font-semibold uppercase">
          {[...Array(6)].map((_, i) => (
            <span key={i} className="flex items-center gap-8 mx-4">
              <span>100% Pure Soy Wax</span>
              <span className="text-gold">•</span>
              <span>Hand-Poured in India</span>
              <span className="text-gold">•</span>
              <span>Non-Toxic Clean Aromatherapy</span>
              <span className="text-gold">•</span>
              <span>Free Delivery Above ₹999</span>
              <span className="text-gold">•</span>
              <span>Cash on Delivery Available</span>
              <span className="text-gold">•</span>
            </span>
          ))}
        </div>
      </div>

      {/* =========================================================================
          SECTION 3: SHOP BY CATEGORY (Arch-shaped image tiles)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold text-primary tracking-widest uppercase">
              Curated Collections
            </span>
            <h2 className="text-fluid-h1 font-serif font-bold text-deep">
              Shop by Category
            </h2>
          </div>
          <Link href="/collections" className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
            <span>View All Categories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {CATEGORIES.slice(0, 6).map((cat) => (
            <Link
              key={cat.id}
              href={`/collection/${cat.slug}`}
              className="group flex flex-col items-center text-center space-y-3"
            >
              <div className="relative w-full aspect-[4/5] rounded-[90px_90px_16px_16px] overflow-hidden border-2 border-gold/35 bg-ivory shadow-warm-sm group-hover:shadow-warm-hover group-hover:scale-105 group-hover:border-primary transition-all duration-500">
                <Image
                  src={cat.imageUrl || ''}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep/60 via-transparent to-transparent opacity-70 group-hover:opacity-40 transition-opacity" />
              </div>

              <div>
                <h3 className="font-serif text-sm font-bold text-deep group-hover:text-primary transition-colors">
                  {cat.name}
                </h3>
                <span className="text-[11px] text-primary/80 font-medium">Explore →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: BESTSELLERS TABS & PRODUCT CAROUSEL
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8">
          <div>
            <span className="text-xs font-bold text-primary tracking-widest uppercase">
              Customer Favorites
            </span>
            <h2 className="text-fluid-h1 font-serif font-bold text-deep">
              Bestselling Creations
            </h2>
          </div>

          {/* Interactive Tabs */}
          <div className="flex items-center gap-2 bg-ivory p-1.5 rounded-full border border-gold/30 shadow-warm-sm">
            <button
              onClick={() => setBestsellerTab('candles')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                bestsellerTab === 'candles'
                  ? 'bg-deep text-cream-50 shadow-sm'
                  : 'text-deep/70 hover:text-deep'
              }`}
            >
              Scented Candles
            </button>
            <button
              onClick={() => setBestsellerTab('decor')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                bestsellerTab === 'decor'
                  ? 'bg-deep text-cream-50 shadow-sm'
                  : 'text-deep/70 hover:text-deep'
              }`}
            >
              Home Decor
            </button>
            <button
              onClick={() => setBestsellerTab('hampers')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                bestsellerTab === 'hampers'
                  ? 'bg-deep text-cream-50 shadow-sm'
                  : 'text-deep/70 hover:text-deep'
              }`}
            >
              Gift Hampers
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {tabProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: EDITORIAL SPLIT BANNER ("The Art of Slow Living")
          ========================================================================= */}
      <section className="bg-gradient-to-r from-deep-dark via-deep to-deep-dark text-cream-100 py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Visual: Arch Lifestyle Image */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md aspect-[4/5] rounded-[160px_160px_24px_24px] overflow-hidden border-2 border-gold/40 shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?q=80&w=1200"
                alt="Slow living candle ambiance"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Right Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold text-gold tracking-widest uppercase">
              Artisanal Craftsmanship
            </span>
            <h2 className="text-fluid-h1 font-serif font-bold text-cream-50 leading-tight">
              The Art of Slow Living &amp; Sacred Light.
            </h2>
            <p className="text-xs sm:text-base text-cream-200/80 font-light leading-relaxed max-w-xl">
              We believe a candle is more than wax and wick — it is a ritual of transition. An
              unwinding of the day’s restlessness. A gentle golden flame that anchors conversations,
              meditations, and family gatherings with fragrant calm.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row gap-4">
              <Link href="/about">
                <Button variant="gold" size="lg">
                  Read Our Story
                </Button>
              </Link>
              <Link href="/collection/all">
                <Button variant="secondary" size="lg">
                  Browse Catalog
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: FESTIVE SALE SPOTLIGHT WITH LIVE COUNTDOWN
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-b from-ivory to-cream-100 rounded-3xl p-8 sm:p-12 border border-gold/40 shadow-warm-lg space-y-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-gold/25">
            <div className="space-y-2">
              <span className="text-xs font-bold text-primary tracking-widest uppercase flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-gold" />
                Limited Seasonal Celebration
              </span>
              <h2 className="text-fluid-h1 font-serif font-bold text-deep">
                Festive Illumination Spotlight
              </h2>
              <p className="text-xs sm:text-sm text-deep/75 max-w-xl font-light">
                Antique hammered brass urlis and traditional clay diyas filled with sacred sandalwood &amp; marigold.
              </p>
            </div>

            {/* Countdown Badge */}
            <div className="bg-deep text-cream-100 p-4 rounded-2xl flex items-center gap-4 shadow-sm border border-gold/30">
              <Clock className="w-5 h-5 text-gold" />
              <div className="text-xs">
                <span className="text-gold font-bold block uppercase tracking-wider text-[10px]">
                  Sale Ends In
                </span>
                <span className="font-mono text-base font-bold text-cream-50">14h : 28m : 45s</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {festiveProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: WHY RUHARA (4 Icon Features)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-12">
          <span className="text-xs font-bold text-primary tracking-widest uppercase">
            The Ruhara Promise
          </span>
          <h2 className="text-fluid-h1 font-serif font-bold text-deep">
            Why Choose Ruhara Candles?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-ivory p-6 rounded-2xl border border-gold/25 shadow-warm-sm text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-cream-100 border border-gold/30 flex items-center justify-center mx-auto text-primary">
              <Flame className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-base font-bold text-deep">100% Pure Soy Wax</h3>
            <p className="text-xs text-deep/70 font-light leading-relaxed">
              Zero paraffin, petroleum chemicals, or parabens. Burns completely soot-free and non-toxic.
            </p>
          </div>

          <div className="bg-ivory p-6 rounded-2xl border border-gold/25 shadow-warm-sm text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-cream-100 border border-gold/30 flex items-center justify-center mx-auto text-primary">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-base font-bold text-deep">50+ Hours Burn Time</h3>
            <p className="text-xs text-deep/70 font-light leading-relaxed">
              Slow-burning pure soy wax ensures maximum burn duration and enduring fragrant presence.
            </p>
          </div>

          <div className="bg-ivory p-6 rounded-2xl border border-gold/25 shadow-warm-sm text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-cream-100 border border-gold/30 flex items-center justify-center mx-auto text-primary">
              <Gift className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-base font-bold text-deep">Keepsake Luxury Vessels</h3>
            <p className="text-xs text-deep/70 font-light leading-relaxed">
              Every hand-cast concrete and hammered brass vessel can be repurposed as home decor.
            </p>
          </div>

          <div className="bg-ivory p-6 rounded-2xl border border-gold/25 shadow-warm-sm text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-cream-100 border border-gold/30 flex items-center justify-center mx-auto text-primary">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-base font-bold text-deep">Pan-India Courier Safety</h3>
            <p className="text-xs text-deep/70 font-light leading-relaxed">
              Shipped in reinforced shockproof honeycomb wrap with zero-breakage replacement guarantee.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 8: INTERACTIVE GIFT HAMPER BUILDER TEASER
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-ivory rounded-3xl p-8 sm:p-12 border border-gold/35 shadow-warm-lg grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold text-primary tracking-widest uppercase">
              Custom Gifting Studio
            </span>
            <h2 className="text-fluid-h2 font-serif font-bold text-deep leading-tight">
              Build Your Own Artisanal Hamper
            </h2>
            <p className="text-xs sm:text-sm text-deep/75 leading-relaxed font-light">
              Create a personalized gift for Diwali, weddings, or housewarmings. Select your favorite
              hand-poured candle, a ceramic fluted vase, and an antique brass pooja tray.
            </p>

            {/* Selection Steps */}
            <div className="space-y-3 pt-2">
              <div className="p-3 bg-cream-100/70 rounded-xl border border-gold/20 flex items-center justify-between text-xs">
                <span className="font-semibold text-deep">1. Candle: {hamperCandle.title}</span>
                <span className="font-bold text-primary">{formatPrice(hamperCandle.basePrice)}</span>
              </div>
              <div className="p-3 bg-cream-100/70 rounded-xl border border-gold/20 flex items-center justify-between text-xs">
                <span className="font-semibold text-deep">2. Decor: {hamperVase.title}</span>
                <span className="font-bold text-primary">{formatPrice(hamperVase.basePrice)}</span>
              </div>
              <div className="p-3 bg-cream-100/70 rounded-xl border border-gold/20 flex items-center justify-between text-xs">
                <span className="font-semibold text-deep">3. Tray: {hamperTray.title}</span>
                <span className="font-bold text-primary">{formatPrice(hamperTray.basePrice)}</span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-deep/60 block">Bundle Price</span>
                <span className="font-serif text-2xl font-bold text-deep">
                  {formatPrice(hamperCandle.basePrice + hamperVase.basePrice + hamperTray.basePrice - 200)}
                </span>
                <span className="text-[10px] text-emerald-700 font-bold ml-2">Save ₹200</span>
              </div>

              <Link href="/collection/gift-hampers">
                <Button variant="primary" size="md">
                  Explore Curated Hampers
                </Button>
              </Link>
            </div>
          </div>

          {/* Visual Bundle Showcase */}
          <div className="lg:col-span-6 relative aspect-square rounded-2xl overflow-hidden bg-cream-200 border border-gold/30 shadow-inner">
            <Image
              src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1200"
              alt="Curated gift hamper bundle"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 9: CUSTOMER REVIEWS & TESTIMONIALS
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-12">
          <span className="text-xs font-bold text-primary tracking-widest uppercase">
            Stories From Our Patrons
          </span>
          <h2 className="text-fluid-h1 font-serif font-bold text-deep">
            Cherished In 2,000+ Homes
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.slice(0, 3).map((r) => (
            <div
              key={r.id}
              className="bg-ivory p-6 sm:p-8 rounded-3xl border border-gold/25 shadow-warm-sm space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <RatingStars rating={r.rating} size="sm" showCount={false} />
                <h4 className="font-serif text-base font-bold text-deep">{r.title}</h4>
                <p className="text-xs sm:text-sm text-deep/75 leading-relaxed font-light italic">
                  &ldquo;{r.comment}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-cream-200 flex items-center justify-between text-xs">
                <span className="font-bold text-deep">{r.authorName}</span>
                <span className="text-emerald-700 font-bold flex items-center gap-1 text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Verified Buyer
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 10: INSTAGRAM COMMUNITY GALLERY
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-8">
          <span className="text-xs font-bold text-primary tracking-widest uppercase">
            Follow Our Candle Journal
          </span>
          <h2 className="text-fluid-h2 font-serif font-bold text-deep">
            @RuharaCandles On Instagram
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {[
            'https://images.unsplash.com/photo-1608755728617-aefab37d2edd?q=80&w=600',
            'https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=600',
            'https://images.unsplash.com/photo-1596433809252-260c2745dfdd?q=80&w=600',
            'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=600',
            'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=600',
            'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=600',
          ].map((url, i) => (
            <a
              key={i}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-square rounded-2xl overflow-hidden border border-gold/30 shadow-sm group"
            >
              <Image src={url} alt="Ruhara candle inspiration" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-deep/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                <Instagram className="w-6 h-6" />
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 11: NEWSLETTER CIRCLING
          ========================================================================= */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-ivory rounded-3xl p-8 sm:p-12 border border-gold/35 shadow-warm-lg text-center space-y-4">
          <Badge variant="gold" size="md">Exclusive Member Circle</Badge>
          <h2 className="text-fluid-h2 font-serif font-bold text-deep">
            Receive 10% Off Your First Order
          </h2>
          <p className="text-xs sm:text-sm text-deep/75 max-w-md mx-auto font-light leading-relaxed">
            Subscribe to receive seasonal candle fragrance releases, festive discount invitations, and slow living rituals.
          </p>

          {newsletterSubscribed ? (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-800 font-semibold inline-block">
              Welcome to Ruhara! Use code <strong className="text-primary font-mono">WELCOME10</strong> at checkout for 10% OFF.
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (newsletterEmail) setNewsletterSubscribed(true);
              }}
              className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto pt-2"
            >
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-1 bg-white border border-gold/35 rounded-xl px-4 py-3 text-xs text-deep focus:outline-none focus:border-gold"
              />
              <Button type="submit" variant="primary" size="md">
                Claim 10% Off
              </Button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
