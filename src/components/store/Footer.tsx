'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Facebook,
  ShieldCheck,
  CheckCircle,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { CATEGORIES } from '@/data/seedData';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
  };

  return (
    <footer className="bg-deep text-cream-100 border-t-2 border-gold/40 relative overflow-hidden">
      {/* Subtle Arch Background Aura */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-48 bg-gold/5 blur-3xl pointer-events-none rounded-full" />

      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-cream-200/20">
          {/* Col 1 & 2: Brand Identity & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-full border border-gold/40 p-0.5 bg-cream-50">
                <Image
                  src="/images/logo.svg"
                  alt="Ruhara Candles"
                  width={48}
                  height={48}
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
              <div>
                <span className="font-serif text-2xl font-bold tracking-wider text-cream-50 block">
                  RUHARA CANDLES
                </span>
                <span className="text-[10px] font-sans font-medium text-gold tracking-widest uppercase block">
                  Candles &amp; Home Decor
                </span>
              </div>
            </Link>

            <p className="text-xs text-cream-200/80 leading-relaxed max-w-sm">
              Rooted in the timeless warmth of Indian artistry, Ruhara crafts luxury scented
              candles poured with 100% pure organic soy wax, pure botanical extracts, and artisanal
              metal &amp; concrete vessels designed to illuminate your sacred spaces with peace.
            </p>

            <div className="pt-2 space-y-2 text-xs text-cream-200/90">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                <span>Ruhara Artisanal Studio, DLF Phase 5, Gurugram, Delhi NCR – 122002</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold flex-shrink-0" />
                <a href="tel:+919876543210" className="hover:text-gold transition-colors">
                  +91 98765 43210 (Mon - Sat, 10 AM - 7 PM)
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gold flex-shrink-0" />
                <a href="mailto:care@ruharacandles.com" className="hover:text-gold transition-colors">
                  care@ruharacandles.com
                </a>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full border border-gold/40 flex items-center justify-center text-cream-200 hover:text-gold hover:border-gold transition-all"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full border border-gold/40 flex items-center justify-center text-cream-200 hover:text-gold hover:border-gold transition-all"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 3: Shop Collections */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-semibold text-gold tracking-wide uppercase">
              Shop Collections
            </h4>
            <ul className="space-y-2 text-xs text-cream-200/80">
              {CATEGORIES.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/collection/${cat.slug}`}
                    className="hover:text-gold transition-colors block py-0.5"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/collection/all"
                  className="text-gold hover:underline font-medium block py-0.5"
                >
                  View All Products →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Customer Care & Policies */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-semibold text-gold tracking-wide uppercase">
              Customer Support
            </h4>
            <ul className="space-y-2 text-xs text-cream-200/80">
              <li>
                <Link href="/about" className="hover:text-gold transition-colors block py-0.5">
                  Our Story &amp; Craft
                </Link>
              </li>
              <li>
                <Link href="/account/orders" className="hover:text-gold transition-colors block py-0.5">
                  Track Your Shipment
                </Link>
              </li>
              <li>
                <Link href="/shipping-policy" className="hover:text-gold transition-colors block py-0.5">
                  Shipping &amp; Delivery Policy
                </Link>
              </li>
              <li>
                <Link href="/return-policy" className="hover:text-gold transition-colors block py-0.5">
                  Returns &amp; Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-gold transition-colors block py-0.5">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-and-conditions" className="hover:text-gold transition-colors block py-0.5">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-gold transition-colors block py-0.5">
                  Candle Care &amp; FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Newsletter & Discount */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-semibold text-gold tracking-wide uppercase">
              Join Our Circle
            </h4>
            <p className="text-xs text-cream-200/80 leading-relaxed">
              Sign up for our candle journal and receive <strong>10% off</strong> your first order.
            </p>

            {subscribed ? (
              <div className="p-3 bg-deep-dark/80 border border-gold/40 rounded-xl text-xs space-y-1">
                <div className="flex items-center gap-1.5 text-gold font-medium">
                  <CheckCircle className="w-4 h-4" />
                  <span>Welcome to Ruhara!</span>
                </div>
                <p className="text-[11px] text-cream-200/90">
                  Use coupon code <strong className="text-gold font-mono">WELCOME10</strong> at checkout for 10% OFF.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 bg-deep-dark/80 border border-gold/30 rounded-xl text-xs text-cream-100 placeholder:text-cream-200/40 focus:outline-none focus:border-gold"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 bg-gold text-deep rounded-lg hover:bg-gold-light transition-colors"
                    aria-label="Subscribe"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="text-[10px] text-cream-200/60 block">
                  No spam, ever. Unsubscribe with one click.
                </span>
              </form>
            )}

            {/* Trust badge */}
            <div className="pt-2 flex items-center gap-2 text-[11px] text-cream-200/90">
              <ShieldCheck className="w-4 h-4 text-gold flex-shrink-0" />
              <span>100% Pure Soy Wax • Hand-poured in India</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Payments & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-cream-200/60">
          <p>© {new Date().getFullYear()} Ruhara Candles. All rights reserved. Handcrafted with love.</p>

          {/* Payment Badges */}
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-cream-200/80 font-medium">
            <span>Secure Indian Payments:</span>
            <div className="flex items-center gap-1.5">
              <span className="px-2 py-0.5 bg-white text-deep font-bold rounded text-[10px]">
                UPI
              </span>
              <span className="px-2 py-0.5 bg-white text-deep font-bold rounded text-[10px]">
                RuPay
              </span>
              <span className="px-2 py-0.5 bg-white text-blue-900 font-bold rounded text-[10px]">
                VISA
              </span>
              <span className="px-2 py-0.5 bg-white text-red-600 font-bold rounded text-[10px]">
                Mastercard
              </span>
              <span className="px-2 py-0.5 bg-white text-emerald-800 font-bold rounded text-[10px]">
                COD
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
