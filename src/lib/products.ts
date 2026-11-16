import { PRODUCTS, CATEGORIES, REVIEWS, COUPONS, BANNERS } from '@/data/seedData';
import { Product, Category, Review, Coupon, Banner } from '@/types';

export function getAllProducts(): Product[] {
  return PRODUCTS;
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  if (categorySlug === 'all' || categorySlug === 'all-candles' || categorySlug === 'candles') return PRODUCTS;
  if (categorySlug === 'bestsellers') return PRODUCTS.filter((p) => p.isBestseller);
  if (categorySlug === 'new-arrivals') return PRODUCTS.filter((p) => p.isNewArrival);
  if (categorySlug === 'featured') return PRODUCTS.filter((p) => p.isFeatured);
  
  return PRODUCTS.filter((p) => p.categorySlug === categorySlug);
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
      imageUrl: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=1200&auto=format&fit=crop',
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
      imageUrl: 'https://images.unsplash.com/photo-1596433809252-260c2745dfdd?q=80&w=1200&auto=format&fit=crop',
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

  // Scent filter
  if (scents.length > 0) {
    list = list.filter((p) =>
      p.variants.some((v) => v.scent && scents.includes(v.scent))
    );
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
