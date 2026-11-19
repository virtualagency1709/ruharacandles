'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  ShieldCheck,
  Lock,
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  Banknote,
  Truck,
  Sparkles,
} from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getSubtotal, getDiscountAmount, getShippingFee, getTotal, coupon, clearCart } = useCartStore();

  const subtotal = getSubtotal();
  const discount = getDiscountAmount();
  const shipping = getShippingFee();

  // Form State
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [fullName, setFullName] = useState('');
  const [street, setStreet] = useState('');
  const [landmark, setLandmark] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'RAZORPAY' | 'COD'>('RAZORPAY');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const codFee = paymentMethod === 'COD' ? 49 : 0;
  const total = getTotal() + codFee;

  // Auto-fill city/state on 6-digit Indian pincode
  const handlePincodeChange = (val: string) => {
    const clean = val.replace(/\D/g, '').slice(0, 6);
    setPincode(clean);

    if (clean.length === 6) {
      if (clean.startsWith('11') || clean.startsWith('12')) {
        setCity('Delhi NCR');
        setState('Delhi / Haryana');
      } else if (clean.startsWith('40') || clean.startsWith('41')) {
        setCity('Mumbai / Pune');
        setState('Maharashtra');
      } else if (clean.startsWith('56')) {
        setCity('Bengaluru');
        setState('Karnataka');
      } else if (clean.startsWith('60')) {
        setCity('Chennai');
        setState('Tamil Nadu');
      } else if (clean.startsWith('70')) {
        setCity('Kolkata');
        setState('West Bengal');
      } else if (clean.startsWith('50')) {
        setCity('Hyderabad');
        setState('Telangana');
      } else {
        setCity('India');
        setState('Standard');
      }
    }
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic Validation
    const newErrors: Record<string, string> = {};
    if (!email.trim() || !email.includes('@')) newErrors.email = 'Valid email is required';
    if (!phone.trim() || phone.length < 10) newErrors.phone = '10-digit mobile number is required';
    if (!fullName.trim()) newErrors.fullName = 'Full recipient name is required';
    if (!street.trim()) newErrors.street = 'Complete street address is required';
    if (!pincode.trim() || pincode.length !== 6) newErrors.pincode = '6-digit postal code is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      // Generate Order Number
      const orderNumber = `RC-${Date.now().toString().slice(-6)}`;

      // Save order snapshot to localStorage for demo order tracking
      const newOrder = {
        orderNumber,
        date: new Date().toISOString(),
        items: items.map((i) => ({
          ...i,
          selectedFragrance: i.selectedFragrance || i.scent || 'Rose',
          fragrance: i.selectedFragrance || i.scent || 'Rose',
        })),
        subtotal,
        discount,
        shippingFee: shipping,
        codFee,
        total,
        paymentMethod,
        paymentStatus: paymentMethod === 'COD' ? 'PENDING' : 'PAID',
        orderStatus: 'CONFIRMED',
        shippingAddress: {
          fullName,
          phone,
          street,
          landmark,
          city,
          state,
          pincode,
        },
      };

      const existingOrders = JSON.parse(localStorage.getItem('ruhara_customer_orders') || '[]');
      existingOrders.unshift(newOrder);
      localStorage.setItem('ruhara_customer_orders', JSON.stringify(existingOrders));

      // Clear Cart
      clearCart();

      // Redirect to Order Confirmation
      router.push(`/order-confirmation/${orderNumber}`);
    } catch (err) {
      console.error('Order error:', err);
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold text-deep">Your bag is empty</h2>
        <p className="text-xs text-deep/70">Please add items to your cart before proceeding to checkout.</p>
        <Link href="/collection/all">
          <Button variant="primary" size="md">Return to Shop</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream pb-24">
      {/* Distraction-Free Luxury Checkout Header */}
      <header className="border-b border-gold/25 bg-ivory/80 backdrop-blur-md py-4 px-3 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-2">
          <Link href="/cart" className="flex items-center gap-1.5 text-xs font-semibold text-deep/70 hover:text-primary transition-colors shrink-0">
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden xs:inline">Return to Bag</span>
          </Link>

          <Link href="/" className="font-serif text-lg sm:text-2xl font-bold tracking-wider text-deep text-center truncate">
            RUHARA CANDLES
          </Link>

          <div className="flex items-center gap-1.5 text-xs text-emerald-800 font-medium shrink-0">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden sm:inline">256-Bit SSL Secure</span>
          </div>
        </div>
      </header>

      {/* Main Checkout Layout */}
      <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Left Column (Inputs: Contact, Shipping, Payment) - 7 cols */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Contact Details */}
            <div className="bg-ivory rounded-2xl p-4 sm:p-6 border border-gold/30 shadow-warm-sm space-y-4">
              <h2 className="font-serif text-lg font-bold text-deep flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-deep text-cream-50 text-xs flex items-center justify-center font-sans">
                  1
                </span>
                <span>Contact Information</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-deep/80">Email for Order Updates *</label>
                  <input
                    type="email"
                    placeholder="you@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white border border-gold/35 rounded-xl px-3.5 py-2.5 text-xs text-deep focus:outline-none focus:border-gold"
                  />
                  {errors.email && <p className="text-[10px] text-red-600">{errors.email}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-deep/80">Mobile (For WhatsApp &amp; Courier) *</label>
                  <input
                    type="tel"
                    placeholder="10-digit mobile number"
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    className="w-full bg-white border border-gold/35 rounded-xl px-3.5 py-2.5 text-xs text-deep focus:outline-none focus:border-gold"
                  />
                  {errors.phone && <p className="text-[10px] text-red-600">{errors.phone}</p>}
                </div>
              </div>
            </div>

            {/* Step 2: Shipping Address */}
            <div className="bg-ivory rounded-2xl p-4 sm:p-6 border border-gold/30 shadow-warm-sm space-y-4">
              <h2 className="font-serif text-lg font-bold text-deep flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-deep text-cream-50 text-xs flex items-center justify-center font-sans">
                  2
                </span>
                <span>Delivery Address</span>
              </h2>

              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-deep/80">Recipient Full Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. Radhika Sharma"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-white border border-gold/35 rounded-xl px-3.5 py-2.5 text-xs text-deep focus:outline-none focus:border-gold"
                  />
                  {errors.fullName && <p className="text-[10px] text-red-600">{errors.fullName}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-deep/80">Flat / House No. &amp; Street Address *</label>
                  <input
                    type="text"
                    placeholder="e.g. Apt 402, Signature Towers, Golf Course Road"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    className="w-full bg-white border border-gold/35 rounded-xl px-3.5 py-2.5 text-xs text-deep focus:outline-none focus:border-gold"
                  />
                  {errors.street && <p className="text-[10px] text-red-600">{errors.street}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-deep/80">Pincode *</label>
                    <input
                      type="text"
                      maxLength={6}
                      placeholder="6 digits"
                      value={pincode}
                      onChange={(e) => handlePincodeChange(e.target.value)}
                      className="w-full bg-white border border-gold/35 rounded-xl px-3.5 py-2.5 text-xs text-deep focus:outline-none focus:border-gold font-mono"
                    />
                    {errors.pincode && <p className="text-[10px] text-red-600">{errors.pincode}</p>}
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-deep/80">City</label>
                    <input
                      type="text"
                      placeholder="City"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-white border border-gold/35 rounded-xl px-3.5 py-2.5 text-xs text-deep focus:outline-none focus:border-gold"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-deep/80">State</label>
                    <input
                      type="text"
                      placeholder="State"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full bg-white border border-gold/35 rounded-xl px-3.5 py-2.5 text-xs text-deep focus:outline-none focus:border-gold"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-deep/80">Landmark (Optional)</label>
                  <input
                    type="text"
                    placeholder="Near Central Mall"
                    value={landmark}
                    onChange={(e) => setLandmark(e.target.value)}
                    className="w-full bg-white border border-gold/35 rounded-xl px-3.5 py-2.5 text-xs text-deep focus:outline-none focus:border-gold"
                  />
                </div>
              </div>
            </div>

            {/* Step 3: Payment Method */}
            <div className="bg-ivory rounded-2xl p-4 sm:p-6 border border-gold/30 shadow-warm-sm space-y-4">
              <h2 className="font-serif text-lg font-bold text-deep flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-deep text-cream-50 text-xs flex items-center justify-center font-sans">
                  3
                </span>
                <span>Select Payment Method</span>
              </h2>

              <div className="space-y-3">
                {/* Razorpay (UPI, Cards, Netbanking) */}
                <label
                  onClick={() => setPaymentMethod('RAZORPAY')}
                  className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === 'RAZORPAY'
                      ? 'border-primary bg-cream-50 shadow-sm'
                      : 'border-gold/30 bg-white hover:bg-cream-50/50'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'RAZORPAY'}
                    onChange={() => setPaymentMethod('RAZORPAY')}
                    className="mt-1 text-primary accent-primary"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-deep">
                        Online Payment (UPI, Cards, Netbanking, Wallets)
                      </span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded-full">
                        Recommended
                      </span>
                    </div>
                    <p className="text-[11px] text-deep/60 mt-0.5">
                      Pay instantly with Google Pay, PhonePe, Paytm, Any UPI or Debit/Credit Cards via Razorpay.
                    </p>
                  </div>
                </label>

                {/* Cash on Delivery */}
                <label
                  onClick={() => setPaymentMethod('COD')}
                  className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === 'COD'
                      ? 'border-primary bg-cream-50 shadow-sm'
                      : 'border-gold/30 bg-white hover:bg-cream-50/50'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'COD'}
                    onChange={() => setPaymentMethod('COD')}
                    className="mt-1 text-primary accent-primary"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-deep">Cash on Delivery (COD)</span>
                      <span className="text-[10px] text-deep/60">+₹49 Handling Fee</span>
                    </div>
                    <p className="text-[11px] text-deep/60 mt-0.5">
                      Pay by cash or scan QR when your candle order arrives at your doorstep.
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column (Order Summary & Place Order Button) - 5 cols */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-ivory rounded-2xl p-4 sm:p-6 border border-gold/30 shadow-warm-sm space-y-5 sticky top-8">
              <h3 className="font-serif text-lg font-bold text-deep pb-3 border-b border-cream-200">
                Order Review ({items.length} {items.length === 1 ? 'item' : 'items'})
              </h3>

              {/* Items List preview */}
              <div className="max-h-60 overflow-y-auto divide-y divide-cream-200 pr-1 space-y-2">
                {items.map((item) => (
                  <div
                    key={`${item.productId}-${item.selectedFragrance || 'default'}-${item.variantId || 'default'}`}
                    className="pt-2 flex items-center gap-3"
                  >
                    <div className="relative w-12 h-14 rounded-lg overflow-hidden bg-cream-100 flex-shrink-0 border border-gold/20">
                      <Image
                        src={item.imageUrl || `/placeholders/${item.slug}.svg` || '/logo.png'}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                      <span className="absolute top-0 right-0 bg-deep text-cream-50 text-[9px] font-bold w-4 h-4 rounded-bl flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-deep truncate">{item.title}</p>
                      <p className="text-[10px] text-primary font-bold">
                        Fragrance: {item.selectedFragrance || item.scent || 'Rose'}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-deep">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Calculations */}
              <div className="space-y-2 text-xs text-deep/80 pt-3 border-t border-cream-200">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-deep">{formatPrice(subtotal)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Discount {coupon && `(${coupon.code})`}</span>
                    <span>- {formatPrice(discount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Delivery Charge</span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-emerald-700 font-bold">FREE</span>
                    ) : (
                      formatPrice(shipping)
                    )}
                  </span>
                </div>

                {paymentMethod === 'COD' && (
                  <div className="flex justify-between text-deep/70">
                    <span>COD Convenience Fee</span>
                    <span>{formatPrice(49)}</span>
                  </div>
                )}

                <div className="flex justify-between text-base font-bold text-deep pt-3 border-t border-cream-300">
                  <span>Total Payable</span>
                  <span className="font-serif text-xl text-primary">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Place Order CTA */}
              <Button
                type="submit"
                variant="primary"
                size="xl"
                className="w-full"
                isLoading={isSubmitting}
              >
                {paymentMethod === 'COD' ? 'Confirm COD Order' : 'Complete Payment with Razorpay'}
              </Button>

              <div className="pt-2 text-center text-[10px] text-deep/60 space-y-1">
                <p>By placing an order, you agree to Ruhara Candles Terms &amp; Policies.</p>
                <p>100% Secure Checkout • Direct Dispatch from Studio</p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
