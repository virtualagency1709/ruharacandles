import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { CATEGORIES, PRODUCTS, BANNERS, COUPONS, REVIEWS } from '../src/data/seedData';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting Ruhara Candles database seed...');

  // 1. Seed Admin User
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@ruharacandles.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'AdminRuhara@2026!';
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      role: 'OWNER',
      passwordHash: hashedPassword,
    },
    create: {
      name: 'Ruhara Admin',
      email: adminEmail,
      phone: '9876543210',
      passwordHash: hashedPassword,
      role: 'OWNER',
    },
  });
  console.log(`👤 Admin user seeded: ${admin.email} (Role: ${admin.role})`);

  // 2. Seed Categories
  console.log('📂 Seeding categories...');
  for (const cat of CATEGORIES) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {
        name: cat.name,
        description: cat.description,
        imageUrl: cat.imageUrl,
        sortOrder: cat.sortOrder,
        isFeatured: cat.isFeatured,
      },
      create: {
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
        imageUrl: cat.imageUrl,
        sortOrder: cat.sortOrder,
        isFeatured: cat.isFeatured ?? false,
      },
    });
  }

  // 3. Seed Products, Images & Variants
  console.log('🕯️ Seeding products, images & variants...');
  for (const prod of PRODUCTS) {
    const createdProduct = await prisma.product.upsert({
      where: { slug: prod.slug },
      update: {
        title: prod.title,
        subtitle: prod.subtitle,
        description: prod.description,
        burnTime: prod.burnTime,
        waxType: prod.waxType,
        careInstructions: prod.careInstructions,
        shippingDetails: prod.shippingDetails,
        basePrice: prod.basePrice,
        baseMrp: prod.baseMrp,
        weightInGrams: prod.weightInGrams,
        dimensions: prod.dimensions,
        isFeatured: prod.isFeatured ?? false,
        isBestseller: prod.isBestseller ?? false,
        isNewArrival: prod.isNewArrival ?? false,
        categoryId: prod.categoryId,
      },
      create: {
        id: prod.id,
        title: prod.title,
        slug: prod.slug,
        subtitle: prod.subtitle,
        description: prod.description,
        burnTime: prod.burnTime,
        waxType: prod.waxType,
        careInstructions: prod.careInstructions,
        shippingDetails: prod.shippingDetails,
        basePrice: prod.basePrice,
        baseMrp: prod.baseMrp,
        weightInGrams: prod.weightInGrams,
        dimensions: prod.dimensions,
        isFeatured: prod.isFeatured ?? false,
        isBestseller: prod.isBestseller ?? false,
        isNewArrival: prod.isNewArrival ?? false,
        categoryId: prod.categoryId,
      },
    });

    // Seed images
    await prisma.productImage.deleteMany({ where: { productId: createdProduct.id } });
    for (const img of prod.images) {
      await prisma.productImage.create({
        data: {
          productId: createdProduct.id,
          url: img.url,
          altText: img.altText,
          isPrimary: img.isPrimary,
          isHover: img.isHover ?? false,
          sortOrder: img.sortOrder,
        },
      });
    }

    // Seed variants
    await prisma.productVariant.deleteMany({ where: { productId: createdProduct.id } });
    for (const v of prod.variants) {
      await prisma.productVariant.create({
        data: {
          productId: createdProduct.id,
          sku: v.sku,
          name: v.name,
          scent: v.scent,
          size: v.size,
          color: v.color,
          price: v.price,
          mrp: v.mrp,
          stock: v.stock,
        },
      });
    }
  }

  // 4. Seed Banners
  console.log('🎨 Seeding banners...');
  for (const b of BANNERS) {
    await prisma.banner.upsert({
      where: { id: b.id },
      update: {
        title: b.title,
        subtitle: b.subtitle,
        ctaText: b.ctaText,
        ctaLink: b.ctaLink,
        desktopImage: b.desktopImage,
        section: b.section,
        sortOrder: b.sortOrder,
        isActive: b.isActive,
      },
      create: {
        id: b.id,
        title: b.title,
        subtitle: b.subtitle,
        ctaText: b.ctaText,
        ctaLink: b.ctaLink,
        desktopImage: b.desktopImage,
        section: b.section,
        sortOrder: b.sortOrder,
        isActive: b.isActive,
      },
    });
  }

  // 5. Seed Coupons
  console.log('🏷️ Seeding coupons...');
  for (const c of COUPONS) {
    await prisma.coupon.upsert({
      where: { code: c.code },
      update: {
        type: c.type,
        value: c.value,
        minOrderValue: c.minOrderValue,
        maxDiscount: c.maxDiscount,
      },
      create: {
        code: c.code,
        type: c.type,
        value: c.value,
        minOrderValue: c.minOrderValue,
        maxDiscount: c.maxDiscount,
      },
    });
  }

  // 6. Seed Reviews
  console.log('⭐ Seeding reviews...');
  for (const r of REVIEWS) {
    await prisma.review.upsert({
      where: { id: r.id },
      update: {
        authorName: r.authorName,
        rating: r.rating,
        title: r.title,
        comment: r.comment,
        isVerified: r.isVerified,
        isApproved: true,
      },
      create: {
        id: r.id,
        productId: r.productId,
        authorName: r.authorName,
        rating: r.rating,
        title: r.title,
        comment: r.comment,
        isVerified: r.isVerified,
        isApproved: true,
      },
    });
  }

  // 7. Store Settings
  console.log('⚙️ Seeding default store settings...');
  const settings = [
    { key: 'FREE_SHIPPING_THRESHOLD', value: '999', description: 'Free delivery on orders above this value (INR)' },
    { key: 'FLAT_SHIPPING_FEE', value: '79', description: 'Standard courier delivery rate (INR)' },
    { key: 'COD_FEE', value: '49', description: 'Cash on delivery handling fee (INR)' },
    { key: 'STORE_PHONE', value: '+91 98765 43210', description: 'Store WhatsApp and customer contact' },
    { key: 'STORE_EMAIL', value: 'support@ruharacandles.com', description: 'Customer support email' },
    { key: 'STORE_ADDRESS', value: 'Ruhara Candles Studio, DLF Phase 5, Gurugram, Haryana - 122002', description: 'Brand dispatch studio address' },
  ];

  for (const s of settings) {
    await prisma.storeSetting.upsert({
      where: { key: s.key },
      update: { value: s.value, description: s.description },
      create: { key: s.key, value: s.value, description: s.description },
    });
  }

  console.log('✅ Ruhara Candles database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
