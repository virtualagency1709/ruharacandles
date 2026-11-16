import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Coupon } from '@/types';
import { COUPONS } from '@/data/seedData';

interface CartState {
  items: CartItem[];
  coupon: Coupon | null;
  isCartDrawerOpen: boolean;
  openCartDrawer: () => void;
  closeCartDrawer: () => void;
  toggleCartDrawer: () => void;
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeItem: (productId: string, variantId?: string) => void;
  updateQuantity: (productId: string, quantity: number, variantId?: string) => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  clearCart: () => void;
  getSubtotal: () => number;
  getDiscountAmount: () => number;
  getShippingFee: () => number;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      coupon: null,
      isCartDrawerOpen: false,

      openCartDrawer: () => set({ isCartDrawerOpen: true }),
      closeCartDrawer: () => set({ isCartDrawerOpen: false }),
      toggleCartDrawer: () => set((state) => ({ isCartDrawerOpen: !state.isCartDrawerOpen })),

      addItem: (item) => {
        const { items } = get();
        const existingIndex = items.findIndex(
          (i) => i.productId === item.productId && i.variantId === item.variantId
        );

        const addQty = item.quantity || 1;

        if (existingIndex > -1) {
          const updatedItems = [...items];
          const newQty = Math.min(
            updatedItems[existingIndex].quantity + addQty,
            updatedItems[existingIndex].stock
          );
          updatedItems[existingIndex].quantity = newQty;
          set({ items: updatedItems, isCartDrawerOpen: true });
        } else {
          set({
            items: [
              ...items,
              {
                ...item,
                quantity: Math.min(addQty, item.stock),
              },
            ],
            isCartDrawerOpen: true,
          });
        }
      },

      removeItem: (productId, variantId) => {
        const { items } = get();
        set({
          items: items.filter(
            (i) => !(i.productId === productId && i.variantId === variantId)
          ),
        });
      },

      updateQuantity: (productId, quantity, variantId) => {
        const { items } = get();
        if (quantity <= 0) {
          get().removeItem(productId, variantId);
          return;
        }

        const updatedItems = items.map((i) => {
          if (i.productId === productId && i.variantId === variantId) {
            return {
              ...i,
              quantity: Math.min(quantity, i.stock),
            };
          }
          return i;
        });

        set({ items: updatedItems });
      },

      applyCoupon: (code: string) => {
        const cleanCode = code.trim().toUpperCase();
        const found = COUPONS.find((c) => c.code === cleanCode);

        if (!found) {
          return { success: false, message: 'Invalid coupon code. Try WELCOME10 or FESTIVE20' };
        }

        const subtotal = get().getSubtotal();
        if (found.minOrderValue && subtotal < found.minOrderValue) {
          return {
            success: false,
            message: `Minimum order value of ₹${found.minOrderValue} required for this coupon`,
          };
        }

        set({ coupon: found });
        return { success: true, message: `Coupon ${found.code} applied successfully!` };
      },

      removeCoupon: () => set({ coupon: null }),

      clearCart: () => set({ items: [], coupon: null }),

      getSubtotal: () => {
        const { items } = get();
        return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
      },

      getDiscountAmount: () => {
        const { coupon } = get();
        const subtotal = get().getSubtotal();
        if (!coupon) return 0;

        let discount = 0;
        if (coupon.type === 'PERCENTAGE') {
          discount = (subtotal * coupon.value) / 100;
          if (coupon.maxDiscount) {
            discount = Math.min(discount, coupon.maxDiscount);
          }
        } else if (coupon.type === 'FLAT') {
          discount = coupon.value;
        } else if (coupon.type === 'FREE_SHIPPING') {
          discount = 79;
        }

        return Math.round(discount);
      },

      getShippingFee: () => {
        const subtotal = get().getSubtotal();
        const { coupon } = get();

        // Free shipping coupon or above threshold (₹999)
        if (coupon?.type === 'FREE_SHIPPING' || subtotal >= 999 || subtotal === 0) {
          return 0;
        }
        return 79;
      },

      getTotal: () => {
        const subtotal = get().getSubtotal();
        const discount = get().getDiscountAmount();
        const shipping = get().getShippingFee();
        return Math.max(0, subtotal - discount + shipping);
      },

      getItemCount: () => {
        const { items } = get();
        return items.reduce((acc, item) => acc + item.quantity, 0);
      },
    }),
    {
      name: 'ruhara-cart-storage',
      partialize: (state) => ({ items: state.items, coupon: state.coupon }),
    }
  )
);
