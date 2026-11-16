import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format price in Indian Rupee format (e.g. ₹1,499)
 */
export function formatPrice(price: number | string): string {
  const num = typeof price === 'string' ? parseFloat(price) : price;
  if (isNaN(num)) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(num);
}

/**
 * Calculate percentage discount between MRP and selling price
 */
export function calculateDiscount(price: number, mrp: number): number {
  if (mrp <= 0 || price >= mrp) return 0;
  return Math.round(((mrp - price) / mrp) * 100);
}

/**
 * Slugify text
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

/**
 * Calculate free shipping remaining amount
 */
export function getFreeShippingProgress(currentSubtotal: number, threshold = 999) {
  const diff = threshold - currentSubtotal;
  const percentage = Math.min(100, Math.round((currentSubtotal / threshold) * 100));
  return {
    diff: Math.max(0, diff),
    isEligible: diff <= 0,
    percentage,
  };
}
