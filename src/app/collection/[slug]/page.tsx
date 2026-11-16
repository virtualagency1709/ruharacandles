'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Filter,
  SlidersHorizontal,
  ChevronDown,
  X,
  Sparkles,
  Grid3X3,
  LayoutGrid,
  RotateCcw,
} from 'lucide-react';
import ProductCard from '@/components/store/ProductCard';
import { getCategoryBySlug, getFilteredProducts, getAllCategories } from '@/lib/products';
import { useProductStore, getMergedProducts } from '@/store/productStore';
import { PRODUCTS } from '@/data/seedData';
import { formatPrice } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface CollectionPageProps {
  params: {
    slug: string;
  };
}

const ALL_SCENTS = [
  'French Lavender',
  'Mysore Sandalwood',
  'Madurai Jasmine',
  'Vanilla & Cinnamon',
  'Cardamom & Saffron',
  'Damask Rose & Oud',
  'Peony & Rose',
  'Zesty Marigold & Citrus',
  'Pine & Cedar',
];

export default function CollectionPage({ params }: CollectionPageProps) {
  const currentSlug = params.slug || 'all';
  const category = getCategoryBySlug(currentSlug);
  const allCategories = getAllCategories();

  // Dynamic store integration
  const { customImages, productOverrides, deletedProductIds, newProducts } = useProductStore();

  // Filter & Sort State (Default A to Z)
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(3000);
  const [selectedScents, setSelectedScents] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('a-z');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);
  const [gridCols, setGridCols] = useState<'3' | '4'>('3');

  // Filtered Products merged with store overrides
  const products = useMemo(() => {
    // Merge base products with client storage overrides
    const mergedAll = getMergedProducts(
      PRODUCTS,
      customImages,
      productOverrides,
      deletedProductIds,
      newProducts
    );

    let list = [...mergedAll];

    // Category filter
    if (currentSlug !== 'all' && currentSlug !== 'all-candles' && currentSlug !== 'candles') {
      if (currentSlug === 'bestsellers') {
        list = list.filter((p) => p.isBestseller);
      } else if (currentSlug === 'new-arrivals') {
        list = list.filter((p) => p.isNewArrival);
      } else if (currentSlug === 'featured') {
        list = list.filter((p) => p.isFeatured);
      } else {
        list = list.filter((p) => p.categorySlug === currentSlug);
      }
    }

    // Price filter
    list = list.filter((p) => p.basePrice >= minPrice && p.basePrice <= maxPrice);

    // Scent filter
    if (selectedScents.length > 0) {
      list = list.filter((p) =>
        p.variants.some((v) => v.scent && selectedScents.includes(v.scent))
      );
    }

    // Stock filter
    if (inStockOnly) {
      list = list.filter((p) => p.variants.some((v) => v.stock > 0));
    }

    // Sorting: Default A to Z
    if (sortBy === 'a-z') {
      list.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'z-a') {
      list.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortBy === 'price-low') {
      list.sort((a, b) => a.basePrice - b.basePrice);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.basePrice - a.basePrice);
    } else if (sortBy === 'discount') {
      list.sort((a, b) => {
        const discA = ((a.baseMrp - a.basePrice) / a.baseMrp) * 100;
        const discB = ((b.baseMrp - b.basePrice) / b.baseMrp) * 100;
        return discB - discA;
      });
    } else if (sortBy === 'newest') {
      list.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
    } else if (sortBy === 'bestsellers' || sortBy === 'popularity') {
      list.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0) || (b.rating || 0) - (a.rating || 0));
    } else {
      list.sort((a, b) => a.title.localeCompare(b.title));
    }

    return list;
  }, [
    currentSlug,
    minPrice,
    maxPrice,
    selectedScents,
    sortBy,
    inStockOnly,
    customImages,
    productOverrides,
    deletedProductIds,
    newProducts,
  ]);

  const toggleScent = (scent: string) => {
    if (selectedScents.includes(scent)) {
      setSelectedScents(selectedScents.filter((s) => s !== scent));
    } else {
      setSelectedScents([...selectedScents, scent]);
    }
  };

  const handleResetFilters = () => {
    setMinPrice(0);
    setMaxPrice(3000);
    setSelectedScents([]);
    setInStockOnly(false);
    setSortBy('a-z');
  };

  const hasActiveFilters =
    minPrice > 0 || maxPrice < 3000 || selectedScents.length > 0 || inStockOnly;

  return (
    <div className="min-h-screen bg-cream pb-20">
      {/* Category Hero / Header Banner */}
      <div className="relative bg-gradient-to-b from-cream-200/90 to-cream border-b border-gold/25 py-10 sm:py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-deep/60 mb-4 font-medium">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/collection/all" className="hover:text-primary transition-colors">
              Collections
            </Link>
            <span>/</span>
            <span className="text-deep font-semibold">
              {category?.name || 'All Candles'}
            </span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-bold text-primary tracking-widest uppercase flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-gold" />
                Handcrafted Soy Collection
              </span>
              <h1 className="text-fluid-h1 font-serif font-bold text-deep leading-tight">
                {category?.name || 'All Candles'}
              </h1>
              {category?.description && (
                <p className="text-xs sm:text-sm text-deep/75 font-light leading-relaxed">
                  {category.description}
                </p>
              )}
            </div>

            {/* Product Count Pill */}
            <div className="flex-shrink-0">
              <Badge variant="ivory" size="md">
                Showing {products.length} Candles
              </Badge>
            </div>
          </div>

          {/* Quick Subcategory Filter Pills */}
          <div className="mt-8 flex items-center gap-2 overflow-x-auto scrollbar-none pb-2">
            <Link
              href="/collection/all"
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all shadow-sm ${currentSlug === 'all' || currentSlug === 'all-candles' || currentSlug === 'candles'
                ? 'bg-deep text-cream-50 border border-deep'
                : 'bg-ivory text-deep/80 hover:bg-cream-100 border border-gold/30'
                }`}
            >
              All Candles
            </Link>
            {allCategories.map((cat) => (
              <Link
                key={cat.id}
                href={`/collection/${cat.slug}`}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all shadow-sm ${currentSlug === cat.slug
                  ? 'bg-deep text-cream-50 border border-deep'
                  : 'bg-ivory text-deep/80 hover:bg-cream-100 border border-gold/30'
                  }`}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area: Sidebar Filters + Product Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Top Control Bar: Mobile Filter Trigger, Active Pills & Sort Options */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-6 border-b border-gold/20">
          <div className="flex items-center gap-3">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 bg-ivory border border-gold/35 rounded-xl text-xs font-semibold text-deep shadow-warm-sm"
            >
              <SlidersHorizontal className="w-4 h-4 text-primary" />
              <span>Filters {hasActiveFilters && '• Active'}</span>
            </button>

            {/* Desktop Grid Layout Switcher */}
            <div className="hidden lg:flex items-center gap-1 bg-ivory border border-gold/30 rounded-xl p-1 shadow-sm">
              <button
                onClick={() => setGridCols('3')}
                className={`p-1.5 rounded-lg transition-colors ${gridCols === '3' ? 'bg-cream text-deep' : 'text-deep/40 hover:text-deep'
                  }`}
                title="3 Columns"
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setGridCols('4')}
                className={`p-1.5 rounded-lg transition-colors ${gridCols === '4' ? 'bg-cream text-deep' : 'text-deep/40 hover:text-deep'
                  }`}
                title="4 Columns"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>

            {/* Reset Filters Pill */}
            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                className="hidden sm:flex items-center gap-1.5 text-xs text-primary font-semibold hover:underline"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All</span>
              </button>
            )}
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center justify-end gap-2">
            <span className="text-xs text-deep/60 hidden sm:inline font-medium">Sort By:</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-ivory border border-gold/35 text-deep text-xs font-semibold rounded-xl pl-3 pr-8 py-2.5 shadow-warm-sm focus:outline-none focus:border-gold cursor-pointer"
              >
                <option value="a-z">A to Z (Alphabetical)</option>
                <option value="z-a">Z to A (Reverse Alphabetical)</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest First</option>
                <option value="bestsellers">Best Selling</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-deep/60 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Layout Grid: Left Sidebar + Right Products */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pt-6">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block space-y-6 bg-ivory p-6 rounded-2xl border border-gold/25 shadow-warm-sm h-fit sticky top-28">
            <div className="flex items-center justify-between pb-3 border-b border-cream-200">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-primary" />
                <h3 className="font-serif text-base font-bold text-deep">Filter Catalog</h3>
              </div>
              {hasActiveFilters && (
                <button
                  onClick={handleResetFilters}
                  className="text-[11px] text-primary hover:underline font-semibold"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Price Range */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-deep/80 block">
                Price Range
              </label>
              <div className="flex items-center justify-between text-xs text-deep font-semibold">
                <span>{formatPrice(minPrice)}</span>
                <span>{formatPrice(maxPrice)}</span>
              </div>
              <input
                type="range"
                min={0}
                max={3000}
                step={100}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-primary cursor-pointer"
              />
            </div>

            {/* Fragrance / Scent Notes */}
            <div className="space-y-2.5 pt-4 border-t border-cream-200">
              <label className="text-xs font-bold uppercase tracking-wider text-deep/80 block">
                Botanical Scent Notes
              </label>
              <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1">
                {ALL_SCENTS.map((scent) => {
                  const isChecked = selectedScents.includes(scent);
                  return (
                    <label
                      key={scent}
                      className="flex items-center gap-2 text-xs text-deep/80 hover:text-deep cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleScent(scent)}
                        className="rounded border-gold/40 text-primary focus:ring-primary accent-primary"
                      />
                      <span>{scent}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Availability */}
            <div className="pt-4 border-t border-cream-200">
              <label className="flex items-center gap-2 text-xs text-deep cursor-pointer font-medium">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded border-gold/40 text-primary focus:ring-primary accent-primary"
                />
                <span>In Stock Only</span>
              </label>
            </div>
          </aside>

          {/* Product Listing Grid */}
          <main className="lg:col-span-3">
            {products.length === 0 ? (
              <div className="bg-ivory rounded-2xl p-12 text-center border border-gold/25 shadow-warm-sm space-y-4">
                <div className="w-16 h-16 rounded-full bg-cream-100 flex items-center justify-center mx-auto text-primary">
                  <Filter className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-xl font-bold text-deep">
                  No candles match your criteria
                </h3>
                <p className="text-xs sm:text-sm text-deep/70 max-w-sm mx-auto">
                  Try widening your price range or unchecking some fragrance filters to see more results.
                </p>
                <Button variant="secondary" onClick={handleResetFilters} size="sm">
                  Reset Filters
                </Button>
              </div>
            ) : (
              <div
                className={`grid grid-cols-2 gap-3 sm:gap-6 ${gridCols === '3'
                  ? 'sm:grid-cols-2 md:grid-cols-3'
                  : 'sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'
                  }`}
              >
                {products.map((product, idx) => (
                  <ProductCard key={product.id} product={product} priority={idx < 4} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Bottom-Sheet Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end">
          <div
            className="fixed inset-0 bg-deep/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="relative bg-cream-50 rounded-t-3xl p-6 shadow-2xl max-h-[85vh] overflow-y-auto z-10 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-gold/25">
              <h3 className="font-serif text-lg font-bold text-deep">Filter &amp; Refine</h3>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1 rounded-full text-deep/60 hover:text-deep"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Price Range */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-deep/80 block">
                Max Price: {formatPrice(maxPrice)}
              </label>
              <input
                type="range"
                min={0}
                max={3000}
                step={100}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>

            {/* Scents */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-deep/80 block">
                Fragrance Notes
              </label>
              <div className="grid grid-cols-2 gap-2">
                {ALL_SCENTS.map((scent) => {
                  const isChecked = selectedScents.includes(scent);
                  return (
                    <button
                      key={scent}
                      onClick={() => toggleScent(scent)}
                      className={`p-2 rounded-xl text-[11px] font-medium border text-left truncate transition-colors ${isChecked
                        ? 'bg-primary text-cream-50 border-primary'
                        : 'bg-ivory text-deep border-gold/30'
                        }`}
                    >
                      {scent}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* In stock */}
            <div>
              <label className="flex items-center gap-2 text-xs text-deep cursor-pointer font-medium">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded text-primary focus:ring-primary accent-primary"
                />
                <span>In Stock Only</span>
              </label>
            </div>

            {/* Apply Button */}
            <div className="pt-4 flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={handleResetFilters}
              >
                Reset
              </Button>
              <Button
                variant="primary"
                className="flex-1"
                onClick={() => setIsMobileFilterOpen(false)}
              >
                Apply Filters ({products.length})
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
