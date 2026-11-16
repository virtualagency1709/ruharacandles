import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WishlistState {
  items: string[]; // Product IDs
  toggleItem: (productId: string) => boolean; // returns new state (true if added, false if removed)
  hasItem: (productId: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      toggleItem: (productId) => {
        const { items } = get();
        const exists = items.includes(productId);
        if (exists) {
          set({ items: items.filter((id) => id !== productId) });
          return false;
        } else {
          set({ items: [...items, productId] });
          return true;
        }
      },
      hasItem: (productId) => get().items.includes(productId),
      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: 'ruhara-wishlist-storage',
    }
  )
);
