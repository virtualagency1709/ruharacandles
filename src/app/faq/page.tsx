'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Sparkles, HelpCircle } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface FAQItem {
  q: string;
  a: string;
}

const FAQS: { category: string; items: FAQItem[] }[] = [
  {
    category: 'Candle Care & Safety',
    items: [
      {
        q: 'Why is it important to burn a candle for 2-3 hours on the first light?',
        a: 'The first burn sets the "memory" of the candle wax. Allowing the melted wax to reach the complete perimeter of the jar prevents "tunneling" (where wax builds up on the edges and burns only down the center), maximizing your candle’s lifespan and scent throw.',
      },
      {
        q: 'How should I trim the wick?',
        a: 'Always trim the wick to approximately 1/4 inch (5mm) before every single burn. This prevents flame mushrooming, soot buildup, and ensures an even, slow burn. You can use our Heritage Brass Wick Trimmer or clean scissors.',
      },
      {
        q: 'Can I reuse the concrete or brass candle containers once the wax is consumed?',
        a: 'Absolutely! All Ruhara vessels are designed as enduring keepsakes. Once roughly 1/2 inch of wax remains, soak the vessel in warm soapy water, gently wipe away remaining wax with a paper towel, and repurpose it as a luxury jewelry bowl, succulent planter, or desk organizer.',
      },
    ],
  },
  {
    category: 'Wax, Fragrances & Ingredients',
    items: [
      {
        q: 'What wax do you use in Ruhara Candles?',
        a: 'We use 100% natural pure soy wax blended with pure botanical oils. Our candles are 100% free from paraffin, petroleum derivatives, parabens, phthalates, and lead wicks. They burn clean without producing harmful toxic fumes.',
      },
      {
        q: 'Are your candles safe around pets and children?',
        a: 'Yes, because our candles are poured with pure soy wax and unbleached cotton/wooden wicks, they do not emit harsh chemical soot. However, always burn candles out of reach of curious pets and never leave an open flame unattended.',
      },
      {
        q: 'Why do pure soy candles sometimes have a frosty or textured top?',
        a: 'Slight frosting or micro-crystal texture on the surface of soy wax is a genuine hallmark of 100% pure natural soybean wax. It demonstrates that no chemical stabilizers or paraffin were added.',
      },
    ],
  },
  {
    category: 'Shipping, Delivery & Returns',
    items: [
      {
        q: 'How long does delivery take across India?',
        a: 'Orders within Delhi NCR are delivered within 1–2 business days. Deliveries to Mumbai, Bengaluru, Kolkata, Chennai, and other metro cities take 2–4 business days. Regional and non-metro destinations take 4–6 business days via our courier partners (BlueDart, Delhivery, DTDC via Shiprocket).',
      },
      {
        q: 'What if my candle vessel arrives damaged or broken in transit?',
        a: 'We pack every order in reinforced, shockproof eco-friendly honeycomb wrap. However, if transit damage ever occurs, simply WhatsApp us a photo within 48 hours of delivery and we will dispatch a replacement immediately at no extra charge.',
      },
      {
        q: 'Do you offer Cash on Delivery (COD)?',
        a: 'Yes! Cash on Delivery is available across all serviceable pincodes in India with a nominal ₹49 handling fee. Prepaid orders (UPI, Cards, Netbanking) enjoy FREE shipping above ₹999.',
      },
    ],
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<string>('0-0');

  const toggle = (id: string) => {
    setOpenIndex(openIndex === id ? '' : id);
  };

  return (
    <div className="min-h-screen bg-cream pb-24">
      {/* Header Banner */}
      <div className="bg-gradient-to-b from-cream-200/90 to-cream border-b border-gold/25 py-14 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto space-y-3">
          <Badge variant="gold" size="md">
            Help &amp; Knowledge Base
          </Badge>
          <h1 className="text-fluid-h1 font-serif font-bold text-deep">
            Frequently Asked Questions
          </h1>
          <p className="text-xs sm:text-sm text-deep/70 max-w-xl mx-auto font-light leading-relaxed">
            Everything you need to know about caring for your luxury soy candles, vessel repurposing,
            and nationwide shipping.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-10">
        {FAQS.map((section, secIdx) => (
          <div key={section.category} className="space-y-4">
            <h2 className="font-serif text-xl font-bold text-deep pb-2 border-b border-gold/25">
              {section.category}
            </h2>

            <div className="space-y-3">
              {section.items.map((item, itemIdx) => {
                const id = `${secIdx}-${itemIdx}`;
                const isOpen = openIndex === id;

                return (
                  <div
                    key={item.q}
                    className="bg-ivory rounded-2xl border border-gold/25 shadow-warm-sm overflow-hidden transition-all"
                  >
                    <button
                      onClick={() => toggle(id)}
                      className="w-full p-5 text-left flex items-center justify-between font-serif text-sm sm:text-base font-bold text-deep hover:text-primary transition-colors"
                    >
                      <span>{item.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-primary flex-shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-deep/80 font-light leading-relaxed border-t border-cream-200">
                        <p>{item.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Still have questions card */}
        <div className="bg-ivory rounded-3xl p-8 border border-gold/30 shadow-warm-sm text-center space-y-3">
          <h3 className="font-serif text-lg font-bold text-deep">Still have questions?</h3>
          <p className="text-xs text-deep/70 max-w-md mx-auto">
            Our customer care specialists are available on WhatsApp and email to assist you.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <Link href="/contact">
              <Button variant="primary" size="sm">Contact Us</Button>
            </Link>
            <a
              href="https://wa.me/919876543210?text=Hi%20Ruhara%20Candles!%20I%20have%20a%20question."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="secondary" size="sm">WhatsApp Support</Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
