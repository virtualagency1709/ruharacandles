'use client';

import React, { useState } from 'react';
import { Tag, Plus, CheckCircle2 } from 'lucide-react';
import { COUPONS } from '@/data/seedData';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState(COUPONS);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-deep">Coupons &amp; Promotional Offers</h1>
          <p className="text-xs text-deep/70">
            Create discount codes, minimum order value requirements, and free shipping triggers.
          </p>
        </div>

        <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
          Create New Coupon
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {coupons.map((c) => (
          <div
            key={c.code}
            className="bg-ivory rounded-2xl border border-gold/30 p-5 shadow-warm-sm space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono font-bold text-sm bg-primary text-cream-50 px-3 py-1 rounded-lg">
                {c.code}
              </span>
              <span className="text-[10px] text-emerald-800 font-bold bg-emerald-100 px-2 py-0.5 rounded-full">
                Active
              </span>
            </div>

            <p className="text-xs text-deep/80 leading-relaxed font-light">{c.description}</p>

            <div className="pt-2 border-t border-cream-200 text-[11px] text-deep/60 space-y-1">
              <div>Type: <strong>{c.type}</strong></div>
              <div>Min Order Value: <strong>{c.minOrderValue ? formatPrice(c.minOrderValue) : 'None'}</strong></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
