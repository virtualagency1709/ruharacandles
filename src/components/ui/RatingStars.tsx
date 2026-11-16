import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RatingStarsProps {
  rating?: number;
  reviewCount?: number;
  size?: 'sm' | 'md';
  showCount?: boolean;
  className?: string;
}

export function RatingStars({
  rating = 5,
  reviewCount,
  size = 'md',
  showCount = true,
  className,
}: RatingStarsProps) {
  const starSizes = {
    sm: 'w-3 h-3',
    md: 'w-3.5 h-3.5',
  };

  return (
    <div className={cn('inline-flex items-center gap-1.5 select-none', className)}>
      <div className="flex items-center text-gold">
        {[1, 2, 3, 4, 5].map((star) => {
          const isFilled = rating >= star;
          const isPartial = !isFilled && rating > star - 1;

          return (
            <Star
              key={star}
              className={cn(
                starSizes[size],
                isFilled
                  ? 'fill-gold text-gold'
                  : isPartial
                  ? 'fill-gold/50 text-gold'
                  : 'text-gold/30'
              )}
            />
          );
        })}
      </div>

      {showCount && (
        <span className="text-[11px] font-medium text-deep/70">
          <strong className="text-deep font-semibold">{rating.toFixed(1)}</strong>
          {reviewCount !== undefined && ` (${reviewCount})`}
        </span>
      )}
    </div>
  );
}
