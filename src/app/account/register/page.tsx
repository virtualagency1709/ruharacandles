'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Mail, Phone, Lock } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push('/account/profile');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-cream py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full bg-ivory rounded-3xl p-5 sm:p-8 md:p-10 border border-gold/30 shadow-warm-lg space-y-6">
        <div className="text-center space-y-2">
          <span className="text-[10px] font-bold text-primary tracking-widest uppercase">
            Join The Ruhara Circle
          </span>
          <h1 className="text-fluid-h3 font-serif font-bold text-deep">
            Create an Account
          </h1>
          <p className="text-xs text-deep/70">
            Enjoy 10% off your first purchase and track all your candle orders easily.
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-deep/80 block">Full Name</label>
            <div className="relative">
              <User className="w-4 h-4 text-deep/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Radhika Sharma"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full bg-white border border-gold/35 rounded-xl pl-10 pr-4 py-3 text-xs text-deep focus:outline-none focus:border-gold"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-deep/80 block">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-deep/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-white border border-gold/35 rounded-xl pl-10 pr-4 py-3 text-xs text-deep focus:outline-none focus:border-gold"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-deep/80 block">Mobile Phone</label>
            <div className="relative">
              <Phone className="w-4 h-4 text-deep/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="tel"
                maxLength={10}
                placeholder="10-digit phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                required
                className="w-full bg-white border border-gold/35 rounded-xl pl-10 pr-4 py-3 text-xs text-deep focus:outline-none focus:border-gold"
              />
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            isLoading={isLoading}
          >
            Create My Account
          </Button>
        </form>

        <div className="pt-4 border-t border-cream-200 text-center">
          <p className="text-xs text-deep/70">
            Already have an account?{' '}
            <Link href="/account/login" className="text-primary font-bold hover:underline">
              Log in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
