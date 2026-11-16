import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, ArrowRight } from 'lucide-react';
import { CATEGORIES } from '@/data/seedData';
import { Badge } from '@/components/ui/Badge';

export default function CollectionsOverviewPage() {
  return (
    <div className="min-h-screen bg-cream pb-24">
      {/* Header Banner */}
      <div className="bg-gradient-to-b from-cream-200/90 to-cream border-b border-gold/25 py-14 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto space-y-3">
          <Badge variant="gold" size="md">
            Artisanal Indian Heritage
          </Badge>
          <h1 className="text-fluid-h1 font-serif font-bold text-deep">
            Explore All Collections
          </h1>
          <p className="text-sm sm:text-base text-deep/75 font-light leading-relaxed">
            From sculpted floral blooms and apothecary glass jars to hand-hammered brass urlis and
            dessert mithai candles — explore each handcrafted category poured with 100% pure soy wax.
          </p>
        </div>
      </div>

      {/* Grid of Collections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/collection/${cat.slug}`}
              className="group bg-ivory rounded-2xl border border-gold/25 p-4 shadow-warm-sm hover:shadow-warm-hover transition-all duration-500 flex flex-col justify-between"
            >
              <div>
                {/* Arch-shaped category image */}
                <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-cream-200/60 shadow-inner mb-4">
                  <Image
                    src={cat.imageUrl || ''}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep/60 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                  <span className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm text-deep text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {cat.name}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-bold text-deep group-hover:text-primary transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs sm:text-sm text-deep/70 font-light mt-1.5 line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-cream-200 flex items-center justify-between text-xs font-semibold text-primary group-hover:text-deep transition-colors">
                <span>View Products in Collection</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
