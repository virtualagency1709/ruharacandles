'use client';

import React, { useState } from 'react';
import { Settings, Save, CheckCircle2, ShieldCheck, Truck, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-deep">Store Configuration &amp; Credentials</h1>
          <p className="text-xs text-deep/70">
            Manage your Razorpay API keys, Shiprocket courier integration, and store operational parameters.
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Shipping & Thresholds */}
        <div className="bg-ivory rounded-2xl border border-gold/30 p-6 shadow-warm-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-cream-200">
            <Truck className="w-4 h-4 text-primary" />
            <h2 className="font-serif text-base font-bold text-deep">Shipping Rules (Shiprocket)</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="space-y-1">
              <label className="font-semibold text-deep/80">Free Shipping Threshold (₹)</label>
              <input
                type="number"
                defaultValue={999}
                className="w-full bg-white border border-gold/35 rounded-xl px-3 py-2 text-deep font-bold"
              />
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-deep/80">Flat Courier Rate (₹)</label>
              <input
                type="number"
                defaultValue={79}
                className="w-full bg-white border border-gold/35 rounded-xl px-3 py-2 text-deep font-bold"
              />
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-deep/80">COD Handling Fee (₹)</label>
              <input
                type="number"
                defaultValue={49}
                className="w-full bg-white border border-gold/35 rounded-xl px-3 py-2 text-deep font-bold"
              />
            </div>
          </div>
        </div>

        {/* Razorpay Payment Gateway */}
        <div className="bg-ivory rounded-2xl border border-gold/30 p-6 shadow-warm-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-cream-200">
            <CreditCard className="w-4 h-4 text-primary" />
            <h2 className="font-serif text-base font-bold text-deep">Razorpay Gateway Integration</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="font-semibold text-deep/80">Key ID</label>
              <input
                type="text"
                defaultValue="rzp_test_RuharaCandlesTestKey"
                className="w-full bg-white border border-gold/35 rounded-xl px-3 py-2 text-deep font-mono"
              />
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-deep/80">Key Secret</label>
              <input
                type="password"
                defaultValue="••••••••••••••••"
                className="w-full bg-white border border-gold/35 rounded-xl px-3 py-2 text-deep font-mono"
              />
            </div>
          </div>
        </div>

        {/* Save button */}
        <div className="flex items-center gap-3">
          <Button type="submit" variant="primary" size="md" leftIcon={<Save className="w-4 h-4" />}>
            Save Store Settings
          </Button>
          {saved && (
            <span className="text-xs text-emerald-800 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Settings Saved Successfully!
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
