'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ArchImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: 'portrait' | 'square' | 'tall';
  priority?: boolean;
  showGlow?: boolean;
  showOffsetBorder?: boolean;
  children?: React.ReactNode;
}

export function ArchImage({
  src,
  alt,
  className,
  aspectRatio = 'portrait',
  priority = false,
  showGlow = false,
  showOffsetBorder = true,
  children,
}: ArchImageProps) {
  const aspectClasses = {
    portrait: 'aspect-[3.6/4.8]',
    square: 'aspect-square',
    tall: 'aspect-[3.4/5.2]',
  };

  return (
    <div className={cn('relative flex items-center justify-center', className)}>
      {/* Warm Ambient Flame Glow behind arch */}
      {showGlow && (
        <div className="absolute inset-0 max-w-sm max-h-96 mx-auto rounded-full bg-gradient-to-t from-gold/30 via-gold-light/20 to-transparent blur-3xl flame-pulse pointer-events-none -z-10" />
      )}

      {/* Offset Floating Gold Arch Outline */}
      {showOffsetBorder && (
        <div className="absolute -inset-3 sm:-inset-4 arch-mask border border-gold/40 -rotate-1 pointer-events-none transition-transform duration-700 -z-10" />
      )}

      {/* Main Arch-Masked Image Container */}
      <div
        className={cn(
          'relative w-full overflow-hidden arch-mask border-2 border-gold/40 shadow-warm-lg bg-cream-50 group',
          aspectClasses[aspectRatio]
        )}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Ambient warm gradient vignette at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-deep/50 via-transparent to-transparent pointer-events-none" />

        {/* Optional Inner Overlay Children */}
        {children && <div className="absolute inset-0 z-10">{children}</div>}
      </div>
    </div>
  );
}
