'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Layers,
  Tag,
  Star,
  Image as ImageIcon,
  Truck,
  Settings,
  Bell,
  Search,
  ExternalLink,
  Menu,
  X,
  LogOut,
  Flame,
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navLinks = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Orders', href: '/admin/orders', icon: ShoppingBag, badge: '5 New' },
    { label: 'Products', href: '/admin/products', icon: Package, badge: '24' },
    { label: 'Categories', href: '/admin/categories', icon: Layers },
    { label: 'Coupons', href: '/admin/coupons', icon: Tag },
    { label: 'Reviews', href: '/admin/reviews', icon: Star, badge: '2 Pending' },
    { label: 'Banners & CMS', href: '/admin/banners', icon: ImageIcon },
    { label: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#F7F3EE] text-deep flex">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-deep/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Admin Sidebar */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-ivory border-r border-gold/25 flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Logo / Brand Header */}
          <div className="p-6 border-b border-gold/20 flex items-center justify-between">
            <Link href="/admin" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-primary/10 border border-gold/40 flex items-center justify-center text-primary">
                <Flame className="w-4 h-4 fill-gold text-primary" />
              </div>
              <div>
                <span className="font-serif text-lg font-bold text-deep block leading-none">
                  RUHARA
                </span>
                <span className="text-[9px] font-sans font-semibold text-primary uppercase tracking-widest block mt-0.5">
                  Admin Console
                </span>
              </div>
            </Link>

            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden p-1 text-deep/60 hover:text-deep"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="p-4 space-y-1">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-deep text-cream-50 shadow-warm-sm font-bold'
                      : 'text-deep/75 hover:bg-cream-200/60 hover:text-deep'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-gold' : 'text-primary'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                        isActive ? 'bg-gold text-deep' : 'bg-primary/15 text-primary'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer: Live Storefront Link & Logout */}
        <div className="p-4 border-t border-gold/20 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between p-2.5 rounded-xl bg-cream-100/80 hover:bg-cream-200 text-xs font-semibold text-deep transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-primary" />
              <span>View Live Storefront</span>
            </span>
            <span className="text-[10px] text-emerald-700 font-bold">Live</span>
          </Link>
        </div>
      </aside>

      {/* Main Admin Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-ivory/90 backdrop-blur-md border-b border-gold/25 h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 text-deep hover:text-primary"
            >
              <Menu className="w-5 h-5" />
            </button>

            <span className="font-serif text-lg font-bold text-deep hidden sm:inline">
              Store Management
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              className="relative p-2 text-deep/70 hover:text-deep rounded-full hover:bg-cream-200"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary" />
            </button>

            <div className="flex items-center gap-2 pl-3 border-l border-gold/20">
              <div className="w-8 h-8 rounded-full bg-primary text-cream-50 font-bold text-xs flex items-center justify-center">
                A
              </div>
              <div className="hidden sm:block text-left text-xs">
                <span className="font-bold text-deep block leading-tight">Ruhara Owner</span>
                <span className="text-[10px] text-primary">Master Admin</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="p-4 sm:p-6 lg:p-8 flex-1">{children}</main>
      </div>
    </div>
  );
}
