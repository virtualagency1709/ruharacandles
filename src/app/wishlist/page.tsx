'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { useWishlistStore } from '@/store/wishlistStore';
import { PRODUCTS } from '@/data/seedData';
import ProductCard from '@/components/store/ProductCard';
import { Button } from '@/components/ui/Button';

export default function WishlistPage() {
  const { items: wishlistIds, clearWishlist } = useWishlistStore();

  const wishlistedProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="min-h-screen bg-cream pb-24">
      {/* Header Banner */}
      <div className="bg-gradient-to-b from-cream-200/90 to-cream border-b border-gold/25 py-12 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-2xl mx-auto space-y-2">
          <h1 className="text-fluid-h2 font-serif font-bold text-deep">
            Saved Wishlist
          </h1>
          <p className="text-xs sm:text-sm text-deep/70">
            {wishlistedProducts.length === 0
              ? 'Your wishlist is currently empty'
              : `You have saved ${wishlistedProducts.length} ${wishlistedProducts.length === 1 ? 'candle' : 'candles'}`}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {wishlistedProducts.length === 0 ? (
          <div className="bg-ivory rounded-2xl p-12 text-center border border-gold/25 shadow-warm-sm max-w-md mx-auto space-y-4 my-8">
            <div className="w-16 h-16 rounded-full bg-cream-100 flex items-center justify-center mx-auto text-primary">
              <Heart className="w-8 h-8" />
            </div>
            <h2 className="font-serif text-xl font-bold text-deep">
              No saved items yet
            </h2>
            <p className="text-xs sm:text-sm text-deep/70 max-w-xs mx-auto leading-relaxed">
              Explore our handcrafted collections and tap the heart icon on any candle to save it for later.
            </p>
            <Link href="/collection/all" className="inline-block pt-2">
              <Button variant="primary" size="md">
                Explore Best Sellers
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-deep/70">
                {wishlistedProducts.length} items saved
              </span>
              <button
                onClick={clearWishlist}
                className="text-xs text-red-600 font-semibold hover:underline"
              >
                Clear Wishlist
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {wishlistedProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
