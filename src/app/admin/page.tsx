'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  ShoppingBag,
  Package,
  Users,
  AlertTriangle,
  ArrowUpRight,
  ExternalLink,
  Clock,
  CheckCircle2,
  Truck,
} from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { PRODUCTS } from '@/data/seedData';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export default function AdminDashboardPage() {
  const [orders, setOrders] = useState([
    {
      id: 'RC-948102',
      customer: 'Radhika Sharma',
      city: 'Gurugram',
      amount: 1299,
      status: 'SHIPPED',
      method: 'Razorpay (UPI)',
      items: 'Royal Festive Brass Urli',
      date: 'Today, 2:45 PM',
    },
    {
      id: 'RC-948101',
      customer: 'Kunal Verma',
      city: 'Mumbai',
      amount: 2499,
      status: 'PACKED',
      method: 'Prepaid',
      items: 'Grand Festive Gift Hamper',
      date: 'Today, 1:12 PM',
    },
    {
      id: 'RC-948100',
      customer: 'Sneha Kapur',
      city: 'Bengaluru',
      amount: 699,
      status: 'CONFIRMED',
      method: 'COD',
      items: 'Peony Bloom Concrete Jar',
      date: 'Today, 11:30 AM',
    },
    {
      id: 'RC-948099',
      customer: 'Dr. Siddharth Rao',
      city: 'Delhi NCR',
      amount: 899,
      status: 'DELIVERED',
      method: 'Razorpay',
      items: 'Sandal Bowl [Fragrance: Sandal] (Qty 1)',
      date: 'Yesterday',
    },
  ]);

  const handleUpdateStatus = (orderId: string, newStatus: string) => {
    setOrders(
      orders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  const lowStockProducts = PRODUCTS.filter((p) =>
    p.variants.some((v) => v.stock <= 15)
  ).slice(0, 4);

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-deep">
            Executive Dashboard
          </h1>
          <p className="text-xs text-deep/70">
            Real-time sales, order fulfillment, and inventory analytics for Ruhara Candles.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/admin/products">
            <Button variant="secondary" size="sm">
              Manage Catalog
            </Button>
          </Link>
          <Link href="/admin/orders">
            <Button variant="primary" size="sm">
              Process Orders (5)
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Sales Today */}
        <div className="bg-ivory p-5 rounded-2xl border border-gold/30 shadow-warm-sm space-y-3">
          <div className="flex items-center justify-between text-xs text-deep/70">
            <span className="font-bold uppercase tracking-wider text-[10px]">Today&apos;s Revenue</span>
            <span className="text-emerald-700 font-bold flex items-center text-[11px]">
              +18.4% <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>
          <div className="font-serif text-3xl font-bold text-deep">{formatPrice(28450)}</div>
          <p className="text-[11px] text-deep/60">From 14 orders placed today</p>
        </div>

        {/* Orders Today */}
        <div className="bg-ivory p-5 rounded-2xl border border-gold/30 shadow-warm-sm space-y-3">
          <div className="flex items-center justify-between text-xs text-deep/70">
            <span className="font-bold uppercase tracking-wider text-[10px]">Orders Today</span>
            <span className="text-primary font-bold text-[11px]">4 To Pack</span>
          </div>
          <div className="font-serif text-3xl font-bold text-deep">14</div>
          <p className="text-[11px] text-deep/60">Average order dispatch in 1.4 days</p>
        </div>

        {/* AOV */}
        <div className="bg-ivory p-5 rounded-2xl border border-gold/30 shadow-warm-sm space-y-3">
          <div className="flex items-center justify-between text-xs text-deep/70">
            <span className="font-bold uppercase tracking-wider text-[10px]">Average Order Value</span>
            <span className="text-gold-dark font-bold text-[11px]">Healthy</span>
          </div>
          <div className="font-serif text-3xl font-bold text-deep">{formatPrice(1480)}</div>
          <p className="text-[11px] text-deep/60">+₹240 increase from festive hampers</p>
        </div>

        {/* Active Catalog */}
        <div className="bg-ivory p-5 rounded-2xl border border-gold/30 shadow-warm-sm space-y-3">
          <div className="flex items-center justify-between text-xs text-deep/70">
            <span className="font-bold uppercase tracking-wider text-[10px]">Active Products</span>
            <span className="text-emerald-700 font-bold text-[11px]">100% In Stock</span>
          </div>
          <div className="font-serif text-3xl font-bold text-deep">24 Items</div>
          <p className="text-[11px] text-deep/60">Across 10 curated collections</p>
        </div>
      </div>

      {/* 2 Column Section: Recent Orders Table (Left 8) + Inventory Alerts (Right 4) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Orders Table */}
        <div className="lg:col-span-8 bg-ivory rounded-2xl border border-gold/30 shadow-warm-sm p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-cream-200">
            <div>
              <h2 className="font-serif text-lg font-bold text-deep">Recent Customer Orders</h2>
              <p className="text-xs text-deep/60">Latest transactions requiring fulfillment</p>
            </div>
            <Link href="/admin/orders" className="text-xs font-semibold text-primary hover:underline">
              View All Orders →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-cream-200 text-deep/60 uppercase tracking-wider text-[10px]">
                  <th className="py-2.5">Order</th>
                  <th className="py-2.5">Customer</th>
                  <th className="py-2.5">Item</th>
                  <th className="py-2.5">Amount</th>
                  <th className="py-2.5">Status</th>
                  <th className="py-2.5">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream-100 font-medium">
                {orders.map((o) => (
                  <tr key={o.id} className="hover:bg-cream-100/50 transition-colors">
                    <td className="py-3 font-mono font-bold text-deep">{o.id}</td>
                    <td className="py-3">
                      <span className="block font-bold text-deep">{o.customer}</span>
                      <span className="text-[10px] text-deep/60">{o.city}</span>
                    </td>
                    <td className="py-3 max-w-[160px] truncate text-deep/80">{o.items}</td>
                    <td className="py-3 font-serif font-bold text-deep">{formatPrice(o.amount)}</td>
                    <td className="py-3">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          o.status === 'DELIVERED'
                            ? 'bg-emerald-100 text-emerald-800'
                            : o.status === 'SHIPPED'
                            ? 'bg-blue-100 text-blue-800'
                            : o.status === 'PACKED'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-primary/15 text-primary'
                        }`}
                      >
                        {o.status}
                      </span>
                    </td>
                    <td className="py-3">
                      <select
                        value={o.status}
                        onChange={(e) => handleUpdateStatus(o.id, e.target.value)}
                        className="bg-white border border-gold/30 rounded-lg px-2 py-1 text-[11px] text-deep focus:outline-none"
                      >
                        <option value="CONFIRMED">Confirmed</option>
                        <option value="PACKED">Packed</option>
                        <option value="SHIPPED">Shipped</option>
                        <option value="DELIVERED">Delivered</option>
                        <option value="CANCELLED">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Inventory Warning & Quick Restock */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-ivory rounded-2xl border border-gold/30 shadow-warm-sm p-6 space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-cream-200">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <h2 className="font-serif text-lg font-bold text-deep">Low Stock Alerts</h2>
            </div>

            <div className="space-y-3">
              {lowStockProducts.map((p) => {
                const stock = p.variants[0]?.stock || 0;
                return (
                  <div
                    key={p.id}
                    className="p-3 bg-cream-100/70 rounded-xl border border-gold/20 flex items-center justify-between text-xs"
                  >
                    <div className="min-w-0 pr-2">
                      <p className="font-bold text-deep truncate">{p.title}</p>
                      <p className="text-[10px] text-deep/60">{p.variants[0]?.name}</p>
                    </div>
                    <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full whitespace-nowrap">
                      {stock} left
                    </span>
                  </div>
                );
              })}
            </div>

            <Link href="/admin/products" className="block pt-2">
              <Button variant="secondary" size="sm" className="w-full">
                Update Inventory Counts
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
