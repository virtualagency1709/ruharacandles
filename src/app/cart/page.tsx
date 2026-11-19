'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Sparkles,
  Tag,
  Truck,
  CheckCircle2,
  Gift,
  ShieldCheck,
  RotateCcw,
} from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { formatPrice, getFreeShippingProgress } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { DEFAULT_FRAGRANCES } from '@/data/seedData';

export default function CartPage() {
  const {
    items,
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

  const [couponCode, setCouponCode] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ success?: boolean; message?: string } | null>(null);
  const [giftWrap, setGiftWrap] = useState(false);
  const [giftNote, setGiftNote] = useState('');

  const subtotal = getSubtotal();
  const discount = getDiscountAmount();
  const shipping = getShippingFee();
  const giftWrapFee = giftWrap ? 49 : 0;
  const total = getTotal() + giftWrapFee;
  const freeShipping = getFreeShippingProgress(subtotal, 999);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;

    const res = applyCoupon(couponCode);
    setCouponFeedback(res);
    if (res.success) {
      setCouponCode('');
    }
  };

  return (
    <div className="min-h-screen bg-cream pb-24">
      {/* Header Banner */}
      <div className="bg-gradient-to-b from-cream-200/90 to-cream border-b border-gold/25 py-10 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-2xl mx-auto space-y-2">
          <h1 className="text-fluid-h2 font-serif font-bold text-deep">
            Your Shopping Bag
          </h1>
          <p className="text-xs sm:text-sm text-deep/70">
            {items.length === 0
              ? 'Your cart is currently empty'
              : `You have ${items.length} ${items.length === 1 ? 'item' : 'items'} in your bag`}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {items.length === 0 ? (
          <div className="bg-ivory rounded-2xl p-12 text-center border border-gold/25 shadow-warm-sm max-w-lg mx-auto space-y-4 my-8">
            <div className="w-20 h-20 rounded-full bg-cream-100 flex items-center justify-center mx-auto text-primary">
              <ShoppingBag className="w-10 h-10" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-deep">
              Your bag is craving some warmth
            </h2>
            <p className="text-xs sm:text-sm text-deep/70 max-w-xs mx-auto leading-relaxed">
              Discover our pure soy wax candles, festive brass urlis, and calming home fragrances.
            </p>
            <Link href="/collection/all" className="inline-block pt-2">
              <Button variant="primary" size="md">
                Explore Best Sellers
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left 2 Cols: Cart Items & Free Shipping Progress */}
            <div className="lg:col-span-2 space-y-6">
              {/* Free Shipping Meter */}
              <div className="bg-ivory rounded-2xl p-4 sm:p-5 border border-gold/30 shadow-warm-sm space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-deep">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-primary" />
                    {freeShipping.isEligible ? (
                      <span className="text-emerald-800 flex items-center gap-1 font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        Congratulations! You have unlocked FREE India Delivery!
                      </span>
                    ) : (
                      <span>
                        Add <strong className="text-primary">{formatPrice(freeShipping.diff)}</strong> more for <strong>FREE Delivery</strong>
                      </span>
                    )}
                  </div>
                  <span className="text-primary font-bold">{freeShipping.percentage}%</span>
                </div>
                <div className="w-full bg-cream-200 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-gold to-primary h-full rounded-full transition-all duration-500"
                    style={{ width: `${freeShipping.percentage}%` }}
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="bg-ivory rounded-2xl border border-gold/25 shadow-warm-sm divide-y divide-cream-200 overflow-hidden">
                {items.map((item) => (
                  <div
                    key={`${item.productId}-${item.selectedFragrance || 'default'}-${item.variantId || 'default'}`}
                    className="p-4 sm:p-6 flex gap-4 sm:gap-6 items-start"
                  >
                    {/* Thumbnail */}
                    <div className="relative w-20 h-24 sm:w-24 sm:h-28 rounded-xl overflow-hidden bg-cream-100 flex-shrink-0 border border-gold/20 shadow-inner">
                      <Image
                        src={item.imageUrl || `/placeholders/${item.slug}.svg` || '/logo.png'}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <Link
                            href={`/product/${item.slug}`}
                            className="font-serif text-sm sm:text-base font-bold text-deep hover:text-primary transition-colors line-clamp-1"
                          >
                            {item.title}
                          </Link>
                          {item.variantName && item.variantName !== 'Standard Edition' && (
                            <p className="text-xs text-deep/60 mt-0.5">{item.variantName}</p>
                          )}
                        </div>
                        <button
                          onClick={() => removeItem(item.productId, item.variantId, item.selectedFragrance)}
                          className="text-deep/40 hover:text-red-600 p-1 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Selected Fragrance Display & In-Cart Changer */}
                      <div className="flex items-center gap-2 bg-cream-100/90 px-3 py-1.5 rounded-xl border border-gold/30 w-fit">
                        <Sparkles className="w-3.5 h-3.5 text-gold shrink-0" />
                        <span className="text-xs font-bold text-deep/80 uppercase tracking-wider">
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
                          className="bg-ivory border border-gold/40 rounded-lg text-xs font-bold text-primary px-2 py-0.5 focus:outline-none focus:border-gold cursor-pointer"
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

                      {/* Pricing */}
                      <div className="flex items-baseline gap-2">
                        <span className="font-serif text-base sm:text-lg font-bold text-deep">
                          {formatPrice(item.price)}
                        </span>
                        {item.mrp > item.price && (
                          <span className="text-xs text-deep/40 line-through">
                            {formatPrice(item.mrp)}
                          </span>
                        )}
                      </div>

                      {/* Quantity & Subtotal */}
                      <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 pt-1">
                        <div className="flex items-center border border-gold/40 rounded-lg bg-white overflow-hidden shadow-inner">
                          <button
                            onClick={() =>
                              updateQuantity(item.productId, item.quantity - 1, item.variantId, item.selectedFragrance)
                            }
                            className="p-1 px-2.5 text-deep hover:bg-cream-100 transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 text-xs font-bold text-deep min-w-[28px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.productId, item.quantity + 1, item.variantId, item.selectedFragrance)
                            }
                            className="p-1 px-2.5 text-deep hover:bg-cream-100 transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="text-xs font-semibold text-deep">
                          Item Total: {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Gift Options */}
              <div className="bg-ivory rounded-2xl p-5 border border-gold/25 shadow-warm-sm space-y-3">
                <label className="flex items-center gap-2.5 text-xs font-bold text-deep cursor-pointer">
                  <input
                    type="checkbox"
                    checked={giftWrap}
                    onChange={(e) => setGiftWrap(e.target.checked)}
                    className="rounded text-primary focus:ring-primary accent-primary w-4 h-4"
                  />
                  <Gift className="w-4 h-4 text-gold" />
                  <span>Add Luxury Gift Box &amp; Satin Ribbon (+₹49)</span>
                </label>

                {giftWrap && (
                  <div className="pt-2">
                    <textarea
                      placeholder="Add handwritten gift message for the recipient..."
                      value={giftNote}
                      onChange={(e) => setGiftNote(e.target.value)}
                      rows={2}
                      className="w-full bg-white border border-gold/30 rounded-xl p-3 text-xs text-deep focus:outline-none focus:border-gold"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Right Col: Order Summary & Checkout Card */}
            <div className="space-y-6">
              <div className="bg-ivory rounded-2xl p-6 border border-gold/30 shadow-warm-sm space-y-5 sticky top-28">
                <h3 className="font-serif text-lg font-bold text-deep pb-3 border-b border-cream-200">
                  Order Summary
                </h3>

                {/* Coupon Form */}
                <div>
                  {coupon ? (
                    <div className="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800">
                      <div className="flex items-center gap-1.5 font-semibold">
                        <Tag className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Code <strong>{coupon.code}</strong> Applied</span>
                      </div>
                      <button
                        onClick={removeCoupon}
                        className="text-xs text-red-600 font-bold hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="space-y-1.5">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Coupon Code (e.g. FESTIVE20)"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          className="flex-1 bg-white border border-gold/35 rounded-xl px-3 py-2 text-xs uppercase tracking-wider text-deep focus:outline-none focus:border-gold"
                        />
                        <button
                          type="submit"
                          className="px-4 py-2 bg-deep text-cream-50 rounded-xl text-xs font-bold hover:bg-deep-dark transition-colors"
                        >
                          Apply
                        </button>
                      </div>
                      {couponFeedback && (
                        <p className={`text-[11px] ${couponFeedback.success ? 'text-emerald-700' : 'text-red-600'}`}>
                          {couponFeedback.message}
                        </p>
                      )}
                    </form>
                  )}
                </div>

                {/* Calculation Rows */}
                <div className="space-y-2.5 text-xs text-deep/80 pt-2 border-t border-cream-200">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-deep">{formatPrice(subtotal)}</span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-semibold">
                      <span>Discount</span>
                      <span>- {formatPrice(discount)}</span>
                    </div>
                  )}

                  {giftWrap && (
                    <div className="flex justify-between">
                      <span>Gift Wrapping</span>
                      <span>{formatPrice(49)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Shipping Charges</span>
                    <span>
                      {shipping === 0 ? (
                        <span className="text-emerald-700 font-bold">FREE</span>
                      ) : (
                        formatPrice(shipping)
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between text-base font-bold text-deep pt-3 border-t border-cream-300">
                    <span>Estimated Total</span>
                    <span className="font-serif text-xl text-primary">{formatPrice(total)}</span>
                  </div>
                  <p className="text-[10px] text-deep/50 text-right">Tax included</p>
                </div>

                {/* Checkout CTA */}
                <Link href="/checkout" className="block pt-2">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full"
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    Proceed to Checkout
                  </Button>
                </Link>

                <div className="pt-2 space-y-2 text-[11px] text-deep/70 border-t border-cream-200">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-primary" />
                    <span>100% Encrypted Payment with Razorpay</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <RotateCcw className="w-4 h-4 text-primary" />
                    <span>Transit Damage Free Replacement Guarantee</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
