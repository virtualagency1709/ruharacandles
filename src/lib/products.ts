import { PRODUCTS, CATEGORIES, REVIEWS, COUPONS, BANNERS, DEFAULT_FRAGRANCES, DEFAULT_FRAGRANCE_AVAILABILITY } from '@/data/seedData';
import { Product, Category, Review, Coupon, Banner } from '@/types';

export function getAllProducts(): Product[] {
  return PRODUCTS.map((p) => ({
    ...p,
    availableFragrances: p.availableFragrances || [...DEFAULT_FRAGRANCES],
    fragranceAvailability: p.fragranceAvailability || { ...DEFAULT_FRAGRANCE_AVAILABILITY },
  }));
}

export function getProductBySlug(slug: string): Product | undefined {
  const p = PRODUCTS.find((p) => p.slug === slug || (slug === 'scented-peony-flower-candle-for-home-decor' && p.slug === 'peony-candle-set-of-3') || (slug === 'concrete-tray-with-lotus-and-ribbed-jar-candle' && p.slug === 'white-concrete-tray-and-ribbed-vase-with-peony-candle'));
  if (!p) return undefined;
  return {
    ...p,
    availableFragrances: p.availableFragrances || [...DEFAULT_FRAGRANCES],
    fragranceAvailability: p.fragranceAvailability || { ...DEFAULT_FRAGRANCE_AVAILABILITY },
  };
}

export function getProductById(id: string): Product | undefined {
  const p = PRODUCTS.find((p) => p.id === id);
  if (!p) return undefined;
  return {
    ...p,
    availableFragrances: p.availableFragrances || [...DEFAULT_FRAGRANCES],
    fragranceAvailability: p.fragranceAvailability || { ...DEFAULT_FRAGRANCE_AVAILABILITY },
  };
}

export function getProductsByCategory(categorySlug: string): Product[] {
  let list = PRODUCTS;
  if (categorySlug === 'bestsellers') list = PRODUCTS.filter((p) => p.isBestseller);
  else if (categorySlug === 'new-arrivals') list = PRODUCTS.filter((p) => p.isNewArrival);
  else if (categorySlug === 'featured') list = PRODUCTS.filter((p) => p.isFeatured);
  else if (categorySlug !== 'all' && categorySlug !== 'all-candles' && categorySlug !== 'candles') {
    list = PRODUCTS.filter((p) => p.categorySlug === categorySlug);
  }
  
  return list.map((p) => ({
    ...p,
    availableFragrances: (p.availableFragrances || [...DEFAULT_FRAGRANCES]).filter((f) => (DEFAULT_FRAGRANCES as readonly string[]).includes(f)),
    fragranceAvailability: p.fragranceAvailability || { ...DEFAULT_FRAGRANCE_AVAILABILITY },
  }));
}

export function getCategoryBySlug(slug: string): Category | undefined {
  if (slug === 'all' || slug === 'all-candles' || slug === 'candles') {
    return {
      id: 'cat-all',
      name: 'All Candles',
      slug: slug,
      description: 'Explore the complete Ruhara artisanal collection of 100% pure botanical soy wax candles, sculptural floral designs, brass urlis, and modern concrete jars.',
      imageUrl: '/placeholders/terracotta-bowl-pink-daisy-candle.svg',
      sortOrder: 0,
      isFeatured: true,
    };
  }
  if (slug === 'bestsellers') {
    return {
      id: 'cat-bestsellers',
      name: 'Best Selling Candles',
      slug: 'bestsellers',
      description: 'Our most-loved hand-poured creations, cherished by over 2,000+ homes across India.',
      imageUrl: '/placeholders/wine-rose-bear-shaped-decorative-candle.svg',
      sortOrder: 0,
      isFeatured: true,
    };
  }
  if (slug === 'new-arrivals') {
    return {
      id: 'cat-new-arrivals',
      name: 'New Arrivals',
      slug: 'new-arrivals',
      description: 'The latest artisanal batch poured with seasonal botanical essences and fresh sculptural designs.',
      imageUrl: '/images/concrete-tray-lotus-ribbed-jar-candle.jpg',
      sortOrder: 0,
      isFeatured: true,
    };
  }
  return CATEGORIES.find((c) => c.slug === slug);
}

export function getAllCategories(): Category[] {
  return CATEGORIES;
}

export function getRelatedProducts(currentProductId: string, categoryId: string, limit = 4): Product[] {
  return PRODUCTS.filter((p) => p.id !== currentProductId && p.categoryId === categoryId).slice(0, limit);
}

export function getProductReviews(productId: string): Review[] {
  return REVIEWS.filter((r) => r.productId === productId);
}

export function getFilteredProducts({
  categorySlug = 'all',
  minPrice = 0,
  maxPrice = 5000,
  scents = [],
  sortBy = 'a-z',
  search = '',
  inStockOnly = false,
}: {
  categorySlug?: string;
  minPrice?: number;
  maxPrice?: number;
  scents?: string[];
  sortBy?: string;
  search?: string;
  inStockOnly?: boolean;
}): Product[] {
  let list = [...getProductsByCategory(categorySlug)];

  // Search filter
  if (search.trim()) {
    const q = search.toLowerCase();
    list = list.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.subtitle?.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.categoryName?.toLowerCase().includes(q) ||
        p.waxType?.toLowerCase().includes(q)
    );
  }

  // Price filter
  list = list.filter((p) => p.basePrice >= minPrice && p.basePrice <= maxPrice);

  // Fragrance filter
  if (scents.length > 0) {
    list = list.filter((p) => {
      const hasAvailableFragrance = scents.some((frag) => {
        if (p.fragranceAvailability && p.fragranceAvailability[frag] === false) return false;
        if (p.availableFragrances && p.availableFragrances.length > 0) {
          return p.availableFragrances.includes(frag);
        }
        return true;
      });
      const hasVariantScent = p.variants.some((v) => v.scent && scents.includes(v.scent));
      return hasAvailableFragrance || hasVariantScent;
    });
  }

  // Stock filter
  if (inStockOnly) {
    list = list.filter((p) => p.variants.some((v) => v.stock > 0));
  }

  // Sort
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
    list.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0) || (b.sortOrder || 0) - (a.sortOrder || 0));
  } else if (sortBy === 'bestsellers' || sortBy === 'popularity') {
    list.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0) || (b.rating || 0) - (a.rating || 0));
  } else {
    // Default to A to Z
    list.sort((a, b) => a.title.localeCompare(b.title));
  }

  return list;
}
