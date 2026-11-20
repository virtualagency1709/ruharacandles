'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Sparkles,
  Tag,
  Truck,
  CheckCircle2,
} from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { formatPrice, getFreeShippingProgress } from '@/lib/utils';
import { DEFAULT_FRAGRANCES } from '@/data/seedData';

export default function CartDrawer() {
  const {
    items,
    isCartDrawerOpen,
    closeCartDrawer,
    removeItem,
    updateQuantity,
    updateFragrance,
    getSubtotal,
    getDiscountAmount,
    getShippingFee,
    getTotal,
    coupon,
    applyCoupon,
    removeCoupon,
  } = useCartStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{
    success?: boolean;
    message?: string;
  } | null>(null);

  if (!isCartDrawerOpen) return null;

  const subtotal = getSubtotal();
  const discount = getDiscountAmount();
  const shipping = getShippingFee();
  const total = getTotal();
  const freeShipping = getFreeShippingProgress(subtotal, 999);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;

    const res = applyCoupon(couponInput);
    setCouponFeedback(res);
    if (res.success) {
      setCouponInput('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Dimmed Backdrop */}
      <div
        className="fixed inset-0 bg-deep/60 backdrop-blur-sm transition-opacity"
        onClick={closeCartDrawer}
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-cream-50 h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-gold/20 flex items-center justify-between bg-cream-100">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-primary" />
            <h3 className="font-serif text-lg font-bold text-deep">
              Your Shopping Bag ({items.length})
            </h3>
          </div>
          <button
            onClick={closeCartDrawer}
            className="p-1.5 text-deep/60 hover:text-deep rounded-full hover:bg-cream-200"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Meter */}
        <div className="p-3.5 bg-cream-100/70 border-b border-gold/15">
          <div className="flex items-center justify-between text-xs mb-1.5 font-medium text-deep">
            <span className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-primary" />
              {freeShipping.isEligible ? (
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Yay! You unlocked FREE India-wide shipping!
                </span>
              ) : (
                <span>
                  Add <strong className="text-primary">{formatPrice(freeShipping.diff)}</strong> more for <strong>FREE Shipping</strong>
                </span>
              )}
            </span>
            <span className="text-[11px] font-bold text-primary">
              {freeShipping.percentage}%
            </span>
          </div>
          <div className="w-full bg-cream-300 h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-gold to-primary h-full rounded-full transition-all duration-500"
              style={{ width: `${freeShipping.percentage}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-4 divide-y divide-cream-200">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-20 h-20 rounded-full bg-cream-200 flex items-center justify-center border border-gold/30">
                <ShoppingBag className="w-10 h-10 text-primary/60" />
              </div>
              <div>
                <h4 className="font-serif text-lg font-semibold text-deep mb-1">
                  Your bag is empty
                </h4>
                <p className="text-xs text-deep/70 max-w-xs leading-relaxed">
                  Discover our pure soy wax candles, brass festive urlis and comforting aromas.
                </p>
              </div>
              <button
                onClick={closeCartDrawer}
                className="mt-2 px-6 py-2.5 bg-primary text-cream-50 rounded-full text-xs font-semibold tracking-wider uppercase hover:bg-primary-hover shadow-soft transition-all"
              >
                Explore Bestsellers
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={`${item.productId}-${item.selectedFragrance || 'default'}-${item.variantId || 'default'}`}
                className="py-4 flex gap-3 sm:gap-4 items-start"
              >
                {/* Thumbnail */}
                <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-cream-100 flex-shrink-0 border border-gold/20">
                  <Image
                    src={item.imageUrl || `/placeholders/${item.slug}.svg` || '/images/logo.svg'}
                    alt={item.title}
                    fill
                    unoptimized={true}
                    className="object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <Link
                      href={`/product/${item.slug}`}
                      onClick={closeCartDrawer}
                      className="text-xs sm:text-sm font-semibold text-deep hover:text-primary transition-colors line-clamp-1"
                    >
                      {item.title}
                    </Link>
                    <button
                      onClick={() => removeItem(item.productId, item.variantId, item.selectedFragrance)}
                      className="text-deep/40 hover:text-red-600 transition-colors p-1"
                      title="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {item.variantName && item.variantName !== 'Standard Edition' && (
                    <p className="text-[11px] text-deep/60 mt-0.5">
                      {item.variantName}
                    </p>
                  )}

                  {/* Selected Fragrance Display & In-Cart Changer */}
                  <div className="flex items-center gap-1.5 mt-1.5 bg-cream-100/90 px-2.5 py-1 rounded-lg border border-gold/30 w-fit">
                    <Sparkles className="w-3 h-3 text-gold shrink-0" />
                    <span className="text-[10px] font-bold text-deep/70 uppercase tracking-wider">
                      Fragrance:
                    </span>
                    <select
                      value={item.selectedFragrance || item.scent || 'Rose'}
                      onChange={(e) =>
                        updateFragrance(
                          item.productId,
                          e.target.value,
                          item.selectedFragrance || item.scent,
                          item.variantId
                        )
                      }
                      className="bg-ivory border border-gold/40 rounded text-xs font-bold text-primary px-2 py-0.5 focus:outline-none focus:border-gold cursor-pointer"
                    >
                      {(item.availableFragrances && item.availableFragrances.length > 0
                        ? item.availableFragrances
                        : DEFAULT_FRAGRANCES
                      ).map((frag) => (
                        <option key={frag} value={frag}>
                          {frag}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-2 mt-1.5">
                    <span className="text-xs sm:text-sm font-bold text-deep">
                      {formatPrice(item.price)}
                    </span>
                    {item.mrp > item.price && (
                      <span className="text-[11px] text-deep/40 line-through">
                        {formatPrice(item.mrp)}
                      </span>
                    )}
                  </div>

                  {/* Quantity Controller */}
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center border border-gold/30 rounded-lg bg-white overflow-hidden shadow-inner">
                      <button
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity - 1, item.variantId, item.selectedFragrance)
                        }
                        className="p-1 px-2 text-deep hover:bg-cream-100 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-semibold text-deep min-w-[24px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity + 1, item.variantId, item.selectedFragrance)
                        }
                        className="p-1 px-2 text-deep hover:bg-cream-100 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="text-[10px] text-deep/50">
                      Subtotal: {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout Summary */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-gold/20 bg-cream-100/90 space-y-3">
            {/* Coupon Code Input */}
            <div>
              {coupon ? (
                <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800">
                  <div className="flex items-center gap-1.5 font-medium">
                    <Tag className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Coupon <strong>{coupon.code}</strong> applied!</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-xs text-red-600 hover:underline font-semibold"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Coupon code (e.g. FESTIVE20)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="flex-1 px-3 py-2 bg-white border border-gold/30 rounded-lg text-xs text-deep uppercase tracking-wider focus:outline-none focus:border-primary"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-deep text-cream-100 rounded-lg text-xs font-semibold hover:bg-deep-dark transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}
              {couponFeedback && !coupon && (
                <p
                  className={`text-[11px] mt-1 ${
                    couponFeedback.success ? 'text-emerald-700' : 'text-red-600'
                  }`}
                >
                  {couponFeedback.message}
                </p>
              )}
            </div>

            {/* Price Breakdown */}
            <div className="space-y-1.5 text-xs text-deep/80 pt-2 border-t border-gold/15">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-deep">{formatPrice(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Discount</span>
                  <span>- {formatPrice(discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery</span>
                <span>
                  {shipping === 0 ? (
                    <span className="text-emerald-700 font-bold uppercase">FREE</span>
                  ) : (
                    formatPrice(shipping)
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-deep pt-2 border-t border-cream-300">
                <span>Total Amount (Incl. GST)</span>
                <span className="text-primary text-base font-serif">{formatPrice(total)}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 space-y-2">
              <Link
                href="/checkout"
                onClick={closeCartDrawer}
                className="w-full py-3.5 bg-primary text-cream-50 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-primary-hover shadow-soft transition-all"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/bag"
                onClick={closeCartDrawer}
                className="w-full py-2 text-center text-xs text-deep/70 hover:text-primary font-medium block"
              >
                View Full Bag &amp; Calculate Shipping
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
