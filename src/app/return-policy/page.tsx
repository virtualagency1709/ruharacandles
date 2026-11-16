import React from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { RotateCcw, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function ReturnPolicyPage() {
  return (
    <div className="min-h-screen bg-cream pb-24">
      {/* Header Banner */}
      <div className="bg-gradient-to-b from-cream-200/90 to-cream border-b border-gold/25 py-14 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-2xl mx-auto space-y-3">
          <Badge variant="gold" size="md">Peace of Mind Guarantee</Badge>
          <h1 className="text-fluid-h1 font-serif font-bold text-deep">
            Return &amp; Refund Policy
          </h1>
          <p className="text-xs text-deep/60">Last updated: November 2026</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="bg-ivory rounded-3xl p-8 sm:p-12 border border-gold/25 shadow-warm-sm text-xs sm:text-sm text-deep/80 leading-relaxed space-y-6">
          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-deep flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>1. Zero-Breakage Transit Replacement Guarantee</span>
            </h2>
            <p>
              We package every glass jar, ceramic vase, and terracotta diya with multi-layered shockproof honeycomb padding. In the unlikely event that an item arrives cracked, chipped, or damaged during transit:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Please take 2 clear photographs of the damaged product and parcel packaging.</li>
              <li>WhatsApp them to <strong>+91 98765 43210</strong> or email <strong>care@ruharacandles.com</strong> within <strong>48 hours of delivery</strong>.</li>
              <li>We will arrange a free immediate replacement dispatched within 24 hours without any hassle or charge.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-deep">2. Returns on Unused Candles</h2>
            <p>
              Because candles are personal home fragrance items, we accept returns for exchange or store credit within <strong>7 days of delivery</strong>, provided that:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>The candle is completely unused, unlit, with intact wick and original presentation box.</li>
              <li>Custom corporate hampers or engraved items cannot be returned.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-deep">3. Refund Processing</h2>
            <p>
              Once an approved return is inspected at our studio, refunds are credited back to the original payment source (UPI, Card, Bank) within <strong>5–7 business days</strong> via Razorpay. For COD orders, refunds are transferred directly via NEFT/UPI bank transfer.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
