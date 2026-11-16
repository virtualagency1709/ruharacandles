import { NextResponse } from 'next/server';
import { PRODUCTS } from '@/data/seedData';
import { Product } from '@/types';

// In-memory runtime storage for API mutations
let memoryProducts: Product[] = [...PRODUCTS];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const sort = searchParams.get('sort') || 'a-z';
  const query = searchParams.get('q');

  let result = [...memoryProducts];

  if (category && category !== 'all' && category !== 'all-candles' && category !== 'candles') {
    result = result.filter((p) => p.categorySlug === category);
  }

  if (query) {
    const q = query.toLowerCase();
    result = result.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.categoryName?.toLowerCase().includes(q)
    );
  }

  // Sorting
  if (sort === 'a-z') {
    result.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sort === 'z-a') {
    result.sort((a, b) => b.title.localeCompare(a.title));
  } else if (sort === 'price-low') {
    result.sort((a, b) => a.basePrice - b.basePrice);
  } else if (sort === 'price-high') {
    result.sort((a, b) => b.basePrice - a.basePrice);
  } else if (sort === 'newest') {
    result.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
  } else if (sort === 'bestsellers') {
    result.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
  }

  return NextResponse.json({
    success: true,
    count: result.length,
    products: result,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newProduct: Product = {
      id: body.id || `prod-custom-${Date.now()}`,
      title: body.title || body.name || 'Untitled Candle',
      name: body.title || body.name,
      slug:
        body.slug ||
        (body.title || 'untitled')
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, ''),
      description: body.description || '',
      basePrice: Number(body.salePrice || body.basePrice || 399),
      salePrice: Number(body.salePrice || body.basePrice || 399),
      baseMrp: Number(body.price || body.baseMrp || 699),
      price: Number(body.price || body.baseMrp || 699),
      sku: body.sku || `RUH-${Date.now().toString().slice(-6)}`,
      stock: Number(body.stock || 20),
      availability: body.availability || 'in_stock',
      status: body.status || 'active',
      tags: body.tags || ['Handcrafted', 'Soy Wax'],
      weightInGrams: Number(body.weightInGrams || 350),
      isActive: body.isActive !== undefined ? body.isActive : true,
      isFeatured: Boolean(body.isFeatured),
      isBestseller: Boolean(body.isBestseller),
      isNewArrival: Boolean(body.isNewArrival),
      categoryId: body.categoryId || 'cat-1',
      categoryName: body.categoryName || 'Floral Candles',
      categorySlug: body.categorySlug || 'floral-candles',
      images: body.images || [],
      variants: body.variants || [],
      rating: 5.0,
      reviewCount: 1,
    };

    memoryProducts.unshift(newProduct);

    return NextResponse.json({
      success: true,
      message: 'Product created successfully',
      product: newProduct,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create product' },
      { status: 400 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Product ID is required' },
        { status: 400 }
      );
    }

    const index = memoryProducts.findIndex((p) => p.id === id);
    if (index === -1) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    memoryProducts[index] = {
      ...memoryProducts[index],
      ...updates,
    };

    return NextResponse.json({
      success: true,
      message: 'Product updated successfully',
      product: memoryProducts[index],
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update product' },
      { status: 400 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Product ID is required' },
        { status: 400 }
      );
    }

    memoryProducts = memoryProducts.filter((p) => p.id !== id);

    return NextResponse.json({
      success: true,
      message: 'Product deleted successfully',
      id,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete product' },
      { status: 400 }
    );
  }
}
