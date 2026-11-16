'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, ShoppingBag, Heart, Check, Sparkles, ShieldCheck, Truck } from 'lucide-react';
import { Product } from '@/types';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { formatPrice, calculateDiscount } from '@/lib/utils';
import { RatingStars } from '@/components/ui/RatingStars';
import { Button } from '@/components/ui/Button';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const { addItem } = useCartStore();
  const { toggleItem, hasItem } = useWishlistStore();

  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  if (!isOpen || !product) return null;

  const isWishlisted = hasItem(product.id);
  const variants = product.variants && product.variants.length > 0 ? product.variants : [];
  const activeVariant = variants[selectedVariantIndex] || {
    id: `v-${product.id}`,
    sku: product.sku || 'RUH-STD',
    name: 'Standard Edition',
    price: product.basePrice,
    mrp: product.baseMrp,
    stock: product.stock || 20,
  };

  const images = product.images && product.images.length > 0
    ? product.images
    : [{ id: '1', url: `/placeholders/${product.slug}.svg`, isPrimary: true, sortOrder: 1 }];

  const currentImg = images[selectedImageIndex]?.url || images[0]?.url || `/placeholders/${product.slug}.svg`;
  const discount = calculateDiscount(activeVariant.price, activeVariant.mrp);

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      variantId: activeVariant.id,
      title: product.title,
      variantName: activeVariant.name,
      slug: product.slug,
      price: activeVariant.price,
      mrp: activeVariant.mrp,
      imageUrl: currentImg,
      stock: activeVariant.stock,
      quantity: quantity,
      scent: activeVariant.scent,
      size: activeVariant.size,
    });

    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-deep/75 backdrop-blur-md transition-opacity animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative bg-cream-50 w-full max-w-3xl rounded-3xl border border-gold/35 shadow-warm-xl overflow-hidden z-10 animate-in zoom-in-95 duration-300 max-h-[90vh] flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-deep/70 hover:text-deep border border-gold/25 flex items-center justify-center transition-all shadow-sm"
          aria-label="Close Quick View"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Left: Product Images */}
        <div className="w-full md:w-1/2 p-6 bg-ivory flex flex-col justify-between border-b md:border-b-0 md:border-r border-gold/20">
          <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-cream-200/50 border border-gold/20 shadow-inner">
            <Image
              src={currentImg}
              alt={product.title}
              fill
              className="object-cover transition-all duration-300"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {discount > 0 && (
              <span className="absolute top-3 left-3 bg-sage text-cream-50 text-xs font-bold px-2.5 py-0.5 rounded-full shadow-sm">
                {discount}% OFF
              </span>
            )}
          </div>

          {/* Thumbnails if multiple images exist */}
          {images.length > 1 && (
            <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-1">
              {images.map((img, i) => (
                <button
                  key={img.id || i}
                  onClick={() => setSelectedImageIndex(i)}
                  className={`relative w-12 h-12 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                    selectedImageIndex === i ? 'border-primary ring-2 ring-primary/20 scale-105' : 'border-gold/30 opacity-70'
                  }`}
                >
                  <Image src={img.url} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Details & Purchase Actions */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto space-y-5">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-primary tracking-widest uppercase">
                {product.categoryName || 'Candles'}
              </span>
              {product.rating && (
                <RatingStars rating={product.rating} reviewCount={product.reviewCount} size="sm" />
              )}
            </div>

            <h2 className="font-serif text-xl sm:text-2xl font-bold text-deep leading-snug">
              {product.title}
            </h2>

            {/* Price Row */}
            <div className="flex items-baseline gap-2.5 pt-1">
              <span className="font-serif text-2xl font-bold text-deep">
                {formatPrice(activeVariant.price)}
              </span>
              {activeVariant.mrp > activeVariant.price && (
                <span className="text-sm text-deep/40 line-through">
                  {formatPrice(activeVariant.mrp)}
                </span>
              )}
              <span className="text-xs text-sage font-bold">Inclusive of all taxes</span>
            </div>

            <p className="text-xs text-deep/75 leading-relaxed line-clamp-3">
              {product.description}
            </p>

            {/* Variants Selector */}
            {variants.length > 1 && (
              <div className="space-y-2 pt-2">
                <label className="text-xs font-bold text-deep uppercase tracking-wider block">
                  Select Shade / Variant:
                </label>
                <div className="flex flex-wrap gap-2">
                  {variants.map((v, idx) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariantIndex(idx)}
                      className={`text-xs px-3 py-1.5 rounded-xl border transition-all ${
                        selectedVariantIndex === idx
                          ? 'border-primary bg-primary text-cream-50 font-bold shadow-sm'
                          : 'border-gold/30 bg-ivory text-deep hover:bg-cream-100'
                      }`}
                    >
                      {v.color || v.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Trust markers */}
            <div className="grid grid-cols-2 gap-2 pt-3 border-t border-gold/20 text-[11px] text-deep/70">
              <div className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-primary" />
                <span>Free shipping &gt; ₹999</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-sage" />
                <span>100% Pure Soy Wax</span>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="space-y-3 pt-3 border-t border-gold/20">
            <div className="flex items-center gap-3">
              {/* Quantity Selector */}
              <div className="flex items-center border border-gold/35 rounded-xl bg-ivory px-2 py-1 shadow-sm">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-7 h-7 text-deep font-bold hover:text-primary transition-colors flex items-center justify-center text-sm"
                >
                  -
                </button>
                <span className="w-8 text-center text-xs font-bold text-deep">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-7 h-7 text-deep font-bold hover:text-primary transition-colors flex items-center justify-center text-sm"
                >
                  +
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={addedAnimation}
                className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-warm-md transition-all ${
                  addedAnimation
                    ? 'bg-sage text-cream-50'
                    : 'bg-primary hover:bg-deep text-cream-50 active:scale-[0.98]'
                }`}
              >
                {addedAnimation ? (
                  <>
                    <Check className="w-4 h-4 text-cream-50" />
                    <span>Added to Bag!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-gold" />
                    <span>Add to Bag</span>
                  </>
                )}
              </button>

              {/* Wishlist Button */}
              <button
                onClick={() => toggleItem(product.id)}
                className={`p-3 rounded-xl border transition-all ${
                  isWishlisted
                    ? 'border-primary bg-primary text-cream-50'
                    : 'border-gold/35 bg-ivory text-deep hover:bg-white'
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-cream-50' : ''}`} />
              </button>
            </div>

            {/* View Full Product Link */}
            <Link
              href={`/product/${product.slug}`}
              onClick={onClose}
              className="block text-center text-xs font-semibold text-primary hover:underline pt-1"
            >
              View Full Product Specifications &amp; Fragrance Notes →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
