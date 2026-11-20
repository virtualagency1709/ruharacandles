'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ImageIcon, Plus, Edit2 } from 'lucide-react';
import { BANNERS } from '@/data/seedData';
import { Button } from '@/components/ui/Button';

export default function AdminBannersPage() {
  const [banners, setBanners] = useState(BANNERS);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-deep">Storefront Banners &amp; Announcements</h1>
          <p className="text-xs text-deep/70">
            Control the hero carousel banners, promotional announcement messages, and sale countdowns.
          </p>
        </div>

        <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
          Upload Banner
        </Button>
      </div>

      <div className="space-y-4">
        {banners.map((b) => (
          <div
            key={b.id}
            className="bg-ivory rounded-2xl border border-gold/25 p-5 shadow-warm-sm flex flex-col md:flex-row items-center gap-6"
          >
            <div className="relative w-full md:w-56 h-32 rounded-xl overflow-hidden bg-cream-200 flex-shrink-0 border border-gold/30">
              <Image
                src={b.desktopImage}
                alt={b.title}
                fill
                unoptimized={Boolean(b.desktopImage?.endsWith('.svg'))}
                className="object-cover"
              />
            </div>
            <div className="flex-1 space-y-1.5 text-xs">
              <span className="text-[10px] font-bold text-primary uppercase tracking-wider">
                {b.section} BANNER
              </span>
              <h3 className="font-serif text-base font-bold text-deep">{b.title}</h3>
              <p className="text-deep/70 font-light">{b.subtitle}</p>
              <div className="pt-2 text-[11px] text-deep/60">
                CTA: <strong>{b.ctaText}</strong> → Link: <strong>{b.ctaLink}</strong>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
