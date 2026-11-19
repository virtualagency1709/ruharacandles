'use client';

import React from 'react';
import { Sparkles, Check, AlertCircle, Wind } from 'lucide-react';
import { DEFAULT_FRAGRANCES } from '@/data/seedData';

interface FragranceSelectorProps {
  availableFragrances?: string[];
  fragranceAvailability?: Record<string, boolean>;
  selectedFragrance: string;
  onSelectFragrance: (fragrance: string) => void;
  error?: string | null;
  className?: string;
}

// Subtle luxury descriptors & accent colors for the 5 signature fragrances
const FRAGRANCE_DETAILS: Record<string, { desc: string; accent: string }> = {
  Rose: { desc: 'Damask Rose & Floral Notes', accent: '#D9777F' },
  Lavender: { desc: 'French Calming Lavender', accent: '#8E7DBE' },
  'Ocean Breeze': { desc: 'Crisp Marine Sea Salt', accent: '#5A9BB5' },
  Sandal: { desc: 'Sacred Mysore Sandalwood', accent: '#C88A3B' },
  Jasmine: { desc: 'Madurai Night Jasmine', accent: '#D8A94A' },
};

export default function FragranceSelector({
  availableFragrances = [...DEFAULT_FRAGRANCES],
  fragranceAvailability = {},
  selectedFragrance,
  onSelectFragrance,
  error,
  className = '',
}: FragranceSelectorProps) {
  const fragrances =
    availableFragrances && availableFragrances.length > 0
      ? availableFragrances
      : [...DEFAULT_FRAGRANCES];

  return (
    <div className={`space-y-3 pt-2 ${className}`}>
      {/* Header & Sub-label */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <h3 className="font-serif text-sm sm:text-base font-bold text-deep tracking-tight">
              Choose Your Fragrance
            </h3>
            <span className="text-[10px] font-bold text-red-600 ml-1 uppercase tracking-wider">
              * Required
            </span>
          </div>
          <p className="text-[11px] sm:text-xs text-deep/70 font-light mt-0.5">
            Select your preferred fragrance
          </p>
        </div>

        {selectedFragrance && (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full border border-primary/20 animate-in fade-in">
            <Check className="w-3 h-3 text-primary" />
            <span>{selectedFragrance}</span>
          </span>
        )}
      </div>

      {/* Validation Error Message */}
      {error && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs animate-in fade-in slide-in-from-top-1 duration-200">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          <span className="font-medium">{error}</span>
        </div>
      )}

      {/* Fragrance Options Grid / Horizontal Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-2.5">
        {fragrances.map((fragrance) => {
          const isSelected = selectedFragrance === fragrance;
          // Check if disabled by admin
          const isAvailable =
            fragranceAvailability[fragrance] !== false &&
            fragranceAvailability[fragrance] !== undefined
              ? fragranceAvailability[fragrance]
              : true;

          const details = FRAGRANCE_DETAILS[fragrance] || {
            desc: 'Artisanal Essential Aroma',
            accent: '#D8A94A',
          };

          return (
            <button
              key={fragrance}
              type="button"
              disabled={!isAvailable}
              onClick={() => onSelectFragrance(fragrance)}
              className={`relative p-3 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between min-h-[72px] sm:min-h-[80px] shadow-sm ${
                !isAvailable
                  ? 'opacity-40 cursor-not-allowed bg-cream-200/50 border-gray-300'
                  : isSelected
                  ? 'bg-deep text-cream-50 border-gold shadow-warm-md scale-[1.02] ring-1 ring-gold'
                  : 'bg-ivory hover:bg-cream-100 text-deep border-gold/35 hover:border-gold'
              }`}
            >
              {/* Top Row: Fragrance Name & Selected Check */}
              <div className="flex items-start justify-between gap-1">
                <span
                  className={`font-serif text-xs sm:text-sm font-bold block leading-snug ${
                    isSelected ? 'text-cream-50' : 'text-deep'
                  }`}
                >
                  {fragrance}
                </span>

                <div
                  className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 border ${
                    isSelected
                      ? 'bg-gold border-gold text-deep'
                      : 'border-gold/40 bg-white/50'
                  }`}
                >
                  {isSelected ? (
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  ) : (
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: details.accent }}
                    />
                  )}
                </div>
              </div>

              {/* Bottom Row: Descriptor / Status */}
              <div className="mt-1 pt-1 border-t border-cream-200/30">
                {!isAvailable ? (
                  <span className="text-[10px] text-red-500 font-medium">Out of Stock</span>
                ) : (
                  <span
                    className={`text-[10px] block truncate ${
                      isSelected ? 'text-cream-200/80' : 'text-deep/60'
                    }`}
                  >
                    {details.desc}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
