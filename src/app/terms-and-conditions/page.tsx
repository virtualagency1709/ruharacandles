import React from 'react';
import { Badge } from '@/components/ui/Badge';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-cream pb-24">
      {/* Header Banner */}
      <div className="bg-gradient-to-b from-cream-200/90 to-cream border-b border-gold/25 py-14 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-2xl mx-auto space-y-3">
          <Badge variant="gold" size="md">Customer Agreement</Badge>
          <h1 className="text-fluid-h1 font-serif font-bold text-deep">
            Terms &amp; Conditions
          </h1>
          <p className="text-xs text-deep/60">Last updated: November 2026</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="bg-ivory rounded-3xl p-8 sm:p-12 border border-gold/25 shadow-warm-sm text-xs sm:text-sm text-deep/80 leading-relaxed space-y-6">
          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-deep">1. Overview</h2>
            <p>
              Welcome to Ruhara Candles. By accessing or purchasing from ruharacandles.com, you agree to be bound by the following terms, conditions, and policies. Please read them thoroughly prior to completing an order.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-deep">2. Artisanal Handcrafted Quality</h2>
            <p>
              Every candle, concrete vessel, and brass urli sold by Ruhara is handmade in small batches. Because of the organic nature of natural soy wax and hand-cast concrete, minor variations in texture, color nuance, surface crystallization, or slight weight differences are normal characteristics of authentic artisanal craftsmanship, not manufacturing defects.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-deep">3. Pricing &amp; GST Compliance</h2>
            <p>
              All prices displayed on our website are in Indian Rupees (INR) and are fully inclusive of all applicable Goods and Services Tax (GST). We reserve the right to modify prices or discontinue products at any time without prior notice.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-deep">4. Fire Safety &amp; Usage Disclaimer</h2>
            <p>
              Candles involve an open flame. By purchasing, customers acknowledge responsibility for safe operation:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Never leave a burning candle unattended.</li>
              <li>Keep out of reach of children and domestic pets.</li>
              <li>Place exclusively on heat-resistant, flat surfaces away from flammable curtains or materials.</li>
              <li>Discontinue use when only 1/2 inch of wax remains in the container.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-deep">5. Governing Law</h2>
            <p>
              These Terms and any agreements whereby we provide you products shall be governed by and construed in accordance with the laws of India, under the jurisdiction of the courts of Gurugram/Delhi NCR.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
