'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingBag, Eye, Sparkles } from 'lucide-react';
import { Product } from '@/types';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { formatPrice, calculateDiscount } from '@/lib/utils';
import { RatingStars } from '@/components/ui/RatingStars';
import { Badge } from '@/components/ui/Badge';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { addItem } = useCartStore();
  const { toggleItem, hasItem } = useWishlistStore();

  const isWishlisted = hasItem(product.id);
  const primaryImg = product.images[0]?.url || 'https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=800';
  const hoverImg = product.images[1]?.url || primaryImg;
  const discount = calculateDiscount(product.basePrice, product.baseMrp);

  const defaultVariant = product.variants[0];
  const totalStock = product.variants.reduce((acc, v) => acc + v.stock, 0);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      productId: product.id,
      variantId: defaultVariant?.id,
      title: product.title,
      variantName: defaultVariant?.name,
      slug: product.slug,
      price: defaultVariant?.price ? Number(defaultVariant.price) : product.basePrice,
      mrp: defaultVariant?.mrp ? Number(defaultVariant.mrp) : product.baseMrp,
      imageUrl: primaryImg,
      stock: defaultVariant?.stock || 10,
      scent: defaultVariant?.scent,
      size: defaultVariant?.size,
      quantity: 1,
    });
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem(product.id);
  };

  return (
    <div
      className="group relative flex flex-col bg-ivory rounded-2xl border border-gold/25 p-3 sm:p-3.5 shadow-warm-sm hover:shadow-warm-hover transition-all duration-500 ease-out"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container with 4:5 Aspect Ratio */}
      <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden bg-cream-200/60 shadow-inner">
        <Link href={`/product/${product.slug}`} className="block w-full h-full">
          {/* Primary Image */}
          <Image
            src={primaryImg}
            alt={product.title}
            fill
            priority={priority}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className={`object-cover transition-all duration-700 ease-out ${
              isHovered && hoverImg !== primaryImg
                ? 'opacity-0 scale-105'
                : 'opacity-100 group-hover:scale-105'
            }`}
          />

          {/* Secondary Hover Image */}
          {hoverImg !== primaryImg && (
            <Image
              src={hoverImg}
              alt={`${product.title} lifestyle view`}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className={`object-cover transition-all duration-700 ease-out absolute inset-0 ${
                isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
              }`}
            />
          )}
        </Link>

        {/* Top Badges (Discount, Bestseller, Urgency) */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10 pointer-events-none">
          {discount > 0 && (
            <span className="bg-sage text-cream-50 text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-full shadow-sm tracking-wide">
              {discount}% OFF
            </span>
          )}
          {product.isBestseller && (
            <span className="bg-deep/90 backdrop-blur-sm text-gold text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm border border-gold/30">
              Bestseller
            </span>
          )}
          {product.isNewArrival && !product.isBestseller && (
            <span className="bg-primary text-cream-50 text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
              New
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 z-10 shadow-sm ${
            isWishlisted
              ? 'bg-primary text-cream-50 scale-110'
              : 'bg-white/85 backdrop-blur-sm text-deep/70 hover:text-primary hover:bg-white hover:scale-110'
          }`}
        >
          <Heart
            className={`w-4 h-4 transition-transform duration-200 ${
              isWishlisted ? 'fill-cream-50' : ''
            }`}
          />
        </button>

        {/* Stock / Urgency Tag */}
        {totalStock <= 5 && totalStock > 0 && (
          <div className="absolute bottom-12 sm:bottom-14 left-2.5 z-10 pointer-events-none">
            <span className="bg-amber-900/85 backdrop-blur-sm text-amber-200 text-[9px] font-semibold px-2 py-0.5 rounded-full">
              Only {totalStock} left
            </span>
          </div>
        )}

        {/* Slide-Up Quick Add Bar (Desktop Hover / Mobile Accessible) */}
        <div className="absolute inset-x-2 bottom-2 z-10 transition-all duration-300 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
          <button
            onClick={handleQuickAdd}
            className="w-full py-2.5 px-3 bg-deep/95 hover:bg-deep text-cream-50 backdrop-blur-md rounded-xl text-[11px] font-semibold tracking-wider uppercase flex items-center justify-center gap-2 shadow-warm-md hover:shadow-warm-hover active:scale-[0.98] transition-all"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-gold" />
            <span>Quick Add</span>
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="mt-3.5 flex-1 flex flex-col justify-between space-y-2">
        <div className="space-y-1">
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-primary font-medium tracking-wider uppercase text-[10px]">
              {product.categoryName || 'Candle'}
            </span>
            {product.rating && (
              <div className="flex items-center gap-1 text-gold font-medium">
                <RatingStars rating={product.rating} reviewCount={product.reviewCount} size="sm" />
              </div>
            )}
          </div>

          {/* Product Title */}
          <Link
            href={`/product/${product.slug}`}
            className="block font-serif text-sm sm:text-base font-bold text-deep hover:text-primary transition-colors line-clamp-1 leading-snug"
          >
            {product.title}
          </Link>

          {/* Subtitle / Fragrance / Wax Note */}
          {product.subtitle && (
            <p className="text-[11px] text-deep/60 line-clamp-1 font-light">
              {product.subtitle}
            </p>
          )}
        </div>

        {/* Variant Chips (e.g. Scent / Size preview) */}
        {product.variants.length > 1 && (
          <div className="flex items-center gap-1.5 pt-0.5 overflow-x-auto scrollbar-none py-0.5">
            {product.variants.slice(0, 3).map((v) => (
              <span
                key={v.id}
                className="text-[9px] px-2 py-0.5 rounded-full bg-cream-200/70 border border-gold/20 text-deep/80 whitespace-nowrap"
              >
                {v.size || v.name}
              </span>
            ))}
            {product.variants.length > 3 && (
              <span className="text-[9px] text-deep/50 font-medium">
                +{product.variants.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Price & Add Action Footer */}
        <div className="pt-2 border-t border-cream-200/80 flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="font-serif text-base sm:text-lg font-bold text-deep">
              {formatPrice(product.basePrice)}
            </span>
            {product.baseMrp > product.basePrice && (
              <span className="text-xs text-deep/40 line-through">
                {formatPrice(product.baseMrp)}
              </span>
            )}
          </div>

          <Link
            href={`/product/${product.slug}`}
            className="text-xs font-semibold text-primary hover:text-deep transition-colors sm:hidden"
          >
            View →
          </Link>
        </div>
      </div>
    </div>
  );
}
