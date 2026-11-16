'use client';

import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'gold' | 'outline' | 'ghost' | 'sage';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'icon';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  shimmer?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      shimmer = true,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'relative inline-flex items-center justify-center font-sans font-medium tracking-wider uppercase transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:ring-offset-2 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100 select-none';

    const variants = {
      primary: cn(
        'bg-deep text-cream-50 hover:bg-deep-dark border border-deep shadow-warm-md hover:shadow-warm-hover',
        shimmer && 'btn-shimmer'
      ),
      secondary:
        'bg-ivory text-deep border border-gold/40 hover:border-gold hover:bg-cream-100 shadow-warm-sm hover:shadow-warm-md',
      gold: cn(
        'gold-gradient-bg text-deep-dark font-semibold shadow-gold-glow hover:brightness-105 border border-gold-light/40',
        shimmer && 'btn-shimmer'
      ),
      outline:
        'bg-transparent text-deep border border-deep/40 hover:border-deep hover:bg-deep/5',
      ghost:
        'bg-transparent text-deep hover:bg-cream-200/50 hover:text-primary',
      sage:
        'bg-sage text-cream-50 hover:bg-sage-dark shadow-warm-sm',
    };

    const sizes = {
      sm: 'text-[10px] py-2 px-3.5 rounded-full gap-1.5',
      md: 'text-xs py-3 px-6 rounded-full gap-2',
      lg: 'text-xs sm:text-sm py-4 px-8 rounded-full gap-2.5',
      xl: 'text-sm py-5 px-10 rounded-full gap-3 font-semibold tracking-widest',
      icon: 'p-2.5 rounded-full',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          leftIcon && <span className="flex-shrink-0">{leftIcon}</span>
        )}
        <span>{children}</span>
        {!isLoading && rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
