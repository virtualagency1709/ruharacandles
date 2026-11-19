'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  Package,
  Truck,
  ArrowRight,
  Sparkles,
  PhoneCall,
  Download,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { formatPrice } from '@/lib/utils';
import confetti from 'canvas-confetti';

interface OrderConfirmationPageProps {
  params: {
    orderNumber: string;
  };
}

export default function OrderConfirmationPage({ params }: OrderConfirmationPageProps) {
  const { orderNumber } = params;
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    // Trigger celebratory confetti burst
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D8A94A', '#8B5A2B', '#7A8B6A', '#E9CDB9'],
      });
    } catch (e) {}

    // Retrieve order details from localStorage if present
    try {
      const orders = JSON.parse(localStorage.getItem('ruhara_customer_orders') || '[]');
      const found = orders.find((o: any) => o.orderNumber === orderNumber);
      if (found) {
        setOrder(found);
      }
    } catch (e) {}
  }, [orderNumber]);

  return (
    <div className="min-h-screen bg-cream py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Success Card */}
        <div className="bg-ivory rounded-3xl p-8 sm:p-12 border border-gold/30 shadow-warm-lg text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-emerald-100/70 border border-emerald-300 flex items-center justify-center mx-auto text-emerald-700 animate-in zoom-in-75 duration-300">
            <CheckCircle2 className="w-12 h-12" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold text-primary tracking-widest uppercase">
              Thank You For Your Order
            </span>
            <h1 className="text-fluid-h2 font-serif font-bold text-deep">
              Order Confirmed!
            </h1>
            <p className="text-sm text-deep/70 max-w-md mx-auto leading-relaxed">
              We have received your order and are carefully preparing your handcrafted candles at our Delhi NCR studio.
            </p>
          </div>

          <div className="p-4 bg-cream-100 rounded-2xl border border-gold/25 inline-flex items-center gap-3">
            <Package className="w-5 h-5 text-primary" />
            <div className="text-left">
              <span className="text-[10px] uppercase tracking-wider text-deep/60 block">Order Reference</span>
              <span className="font-mono font-bold text-deep text-sm">{orderNumber}</span>
            </div>
          </div>

          {/* Ordered Items with Selected Fragrance */}
          {order?.items && order.items.length > 0 && (
            <div className="pt-4 border-t border-cream-200 text-left space-y-3">
              <h3 className="font-serif text-xs font-bold text-deep uppercase tracking-wider">
                Ordered Candles ({order.items.length})
              </h3>
              <div className="space-y-2">
                {order.items.map((item: any, idx: number) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-xl bg-cream-100/60 border border-gold/25 text-xs"
                  >
                    <div>
                      <span className="font-semibold text-deep block">{item.title}</span>
                      <span className="text-[11px] text-primary font-bold">
                        Fragrance: {item.selectedFragrance || item.fragrance || item.scent || 'Rose'} • Qty: {item.quantity}
                      </span>
                    </div>
                    <span className="font-serif font-bold text-deep">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Delivery & WhatsApp updates notice */}
          <div className="pt-4 border-t border-cream-200 text-left space-y-3 text-xs text-deep/80">
            <div className="flex items-center gap-2 text-emerald-800 font-semibold">
              <Truck className="w-4 h-4 text-emerald-600" />
              <span>Estimated Delivery: Within 3–5 Business Days</span>
            </div>
            <p className="text-deep/70 leading-relaxed font-light">
              You will receive automated tracking link and AWB dispatch alerts via WhatsApp &amp; Email as soon as your shipment is dispatched via Shiprocket.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/account/orders" className="flex-1">
              <Button variant="primary" size="md" className="w-full">
                Track Order Status
              </Button>
            </Link>
            <Link href="/collection/all" className="flex-1">
              <Button variant="secondary" size="md" className="w-full">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
