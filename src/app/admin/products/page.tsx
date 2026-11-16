'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Package, Plus, Search, Edit2, Trash2, Check } from 'lucide-react';
import { PRODUCTS } from '@/data/seedData';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

export default function AdminProductsPage() {
  const [productList, setProductList] = useState(PRODUCTS);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const filtered = productList.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchCat = selectedCategory === 'ALL' || p.categorySlug === selectedCategory;
    return matchSearch && matchCat;
  });

  const handleUpdateStock = (productId: string, newStock: number) => {
    setProductList(
      productList.map((p) =>
        p.id === productId
          ? {
              ...p,
              variants: p.variants.map((v, idx) => (idx === 0 ? { ...v, stock: newStock } : v)),
            }
          : p
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-deep">Product Inventory ({productList.length})</h1>
          <p className="text-xs text-deep/70">
            Edit live candle prices, inventory stock levels, and fragrance descriptions.
          </p>
        </div>

        <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
          Add New Candle
        </Button>
      </div>

      {/* Search & Category Filter */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-ivory p-4 rounded-2xl border border-gold/25 shadow-warm-sm">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-deep/40 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search products by title or scent..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-gold/30 rounded-xl pl-9 pr-3 py-2 text-xs text-deep focus:outline-none focus:border-gold"
          />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="bg-white border border-gold/30 rounded-xl px-3 py-2 text-xs text-deep focus:outline-none"
        >
          <option value="ALL">All Categories</option>
          <option value="floral-candles">Floral Candles</option>
          <option value="glass-jar-candles">Glass Jar Candles</option>
          <option value="concrete-jar-candles">Concrete Jar Candles</option>
          <option value="urli-candles">Urli Candles</option>
          <option value="mithai-candles">Mithai Candles</option>
          <option value="terracotta-candles">Terracotta Candles</option>
          <option value="festival-candles">Festival Candles</option>
          <option value="home-decor">Home Decor</option>
          <option value="gift-hampers">Gift Hampers</option>
        </select>
      </div>

      {/* Products Table */}
      <div className="bg-ivory rounded-2xl border border-gold/30 shadow-warm-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-cream-100/70 text-deep/70 uppercase tracking-wider text-[10px]">
              <tr className="border-b border-gold/20">
                <th className="p-4">Product</th>
                <th className="p-4">Category</th>
                <th className="p-4">Selling Price</th>
                <th className="p-4">MRP</th>
                <th className="p-4">Stock Units</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cream-100">
              {filtered.map((prod) => {
                const stock = prod.variants[0]?.stock ?? 10;
                return (
                  <tr key={prod.id} className="hover:bg-cream-50/60 font-medium">
                    <td className="p-4 flex items-center gap-3">
                      <div className="relative w-11 h-11 rounded-lg overflow-hidden bg-cream-100 flex-shrink-0 border border-gold/20">
                        <Image
                          src={prod.images[0]?.url || 'https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=800'}
                          alt={prod.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <span className="font-serif font-bold text-deep block truncate max-w-xs">
                          {prod.title}
                        </span>
                        <span className="text-[10px] text-deep/60">{prod.variants[0]?.name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-primary font-semibold">{prod.categoryName}</td>
                    <td className="p-4 font-serif font-bold text-deep">{formatPrice(prod.basePrice)}</td>
                    <td className="p-4 text-deep/45 line-through">{formatPrice(prod.baseMrp)}</td>
                    <td className="p-4">
                      <input
                        type="number"
                        min={0}
                        value={stock}
                        onChange={(e) => handleUpdateStock(prod.id, Number(e.target.value))}
                        className="w-16 bg-white border border-gold/30 rounded-lg px-2 py-1 text-center font-bold text-deep"
                      />
                    </td>
                    <td className="p-4">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        Active
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-1.5 text-deep/60 hover:text-primary">
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
