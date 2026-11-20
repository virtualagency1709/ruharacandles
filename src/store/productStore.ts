'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, ProductImage } from '@/types';
import { PRODUCTS, DEFAULT_FRAGRANCES, DEFAULT_FRAGRANCE_AVAILABILITY } from '@/data/seedData';

interface ProductStoreState {
  customImages: Record<string, ProductImage[]>;
  productOverrides: Record<string, Partial<Product>>;
  newProducts: Product[];
  deletedProductIds: string[];

  // Actions
  uploadProductImage: (productId: string, imageUrl: string, altText?: string) => void;
  removeProductImage: (productId: string, imageId: string) => void;
  setPrimaryImage: (productId: string, imageId: string) => void;
  updateProduct: (productId: string, updates: Partial<Product>) => void;
  deleteProduct: (productId: string) => void;
  addProduct: (product: Product) => void;
  resetToDefaults: () => void;
}

export const useProductStore = create<ProductStoreState>()(
  persist(
    (set, get) => ({
      customImages: {},
      productOverrides: {},
      newProducts: [],
      deletedProductIds: [],

      uploadProductImage: (productId: string, imageUrl: string, altText?: string) => {
        set((state) => {
          const existingImages = state.customImages[productId] || [];
          const newImg: ProductImage = {
            id: `custom-img-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
            url: imageUrl,
            altText: altText || 'Uploaded original candle photograph',
            isPrimary: existingImages.length === 0,
            sortOrder: existingImages.length + 1,
          };

          return {
            customImages: {
              ...state.customImages,
              [productId]: [newImg, ...existingImages.map((img) => ({ ...img, isPrimary: false }))],
            },
          };
        });
      },

      removeProductImage: (productId: string, imageId: string) => {
        set((state) => {
          const current = state.customImages[productId] || [];
          const filtered = current.filter((img) => img.id !== imageId);
          if (filtered.length > 0 && !filtered.some((img) => img.isPrimary)) {
            filtered[0].isPrimary = true;
          }
          return {
            customImages: {
              ...state.customImages,
              [productId]: filtered,
            },
          };
        });
      },

      setPrimaryImage: (productId: string, imageId: string) => {
        set((state) => {
          const current = state.customImages[productId] || [];
          const updated = current.map((img) => ({
            ...img,
            isPrimary: img.id === imageId,
          }));
          return {
            customImages: {
              ...state.customImages,
              [productId]: updated,
            },
          };
        });
      },

      updateProduct: (productId: string, updates: Partial<Product>) => {
        set((state) => ({
          productOverrides: {
            ...state.productOverrides,
            [productId]: {
              ...(state.productOverrides[productId] || {}),
              ...updates,
            },
          },
        }));
      },

      deleteProduct: (productId: string) => {
        set((state) => ({
          deletedProductIds: Array.from(new Set([...state.deletedProductIds, productId])),
          newProducts: state.newProducts.filter((p) => p.id !== productId),
        }));
      },

      addProduct: (product: Product) => {
        set((state) => ({
          newProducts: [product, ...state.newProducts],
        }));
      },

      resetToDefaults: () => {
        set({
          customImages: {},
          productOverrides: {},
          newProducts: [],
          deletedProductIds: [],
        });
      },
    }),
    {
      name: 'ruhara-products-store',
    }
  )
);

const sanitizeFragrances = (frags?: string[]): string[] => {
  if (!frags || !Array.isArray(frags)) return [...DEFAULT_FRAGRANCES];
  const filtered = frags.filter((f) => (DEFAULT_FRAGRANCES as readonly string[]).includes(f));
  return filtered.length > 0 ? filtered : [...DEFAULT_FRAGRANCES];
};

/**
 * Helper function to merge static seed products with dynamic admin overrides and custom uploaded images
 */
export function getMergedProducts(
  baseProducts: Product[] = PRODUCTS,
  customImages: Record<string, ProductImage[]> = {},
  overrides: Record<string, Partial<Product>> = {},
  deletedIds: string[] = [],
  newProducts: Product[] = []
): Product[] {
  const deletedSet = new Set(deletedIds);

  const mergedBase = baseProducts
    .filter((p) => !deletedSet.has(p.id))
    .map((p) => {
      const productOverride = overrides[p.id] || {};
      const uploadedImages = customImages[p.id];

      const effectiveImages =
        uploadedImages && uploadedImages.length > 0
          ? [...uploadedImages, ...(p.images || []).filter((img) => !uploadedImages.some((u) => u.url === img.url))]
          : p.images;

      const rawFragrances = productOverride.availableFragrances || p.availableFragrances || [...DEFAULT_FRAGRANCES];

      return {
        ...p,
        availableFragrances: sanitizeFragrances(rawFragrances),
        fragranceAvailability: productOverride.fragranceAvailability || p.fragranceAvailability || { ...DEFAULT_FRAGRANCE_AVAILABILITY },
        ...productOverride,
        images: effectiveImages,
      };
    });

  const activeNewProducts = newProducts.filter((p) => !deletedSet.has(p.id)).map((p) => ({
    ...p,
    availableFragrances: sanitizeFragrances(p.availableFragrances),
    fragranceAvailability: p.fragranceAvailability || { ...DEFAULT_FRAGRANCE_AVAILABILITY },
  }));

  return [...activeNewProducts, ...mergedBase];
}
