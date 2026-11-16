'use client';

import React, { useState } from 'react';
import { Star, CheckCircle2, XCircle, Sparkles } from 'lucide-react';
import { REVIEWS } from '@/data/seedData';
import { RatingStars } from '@/components/ui/RatingStars';

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState(REVIEWS);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold text-deep">Customer Reviews Moderation</h1>
        <p className="text-xs text-deep/70">
          Review customer testimonials, star ratings, and photo feedback before displaying live.
        </p>
      </div>

      <div className="space-y-4">
        {reviews.map((r) => (
          <div
            key={r.id}
            className="bg-ivory rounded-2xl border border-gold/25 p-5 shadow-warm-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2">
                <RatingStars rating={r.rating} size="sm" showCount={false} />
                <span className="font-bold text-deep text-xs">{r.authorName}</span>
                <span className="text-[10px] text-deep/50">• {r.createdAt}</span>
              </div>
              <h4 className="font-serif text-sm font-bold text-deep">{r.title}</h4>
              <p className="text-xs text-deep/75 leading-relaxed font-light">{r.comment}</p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] text-emerald-800 bg-emerald-100 font-bold px-3 py-1 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Approved
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
