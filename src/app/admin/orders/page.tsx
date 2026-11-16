'use client';

import React, { useState } from 'react';
import {
  ShoppingBag,
  Truck,
  Printer,
  Search,
  ExternalLink,
  CheckCircle2,
  Clock,
  Filter,
} from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

export default function AdminOrdersPage() {
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [orders, setOrders] = useState([
    {
      id: 'RC-948102',
      customer: 'Radhika Sharma',
      phone: '+91 98765 43210',
      address: 'Apt 402, Signature Towers, Gurugram - 122002',
      amount: 1299,
      status: 'SHIPPED',
      method: 'Razorpay',
      items: 'Royal Festive Brass Urli (Qty 1)',
      awb: 'BLUEDART-84920491',
    },
    {
      id: 'RC-948101',
      customer: 'Kunal Verma',
      phone: '+91 98111 22334',
      address: 'Flat 12B, Sea Green Apts, Worli, Mumbai - 400018',
      amount: 2499,
      status: 'PACKED',
      method: 'Prepaid',
      items: 'Grand Festive Gift Hamper (Qty 1)',
      awb: 'PENDING_AWB',
    },
    {
      id: 'RC-948100',
      customer: 'Sneha Kapur',
      phone: '+91 99887 76655',
      address: 'Villa 4, Palm Meadows, Whitefield, Bengaluru - 560066',
      amount: 699,
      status: 'CONFIRMED',
      method: 'COD',
      items: 'Peony Bloom Concrete Jar (Qty 1)',
      awb: 'NOT_ASSIGNED',
    },
  ]);

  const handleCreateShipment = (orderId: string) => {
    setOrders(
      orders.map((o) =>
        o.id === orderId
          ? { ...o, status: 'SHIPPED', awb: `SHIPROCKET-${Math.floor(100000 + Math.random() * 900000)}` }
          : o
      )
    );
  };

  const filtered = filterStatus === 'ALL' ? orders : orders.filter((o) => o.status === filterStatus);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-deep">Order Fulfillment &amp; Dispatch</h1>
          <p className="text-xs text-deep/70">
            Generate Shiprocket AWB labels, print invoices, and update order statuses.
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 px-4 py-2 bg-ivory border border-gold/30 rounded-xl text-xs font-semibold text-deep hover:bg-cream-100 shadow-sm"
        >
          <Printer className="w-4 h-4 text-primary" />
          <span>Print Packing Slips</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-gold/20">
        {['ALL', 'CONFIRMED', 'PACKED', 'SHIPPED'].map((st) => (
          <button
            key={st}
            onClick={() => setFilterStatus(st)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              filterStatus === st
                ? 'bg-deep text-cream-50'
                : 'bg-ivory text-deep/70 hover:bg-cream-100 border border-gold/25'
            }`}
          >
            {st} ({st === 'ALL' ? orders.length : orders.filter((o) => o.status === st).length})
          </button>
        ))}
      </div>

      {/* Orders Table */}
      <div className="bg-ivory rounded-2xl border border-gold/30 shadow-warm-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-cream-100/70 text-deep/70 uppercase tracking-wider text-[10px]">
              <tr className="border-b border-gold/20">
                <th className="p-4">Order ID</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Address</th>
                <th className="p-4">Items</th>
                <th className="p-4">Total</th>
                <th className="p-4">Status</th>
                <th className="p-4">Courier / AWB</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cream-100">
              {filtered.map((order) => (
                <tr key={order.id} className="hover:bg-cream-50/60">
                  <td className="p-4 font-mono font-bold text-deep">{order.id}</td>
                  <td className="p-4">
                    <span className="font-bold text-deep block">{order.customer}</span>
                    <span className="text-[10px] text-deep/60">{order.phone}</span>
                  </td>
                  <td className="p-4 max-w-xs truncate text-deep/70">{order.address}</td>
                  <td className="p-4 font-medium text-deep">{order.items}</td>
                  <td className="p-4 font-serif font-bold text-deep">{formatPrice(order.amount)}</td>
                  <td className="p-4">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        order.status === 'SHIPPED'
                          ? 'bg-blue-100 text-blue-800'
                          : order.status === 'PACKED'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-primary/15 text-primary'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4 font-mono text-[11px] text-deep/80">
                    {order.awb}
                  </td>
                  <td className="p-4">
                    {order.status !== 'SHIPPED' ? (
                      <button
                        onClick={() => handleCreateShipment(order.id)}
                        className="px-3 py-1.5 bg-primary text-cream-50 rounded-lg text-[11px] font-bold hover:bg-primary-hover flex items-center gap-1 shadow-sm"
                      >
                        <Truck className="w-3 h-3" />
                        <span>Ship</span>
                      </button>
                    ) : (
                      <span className="text-emerald-700 font-bold flex items-center gap-1 text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Dispatched
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
