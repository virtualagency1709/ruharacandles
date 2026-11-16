import React from 'react';
import { cn } from '@/lib/utils';
import { Sparkles, Flame } from 'lucide-react';

interface RotatingSealProps {
  className?: string;
  size?: number;
  text?: string;
}

export function RotatingSeal({
  className,
  size = 100,
  text = 'HANDMADE • 100% PURE SOY WAX • RUHARA CANDLES •',
}: RotatingSealProps) {
  const radius = 38;
  const pathLength = 2 * Math.PI * radius;

  return (
    <div
      style={{ width: size, height: size }}
      className={cn('relative flex items-center justify-center select-none', className)}
    >
      {/* Outer subtle gold border */}
      <div className="absolute inset-1 rounded-full border border-gold/30 bg-ivory/80 backdrop-blur-sm shadow-warm-sm" />

      {/* Rotating Circular Text */}
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full animate-spin-slow origin-center"
      >
        <defs>
          <path
            id="sealCirclePath"
            d={`M 50,50 m -${radius},0 a ${radius},${radius} 0 1,1 ${radius * 2},0 a ${radius},${radius} 0 1,1 -${radius * 2},0`}
          />
        </defs>
        <text
          fontSize="9.2"
          fontWeight="600"
          letterSpacing="2.8"
          fill="#3B2412"
          className="font-sans uppercase"
        >
          <textPath href="#sealCirclePath" startOffset="0%">
            {text}
          </textPath>
        </text>
      </svg>

      {/* Center Icon */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-8 h-8 rounded-full bg-cream-100 border border-gold/40 flex items-center justify-center shadow-inner">
          <Flame className="w-4 h-4 text-primary fill-gold" />
        </div>
      </div>
    </div>
  );
}
