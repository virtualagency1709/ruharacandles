import React from 'react';
import { cn, formatPrice, calculateDiscount } from '@/lib/utils';
import { Badge } from './Badge';

interface PriceDisplayProps {
  price: number;
  mrp: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showBadge?: boolean;
  className?: string;
}

export function PriceDisplay({
  price,
  mrp,
  size = 'md',
  showBadge = true,
  className,
}: PriceDisplayProps) {
  const discount = calculateDiscount(price, mrp);

  const priceSizes = {
    sm: 'text-sm font-semibold',
    md: 'text-base font-bold',
    lg: 'text-xl sm:text-2xl font-bold font-serif',
    xl: 'text-2xl sm:text-3xl font-bold font-serif',
  };

  const mrpSizes = {
    sm: 'text-xs',
    md: 'text-xs sm:text-sm',
    lg: 'text-sm sm:text-base',
    xl: 'text-base',
  };

  return (
    <div className={cn('flex items-baseline flex-wrap gap-2', className)}>
      {/* Selling Price */}
      <span className={cn('text-deep', priceSizes[size])}>
        {formatPrice(price)}
      </span>

      {/* MRP */}
      {mrp > price && (
        <span
          className={cn(
            'text-deep/45 line-through decoration-deep/40 font-normal',
            mrpSizes[size]
          )}
        >
          {formatPrice(mrp)}
        </span>
      )}

      {/* Discount Badge */}
      {showBadge && discount > 0 && (
        <Badge variant="sage" size="sm" className="font-bold">
          {discount}% OFF
        </Badge>
      )}
    </div>
  );
}
