'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Phone, Lock, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function LoginPage() {
  const router = useRouter();
  const [authMethod, setAuthMethod] = useState<'phone' | 'email'>('phone');
  const [identifier, setIdentifier] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'input' | 'otp'>('input');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim()) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep('otp');
    }, 600);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp.trim()) return;
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
            Ruhara Member Portal
          </span>
          <h1 className="text-fluid-h3 font-serif font-bold text-deep">
            Welcome to Ruhara
          </h1>
          <p className="text-xs text-deep/70">
            Sign in to track orders, manage addresses, and access exclusive member rewards.
          </p>
        </div>

        {/* Switch Auth Method */}
        <div className="flex bg-cream-200/60 p-1 rounded-xl border border-gold/25 text-xs font-semibold">
          <button
            type="button"
            onClick={() => {
              setAuthMethod('phone');
              setStep('input');
            }}
            className={`flex-1 py-2 rounded-lg transition-colors ${
              authMethod === 'phone' ? 'bg-white text-deep shadow-sm' : 'text-deep/60 hover:text-deep'
            }`}
          >
            Mobile OTP
          </button>
          <button
            type="button"
            onClick={() => {
              setAuthMethod('email');
              setStep('input');
            }}
            className={`flex-1 py-2 rounded-lg transition-colors ${
              authMethod === 'email' ? 'bg-white text-deep shadow-sm' : 'text-deep/60 hover:text-deep'
            }`}
          >
            Email Login
          </button>
        </div>

        {/* Form */}
        {step === 'input' ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-deep/80 block">
                {authMethod === 'phone' ? 'Mobile Number' : 'Email Address'}
              </label>
              <div className="relative">
                {authMethod === 'phone' ? (
                  <Phone className="w-4 h-4 text-deep/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                ) : (
                  <Mail className="w-4 h-4 text-deep/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                )}
                <input
                  type={authMethod === 'phone' ? 'tel' : 'email'}
                  placeholder={authMethod === 'phone' ? '10-digit mobile number' : 'you@example.com'}
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
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
              Get Verification Code
            </Button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div className="space-y-1">
              <div className="flex justify-between items-center text-xs">
                <label className="font-semibold text-deep/80">Enter 4-Digit OTP</label>
                <button
                  type="button"
                  onClick={() => setStep('input')}
                  className="text-primary text-[11px] hover:underline"
                >
                  Change {authMethod === 'phone' ? 'Number' : 'Email'}
                </button>
              </div>
              <input
                type="text"
                maxLength={4}
                placeholder="• • • •"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                autoFocus
                required
                className="w-full bg-white border border-gold/35 rounded-xl px-4 py-3 text-center text-lg tracking-[0.5em] font-mono text-deep focus:outline-none focus:border-gold"
              />
              <p className="text-[10px] text-deep/60 text-center pt-1">
                Demo code: enter any 4 digits (e.g. 1234)
              </p>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              isLoading={isLoading}
            >
              Verify &amp; Sign In
            </Button>
          </form>
        )}

        <div className="pt-4 border-t border-cream-200 text-center space-y-3">
          <p className="text-xs text-deep/70">
            Don&apos;t have an account yet?{' '}
            <Link href="/account/register" className="text-primary font-bold hover:underline">
              Register here
            </Link>
          </p>

          <Link href="/collection/all" className="text-xs text-deep/50 hover:text-deep block">
            Continue as Guest →
          </Link>
        </div>
      </div>
    </div>
  );
}
