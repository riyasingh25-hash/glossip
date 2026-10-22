import React from 'react';
import { Sparkles, ArrowRight, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const HeroSection: React.FC = () => {
  const { setIsQuizOpen } = useCart();

  const scrollToCatalog = () => {
    const el = document.getElementById('catalog');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative overflow-hidden bg-[#FFF4F0] pt-6 pb-12 sm:pt-10 sm:pb-20 lg:py-24 border-b border-[#242124]/10">
      {/* Playful subtle background decorative elements */}
      <div className="absolute top-12 left-10 text-[#FFB7C9]/40 text-4xl select-none pointer-events-none hidden lg:block">
        ✦
      </div>
      <div className="absolute bottom-10 left-1/3 text-[#F32F68]/20 text-5xl select-none pointer-events-none hidden lg:block">
        ★
      </div>
      <div className="absolute top-1/4 right-8 text-[#FFB7C9]/40 text-3xl select-none pointer-events-none hidden lg:block">
        ✦
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Editorial Headline & Copy */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-left">
            {/* Playful top kicker / microcopy */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFB7C9]/40 border border-[#F32F68]/30 text-xs font-bold text-[#C91636] uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#C91636]"></span>
              <span>Spill it. Gloss it.</span>
              <span className="text-[#242124]/40 font-normal">|</span>
              <span className="text-[#242124] font-medium lowercase">trending #glossipgirl</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-4xl sm:text-6xl xl:text-7xl font-extrabold text-[#242124] tracking-tight leading-[1.08] text-balance">
              YOUR LIPS. <br />
              <span className="text-[#C91636] inline-block relative">
                YOUR LORE.
                <span className="absolute -bottom-1 left-0 w-full h-3 bg-[#FFB7C9]/50 -z-10 rounded-sm transform -rotate-1"></span>
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-[#242124]/80 max-w-xl leading-relaxed font-normal">
              Glossy lips, juicy oils, and a little bit of drama. Formulated with peptide-rich shine and 100% clean moisture for your ultimate main-character aesthetic.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={scrollToCatalog}
                className="px-7 py-3.5 bg-[#C91636] hover:bg-[#a5122b] text-white rounded-full font-bold text-sm sm:text-base tracking-wide transition-all shadow-md hover:shadow-lg flex items-center gap-2 group cursor-pointer"
              >
                <span>SHOP THE GLOSS</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => setIsQuizOpen(true)}
                className="px-6 py-3.5 bg-white hover:bg-[#FFF4F0] text-[#242124] border border-[#242124]/20 rounded-full font-bold text-sm sm:text-base tracking-wide transition-all shadow-sm hover:shadow flex items-center gap-2 group cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#F32F68]" />
                <span>FIND YOUR SHADE</span>
              </button>
            </div>

            {/* Quick Proof Metrics adjacent to hero */}
            <div className="pt-4 border-t border-[#242124]/10 flex flex-wrap items-center gap-6 text-xs text-[#242124]/75">
              <div className="flex items-center gap-1.5 font-medium">
                <div className="flex text-[#C91636]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="font-bold text-[#242124]">4.9/5</span>
                <span>(1,200+ Gen Z Reviews)</span>
              </div>
              <div className="hidden sm:inline text-neutral-300">•</div>
              <div className="font-medium">
                <span className="font-bold text-[#242124]">₹250 – ₹450</span>
                <span> Affordable Luxury</span>
              </div>
              <div className="hidden sm:inline text-neutral-300">•</div>
              <div className="font-medium">
                <span>Non-sticky • 100% Vegan</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Product Editorial Showcase with Playful Stickers */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            {/* Visual Container */}
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Editorial Image Frame */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] sm:aspect-[4/3] bg-[#FFB7C9]/30">
                <img
                  src="/src/assets/images/hero_glossy_lips_1792654517004.jpg"
                  alt="High-shine wet reflection cherry red glossy lips"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
                
                {/* Subtle sheen overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                
                <div className="absolute bottom-4 left-4 right-4 text-white text-xs font-semibold flex items-center justify-between">
                  <span className="bg-[#242124]/80 backdrop-blur-md px-3 py-1 rounded-full uppercase tracking-wider text-[10px]">
                    Shade: Tea Spiller 💋
                  </span>
                  <span className="font-mono text-[11px] tabular-nums">
                    ₹349
                  </span>
                </div>
              </div>

              {/* Playful Sticker 1: Top Right "Main Character Energy" */}
              <div className="absolute -top-4 -right-2 sm:-right-4 bg-[#F32F68] text-white text-xs font-bold font-display px-3.5 py-1.5 rounded-full shadow-lg transform rotate-6 border-2 border-white select-none">
                ✨ main character energy
              </div>

              {/* Playful Sticker 2: Bottom Left "Currently Obsessed" */}
              <div className="absolute -bottom-4 -left-2 sm:-left-5 bg-[#C91636] text-white text-xs font-bold font-display px-4 py-2 rounded-full shadow-lg transform -rotate-3 border-2 border-white select-none flex items-center gap-1.5">
                <span>🍒 currently obsessed</span>
              </div>

              {/* Floating Mini Product Tag */}
              <div className="absolute -bottom-6 right-6 sm:right-8 bg-white/95 backdrop-blur-sm border border-[#242124]/10 rounded-2xl p-2.5 shadow-xl hidden sm:flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-[#FFF4F0] shrink-0 border border-[#242124]/10">
                  <img
                    src="/src/assets/images/product_cherry_gloss_1792654517846.jpg"
                    alt="GLOSSIP Lip Gloss tube"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="pr-2">
                  <p className="text-[11px] font-bold text-[#242124] uppercase">Glass Vinyl Finish</p>
                  <p className="text-[10px] text-[#242124]/70">Zero stickiness, pure shine</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
