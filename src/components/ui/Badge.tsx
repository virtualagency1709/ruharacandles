import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'gold' | 'sage' | 'blush' | 'primary' | 'outline' | 'ivory';
  size?: 'sm' | 'md';
}

export function Badge({
  className,
  variant = 'gold',
  size = 'md',
  children,
  ...props
}: BadgeProps) {
  const variants = {
    gold: 'bg-gold/15 text-gold-dark border border-gold/40',
    sage: 'bg-sage/15 text-sage-dark border border-sage/40',
    blush: 'bg-blush/30 text-deep border border-blush/60',
    primary: 'bg-primary text-cream-50',
    outline: 'bg-transparent text-deep/80 border border-gold/40',
    ivory: 'bg-ivory text-deep border border-cream-300 shadow-warm-sm',
  };

  const sizes = {
    sm: 'text-[9px] px-2 py-0.5 tracking-wider uppercase font-semibold',
    md: 'text-[11px] px-3 py-1 tracking-wider uppercase font-medium',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-full transition-colors font-sans select-none',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
