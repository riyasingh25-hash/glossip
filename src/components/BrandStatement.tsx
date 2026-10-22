import React from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const BrandStatement: React.FC = () => {
  const { setIsQuizOpen } = useCart();

  return (
    <section className="bg-[#C91636] text-white py-16 sm:py-24 relative overflow-hidden">
      {/* Playful background stickers / accents */}
      <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-white/5 pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-80 h-80 rounded-full bg-black/10 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/15 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-[#FFF4F0]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE GLOSSIP MANIFESTO</span>
            </div>

            <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] text-[#FFF4F0]">
              WE DON'T DO <br />
              <span className="text-[#FFB7C9] italic font-serif">BORING</span> LIPS.
            </h2>

            <p className="text-base sm:text-xl text-[#FFF4F0]/90 leading-relaxed font-light max-w-xl">
              From soft-launch pinks to full-on main-character reds, GLOSSIP is here for every version of you. We formulated lip wear that feels like sheer silk, gives mirror vinyl reflection, and never makes your hair stick to your mouth.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => setIsQuizOpen(true)}
                className="px-6 py-3.5 bg-white text-[#C91636] hover:bg-[#FFF4F0] rounded-full font-bold text-sm tracking-wide transition-all shadow-md hover:shadow-lg cursor-pointer"
              >
                SPILL YOUR SHADE PREFERENCE
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/20 text-xs text-[#FFF4F0]/80">
              <div>
                <p className="font-bold text-lg text-white font-mono">0%</p>
                <p className="text-[11px] uppercase tracking-wider">Stickiness</p>
              </div>
              <div>
                <p className="font-bold text-lg text-white font-mono">100%</p>
                <p className="text-[11px] uppercase tracking-wider">Vegan & Clean</p>
              </div>
              <div>
                <p className="font-bold text-lg text-white font-mono">24H</p>
                <p className="text-[11px] uppercase tracking-wider">Hydration Lock</p>
              </div>
            </div>
          </div>

          {/* Right Editorial Visual */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md">
              <div className="rounded-3xl overflow-hidden border-4 border-white/30 shadow-2xl aspect-[4/3] bg-black/20">
                <img
                  src="/src/assets/images/editorial_lip_model_1792654519826.jpg"
                  alt="GLOSSIP model with glossy plump lips"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating aesthetic quote note */}
              <div className="absolute -bottom-4 -left-4 bg-white text-[#242124] p-4 rounded-2xl shadow-xl max-w-xs border border-[#242124]/10">
                <p className="font-handwriting text-lg text-[#C91636] leading-snug">
                  "Life is too short for dull lips and gatekept secrets."
                </p>
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#242124]/50 mt-1">
                  — The GLOSSIP Team
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
