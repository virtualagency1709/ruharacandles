import React from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { Truck, Clock, ShieldCheck, MapPin } from 'lucide-react';

export default function ShippingPolicyPage() {
  return (
    <div className="min-h-screen bg-cream pb-24">
      {/* Header Banner */}
      <div className="bg-gradient-to-b from-cream-200/90 to-cream border-b border-gold/25 py-14 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-2xl mx-auto space-y-3">
          <Badge variant="gold" size="md">Pan-India Express Delivery</Badge>
          <h1 className="text-fluid-h1 font-serif font-bold text-deep">
            Shipping &amp; Delivery Policy
          </h1>
          <p className="text-xs text-deep/60">Last updated: November 2026</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="bg-ivory rounded-3xl p-8 sm:p-12 border border-gold/25 shadow-warm-sm text-xs sm:text-sm text-deep/80 leading-relaxed space-y-6">
          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-deep flex items-center gap-2">
              <Truck className="w-5 h-5 text-primary" />
              <span>1. Dispatch &amp; Delivery Timelines</span>
            </h2>
            <p>
              All orders are freshly packaged and dispatched from our Gurugram/Delhi NCR studio within <strong>24 to 48 business hours</strong> of order placement.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-cream-100/70 p-3.5 rounded-xl border border-gold/20">
                <span className="font-bold text-deep block">Delhi NCR</span>
                <span className="text-[11px] text-deep/70">1–2 Business Days</span>
              </div>
              <div className="bg-cream-100/70 p-3.5 rounded-xl border border-gold/20">
                <span className="font-bold text-deep block">Metro Cities</span>
                <span className="text-[11px] text-deep/70">2–4 Business Days</span>
              </div>
              <div className="bg-cream-100/70 p-3.5 rounded-xl border border-gold/20">
                <span className="font-bold text-deep block">Rest of India</span>
                <span className="text-[11px] text-deep/70">4–6 Business Days</span>
              </div>
            </div>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-deep">2. Shipping Charges</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Free Delivery:</strong> All orders above <strong>₹999</strong> receive complimentary express courier shipping across India.</li>
              <li><strong>Standard Shipping:</strong> A flat rate of <strong>₹79</strong> applies on orders below ₹999.</li>
              <li><strong>Cash on Delivery:</strong> A convenience fee of <strong>₹49</strong> applies for COD shipments.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-deep">3. Live Order Tracking</h2>
            <p>
              Once your parcel is handed over to our courier partners (BlueDart, Delhivery, DTDC via Shiprocket), you will receive an SMS and WhatsApp message containing your live tracking URL and AWB number. You can also track your package anytime on our <Link href="/account/orders" className="text-primary font-bold hover:underline">Track Orders</Link> page.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
