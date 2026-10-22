import React from 'react';
import { ArrowRight, Droplets, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const EditorialPanels: React.FC = () => {
  const { openProductModal, products } = useCart();

  const cherryGloss = products.find((p) => p.id === 'tea-spiller') || products[1];
  const berryOil = products.find((p) => p.id === 'cherry-on-top') || products[5];

  return (
    <section className="py-16 sm:py-20 bg-[#FFF4F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Panel 1: LIP GLOSS */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#242124]/10 shadow-sm flex flex-col justify-between relative overflow-hidden group">
            {/* Top Tag */}
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-[#C91636] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>FORMULA FOCUS 01</span>
              </span>
              <span className="text-xs font-semibold text-[#242124]/60">
                Lacquer Glass Finish
              </span>
            </div>

            {/* Content & Typography */}
            <div className="space-y-4 mb-6">
              <h3 className="font-display text-3xl sm:text-4xl font-extrabold text-[#242124] tracking-tight">
                LIP GLOSS
              </h3>
              <p className="text-xl sm:text-2xl font-bold text-[#C91636] italic">
                “Your lips called. They want more shine.”
              </p>
              <p className="text-sm text-[#242124]/75 leading-relaxed">
                Engineered with high-refractive polymers and hyaluronic spheres that capture ambient light from every angle. No hair sticking to your mouth in the car or cafe.
              </p>

              {/* Verified formula bullet points */}
              <ul className="text-xs space-y-2 text-[#242124]/80 pt-2 font-medium">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C91636]" />
                  <span>Mirror vinyl glass reflection with zero tackiness</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C91636]" />
                  <span>Buildable sheer-to-medium juicy colour pay-off</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C91636]" />
                  <span>Enriched with Vitamin E & plant squalane</span>
                </li>
              </ul>
            </div>

            {/* Visual preview */}
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-[#FFF4F0] mb-6">
              <img
                src="/src/assets/images/product_cherry_gloss_1792654517846.jpg"
                alt="GLOSSIP High-Shine Lip Gloss tube"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Shopping Action */}
            <div className="pt-2 flex items-center justify-between">
              <div>
                <span className="text-xs text-[#242124]/50">Starting at</span>
                <p className="font-mono font-bold text-lg text-[#242124]">₹279</p>
              </div>

              <button
                onClick={() => openProductModal(cherryGloss)}
                className="px-5 py-2.5 bg-[#C91636] hover:bg-[#a5122b] text-white rounded-full font-bold text-xs tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-xs hover:shadow"
              >
                <span>SHOP LIP GLOSS</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Panel 2: LIP OILS */}
          <div className="bg-[#FFF0F4] rounded-3xl p-6 sm:p-10 border border-[#FFB7C9]/60 shadow-sm flex flex-col justify-between relative overflow-hidden group">
            {/* Top Tag */}
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-[#F32F68] flex items-center gap-1.5">
                <Droplets className="w-3.5 h-3.5" />
                <span>FORMULA FOCUS 02</span>
              </span>
              <span className="text-xs font-semibold text-[#242124]/60">
                Deep Barrier Treatment
              </span>
            </div>

            {/* Content & Typography */}
            <div className="space-y-4 mb-6">
              <h3 className="font-display text-3xl sm:text-4xl font-extrabold text-[#242124] tracking-tight">
                LIP OILS
              </h3>
              <p className="text-xl sm:text-2xl font-bold text-[#F32F68] italic">
                “Juicy-looking lips, bottled.”
              </p>
              <p className="text-sm text-[#242124]/75 leading-relaxed">
                A rich barrier cocktail of cherry seed, camellia, rosehip, and jojoba oils. Melts into lips like a restorative serum while drenching them in an irresistible dewy cushion glow.
              </p>

              {/* Verified formula bullet points */}
              <ul className="text-xs space-y-2 text-[#242124]/80 pt-2 font-medium">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F32F68]" />
                  <span>5-botanical cold-pressed restorative oil blend</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F32F68]" />
                  <span>Smart pH bloom tint technology reacts to your skin temperature</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F32F68]" />
                  <span>Jumbo cloud doe-foot applicator for 1-swipe perfection</span>
                </li>
              </ul>
            </div>

            {/* Visual preview */}
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-white mb-6">
              <img
                src="/src/assets/images/product_berry_oil_1792654519280.jpg"
                alt="GLOSSIP Hydrating Lip Oil bottle"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Shopping Action */}
            <div className="pt-2 flex items-center justify-between">
              <div>
                <span className="text-xs text-[#242124]/50">Starting at</span>
                <p className="font-mono font-bold text-lg text-[#242124]">₹399</p>
              </div>

              <button
                onClick={() => openProductModal(berryOil)}
                className="px-5 py-2.5 bg-[#F32F68] hover:bg-[#d91f54] text-white rounded-full font-bold text-xs tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-xs hover:shadow"
              >
                <span>SHOP LIP OILS</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
