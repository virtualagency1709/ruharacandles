'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Package,
  Truck,
  CheckCircle2,
  Clock,
  ArrowRight,
  Search,
  Download,
  AlertCircle,
} from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [searchTracking, setSearchTracking] = useState('');

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('ruhara_customer_orders') || '[]');
      if (stored.length > 0) {
        setOrders(stored);
      } else {
        // Fallback sample order for realistic preview
        setOrders([
          {
            orderNumber: 'RC-948102',
            date: '2026-11-12T14:30:00Z',
            orderStatus: 'SHIPPED',
            paymentMethod: 'RAZORPAY',
            paymentStatus: 'PAID',
            total: 1299,
            courierName: 'BlueDart via Shiprocket',
            awb: 'BLUEDART-84920491',
            items: [
              {
                title: 'Royal Festive Brass Urli Candle',
                variantName: 'Antique Gold Brass / 600g',
                price: 1299,
                quantity: 1,
                imageUrl: '/placeholders/3-5in-metal-urli-candle-with-lotus-and-mogra-flower.svg',
              },
            ],
            shippingAddress: {
              fullName: 'Radhika Sharma',
              phone: '+91 98765 43210',
              street: 'Apt 402, Signature Towers, Golf Course Road',
              city: 'Gurugram',
              state: 'Haryana',
              pincode: '122002',
            },
          },
        ]);
      }
    } catch (e) {}
  }, []);

  const filteredOrders = searchTracking.trim()
    ? orders.filter(
        (o) =>
          o.orderNumber.toLowerCase().includes(searchTracking.toLowerCase()) ||
          o.awb?.toLowerCase().includes(searchTracking.toLowerCase())
      )
    : orders;

  return (
    <div className="min-h-screen bg-cream pb-24">
      {/* Header Banner */}
      <div className="bg-gradient-to-b from-cream-200/90 to-cream border-b border-gold/25 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-4">
          <nav className="flex items-center gap-2 text-xs text-deep/60 font-medium">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <Link href="/account" className="hover:text-primary">Account</Link>
            <span>/</span>
            <span className="text-deep font-semibold">Orders</span>
          </nav>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-fluid-h2 font-serif font-bold text-deep">
                Your Orders &amp; Shipments
              </h1>
              <p className="text-xs sm:text-sm text-deep/70">
                Track live courier delivery status, download invoices, and view order history.
              </p>
            </div>

            {/* Quick Search Bar */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-deep/40 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search Order # or AWB..."
                value={searchTracking}
                onChange={(e) => setSearchTracking(e.target.value)}
                className="w-full bg-ivory border border-gold/35 rounded-xl pl-9 pr-3 py-2 text-xs text-deep focus:outline-none focus:border-gold shadow-warm-sm"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        {filteredOrders.length === 0 ? (
          <div className="bg-ivory rounded-2xl p-12 text-center border border-gold/25 shadow-warm-sm space-y-3">
            <Package className="w-12 h-12 text-primary/60 mx-auto" />
            <h3 className="font-serif text-lg font-bold text-deep">No Orders Found</h3>
            <p className="text-xs text-deep/70">You haven&apos;t placed any orders yet or search query didn&apos;t match.</p>
            <Link href="/collection/all" className="inline-block pt-2">
              <Button variant="primary" size="sm">Explore Candles</Button>
            </Link>
          </div>
        ) : (
          filteredOrders.map((order, idx) => (
            <div
              key={order.orderNumber || idx}
              className="bg-ivory rounded-2xl border border-gold/30 shadow-warm-sm p-4 sm:p-6 space-y-5"
            >
              {/* Order Meta Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-cream-200">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-deep text-sm sm:text-base">
                      {order.orderNumber}
                    </span>
                    <Badge variant="gold" size="sm">
                      {order.orderStatus || 'CONFIRMED'}
                    </Badge>
                  </div>
                  <span className="text-[11px] text-deep/60 mt-0.5 block">
                    Placed on {new Date(order.date || Date.now()).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-xs text-deep/60 block">Total Amount</span>
                  <span className="font-serif text-lg font-bold text-primary">
                    {formatPrice(order.total)}
                  </span>
                </div>
              </div>

              {/* Courier Tracking Status Timeline */}
              <div className="bg-cream-100/70 p-4 rounded-xl border border-gold/20 space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold text-deep">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-primary" />
                    <span>Courier: {order.courierName || 'Shiprocket Express'}</span>
                  </div>
                  {order.awb && (
                    <span className="text-primary font-mono text-[11px]">AWB: {order.awb}</span>
                  )}
                </div>

                {/* 4-Step Progress Dots */}
                <div className="grid grid-cols-4 gap-2 pt-2 text-center">
                  <div className="space-y-1">
                    <div className="w-3 h-3 rounded-full bg-emerald-600 mx-auto" />
                    <span className="text-[10px] font-bold text-deep block">Placed</span>
                  </div>
                  <div className="space-y-1">
                    <div className="w-3 h-3 rounded-full bg-emerald-600 mx-auto" />
                    <span className="text-[10px] font-bold text-deep block">Packed</span>
                  </div>
                  <div className="space-y-1">
                    <div className={`w-3 h-3 rounded-full mx-auto ${order.orderStatus === 'SHIPPED' || order.orderStatus === 'DELIVERED' ? 'bg-emerald-600' : 'bg-cream-300'}`} />
                    <span className="text-[10px] font-bold text-deep block">In Transit</span>
                  </div>
                  <div className="space-y-1">
                    <div className={`w-3 h-3 rounded-full mx-auto ${order.orderStatus === 'DELIVERED' ? 'bg-emerald-600' : 'bg-cream-300'}`} />
                    <span className="text-[10px] font-medium text-deep/60 block">Delivered</span>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="space-y-3">
                {order.items?.map((item: any, i: number) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="relative w-14 h-16 rounded-lg overflow-hidden bg-cream-100 flex-shrink-0 border border-gold/20">
                      <Image
                        src={item.imageUrl || 'https://images.unsplash.com/photo-1608755728617-aefab37d2edd?q=80&w=800'}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-serif text-sm font-bold text-deep truncate">{item.title}</p>
                      <p className="text-[11px] text-primary font-bold">
                        Fragrance: {item.selectedFragrance || item.fragrance || item.scent || 'Rose'}
                      </p>
                      <p className="text-xs text-deep/80 mt-0.5">
                        Qty: {item.quantity} × {formatPrice(item.price)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Delivery Address & Actions */}
              <div className="pt-4 border-t border-cream-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-deep/70">
                <div>
                  <span className="font-semibold text-deep block">Ship to:</span>
                  <p>{order.shippingAddress?.fullName}, {order.shippingAddress?.street}, {order.shippingAddress?.city} - {order.shippingAddress?.pincode}</p>
                </div>

                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 text-primary hover:underline font-semibold"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Invoice</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
