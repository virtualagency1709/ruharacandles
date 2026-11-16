export type Role = 'CUSTOMER' | 'STAFF' | 'OWNER';

export type OrderStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'PACKED'
  | 'SHIPPED'
  | 'OUT_FOR_DELIVERY'
  | 'DELIVERED'
  | 'CANCELLED'
  | 'RETURNED'
  | 'RTO';

export type PaymentMethod = 'RAZORPAY' | 'COD';

export type PaymentStatus = 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';

export type CouponType = 'PERCENTAGE' | 'FLAT' | 'FREE_SHIPPING';

export interface ProductImage {
  id: string;
  url: string;
  altText?: string;
  isPrimary: boolean;
  isHover?: boolean;
  sortOrder: number;
}

export interface ProductVariant {
  id: string;
  sku: string;
  name: string;
  scent?: string;
  size?: string;
  color?: string;
  price: number;
  mrp: number;
  stock: number;
  imageUrl?: string;
}

export interface Review {
  id: string;
  productId: string;
  authorName: string;
  rating: number;
  title?: string;
  comment: string;
  isVerified: boolean;
  createdAt: string;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  subtitle?: string;
  description: string;
  burnTime?: string;
  waxType?: string;
  careInstructions?: string;
  shippingDetails?: string;
  basePrice: number;
  baseMrp: number;
  weightInGrams: number;
  dimensions?: string;
  isActive: boolean;
  isFeatured?: boolean;
  isBestseller?: boolean;
  isNewArrival?: boolean;
  categoryId: string;
  categoryName?: string;
  categorySlug?: string;
  images: ProductImage[];
  variants: ProductVariant[];
  reviews?: Review[];
  rating?: number;
  reviewCount?: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  bannerUrl?: string;
  parentId?: string;
  sortOrder: number;
  isFeatured?: boolean;
  productCount?: number;
  subcategories?: { id: string; name: string; slug: string }[];
}

export interface CartItem {
  productId: string;
  variantId?: string;
  title: string;
  variantName?: string;
  slug: string;
  price: number;
  mrp: number;
  imageUrl: string;
  quantity: number;
  stock: number;
  scent?: string;
  size?: string;
}

export interface Coupon {
  code: string;
  type: CouponType;
  value: number;
  minOrderValue?: number;
  maxDiscount?: number;
  description: string;
}

export interface Banner {
  id: string;
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  desktopImage: string;
  mobileImage?: string;
  section: 'HERO' | 'ANNOUNCEMENT' | 'FESTIVE';
  sortOrder: number;
  isActive: boolean;
  countdownTo?: string;
}

export interface Address {
  fullName: string;
  phone: string;
  street: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  orderStatus: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  subtotal: number;
  discount: number;
  shippingFee: number;
  codFee: number;
  totalAmount: number;
  gstAmount: number;
  gstin?: string;
  shippingAddress: Address;
  items: CartItem[];
  trackingUrl?: string;
  shiprocketAwb?: string;
  courierName?: string;
}
