'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  User,
  Package,
  Heart,
  MapPin,
  LogOut,
  Phone,
  Mail,
  Edit2,
  Check,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Radhika Sharma',
    email: 'radhika.sharma@example.com',
    phone: '+91 98765 43210',
    address: 'Apt 402, Signature Towers, Golf Course Road, Gurugram, Haryana - 122002',
  });

  return (
    <div className="min-h-screen bg-cream pb-24">
      {/* Header Banner */}
      <div className="bg-gradient-to-b from-cream-200/90 to-cream border-b border-gold/25 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-ivory border-2 border-gold/40 flex items-center justify-center text-primary font-serif text-2xl font-bold shadow-warm-sm">
              {profile.name[0]}
            </div>
            <div>
              <span className="text-[10px] font-bold text-primary tracking-widest uppercase">
                Welcome back
              </span>
              <h1 className="text-fluid-h2 font-serif font-bold text-deep leading-tight">
                {profile.name}
              </h1>
            </div>
          </div>

          <Link href="/account/login">
            <button className="flex items-center gap-1.5 text-xs font-semibold text-deep/60 hover:text-red-600 transition-colors">
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-gold/25 pb-4 overflow-x-auto">
          <Link
            href="/account/profile"
            className="px-4 py-2 bg-deep text-cream-50 rounded-full text-xs font-semibold whitespace-nowrap shadow-sm"
          >
            My Profile
          </Link>
          <Link
            href="/account/orders"
            className="px-4 py-2 bg-ivory text-deep hover:bg-cream-100 rounded-full text-xs font-semibold border border-gold/30 whitespace-nowrap shadow-sm"
          >
            Order History
          </Link>
          <Link
            href="/account/wishlist"
            className="px-4 py-2 bg-ivory text-deep hover:bg-cream-100 rounded-full text-xs font-semibold border border-gold/30 whitespace-nowrap shadow-sm"
          >
            Saved Wishlist
          </Link>
        </div>

        {/* Profile Card */}
        <div className="bg-ivory rounded-2xl p-6 sm:p-8 border border-gold/30 shadow-warm-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-cream-200">
            <h2 className="font-serif text-lg font-bold text-deep">Personal Details</h2>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>{isEditing ? 'Done' : 'Edit Profile'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
            <div className="space-y-1">
              <span className="text-deep/60 font-medium">Full Name</span>
              <p className="font-bold text-deep text-sm">{profile.name}</p>
            </div>

            <div className="space-y-1">
              <span className="text-deep/60 font-medium">Email Address</span>
              <p className="font-bold text-deep text-sm">{profile.email}</p>
            </div>

            <div className="space-y-1">
              <span className="text-deep/60 font-medium">Phone Number</span>
              <p className="font-bold text-deep text-sm">{profile.phone}</p>
            </div>

            <div className="space-y-1">
              <span className="text-deep/60 font-medium">Primary Shipping Address</span>
              <p className="font-medium text-deep leading-relaxed">{profile.address}</p>
            </div>
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/account/orders"
            className="bg-ivory p-6 rounded-2xl border border-gold/25 shadow-warm-sm hover:shadow-warm-hover transition-all flex items-center gap-4 group"
          >
            <div className="w-12 h-12 rounded-xl bg-cream-100 flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-base font-bold text-deep">View Your Orders</h3>
              <p className="text-xs text-deep/60 mt-0.5">Track active deliveries &amp; invoices</p>
            </div>
          </Link>

          <Link
            href="/account/wishlist"
            className="bg-ivory p-6 rounded-2xl border border-gold/25 shadow-warm-sm hover:shadow-warm-hover transition-all flex items-center gap-4 group"
          >
            <div className="w-12 h-12 rounded-xl bg-cream-100 flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
              <Heart className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-base font-bold text-deep">Saved Wishlist</h3>
              <p className="text-xs text-deep/60 mt-0.5">Review candles saved for later</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
