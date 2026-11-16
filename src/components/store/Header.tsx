'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Package,
  Menu,
  X,
  ArrowRight,
} from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { PRODUCTS } from '@/data/seedData';
import { formatPrice } from '@/lib/utils';
import MegaMenu from './MegaMenu';
import MobileDrawer from './MobileDrawer';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const { getItemCount, openCartDrawer } = useCartStore();
  const { items: wishlistItems } = useWishlistStore();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const itemCount = mounted ? getItemCount() : 0;
  const wishlistCount = mounted ? wishlistItems.length : 0;

  // Filter products for live suggestions
  const searchResults = searchQuery.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.categoryName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  // Close search dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 bg-cream-100/95 backdrop-blur-md border-b border-gold/20 shadow-soft transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 sm:h-24 gap-4">
            {/* Mobile Menu Trigger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 text-deep hover:text-primary transition-colors focus:outline-none"
              aria-label="Open navigation menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Brand Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="relative w-11 h-11 sm:w-13 sm:h-13 rounded-full border border-gold/40 p-0.5 shadow-sm bg-cream-50 group-hover:scale-105 transition-transform duration-300">
                  <Image
                    src="/images/logo.svg"
                    alt="Ruhara Candles Logo"
                    width={48}
                    height={48}
                    className="w-full h-full object-contain rounded-full"
                    priority
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-2xl sm:text-3xl font-bold tracking-wider text-deep leading-none group-hover:text-primary transition-colors">
                    RUHARA
                  </span>
                  <span className="text-[9px] sm:text-[10px] tracking-[0.25em] font-sans font-medium text-primary uppercase mt-1">
                    Candles &amp; Home Decor
                  </span>
                </div>
              </Link>
            </div>

            {/* Live Search Bar (Desktop) */}
            <div
              ref={searchContainerRef}
              className="hidden md:flex flex-1 max-w-md relative mx-4"
            >
              <div className="relative w-full">
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search candles, scents, hampers, jars..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setIsSearchOpen(true);
                  }}
                  onFocus={() => setIsSearchOpen(true)}
                  className="w-full pl-10 pr-4 py-2.5 bg-cream-50/80 border border-gold/30 rounded-full text-sm text-deep placeholder:text-deep/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-inner transition-all"
                />
                <Search className="w-4 h-4 text-deep/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setIsSearchOpen(false);
                    }}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-deep/40 hover:text-deep"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Live Search Results Dropdown */}
              {isSearchOpen && searchQuery.trim() && (
                <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-hover border border-gold/20 overflow-hidden z-50">
                  <div className="p-2 border-b border-cream-200 bg-cream-50 flex items-center justify-between text-xs text-deep/70">
                    <span>Products ({searchResults.length})</span>
                    <span className="text-[10px] text-primary">Live suggestions</span>
                  </div>

                  {searchResults.length > 0 ? (
                    <div className="divide-y divide-cream-100 max-h-80 overflow-y-auto">
                      {searchResults.map((product) => (
                        <Link
                          key={product.id}
                          href={`/product/${product.slug}`}
                          onClick={() => {
                            setIsSearchOpen(false);
                            setSearchQuery('');
                          }}
                          className="flex items-center gap-3 p-3 hover:bg-cream-50 transition-colors"
                        >
                          <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-cream-100 border border-gold/20">
                            <Image
                              src={product.images[0]?.url || ''}
                              alt={product.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-deep truncate">
                              {product.title}
                            </p>
                            <p className="text-xs text-primary">{product.categoryName}</p>
                          </div>
                          <div className="text-right">
                            <span className="text-sm font-semibold text-deep">
                              {formatPrice(product.basePrice)}
                            </span>
                          </div>
                        </Link>
                      ))}
                      <div className="p-2.5 text-center bg-cream-50/60">
                        <Link
                          href={`/collection/all?q=${encodeURIComponent(searchQuery)}`}
                          onClick={() => setIsSearchOpen(false)}
                          className="text-xs font-medium text-primary hover:underline flex items-center justify-center gap-1"
                        >
                          <span>View all results for &quot;{searchQuery}&quot;</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="p-6 text-center text-sm text-deep/70">
                      No candles found for &quot;{searchQuery}&quot;
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Quick Actions (Orders, Wishlist, Account, Cart) */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Mobile Search Toggle */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="md:hidden p-2 text-deep hover:text-primary transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Order Tracking Link */}
              <Link
                href="/account/orders"
                className="hidden sm:flex items-center gap-1 text-xs font-medium text-deep/80 hover:text-primary transition-colors py-1 px-2.5 rounded-full hover:bg-cream-200/50"
                title="Track My Order"
              >
                <Package className="w-4 h-4 text-primary" />
                <span>Track Orders</span>
              </Link>

              {/* Wishlist Link */}
              <Link
                href="/account/wishlist"
                className="relative p-2 text-deep hover:text-primary transition-colors"
                aria-label="View Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-cream-50 text-[10px] font-bold rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Customer Account / Login */}
              <Link
                href="/account/login"
                className="p-2 text-deep hover:text-primary transition-colors"
                aria-label="Account Login"
                title="Account"
              >
                <User className="w-5 h-5" />
              </Link>

              {/* Bag / Cart Button */}
              <button
                onClick={openCartDrawer}
                className="relative flex items-center gap-2 bg-primary text-cream-50 px-3.5 py-2 rounded-full hover:bg-primary-hover shadow-soft transition-all duration-200 group"
                aria-label="Open Shopping Bag"
              >
                <ShoppingBag className="w-4 h-4 transition-transform group-hover:scale-110" />
                <span className="text-xs font-semibold tracking-wide hidden sm:inline">
                  Bag
                </span>
                <span className="bg-gold text-deep font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              </button>
            </div>
          </div>

          {/* Mobile Search Bar Dropdown */}
          {isSearchOpen && (
            <div className="md:hidden pb-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search candles, scents, gifts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-8 py-2 bg-cream-50 border border-gold/40 rounded-full text-xs text-deep focus:outline-none focus:border-primary"
                  autoFocus
                />
                <Search className="w-4 h-4 text-deep/60 absolute left-3 top-1/2 -translate-y-1/2" />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-deep/40"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Mobile Quick Results */}
              {searchQuery.trim() && (
                <div className="mt-2 bg-white rounded-xl shadow-lg border border-gold/20 divide-y divide-cream-100 max-h-64 overflow-y-auto">
                  {searchResults.map((product) => (
                    <Link
                      key={product.id}
                      href={`/product/${product.slug}`}
                      onClick={() => {
                        setIsSearchOpen(false);
                        setSearchQuery('');
                      }}
                      className="flex items-center gap-2.5 p-2.5 hover:bg-cream-50"
                    >
                      <div className="relative w-10 h-10 rounded-md overflow-hidden flex-shrink-0 bg-cream-100">
                        <Image
                          src={product.images[0]?.url || ''}
                          alt={product.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-deep truncate">
                          {product.title}
                        </p>
                        <p className="text-[10px] text-primary">{product.categoryName}</p>
                      </div>
                      <span className="text-xs font-semibold text-deep">
                        {formatPrice(product.basePrice)}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Desktop Mega-Menu Navigation */}
        <MegaMenu />
      </header>

      {/* Mobile Drawer Navigation */}
      <MobileDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
