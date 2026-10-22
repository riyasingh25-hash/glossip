import React, { useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { MoodCategory, Product } from '../types';
import { useCart } from '../context/CartContext';
import { ProductCard } from './ProductCard';

interface MoodConfig {
  id: MoodCategory;
  title: string;
  subtitle: string;
  vibe: string;
  color: string;
  textColor: string;
  accentBg: string;
  image: string;
}

const MOODS: MoodConfig[] = [
  {
    id: 'soft-girl',
    title: 'The Soft Girl',
    subtitle: 'Sheer milky pinks & glazed strawberry flushes.',
    vibe: 'Pastel aesthetic • Clean girl • Freshly pinched',
    color: '#FFB7C9',
    textColor: '#8C1D2F',
    accentBg: '#FFF0F4',
    image: '/src/assets/images/product_berry_oil_1792654519280.jpg',
  },
  {
    id: 'drama-queen',
    title: 'The Drama Queen',
    subtitle: 'High-contrast bold cherries & 90s rosy brown vinyl.',
    vibe: 'Main character • Bold pigments • Head-turner',
    color: '#C91636',
    textColor: '#FFFFFF',
    accentBg: '#C91636',
    image: '/src/assets/images/hero_glossy_lips_1792654517004.jpg',
  },
  {
    id: 'gloss-addict',
    title: 'The Gloss Addict',
    subtitle: 'Zero stickiness, reflective glass lacquer & diamond pearl.',
    vibe: 'Liquid mirror • Multi-prism shimmer • 24/7 glossed',
    color: '#F32F68',
    textColor: '#FFFFFF',
    accentBg: '#F32F68',
    image: '/src/assets/images/product_swatch_macro_1792654554203.jpg',
  },
  {
    id: 'glow-getter',
    title: 'The Glow Getter',
    subtitle: '5 botanical oils, pH smart tints & 24h barrier bounce.',
    vibe: 'Dewy repair • Squalane & honey • Cloud plush applicator',
    color: '#E59866',
    textColor: '#242124',
    accentBg: '#FFF5EE',
    image: '/src/assets/images/product_nude_oil_1792654554619.jpg',
  },
];

export const ShopByMood: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<MoodCategory>('soft-girl');
  const { products } = useCart();

  const activeMoodConfig = MOODS.find((m) => m.id === selectedMood) || MOODS[0];
  const matchingProducts = products.filter((p) => p.moodCategory === selectedMood);

  return (
    <section id="shop-by-mood" className="py-16 sm:py-20 bg-white border-b border-[#242124]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#F32F68] mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CURATED VIBE CHECK</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#242124] tracking-tight">
            SHOP BY MOOD
          </h2>
          <p className="text-sm sm:text-base text-[#242124]/70 mt-2">
            Whatever your agenda today — soft-launching or causing polite chaos — we've got the exact shade and formula.
          </p>
        </div>

        {/* 4 Mood Clickable Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
          {MOODS.map((mood) => {
            const isSelected = selectedMood === mood.id;
            return (
              <div
                key={mood.id}
                onClick={() => setSelectedMood(mood.id)}
                className={`relative rounded-3xl p-5 border transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#242124] ring-2 ring-[#C91636] shadow-lg transform -translate-y-1'
                    : 'border-[#242124]/10 hover:border-[#242124]/30 hover:shadow-md'
                }`}
                style={{
                  backgroundColor: isSelected ? '#FFF4F0' : '#FFFFFF',
                }}
              >
                <div>
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-neutral-100">
                    <img
                      src={mood.image}
                      alt={mood.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>

                  <h3 className="font-display text-xl font-bold text-[#242124] tracking-tight mb-1">
                    {mood.title}
                  </h3>
                  <p className="text-xs text-[#242124]/70 mb-3">
                    {mood.subtitle}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#242124]/10 flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#C91636]">
                    {isSelected ? '● ACTIVE MOOD' : 'VIEW SHADES'}
                  </span>
                  <div
                    className="w-4 h-4 rounded-full border border-black/10"
                    style={{ backgroundColor: mood.color }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic Display of Matching Products */}
        <div className="bg-[#FFF4F0] rounded-3xl p-6 sm:p-10 border border-[#242124]/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <div className="text-xs uppercase font-bold text-[#C91636] tracking-wider mb-1">
                Showing matches for:
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#242124]">
                {activeMoodConfig.title} Collection
              </h3>
              <p className="text-xs sm:text-sm text-[#242124]/70 mt-1">
                {activeMoodConfig.vibe}
              </p>
            </div>
            <div className="text-xs text-[#242124]/60 font-medium">
              {matchingProducts.length} formulated products found
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {matchingProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
