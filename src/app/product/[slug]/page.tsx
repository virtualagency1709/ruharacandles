'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Heart,
  ShoppingBag,
  Sparkles,
  Truck,
  CheckCircle2,
  Clock,
  Flame,
  ShieldCheck,
  RotateCcw,
  Plus,
  Minus,
  ChevronDown,
  Share2,
  MapPin,
  Check,
  MessageCircle,
} from 'lucide-react';
import { getProductBySlug, getRelatedProducts, getProductReviews } from '@/lib/products';
import { formatPrice, calculateDiscount } from '@/lib/utils';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { useProductStore } from '@/store/productStore';
import { RatingStars } from '@/components/ui/RatingStars';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import ProductCard from '@/components/store/ProductCard';

interface ProductDetailPageProps {
  params: {
    slug: string;
  };
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const router = useRouter();
  const { customImages, productOverrides } = useProductStore();
  const baseProduct = getProductBySlug(params.slug);
  
  const product = baseProduct
    ? {
        ...baseProduct,
        ...(productOverrides[baseProduct.id] || {}),
        images:
          customImages[baseProduct.id] && customImages[baseProduct.id].length > 0
            ? customImages[baseProduct.id]
            : baseProduct.images && baseProduct.images.length > 0
            ? baseProduct.images
            : [
                {
                  id: 'ph',
                  url: `/placeholders/${baseProduct.slug}.svg`,
                  isPrimary: true,
                  sortOrder: 1,
                  altText: `${baseProduct.title} - Ruhara Candles`,
                },
              ],
      }
    : undefined;

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center space-y-4">
        <h2 className="font-serif text-3xl font-bold text-deep">Product Not Found</h2>
        <p className="text-sm text-deep/70">The candle you are looking for may have retired or moved.</p>
        <Link href="/collection/all">
          <Button variant="primary">Return to All Candles</Button>
        </Link>
      </div>
    );
  }

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState<{
    checked?: boolean;
    serviceable?: boolean;
    city?: string;
    estimatedDays?: string;
  } | null>(null);

  // Accordions open/close state
  const [activeAccordion, setActiveAccordion] = useState<string>('description');

  const { addItem } = useCartStore();
  const { toggleItem, hasItem } = useWishlistStore();

  const isWishlisted = hasItem(product.id);
  const selectedVariant = product.variants[selectedVariantIndex] || product.variants[0];
  const currentPrice = selectedVariant?.price ? Number(selectedVariant.price) : product.basePrice;
  const currentMrp = selectedVariant?.mrp ? Number(selectedVariant.mrp) : product.baseMrp;
  const discount = calculateDiscount(currentPrice, currentMrp);

  const images = product.images.length > 0 ? product.images : [
    { id: 'default', url: `/placeholders/${product.slug}.svg`, altText: product.title, isPrimary: true, sortOrder: 0 }
  ];

  const reviews = getProductReviews(product.id);
  const relatedProducts = getRelatedProducts(product.id, product.categoryId, 4);

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      variantId: selectedVariant?.id,
      title: product.title,
      variantName: selectedVariant?.name,
      slug: product.slug,
      price: currentPrice,
      mrp: currentMrp,
      imageUrl: images[0].url,
      stock: selectedVariant?.stock || 10,
      scent: selectedVariant?.scent,
      size: selectedVariant?.size,
      quantity,
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push('/checkout');
  };

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pincode.trim() || pincode.length !== 6) return;

    // Simulate Indian courier pincode check (Metro 2-3 days, Non-metro 4-5 days)
    const isDelhiNCR = ['11', '12', '20'].some((prefix) => pincode.startsWith(prefix));
    const isMetro = ['40', '56', '70', '60', '50'].some((prefix) => pincode.startsWith(prefix));

    setPincodeStatus({
      checked: true,
      serviceable: true,
      city: isDelhiNCR ? 'Delhi NCR' : isMetro ? 'Metro City' : 'Pan-India',
      estimatedDays: isDelhiNCR ? 'Express Delivery by Tomorrow (1-2 Days)' : 'Delivery in 3–5 Business Days',
    });
  };

  return (
    <div className="min-h-screen bg-cream pb-24">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <nav className="flex items-center gap-2 text-xs text-deep/60 font-medium">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href={`/collection/${product.categorySlug || 'all'}`} className="hover:text-primary transition-colors">
            {product.categoryName || 'Candles'}
          </Link>
          <span>/</span>
          <span className="text-deep font-semibold truncate max-w-xs">{product.title}</span>
        </nav>
      </div>

      {/* Main Product Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          {/* LEFT: Image Gallery with sticky desktop behavior */}
          <div className="space-y-4">
            {/* Primary Featured Image (Arch mask container) */}
            <div className="relative aspect-square sm:aspect-[4/5] w-full rounded-2xl overflow-hidden bg-ivory border border-gold/30 shadow-warm-lg">
              <Image
                src={images[selectedImageIndex]?.url || images[0].url}
                alt={product.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-all duration-500"
              />

              {discount > 0 && (
                <span className="absolute top-4 left-4 bg-sage text-cream-50 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                  {discount}% OFF
                </span>
              )}

              <button
                onClick={() => toggleItem(product.id)}
                className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-md ${
                  isWishlisted
                    ? 'bg-primary text-cream-50'
                    : 'bg-white/90 text-deep hover:bg-white hover:text-primary'
                }`}
                aria-label="Toggle wishlist"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-cream-50' : ''}`} />
              </button>
            </div>

            {/* Thumbnail Carousel / List */}
            {images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
                {images.map((img, idx) => (
                  <button
                    key={img.id || idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all shadow-sm ${
                      selectedImageIndex === idx
                        ? 'border-primary ring-2 ring-gold/40 scale-105'
                        : 'border-gold/25 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Image
                      src={img.url}
                      alt={`${product.title} thumbnail ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: Product Details & Purchase Actions */}
          <div className="space-y-6">
            {/* Category, Title, Subtitle */}
            <div className="space-y-2 border-b border-gold/20 pb-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-primary tracking-widest uppercase">
                  {product.categoryName}
                </span>
                {product.rating && (
                  <div className="flex items-center gap-1.5">
                    <RatingStars rating={product.rating} reviewCount={reviews.length || product.reviewCount} />
                  </div>
                )}
              </div>

              <h1 className="text-fluid-h2 font-serif font-bold text-deep leading-tight">
                {product.title}
              </h1>

              {product.subtitle && (
                <p className="text-sm text-deep/75 font-light leading-relaxed">
                  {product.subtitle}
                </p>
              )}

              {/* Price Row */}
              <div className="pt-3 flex items-baseline gap-3">
                {product.isPricePending ? (
                  <span className="font-serif text-3xl font-bold text-primary italic">
                    Price Pending
                  </span>
                ) : (
                  <span className="font-serif text-3xl font-bold text-deep">
                    {formatPrice(currentPrice)}
                  </span>
                )}
                {product.isFlaggedForReview && (
                  <span className="bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold px-2.5 py-0.5 rounded-full">
                    Verification Entry
                  </span>
                )}
              </div>
              <p className="text-[11px] text-deep/60">Inclusive of all taxes • Free Shipping above ₹999</p>
            </div>

            {/* Variant Selector */}
            {product.variants.length > 0 && (
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-deep/80 block">
                  Select Size &amp; Scent:
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {product.variants.map((v, idx) => {
                    const isSelected = selectedVariantIndex === idx;
                    return (
                      <button
                        key={v.id}
                        onClick={() => setSelectedVariantIndex(idx)}
                        className={`px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all text-left shadow-sm ${
                          isSelected
                            ? 'bg-deep text-cream-50 border-deep shadow-warm-md'
                            : 'bg-ivory text-deep border-gold/35 hover:border-gold hover:bg-cream-100'
                        }`}
                      >
                        <span className="block">{v.name}</span>
                        <span className={`text-[10px] ${isSelected ? 'text-gold' : 'text-primary'}`}>
                          {formatPrice(v.price)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity Selector & Action Buttons */}
            <div className="space-y-4 pt-2">
              {product.isPricePending ? (
                <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-5 space-y-3">
                  <div className="flex items-center gap-2 text-amber-900">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="text-xs font-bold uppercase tracking-wider">Pricing Awaiting Confirmation</span>
                  </div>
                  <p className="text-xs text-deep/75 leading-relaxed">
                    Official pricing for this piece is currently being finalized. You can reserve this piece or inquire directly via WhatsApp.
                  </p>
                  <a
                    href={`https://wa.me/919999999999?text=${encodeURIComponent(`Hi Ruhara Candles, I would like to inquire about the price and availability of "${product.title}" (SKU: ${product.sku}).`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-bold tracking-wider uppercase transition-colors shadow-warm-sm"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Inquire via WhatsApp
                  </a>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  {/* Quantity */}
                  <div className="flex items-center border border-gold/40 rounded-full bg-ivory shadow-warm-sm overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 text-deep hover:bg-cream-200 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-4 text-xs font-bold text-deep min-w-[36px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-3 text-deep hover:bg-cream-200 transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Add to Bag Button */}
                  <Button
                    variant="primary"
                    size="lg"
                    className="flex-1"
                    leftIcon={<ShoppingBag className="w-4 h-4 text-gold" />}
                    onClick={handleAddToCart}
                  >
                    Add to Bag
                  </Button>

                  {/* Buy Now Button */}
                  <Button
                    variant="gold"
                    size="lg"
                    className="flex-1"
                    onClick={handleBuyNow}
                  >
                    Buy Now
                  </Button>
                </div>
              )}
            </div>

            {/* Delivery Pincode Checker */}
            <div className="bg-ivory rounded-2xl p-4 sm:p-5 border border-gold/30 shadow-warm-sm space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-deep/80">
                <MapPin className="w-4 h-4 text-primary" />
                <span>Estimate Delivery &amp; COD Availability</span>
              </div>

              <form onSubmit={handleCheckPincode} className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  placeholder="Enter 6-digit Pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                  className="flex-1 px-3.5 py-2.5 bg-white border border-gold/35 rounded-xl text-xs text-deep tracking-wider focus:outline-none focus:border-gold"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-deep text-cream-50 rounded-xl text-xs font-semibold hover:bg-deep-dark transition-colors"
                >
                  Check
                </button>
              </form>

              {pincodeStatus && (
                <div className="pt-2 text-xs text-emerald-800 flex items-start gap-2 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">{pincodeStatus.estimatedDays}</p>
                    <p className="text-[11px] text-emerald-700 mt-0.5">
                      ✓ Cash on Delivery (COD) available • 100% Secure Shiprocket Delivery
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Key Candle Specifications Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="bg-ivory p-3 rounded-xl border border-gold/20 shadow-warm-sm">
                <Flame className="w-4 h-4 text-primary mx-auto mb-1" />
                <span className="text-[10px] text-deep/60 block">Wax Type</span>
                <span className="text-xs font-bold text-deep block mt-0.5">100% Pure Soy</span>
              </div>
              <div className="bg-ivory p-3 rounded-xl border border-gold/20 shadow-warm-sm">
                <Clock className="w-4 h-4 text-primary mx-auto mb-1" />
                <span className="text-[10px] text-deep/60 block">Burn Time</span>
                <span className="text-xs font-bold text-deep block mt-0.5">{product.burnTime || '45-50 Hrs'}</span>
              </div>
              <div className="bg-ivory p-3 rounded-xl border border-gold/20 shadow-warm-sm">
                <ShieldCheck className="w-4 h-4 text-primary mx-auto mb-1" />
                <span className="text-[10px] text-deep/60 block">Smoke</span>
                <span className="text-xs font-bold text-deep block mt-0.5">Zero Paraffin</span>
              </div>
              <div className="bg-ivory p-3 rounded-xl border border-gold/20 shadow-warm-sm">
                <RotateCcw className="w-4 h-4 text-primary mx-auto mb-1" />
                <span className="text-[10px] text-deep/60 block">Vessel</span>
                <span className="text-xs font-bold text-deep block mt-0.5">Reusable</span>
              </div>
            </div>

            {/* Accordion Sections: Description, Burn & Wax Details, Care, Shipping */}
            <div className="divide-y divide-gold/20 border-y border-gold/20 pt-2">
              {/* Description */}
              <div className="py-3.5">
                <button
                  onClick={() => setActiveAccordion(activeAccordion === 'description' ? '' : 'description')}
                  className="w-full flex items-center justify-between text-left font-serif text-base font-bold text-deep"
                >
                  <span>Description &amp; Scent Profile</span>
                  <ChevronDown
                    className={`w-4 h-4 text-primary transition-transform duration-200 ${
                      activeAccordion === 'description' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {activeAccordion === 'description' && (
                  <div className="pt-3 text-xs sm:text-sm text-deep/80 leading-relaxed space-y-2">
                    <p>{product.description}</p>
                    {product.waxType && (
                      <p><strong>Wax &amp; Fragrance:</strong> {product.waxType}</p>
                    )}
                  </div>
                )}
              </div>

              {/* Care Instructions */}
              <div className="py-3.5">
                <button
                  onClick={() => setActiveAccordion(activeAccordion === 'care' ? '' : 'care')}
                  className="w-full flex items-center justify-between text-left font-serif text-base font-bold text-deep"
                >
                  <span>Candle Care &amp; Burn Advice</span>
                  <ChevronDown
                    className={`w-4 h-4 text-primary transition-transform duration-200 ${
                      activeAccordion === 'care' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {activeAccordion === 'care' && (
                  <div className="pt-3 text-xs sm:text-sm text-deep/80 leading-relaxed space-y-1.5">
                    <p>• Trim wick to 1/4 inch before each lighting to prevent mushrooming and soot.</p>
                    <p>• Allow the candle to burn for 2-3 hours on first burn until a full melt pool reaches the edges.</p>
                    <p>• Always place on a heat-resistant surface away from drafts, pets, and children.</p>
                  </div>
                )}
              </div>

              {/* Shipping & Delivery */}
              <div className="py-3.5">
                <button
                  onClick={() => setActiveAccordion(activeAccordion === 'shipping' ? '' : 'shipping')}
                  className="w-full flex items-center justify-between text-left font-serif text-base font-bold text-deep"
                >
                  <span>Shipping, Delivery &amp; Returns</span>
                  <ChevronDown
                    className={`w-4 h-4 text-primary transition-transform duration-200 ${
                      activeAccordion === 'shipping' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {activeAccordion === 'shipping' && (
                  <div className="pt-3 text-xs sm:text-sm text-deep/80 leading-relaxed space-y-1.5">
                    <p>• Dispatched within 24–48 hours from our Delhi NCR artisanal studio.</p>
                    <p>• Packed in shockproof, zero-breakage sustainable honeycomb wrap.</p>
                    <p>• Free shipping on all prepaid and COD orders above ₹999.</p>
                    <p>• Hassle-free transit replacement if damaged in transit.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div className="mt-20 pt-12 border-t border-gold/25 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-primary tracking-widest uppercase">
                Verified Customer Feedback
              </span>
              <h2 className="text-fluid-h2 font-serif font-bold text-deep">
                Customer Reviews
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <RatingStars rating={product.rating || 5} reviewCount={reviews.length || product.reviewCount} size="md" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(reviews.length > 0 ? reviews : [
              {
                id: 'sample-rev-1',
                productId: product.id,
                authorName: 'Aarohi Sen',
                rating: 5,
                title: 'Absolutely divine aroma and packaging!',
                comment: 'The scent throw on this candle is incredible. It fills our entire living room without feeling overpowering. The container is a piece of art.',
                isVerified: true,
                createdAt: '2026-10-28',
              },
              {
                id: 'sample-rev-2',
                productId: product.id,
                authorName: 'Vikram Joshi',
                rating: 5,
                title: 'Burn time exceeded my expectations',
                comment: 'Been burning this for weeks in the evening. Burns clean, zero soot, and the crackling wick sound creates such a peaceful atmosphere.',
                isVerified: true,
                createdAt: '2026-11-04',
              }
            ]).map((rev) => (
              <div
                key={rev.id}
                className="bg-ivory p-5 rounded-2xl border border-gold/25 shadow-warm-sm space-y-3"
              >
                <div className="flex items-center justify-between">
                  <RatingStars rating={rev.rating} size="sm" showCount={false} />
                  <span className="text-[10px] text-deep/50">{rev.createdAt}</span>
                </div>
                <h4 className="font-serif text-sm font-bold text-deep">{rev.title}</h4>
                <p className="text-xs text-deep/75 leading-relaxed font-light">{rev.comment}</p>
                <div className="flex items-center gap-1.5 pt-1 text-[11px] text-emerald-800 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Verified Purchase • {rev.authorName}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Related Products Carousel / Grid */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 pt-12 border-t border-gold/25 space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-primary tracking-widest uppercase">
                  Curated Companions
                </span>
                <h2 className="text-fluid-h2 font-serif font-bold text-deep">
                  You May Also Like
                </h2>
              </div>
              <Link
                href={`/collection/${product.categorySlug || 'all'}`}
                className="text-xs font-bold text-primary hover:underline"
              >
                View Category →
              </Link>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sticky Mobile Add To Bag Bar */}
      <div className="lg:hidden fixed bottom-14 left-0 right-0 z-30 bg-cream-50/95 backdrop-blur-md border-t border-gold/30 p-3 shadow-lg flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] text-deep/60 block line-clamp-1">{product.title}</span>
          <span className="font-serif text-base font-bold text-deep">
            {formatPrice(currentPrice)}
          </span>
        </div>
        <div className="flex gap-2">
          <Button
            variant="primary"
            size="sm"
            onClick={handleAddToCart}
            leftIcon={<ShoppingBag className="w-3.5 h-3.5 text-gold" />}
          >
            Add to Bag
          </Button>
          <Button
            variant="gold"
            size="sm"
            onClick={handleBuyNow}
          >
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  );
}
