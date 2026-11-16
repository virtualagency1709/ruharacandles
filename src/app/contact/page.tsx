'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, MessageCircle, Clock, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Order Inquiry',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-cream pb-24">
      {/* Header Banner */}
      <div className="bg-gradient-to-b from-cream-200/90 to-cream border-b border-gold/25 py-14 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-2xl mx-auto space-y-3">
          <Badge variant="gold" size="md">
            We Are Here To Assist You
          </Badge>
          <h1 className="text-fluid-h1 font-serif font-bold text-deep">
            Get In Touch
          </h1>
          <p className="text-xs sm:text-sm text-deep/70 leading-relaxed font-light">
            Have questions about a candle fragrance, corporate gifting, or tracking your delivery?
            Our Delhi NCR studio team is delighted to help.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Direct Contact Info (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-ivory rounded-3xl p-6 sm:p-8 border border-gold/30 shadow-warm-sm space-y-6">
              <h2 className="font-serif text-xl font-bold text-deep">Studio Details</h2>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-cream-100 border border-gold/30 flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-deep block">Artisanal Studio &amp; Dispatch</span>
                    <p className="text-deep/70 mt-0.5 leading-relaxed">
                      Ruhara Candles Studio, DLF Phase 5, Gurugram, Delhi NCR – 122002, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-cream-100 border border-gold/30 flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-deep block">Customer Care Hotline</span>
                    <a href="tel:+919876543210" className="text-primary hover:underline font-semibold">
                      +91 98765 43210
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-cream-100 border border-gold/30 flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-deep block">Official Email</span>
                    <a href="mailto:care@ruharacandles.com" className="text-primary hover:underline font-semibold">
                      care@ruharacandles.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-cream-100 border border-gold/30 flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-deep block">Support Hours</span>
                    <p className="text-deep/70 mt-0.5">Monday to Saturday: 10:00 AM – 7:00 PM IST</p>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp CTA */}
              <div className="pt-4 border-t border-cream-200">
                <a
                  href="https://wa.me/919876543210?text=Hi%20Ruhara%20Candles!%20I%20have%20an%20inquiry."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat With Us on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Inquiry Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-ivory rounded-3xl p-6 sm:p-10 border border-gold/30 shadow-warm-sm">
              {submitted ? (
                <div className="p-8 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-deep">Message Sent!</h3>
                  <p className="text-xs sm:text-sm text-deep/70 max-w-sm mx-auto">
                    Thank you for reaching out. One of our candle care specialists will respond to you within 24 hours.
                  </p>
                  <Button variant="secondary" size="sm" onClick={() => setSubmitted(false)}>
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h2 className="font-serif text-xl font-bold text-deep">Send Us a Message</h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-deep/80">Your Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="Radhika Sharma"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-white border border-gold/35 rounded-xl px-3.5 py-2.5 text-xs text-deep focus:outline-none focus:border-gold"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-deep/80">Your Email *</label>
                      <input
                        type="email"
                        required
                        placeholder="you@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-white border border-gold/35 rounded-xl px-3.5 py-2.5 text-xs text-deep focus:outline-none focus:border-gold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-deep/80">Phone Number (Optional)</label>
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-white border border-gold/35 rounded-xl px-3.5 py-2.5 text-xs text-deep focus:outline-none focus:border-gold"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-deep/80">Inquiry Topic</label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full bg-white border border-gold/35 rounded-xl px-3.5 py-2.5 text-xs text-deep focus:outline-none focus:border-gold"
                      >
                        <option value="Order Inquiry">Order Inquiry / Tracking</option>
                        <option value="Corporate Gifting">Festive &amp; Corporate Gifting</option>
                        <option value="Custom Candles">Custom Fragrance / Wedding Favors</option>
                        <option value="General Question">General Candle Care Advice</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-deep/80">Your Message *</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="How can we assist you today?"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-white border border-gold/35 rounded-xl p-3 text-xs text-deep focus:outline-none focus:border-gold"
                    />
                  </div>

                  <Button type="submit" variant="primary" size="lg" className="w-full">
                    Submit Message
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
