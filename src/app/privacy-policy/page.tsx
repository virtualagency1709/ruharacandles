import React from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-cream pb-24">
      {/* Header Banner */}
      <div className="bg-gradient-to-b from-cream-200/90 to-cream border-b border-gold/25 py-14 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-2xl mx-auto space-y-3">
          <Badge variant="gold" size="md">Legal Compliance</Badge>
          <h1 className="text-fluid-h1 font-serif font-bold text-deep">
            Privacy Policy
          </h1>
          <p className="text-xs text-deep/60">Last updated: November 2026</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="bg-ivory rounded-3xl p-8 sm:p-12 border border-gold/25 shadow-warm-sm prose prose-stone max-w-none text-xs sm:text-sm text-deep/80 leading-relaxed space-y-6">
          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-deep">1. Introduction &amp; Commitment</h2>
            <p>
              At Ruhara Candles (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;), protecting your personal privacy is fundamental to our artisanal ethos. This Privacy Policy details how we collect, handle, and safeguard your information when you visit or make a purchase from our website (ruharacandles.com).
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-deep">2. Information We Collect</h2>
            <p>
              When you browse our storefront, place an order, or subscribe to our candle journal, we collect relevant information necessary to fulfill your order and enhance your shopping experience:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Contact Information:</strong> Name, shipping address, billing address, phone number, and email.</li>
              <li><strong>Payment Information:</strong> Processed directly via secure, PCI-DSS Level 1 compliant gateway (Razorpay). Ruhara Candles never stores your credit/debit card numbers or bank passwords.</li>
              <li><strong>Device &amp; Browsing Data:</strong> IP address, browser type, time zone, and cookies for cart persistence.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-deep">3. How We Use Your Information</h2>
            <p>
              We utilize your personal information strictly for genuine business purposes:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Processing, packing, and dispatching your candle shipments via courier partners (Shiprocket).</li>
              <li>Sending automated WhatsApp and SMS delivery status alerts.</li>
              <li>Preventing fraudulent transactions and ensuring platform security.</li>
              <li>Sharing our monthly editorial candle newsletter (only if explicitly opted-in; unsubscribe anytime).</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-deep">4. Data Security</h2>
            <p>
              We implement industry-standard 256-bit SSL encryption across all store channels. Access to customer shipping details is restricted strictly to authorized fulfillment personnel.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-deep">5. Contact Our Privacy Officer</h2>
            <p>
              For questions regarding your personal data or to request account deletion, please contact us at:
            </p>
            <p>
              <strong>Email:</strong> care@ruharacandles.com<br />
              <strong>Address:</strong> Ruhara Candles Studio, DLF Phase 5, Gurugram, Delhi NCR – 122002
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
