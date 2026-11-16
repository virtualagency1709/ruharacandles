# Ruhara Candles – Luxury Artisanal E-Commerce Store

Production-ready, mobile-first D2C e-commerce platform for **Ruhara Candles** ("Candles & Home Decor"), handcrafted in India with 100% pure organic soy wax, pure essential oils, and heritage vessels.

---

## 🎨 Visual Identity & Brand System

- **Background Cream:** `#F5EBDD`
- **Primary Brown:** `#8B5A2B`
- **Deep Brown Text:** `#4A2E15`
- **Gold Accent (Gradient):** `#DFB35F` -> `#C9973F` -> `#8B5A2B`
- **Soft Sage Accent:** `#7A8B6A`
- **White for Cards:** `#FFFFFF`
- **Typography:**
  - Headings: `Playfair Display` (Classic editorial serif)
  - Body: `Poppins` & `Inter` (Optimized readability on mobile)
- **Tagline:** *"Light up your space with love"*

---

## 🚀 Phase Status & Roadmap

- [x] **Phase 1: Project Setup, Design System, Database Schema, Seed Catalog & Store Shell**
  - Next.js 14 App Router + TypeScript + Tailwind CSS
  - Custom brand color palette & serif/sans typography
  - Circular badge logo with arch/mihrab silhouette, candle flame, vase & gold ring (`/public/images/logo.svg`)
  - Complete PostgreSQL schema via Prisma ORM (`prisma/schema.prisma`)
  - Full seed catalog: 7 candle categories, 24 realistic products with variants, images, reviews, coupons & banners (`src/data/seedData.ts` & `prisma/seed.ts`)
  - Sticky header with live search & instant suggestions
  - Desktop mega-menu with 7 category dropdowns & featured highlight
  - Mobile bottom navigation bar (Home, Catalog, Search, Bag, Account)
  - Mobile slide-out hamburger drawer
  - Slide-out mini-cart drawer with free shipping meter & coupon system
  - Floating WhatsApp click-to-chat button
  - Comprehensive footer with brand story, policy links, payment badges & newsletter
- [ ] **Phase 2: Home Page, Collection Page (Filters & Sorting), Product Detail Page**
- [ ] **Phase 3: Cart, Checkout, Razorpay + COD, Order Creation & Confirmation Emails**
- [ ] **Phase 4: Customer Account, Order Tracking & Shiprocket Courier Integration**
- [ ] **Phase 5: Admin Panel (Products, Orders, Coupons, Banners, Settings)**
- [ ] **Phase 6: SEO, Analytics, Performance Pass, Security & Deployment Guide**

---

## 🛠️ Quick Start Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

### 3. Generate Database Client & Seed Data
```bash
npx prisma generate
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the storefront.
