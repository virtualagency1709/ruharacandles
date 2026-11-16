'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  Flame,
  Heart,
  Search,
  ShoppingBag,
  Check,
  ShieldCheck,
  Truck,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ArchImage } from '@/components/ui/ArchImage';
import { RotatingSeal } from '@/components/ui/RotatingSeal';
import { PriceDisplay } from '@/components/ui/PriceDisplay';
import { RatingStars } from '@/components/ui/RatingStars';
import { Input } from '@/components/ui/Input';

export default function DesignSystemPage() {
  const [inputValue, setInputValue] = useState('');

  const colors = [
    {
      name: 'Base Cream',
      hex: '#F5EBDD',
      text: 'text-deep',
      bg: 'bg-cream',
      role: 'Global canvas & atmospheric background',
    },
    {
      name: 'Warm Ivory',
      hex: '#FBF6EE',
      text: 'text-deep',
      bg: 'bg-ivory',
      role: 'Elevated cards, modals & contrast sections',
    },
    {
      name: 'Deep Brown',
      hex: '#3B2412',
      text: 'text-cream-50',
      bg: 'bg-deep',
      role: 'Primary typography & high-contrast CTAs',
    },
    {
      name: 'Brand Brown',
      hex: '#8B5A2B',
      text: 'text-cream-50',
      bg: 'bg-primary',
      role: 'Key brand accents, badges & links',
    },
    {
      name: 'Luxury Gold',
      hex: '#D8A94A',
      text: 'text-deep',
      bg: 'bg-gold',
      role: 'Royal gradients, star ratings, borders',
    },
    {
      name: 'Soft Sage',
      hex: '#7A8B6A',
      text: 'text-cream-50',
      bg: 'bg-sage',
      role: 'Botanical notes, organic ingredients, discounts',
    },
    {
      name: 'Blush Accent',
      hex: '#E9CDB9',
      text: 'text-deep',
      bg: 'bg-blush',
      role: 'Floral candle variants & delicate highlights',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
      {/* Header */}
      <div className="border-b border-gold/30 pb-8 text-center sm:text-left space-y-3">
        <Badge variant="gold" size="md">
          Awwwards-Tier Design System
        </Badge>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-deep">
          Ruhara Candles{' '}
          <span className="italic gold-gradient-text font-normal">Design Tokens &amp; Components</span>
        </h1>
        <p className="text-sm sm:text-base text-deep/70 max-w-2xl font-light">
          A handcrafted luxury visual identity inspired by Indian home decor heritage, arch
          silhouettes, warm candle flames, and tactile organic paper grain.
        </p>
      </div>

      {/* 1. COLOR PALETTE */}
      <section className="space-y-6">
        <div>
          <span className="text-xs font-bold text-primary tracking-widest uppercase">
            01 / Color Architecture
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-deep mt-1">
            Brand Color Palette
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {colors.map((c) => (
            <div
              key={c.name}
              className="bg-ivory rounded-2xl p-4 border border-gold/30 shadow-warm-sm flex flex-col justify-between space-y-4"
            >
              <div
                className={`h-24 w-full rounded-xl ${c.bg} ${c.text} flex items-end p-3 font-mono text-xs font-bold shadow-inner border border-black/5`}
              >
                {c.hex}
              </div>
              <div>
                <h3 className="font-serif text-base font-bold text-deep">{c.name}</h3>
                <p className="text-xs text-deep/60 mt-1">{c.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. TYPOGRAPHY SPECIMEN */}
      <section className="space-y-6">
        <div>
          <span className="text-xs font-bold text-primary tracking-widest uppercase">
            02 / Editorial Typography
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-deep mt-1">
            Fluid Editorial Type Scale
          </h2>
        </div>

        <div className="bg-ivory rounded-2xl p-6 sm:p-10 border border-gold/30 shadow-warm-sm space-y-8">
          <div>
            <span className="text-[10px] text-primary uppercase font-bold tracking-widest block mb-2">
              Hero Display (clamp 44px - 88px)
            </span>
            <p className="text-fluid-hero font-serif font-bold text-deep">
              Light up your <em className="gold-gradient-text font-normal">space</em> with love.
            </p>
          </div>

          <div className="pt-6 border-t border-cream-200">
            <span className="text-[10px] text-primary uppercase font-bold tracking-widest block mb-1">
              Heading 1 (clamp 36px - 60px)
            </span>
            <h1 className="text-fluid-h1 font-serif font-bold text-deep">
              The Sacred Symphony of Slow Living
            </h1>
          </div>

          <div className="pt-6 border-t border-cream-200">
            <span className="text-[10px] text-primary uppercase font-bold tracking-widest block mb-1">
              Heading 2 (clamp 28px - 44px)
            </span>
            <h2 className="text-fluid-h2 font-serif font-semibold text-deep">
              Hand-poured 100% Pure Organic Soy Wax
            </h2>
          </div>

          <div className="pt-6 border-t border-cream-200">
            <span className="text-[10px] text-primary uppercase font-bold tracking-widest block mb-1">
              Decorative Tagline Script (Great Vibes / Allura)
            </span>
            <p className="font-script text-3xl sm:text-4xl text-primary">
              Handcrafted with love for serene sacred spaces
            </p>
          </div>

          <div className="pt-6 border-t border-cream-200">
            <span className="text-[10px] text-primary uppercase font-bold tracking-widest block mb-1">
              Body Copy (DM Sans / Inter)
            </span>
            <p className="text-sm sm:text-base text-deep/80 max-w-2xl leading-relaxed">
              Every Ruhara candle is poured slowly in small batches in our Delhi NCR studio. We use
              exclusively ethically harvested soybean wax, lead-free unbleached cotton or crackling
              wooden wicks, and steam-distilled Indian botanical essences.
            </p>
          </div>
        </div>
      </section>

      {/* 3. BUTTONS & MICRO-INTERACTIONS */}
      <section className="space-y-6">
        <div>
          <span className="text-xs font-bold text-primary tracking-widest uppercase">
            03 / Interactive Controls
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-deep mt-1">
            Button Hierarchy &amp; Shimmer
          </h2>
        </div>

        <div className="bg-ivory rounded-2xl p-6 sm:p-10 border border-gold/30 shadow-warm-sm space-y-6">
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Shop Candles (Primary)
            </Button>

            <Button variant="secondary" size="lg">
              Explore Hampers (Secondary)
            </Button>

            <Button variant="gold" size="lg" leftIcon={<Sparkles className="w-4 h-4" />}>
              Festive Edition
            </Button>

            <Button variant="outline" size="lg">
              View Collection
            </Button>

            <Button variant="sage" size="lg">
              Eco-Friendly
            </Button>

            <Button variant="ghost" size="lg">
              Learn More →
            </Button>
          </div>

          <div className="pt-4 border-t border-cream-200 flex flex-wrap items-center gap-4">
            <Button variant="primary" size="sm">
              Small Button
            </Button>
            <Button variant="primary" size="md">
              Medium Button
            </Button>
            <Button variant="primary" size="lg">
              Large Button
            </Button>
            <Button variant="primary" size="xl">
              Extra Large Hero CTA
            </Button>
            <Button variant="secondary" size="icon" aria-label="Wishlist">
              <Heart className="w-4 h-4 text-primary" />
            </Button>
            <Button variant="primary" size="md" isLoading>
              Loading...
            </Button>
          </div>
        </div>
      </section>

      {/* 4. BADGES & PILLS */}
      <section className="space-y-6">
        <div>
          <span className="text-xs font-bold text-primary tracking-widest uppercase">
            04 / Semantic Indicators
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-deep mt-1">
            Badges &amp; Status Tags
          </h2>
        </div>

        <div className="bg-ivory rounded-2xl p-6 sm:p-10 border border-gold/30 shadow-warm-sm flex flex-wrap items-center gap-3">
          <Badge variant="gold">✨ 20% Festive Off</Badge>
          <Badge variant="sage">🌿 100% Organic Soy Wax</Badge>
          <Badge variant="blush">🌸 Rose Petal Damask</Badge>
          <Badge variant="primary">Bestseller</Badge>
          <Badge variant="ivory">Only 3 Left In Stock</Badge>
          <Badge variant="outline">Pan-India Delivery</Badge>
        </div>
      </section>

      {/* 5. ARCH SHAPES, SEALS & MASKING */}
      <section className="space-y-6">
        <div>
          <span className="text-xs font-bold text-primary tracking-widest uppercase">
            05 / Heritage Shape Language
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-deep mt-1">
            Arch Mask, Rotating Seal &amp; Ambient Flame Glow
          </h2>
        </div>

        <div className="bg-ivory rounded-2xl p-6 sm:p-10 border border-gold/30 shadow-warm-sm grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Arch Image with Glow */}
          <div className="flex flex-col items-center">
            <span className="text-xs font-semibold text-deep/70 mb-4 uppercase tracking-wider">
              Arch Mask with Floating Gold Outline &amp; Flame Pulse
            </span>
            <div className="w-full max-w-xs">
              <ArchImage
                src="https://images.unsplash.com/photo-1608755728617-aefab37d2edd?q=80&w=800&auto=format&fit=crop"
                alt="Urli Candle in Arch Mask"
                aspectRatio="portrait"
                showGlow={true}
                showOffsetBorder={true}
              >
                <div className="p-4 text-cream-50 flex flex-col justify-end h-full">
                  <span className="text-[10px] tracking-widest uppercase text-gold font-bold">
                    Festive Edition
                  </span>
                  <h4 className="font-serif text-lg font-bold">Royal Festive Brass Urli</h4>
                </div>
              </ArchImage>
            </div>
          </div>

          {/* Rotating Seal & Price Display */}
          <div className="space-y-8 flex flex-col items-center md:items-start">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs font-semibold text-deep/70 uppercase tracking-wider block">
                Rotating Artisan Seal (SVG Path Animation)
              </span>
              <RotatingSeal size={130} />
            </div>

            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs font-semibold text-deep/70 uppercase tracking-wider block">
                Price Display &amp; Discount Hierarchy
              </span>
              <PriceDisplay price={1299} mrp={2199} size="xl" />
            </div>

            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs font-semibold text-deep/70 uppercase tracking-wider block">
                Rating Stars Component
              </span>
              <RatingStars rating={4.9} reviewCount={64} size="md" />
            </div>
          </div>
        </div>
      </section>

      {/* 6. INPUTS & FORM CONTROLS */}
      <section className="space-y-6">
        <div>
          <span className="text-xs font-bold text-primary tracking-widest uppercase">
            06 / Form Architecture
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-deep mt-1">
            Luxury Inputs &amp; Feedback States
          </h2>
        </div>

        <div className="bg-ivory rounded-2xl p-6 sm:p-10 border border-gold/30 shadow-warm-sm grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Full Name"
            placeholder="e.g. Radhika Sharma"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />

          <Input
            label="Search Products"
            placeholder="Search soy candles, brass urlis..."
            leftIcon={<Search className="w-4 h-4" />}
          />

          <Input
            label="Shipping Pincode"
            placeholder="Enter 6-digit Indian pincode"
            helperText="Check instant Shiprocket delivery estimate"
            defaultValue="122002"
          />

          <Input
            label="Coupon Code"
            placeholder="e.g. FESTIVE20"
            error="Minimum order value of ₹1,499 required for this coupon"
            defaultValue="FESTIVE20"
          />
        </div>
      </section>
    </div>
  );
}
