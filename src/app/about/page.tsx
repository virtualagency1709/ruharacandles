import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, Flame, ShieldCheck, HeartHandshake, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-cream pb-24">
      {/* Hero Banner */}
      <div className="bg-gradient-to-b from-cream-200/90 to-cream border-b border-gold/25 py-16 sm:py-20 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <Badge variant="gold" size="md">
            Our Story &amp; Craft
          </Badge>
          <h1 className="text-fluid-h1 font-serif font-bold text-deep">
            Light Up Your Space With <span className="italic gold-gradient-text font-normal">Love.</span>
          </h1>
          <p className="text-sm sm:text-base text-deep/75 font-light leading-relaxed max-w-2xl mx-auto">
            Ruhara Candles was born out of a deep reverence for Indian home ambiance, sacred festivals,
            and the restorative beauty of artisanal slow living.
          </p>
        </div>
      </div>

      {/* Narrative Section with Arch Image */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Image with Arch mask */}
          <div className="relative aspect-[4/5] rounded-[80px_80px_20px_20px] sm:rounded-[140px_140px_24px_24px] overflow-hidden border-2 border-gold/40 shadow-warm-lg max-w-md mx-auto w-full">
            <Image
              src="/images/peony-candle-set-of-3.jpg"
              alt="Artisan pouring soy wax in Delhi NCR studio"
              fill
              unoptimized={true}
              className="object-cover"
            />
          </div>

          {/* Right: Narrative Story */}
          <div className="space-y-6">
            <span className="text-xs font-bold text-primary tracking-widest uppercase">
              The Philosophy
            </span>
            <h2 className="text-fluid-h2 font-serif font-bold text-deep">
              Small-Batch Pouring. Pure Ingredients. Zero Compromises.
            </h2>
            <div className="text-xs sm:text-sm text-deep/80 space-y-4 font-light leading-relaxed">
              <p>
                In a world crowded with synthetic paraffin and mass-manufactured room sprays, Ruhara offers
                a sanctuary of authenticity. Each vessel is hand-poured in our Delhi NCR studio using 100%
                natural soybean wax, harvested ethically and blended with steam-distilled pure botanical essences.
              </p>
              <p>
                From hand-hammered antique brass urlis that honor Diwali poojas to architectural fluted
                concrete jars designed for contemporary living rooms, every creation is an invitation to pause,
                breathe, and celebrate home.
              </p>
            </div>

            {/* 3 Pillars */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gold/25">
              <div>
                <h4 className="font-serif text-lg font-bold text-primary">100% Soy</h4>
                <p className="text-[11px] text-deep/60">Zero Paraffin or Toxins</p>
              </div>
              <div>
                <h4 className="font-serif text-lg font-bold text-primary">50+ Hours</h4>
                <p className="text-[11px] text-deep/60">Even, Soot-Free Burn</p>
              </div>
              <div>
                <h4 className="font-serif text-lg font-bold text-primary">Artisanal</h4>
                <p className="text-[11px] text-deep/60">Reusable Keepsake Vessels</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 bg-ivory rounded-3xl p-8 sm:p-12 border border-gold/30 shadow-warm-sm text-center space-y-4 max-w-3xl mx-auto">
          <h3 className="font-serif text-2xl font-bold text-deep">
            Bring Warmth to Your Sanctuary
          </h3>
          <p className="text-xs sm:text-sm text-deep/70 max-w-md mx-auto">
            Explore our bestselling artisanal jar candles, festive floating urlis, and curated gift hampers.
          </p>
          <Link href="/collection/all" className="inline-block pt-2">
            <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Explore The Collection
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
