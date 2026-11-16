'use client';

import React from 'react';
import Image from 'next/image';
import { Layers, Plus, Edit2 } from 'lucide-react';
import { CATEGORIES } from '@/data/seedData';
import { Button } from '@/components/ui/Button';

export default function AdminCategoriesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-deep">Collections &amp; Categories</h1>
          <p className="text-xs text-deep/70">
            Manage your store navigation hierarchy and featured category tiles.
          </p>
        </div>

        <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
          Add Category
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CATEGORIES.map((cat) => (
          <div
            key={cat.id}
            className="bg-ivory rounded-2xl border border-gold/25 p-4 shadow-warm-sm flex items-center gap-4"
          >
            <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-cream-200 flex-shrink-0 border border-gold/30">
              <Image src={cat.imageUrl || ''} alt={cat.name} fill className="object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-serif text-base font-bold text-deep truncate">{cat.name}</h3>
              <p className="text-[11px] text-deep/60 mt-0.5 line-clamp-1">{cat.slug}</p>
              <span className="text-[10px] text-emerald-700 font-bold">Featured on Home</span>
            </div>
            <button className="p-2 text-deep/50 hover:text-primary">
              <Edit2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
