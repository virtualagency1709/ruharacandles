'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Grid, Search, ShoppingBag, User } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

interface MobileNavProps {
  onOpenCategories?: () => void;
  onOpenSearch?: () => void;
}

export default function MobileNav({ onOpenCategories, onOpenSearch }: MobileNavProps) {
  const pathname = usePathname();
  const { getItemCount, openCartDrawer } = useCartStore();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const itemCount = mounted ? getItemCount() : 0;

  // Hide sticky bottom nav on checkout page for distraction-free checkout
  if (pathname?.startsWith('/checkout')) {
    return null;
  }

  const navItems = [
    {
      label: 'Home',
      icon: Home,
      href: '/',
      isActive: pathname === '/',
    },
    {
      label: 'Catalog',
      icon: Grid,
      href: '/collection/all',
      isActive: pathname?.startsWith('/collection'),
    },
    {
      label: 'Search',
      icon: Search,
      href: '/collection/all?focusSearch=true',
      isActive: false,
    },
    {
      label: 'Bag',
      icon: ShoppingBag,
      onClick: openCartDrawer,
      badge: itemCount,
      isActive: false,
    },
    {
      label: 'Account',
      icon: User,
      href: '/account/login',
      isActive: pathname?.startsWith('/account'),
    },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-cream-50/95 backdrop-blur-md border-t border-gold/30 shadow-[0_-4px_20px_rgba(74,46,21,0.08)] py-2 px-3">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;

          if (item.onClick) {
            return (
              <button
                key={item.label}
                onClick={item.onClick}
                className="relative flex flex-col items-center justify-center py-1 px-3 text-deep hover:text-primary transition-colors focus:outline-none"
              >
                <div className="relative">
                  <Icon className="w-5 h-5 text-deep" />
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="absolute -top-1.5 -right-2 bg-primary text-cream-50 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-medium mt-1 text-deep">{item.label}</span>
              </button>
            );
          }

          return (
            <Link
              key={item.label}
              href={item.href!}
              className={`flex flex-col items-center justify-center py-1 px-3 transition-colors ${
                item.isActive ? 'text-primary font-bold' : 'text-deep/70 hover:text-deep'
              }`}
            >
              <Icon
                className={`w-5 h-5 ${item.isActive ? 'text-primary' : 'text-deep/70'}`}
              />
              <span className="text-[10px] mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
