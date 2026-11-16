'use client';

import React, { useState, useMemo, useRef } from 'react';
import Image from 'next/image';
import {
  Package,
  Plus,
  Search,
  Edit2,
  Trash2,
  Check,
  Upload,
  Image as ImageIcon,
  X,
  Sparkles,
  ArrowUpDown,
  Filter,
  Eye,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '@/data/seedData';
import { Product, ProductImage } from '@/types';
import { formatPrice, calculateDiscount } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { useProductStore, getMergedProducts } from '@/store/productStore';

export default function AdminProductsPage() {
  const {
    customImages,
    productOverrides,
    deletedProductIds,
    newProducts,
    uploadProductImage,
    removeProductImage,
    setPrimaryImage,
    updateProduct,
    deleteProduct,
    addProduct,
  } = useProductStore();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'ACTIVE' | 'DRAFT'>('ALL');
  
  // Modals state
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Show toast notification
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Merge products
  const allProducts = useMemo(() => {
    return getMergedProducts(
      PRODUCTS,
      customImages,
      productOverrides,
      deletedProductIds,
      newProducts
    );
  }, [customImages, productOverrides, deletedProductIds, newProducts]);

  // Filtered products
  const filtered = useMemo(() => {
    return allProducts.filter((p) => {
      const matchSearch =
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.slug.toLowerCase().includes(search.toLowerCase()) ||
        (p.sku && p.sku.toLowerCase().includes(search.toLowerCase())) ||
        (p.categoryName && p.categoryName.toLowerCase().includes(search.toLowerCase()));

      const matchCat =
        selectedCategory === 'ALL' ||
        p.categorySlug === selectedCategory ||
        p.categoryId === selectedCategory;

      const matchStatus =
        statusFilter === 'ALL' ||
        (statusFilter === 'ACTIVE' && p.isActive !== false) ||
        (statusFilter === 'DRAFT' && p.isActive === false);

      return matchSearch && matchCat && matchStatus;
    });
  }, [allProducts, search, selectedCategory, statusFilter]);

  // Handle direct file upload for a specific product
  const handleQuickFileUpload = (e: React.ChangeEvent<HTMLInputElement>, prodId: string) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          uploadProductImage(prodId, event.target.result as string, file.name);
          showToast(`Uploaded photograph for ${file.name}`);
        }
      };
      reader.readAsDataURL(file);
    });

    e.target.value = '';
  };

  // Stock update
  const handleInlineStockUpdate = (productId: string, newStock: number) => {
    updateProduct(productId, { stock: newStock });
    showToast('Stock quantity updated');
  };

  // Status toggle
  const handleToggleStatus = (productId: string, currentActive: boolean) => {
    updateProduct(productId, { isActive: !currentActive });
    showToast(`Product ${!currentActive ? 'activated' : 'moved to draft'}`);
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-deep text-cream-50 px-4 py-3 rounded-2xl shadow-warm-xl border border-gold/40 flex items-center gap-2 text-xs font-semibold animate-in slide-in-from-bottom-4">
          <CheckCircle2 className="w-4 h-4 text-gold" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-primary tracking-widest uppercase">
              Ruhara Catalog Manager
            </span>
            <span className="text-[10px] bg-gold/20 text-deep px-2 py-0.5 rounded-full font-bold">
              {allProducts.length} Total Candles
            </span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-deep mt-0.5">
            Product Catalogue &amp; Photograph Uploader
          </h1>
          <p className="text-xs text-deep/70 max-w-xl">
            Manage live candle pricing, inventory stock, categories, and upload original candle photographs individually per product.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsAddModalOpen(true)}
            leftIcon={<Plus className="w-4 h-4" />}
          >
            Add New Candle
          </Button>
        </div>
      </div>

      {/* Controls Bar: Search, Category Filter, Status Filter */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 bg-ivory p-4 rounded-2xl border border-gold/25 shadow-warm-sm">
        {/* Search */}
        <div className="relative sm:col-span-6">
          <Search className="w-4 h-4 text-deep/40 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by title, SKU, category, or slug..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-gold/30 rounded-xl pl-9 pr-3 py-2 text-xs text-deep focus:outline-none focus:border-gold"
          />
        </div>

        {/* Category Dropdown */}
        <div className="sm:col-span-3">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full bg-white border border-gold/30 rounded-xl px-3 py-2 text-xs text-deep focus:outline-none focus:border-gold cursor-pointer"
          >
            <option value="ALL">All Categories ({allProducts.length})</option>
            {CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.slug}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div className="sm:col-span-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="w-full bg-white border border-gold/30 rounded-xl px-3 py-2 text-xs text-deep focus:outline-none focus:border-gold cursor-pointer"
          >
            <option value="ALL">All Statuses</option>
            <option value="ACTIVE">Active in Store</option>
            <option value="DRAFT">Draft / Hidden</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-ivory rounded-2xl border border-gold/30 shadow-warm-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-cream-100/70 text-deep/70 uppercase tracking-wider text-[10px]">
              <tr className="border-b border-gold/20">
                <th className="p-4">Candle Product</th>
                <th className="p-4">Photograph Status</th>
                <th className="p-4">Category</th>
                <th className="p-4">Sale Price</th>
                <th className="p-4">MRP</th>
                <th className="p-4">Stock</th>
                <th className="p-4">Store Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cream-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-deep/60">
                    No candle products matched your search filter.
                  </td>
                </tr>
              ) : (
                filtered.map((prod) => {
                  const stock = prod.stock ?? (prod.variants?.[0]?.stock ?? 10);
                  const isCustomUploaded =
                    customImages[prod.id] && customImages[prod.id].length > 0;
                  const displayImg = prod.images[0]?.url || `/placeholders/${prod.slug}.svg`;
                  const discount = calculateDiscount(prod.basePrice, prod.baseMrp);

                  return (
                    <tr key={prod.id} className="hover:bg-cream-50/70 font-medium transition-colors">
                      {/* Product Name & Thumbnail */}
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-14 rounded-lg overflow-hidden bg-cream-100 flex-shrink-0 border border-gold/25 shadow-sm">
                            <Image
                              src={displayImg}
                              alt={prod.title}
                              fill
                              className="object-cover"
                              sizes="48px"
                            />
                          </div>
                          <div className="min-w-0">
                            <span className="font-serif font-bold text-deep block truncate max-w-xs text-xs sm:text-sm">
                              {prod.title}
                            </span>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-[10px] text-deep/50 font-mono">
                                SKU: {prod.sku || `RUH-${prod.id.slice(-6).toUpperCase()}`}
                              </span>
                              {discount > 0 && (
                                <span className="text-[9px] font-bold text-sage bg-sage/10 px-1.5 py-0.2 rounded">
                                  {discount}% OFF
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Photograph Status & Direct Upload Button */}
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          {isCustomUploaded ? (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                              <CheckCircle2 className="w-3 h-3" />
                              Original Photo ({customImages[prod.id].length})
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                              <ImageIcon className="w-3 h-3" />
                              Placeholder
                            </span>
                          )}

                          {/* Quick Upload Button */}
                          <label className="cursor-pointer p-1.5 bg-white hover:bg-cream-100 text-deep/70 hover:text-primary rounded-lg border border-gold/30 transition-all shadow-sm flex items-center gap-1">
                            <Upload className="w-3 h-3" />
                            <span className="text-[10px] font-medium hidden sm:inline">Upload</span>
                            <input
                              type="file"
                              accept="image/png,image/jpeg,image/webp,image/jpg"
                              multiple
                              className="hidden"
                              onChange={(e) => handleQuickFileUpload(e, prod.id)}
                            />
                          </label>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="p-4">
                        <span className="text-primary font-semibold text-xs">
                          {prod.categoryName || 'Candles'}
                        </span>
                      </td>

                      {/* Sale Price */}
                      <td className="p-4 font-serif font-bold text-deep text-sm">
                        {formatPrice(prod.basePrice)}
                      </td>

                      {/* MRP */}
                      <td className="p-4 text-deep/45 line-through">
                        {formatPrice(prod.baseMrp)}
                      </td>

                      {/* Stock Quantity */}
                      <td className="p-4">
                        <input
                          type="number"
                          min={0}
                          value={stock}
                          onChange={(e) =>
                            handleInlineStockUpdate(prod.id, Number(e.target.value))
                          }
                          className="w-16 bg-white border border-gold/30 rounded-lg px-2 py-1 text-center font-bold text-deep focus:outline-none focus:border-gold"
                        />
                      </td>

                      {/* Store Status Toggle */}
                      <td className="p-4">
                        <button
                          onClick={() => handleToggleStatus(prod.id, prod.isActive !== false)}
                          className={`text-[10px] font-bold px-2.5 py-1 rounded-full transition-all ${
                            prod.isActive !== false
                              ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                              : 'bg-cream-200 text-deep/60 hover:bg-cream-300'
                          }`}
                        >
                          {prod.isActive !== false ? 'Active' : 'Draft'}
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setEditingProduct(prod)}
                            className="p-1.5 text-deep/70 hover:text-primary hover:bg-white rounded-lg transition-colors border border-gold/20"
                            title="Edit Candle Details & Photographs"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Are you sure you want to delete "${prod.title}"?`)) {
                                deleteProduct(prod.id);
                                showToast(`Deleted "${prod.title}"`);
                              }
                            }}
                            className="p-1.5 text-deep/40 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors border border-gold/20"
                            title="Delete Product"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Product Modal */}
      {editingProduct && (
        <EditProductModal
          product={editingProduct}
          isOpen={Boolean(editingProduct)}
          onClose={() => setEditingProduct(null)}
          onSave={(updates) => {
            updateProduct(editingProduct.id, updates);
            setEditingProduct(null);
            showToast(`Updated "${updates.title || editingProduct.title}" successfully`);
          }}
          onUploadImages={(files) => {
            Array.from(files).forEach((file) => {
              const reader = new FileReader();
              reader.onload = (e) => {
                if (e.target?.result) {
                  uploadProductImage(editingProduct.id, e.target.result as string, file.name);
                }
              };
              reader.readAsDataURL(file);
            });
            showToast('Photographs uploaded successfully');
          }}
          customImages={customImages[editingProduct.id] || []}
          onRemoveImage={(imgId) => {
            removeProductImage(editingProduct.id, imgId);
            showToast('Photograph removed');
          }}
          onSetPrimaryImage={(imgId) => {
            setPrimaryImage(editingProduct.id, imgId);
            showToast('Set as primary cover photograph');
          }}
        />
      )}

      {/* Add New Product Modal */}
      {isAddModalOpen && (
        <AddNewProductModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAdd={(newProd) => {
            addProduct(newProd);
            setIsAddModalOpen(false);
            showToast(`Created new candle "${newProd.title}"`);
          }}
        />
      )}
    </div>
  );
}

// -------------------------------------------------------------
// Edit Product Modal Component
// -------------------------------------------------------------
interface EditProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updates: Partial<Product>) => void;
  onUploadImages: (files: FileList) => void;
  customImages: ProductImage[];
  onRemoveImage: (id: string) => void;
  onSetPrimaryImage: (id: string) => void;
}

function EditProductModal({
  product,
  isOpen,
  onClose,
  onSave,
  onUploadImages,
  customImages,
  onRemoveImage,
  onSetPrimaryImage,
}: EditProductModalProps) {
  const [title, setTitle] = useState(product.title);
  const [categorySlug, setCategorySlug] = useState(product.categorySlug || 'floral-candles');
  const [basePrice, setBasePrice] = useState(product.basePrice);
  const [baseMrp, setBaseMrp] = useState(product.baseMrp);
  const [stock, setStock] = useState(product.stock ?? 20);
  const [description, setDescription] = useState(product.description || '');
  const [sku, setSku] = useState(product.sku || '');
  const [isBestseller, setIsBestseller] = useState(Boolean(product.isBestseller));
  const [isNewArrival, setIsNewArrival] = useState(Boolean(product.isNewArrival));
  const [isFeatured, setIsFeatured] = useState(Boolean(product.isFeatured));
  const [isActive, setIsActive] = useState(product.isActive !== false);

  const fileRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const matchedCategory = CATEGORIES.find((c) => c.slug === categorySlug);
    onSave({
      title,
      name: title,
      categorySlug,
      categoryName: matchedCategory?.name || 'Candles',
      categoryId: matchedCategory?.id || 'cat-1',
      basePrice: Number(basePrice),
      salePrice: Number(basePrice),
      baseMrp: Number(baseMrp),
      price: Number(baseMrp),
      stock: Number(stock),
      description,
      sku,
      isBestseller,
      isNewArrival,
      isFeatured,
      isActive,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="fixed inset-0 bg-deep/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-cream-50 w-full max-w-2xl rounded-3xl border border-gold/30 shadow-warm-xl z-10 max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-gold/20">
          <div>
            <span className="text-[10px] font-bold text-primary tracking-widest uppercase">
              Product Editor
            </span>
            <h2 className="font-serif text-xl font-bold text-deep">Edit Candle Details</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-deep/60 hover:text-deep">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Gallery & Photograph Upload Section */}
        <div className="space-y-3 bg-ivory p-4 rounded-2xl border border-gold/25">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif text-sm font-bold text-deep">
                Original Candle Photographs
              </h3>
              <p className="text-[11px] text-deep/60">
                Upload your high-res studio photos. They will automatically replace the placeholder.
              </p>
            </div>
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="px-3 py-1.5 bg-primary hover:bg-deep text-cream-50 text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Upload className="w-3.5 h-3.5 text-gold" />
              <span>Add Photos</span>
            </button>
            <input
              ref={fileRef}
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files) onUploadImages(e.target.files);
                e.target.value = '';
              }}
            />
          </div>

          {/* Photo Thumbnails */}
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2.5 pt-2">
            {customImages.length > 0 ? (
              customImages.map((img) => (
                <div
                  key={img.id}
                  className={`group relative aspect-[4/5] rounded-xl overflow-hidden border-2 bg-white ${
                    img.isPrimary ? 'border-primary ring-2 ring-primary/20' : 'border-gold/30'
                  }`}
                >
                  <Image src={img.url} alt="" fill className="object-cover" />
                  <div className="absolute inset-0 bg-deep/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1 p-1">
                    {!img.isPrimary && (
                      <button
                        type="button"
                        onClick={() => onSetPrimaryImage(img.id)}
                        className="text-[9px] bg-white text-deep px-1.5 py-0.5 rounded font-bold hover:bg-primary hover:text-white"
                      >
                        Set Cover
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => onRemoveImage(img.id)}
                      className="text-[9px] bg-rose-600 text-white px-1.5 py-0.5 rounded font-bold"
                    >
                      Remove
                    </button>
                  </div>
                  {img.isPrimary && (
                    <span className="absolute bottom-1 left-1 bg-primary text-cream-50 text-[8px] font-bold px-1 rounded">
                      Cover
                    </span>
                  )}
                </div>
              ))
            ) : (
              <div className="col-span-full py-4 px-3 border border-dashed border-gold/40 rounded-xl text-center bg-cream-100/50">
                <ImageIcon className="w-6 h-6 text-primary mx-auto mb-1 opacity-60" />
                <p className="text-xs font-semibold text-deep">Currently displaying individual placeholder</p>
                <p className="text-[10px] text-deep/60">
                  Placeholder URL: <code className="text-primary">/placeholders/{product.slug}.svg</code>
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Product Details Form */}
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-deep/80 block mb-1">
              Candle Name / Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full bg-white border border-gold/30 rounded-xl px-3 py-2 text-xs text-deep focus:outline-none focus:border-gold"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-deep/80 block mb-1">
                Category
              </label>
              <select
                value={categorySlug}
                onChange={(e) => setCategorySlug(e.target.value)}
                className="w-full bg-white border border-gold/30 rounded-xl px-3 py-2 text-xs text-deep focus:outline-none focus:border-gold"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-deep/80 block mb-1">
                SKU Code
              </label>
              <input
                type="text"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                className="w-full bg-white border border-gold/30 rounded-xl px-3 py-2 text-xs text-deep focus:outline-none focus:border-gold font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-deep/80 block mb-1">
                Sale Price (₹)
              </label>
              <input
                type="number"
                min={0}
                value={basePrice}
                onChange={(e) => setBasePrice(Number(e.target.value))}
                required
                className="w-full bg-white border border-gold/30 rounded-xl px-3 py-2 text-xs text-deep font-bold focus:outline-none focus:border-gold"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-deep/80 block mb-1">
                MRP (₹)
              </label>
              <input
                type="number"
                min={0}
                value={baseMrp}
                onChange={(e) => setBaseMrp(Number(e.target.value))}
                required
                className="w-full bg-white border border-gold/30 rounded-xl px-3 py-2 text-xs text-deep/70 focus:outline-none focus:border-gold"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-deep/80 block mb-1">
                Stock Quantity
              </label>
              <input
                type="number"
                min={0}
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
                required
                className="w-full bg-white border border-gold/30 rounded-xl px-3 py-2 text-xs text-deep font-bold focus:outline-none focus:border-gold"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-deep/80 block mb-1">
              Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-white border border-gold/30 rounded-xl p-3 text-xs text-deep focus:outline-none focus:border-gold leading-relaxed"
            />
          </div>

          {/* Badges / Checkboxes */}
          <div className="flex flex-wrap items-center gap-6 pt-2">
            <label className="flex items-center gap-2 text-xs text-deep cursor-pointer font-semibold">
              <input
                type="checkbox"
                checked={isBestseller}
                onChange={(e) => setIsBestseller(e.target.checked)}
                className="rounded text-primary accent-primary"
              />
              <span>Best Seller</span>
            </label>

            <label className="flex items-center gap-2 text-xs text-deep cursor-pointer font-semibold">
              <input
                type="checkbox"
                checked={isNewArrival}
                onChange={(e) => setIsNewArrival(e.target.checked)}
                className="rounded text-primary accent-primary"
              />
              <span>New Arrival</span>
            </label>

            <label className="flex items-center gap-2 text-xs text-deep cursor-pointer font-semibold">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="rounded text-primary accent-primary"
              />
              <span>Featured Spotlight</span>
            </label>

            <label className="flex items-center gap-2 text-xs text-deep cursor-pointer font-semibold">
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="rounded text-primary accent-primary"
              />
              <span>Active on Store</span>
            </label>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gold/20">
            <Button variant="secondary" size="sm" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit">
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// Add New Product Modal Component
// -------------------------------------------------------------
interface AddNewProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (product: Product) => void;
}

function AddNewProductModal({ isOpen, onClose, onAdd }: AddNewProductModalProps) {
  const [title, setTitle] = useState('');
  const [categorySlug, setCategorySlug] = useState('floral-candles');
  const [basePrice, setBasePrice] = useState(499);
  const [baseMrp, setBaseMrp] = useState(899);
  const [stock, setStock] = useState(25);
  const [description, setDescription] = useState('');
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    const matchedCategory = CATEGORIES.find((c) => c.slug === categorySlug);
    const newId = `prod-custom-${Date.now()}`;

    const images: ProductImage[] =
      uploadedPhotos.length > 0
        ? uploadedPhotos.map((url, i) => ({
            id: `img-${Date.now()}-${i}`,
            url,
            isPrimary: i === 0,
            sortOrder: i + 1,
          }))
        : [
            {
              id: `img-${newId}-1`,
              url: `/placeholders/test.svg`,
              isPrimary: true,
              sortOrder: 1,
            },
          ];

    onAdd({
      id: newId,
      title,
      name: title,
      slug,
      subtitle: `${matchedCategory?.name || 'Candles'} · 100% Pure Soy Wax`,
      description:
        description ||
        `Handcrafted with devotion in India, the ${title} is hand-poured using 100% pure botanical soy wax infused with delicate essential oils.`,
      basePrice: Number(basePrice),
      salePrice: Number(basePrice),
      baseMrp: Number(baseMrp),
      price: Number(baseMrp),
      sku: `RUH-${Date.now().toString().slice(-6)}`,
      stock: Number(stock),
      weightInGrams: 350,
      dimensions: '3.5 x 3.5 inches',
      isActive: true,
      categoryId: matchedCategory?.id || 'cat-1',
      categoryName: matchedCategory?.name || 'Floral Candles',
      categorySlug: categorySlug,
      images,
      variants: [
        {
          id: `var-${newId}-std`,
          sku: `RUH-${Date.now().toString().slice(-6)}-STD`,
          name: 'Standard Edition',
          price: Number(basePrice),
          mrp: Number(baseMrp),
          stock: Number(stock),
        },
      ],
      rating: 5.0,
      reviewCount: 1,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="fixed inset-0 bg-deep/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-cream-50 w-full max-w-xl rounded-3xl border border-gold/30 shadow-warm-xl z-10 max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-gold/20">
          <div>
            <span className="text-[10px] font-bold text-primary tracking-widest uppercase">
              New Candle Creator
            </span>
            <h2 className="font-serif text-xl font-bold text-deep">Add Candle to Store</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-deep/60 hover:text-deep">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-deep/80 block mb-1">
              Candle Name
            </label>
            <input
              type="text"
              placeholder="e.g. Amber Lotus Ribbed Jar Candle"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full bg-white border border-gold/30 rounded-xl px-3 py-2 text-xs text-deep focus:outline-none focus:border-gold"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-deep/80 block mb-1">
                Category
              </label>
              <select
                value={categorySlug}
                onChange={(e) => setCategorySlug(e.target.value)}
                className="w-full bg-white border border-gold/30 rounded-xl px-3 py-2 text-xs text-deep focus:outline-none focus:border-gold"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-deep/80 block mb-1">
                Initial Stock
              </label>
              <input
                type="number"
                min={1}
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
                required
                className="w-full bg-white border border-gold/30 rounded-xl px-3 py-2 text-xs text-deep focus:outline-none focus:border-gold"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-deep/80 block mb-1">
                Sale Price (₹)
              </label>
              <input
                type="number"
                min={1}
                value={basePrice}
                onChange={(e) => setBasePrice(Number(e.target.value))}
                required
                className="w-full bg-white border border-gold/30 rounded-xl px-3 py-2 text-xs text-deep font-bold focus:outline-none focus:border-gold"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-deep/80 block mb-1">
                MRP (₹)
              </label>
              <input
                type="number"
                min={1}
                value={baseMrp}
                onChange={(e) => setBaseMrp(Number(e.target.value))}
                required
                className="w-full bg-white border border-gold/30 rounded-xl px-3 py-2 text-xs text-deep/70 focus:outline-none focus:border-gold"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-deep/80 block mb-1">
              Description
            </label>
            <textarea
              rows={3}
              placeholder="Detailed artisanal description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-white border border-gold/30 rounded-xl p-3 text-xs text-deep focus:outline-none focus:border-gold leading-relaxed"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-gold/20">
            <Button variant="secondary" size="sm" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit">
              Publish Candle
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
