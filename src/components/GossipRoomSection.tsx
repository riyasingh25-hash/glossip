import React from 'react';
import { Sparkles, ShoppingBag, Plus, ExternalLink, Heart } from 'lucide-react';
import { LIP_COMBOS } from '../data/products';
import { useCart } from '../context/CartContext';

export const GossipRoomSection: React.FC = () => {
  const { products, addToCart, addToast } = useCart();

  const handleAddCombo = (combo: typeof LIP_COMBOS[0]) => {
    // Add both products in the combo
    combo.products.forEach((cp) => {
      const prod = products.find((p) => p.id === cp.productId);
      if (prod) {
        const shadeObj = prod.availableShades.find((s) => s.name === cp.shade) || prod.availableShades[0];
        addToCart(prod, shadeObj, 1);
      }
    });
    addToast(`Added full "${combo.title}" combo bundle to bag! ✨`);
  };

  return (
    <section id="the-gossip" className="py-16 sm:py-24 bg-white border-b border-[#242124]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#F32F68] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>COMMUNITY & CREATOR DOSSIER</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#242124] tracking-tight">
              THE GOSSIP ROOM
            </h2>
            <p className="text-sm sm:text-base text-[#242124]/70 mt-2 max-w-xl">
              Lip combos, beauty secrets, and all the tea. Discover the exact formulas trending on your For You page.
            </p>
          </div>

          <div className="text-xs font-semibold text-[#242124]/60 flex items-center gap-2">
            <span>Tag us with #GLOSSIPGIRL to be featured</span>
          </div>
        </div>

        {/* 3 Editorial Lip Combo Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-14">
          {LIP_COMBOS.map((combo) => (
            <div
              key={combo.id}
              className="bg-[#FFF4F0] rounded-3xl p-6 border border-[#242124]/10 flex flex-col justify-between hover:shadow-lg transition-all duration-300 group"
            >
              <div>
                {/* Creator Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={combo.creatorAvatar}
                      alt={combo.creatorHandle}
                      className="w-9 h-9 rounded-full bg-white border border-[#242124]/10"
                    />
                    <div>
                      <p className="text-xs font-bold text-[#242124]">{combo.creatorHandle}</p>
                      <p className="text-[10px] text-[#242124]/50">GLOSSIP Beauty Creator</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#C91636] bg-white px-2.5 py-1 rounded-full border border-[#242124]/10">
                    {combo.tag}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="font-display text-xl font-bold text-[#242124] tracking-tight mb-2 group-hover:text-[#C91636] transition-colors">
                  {combo.title}
                </h3>
                <p className="text-xs text-[#242124]/75 mb-6 leading-relaxed">
                  "{combo.description}"
                </p>

                {/* Included Products List */}
                <div className="space-y-2 mb-6">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#242124]/50">
                    Formula Recipe:
                  </p>
                  {combo.products.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-white p-2.5 rounded-xl border border-[#242124]/10 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#C91636]" />
                        <span className="font-semibold text-[#242124] truncate max-w-[170px]">
                          {item.productName}
                        </span>
                      </div>
                      <span className="font-mono text-[#242124]/70 tabular-nums">
                        ₹{item.price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bundle Action */}
              <div className="pt-4 border-t border-[#242124]/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                    Combo Bundle
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono font-bold text-lg text-[#242124] tabular-nums">
                      ₹{combo.bundlePrice}
                    </span>
                    <span className="text-xs text-[#242124]/40 line-through tabular-nums">
                      ₹{combo.products.reduce((a, b) => a + b.price, 0)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleAddCombo(combo)}
                  className="px-4 py-2 bg-[#C91636] hover:bg-[#a5122b] text-white rounded-full font-bold text-xs tracking-wider transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>ADD COMBO</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pinterest / IG aesthetic inspiration grid */}
        <div className="bg-[#FFF4F0] rounded-3xl p-6 sm:p-8 border border-[#242124]/10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h4 className="font-display text-xl font-bold text-[#242124]">
                The Daily Moodboard
              </h4>
              <p className="text-xs text-[#242124]/70">
                Direct from our studio and community cameras.
              </p>
            </div>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-bold text-[#C91636] hover:underline flex items-center gap-1"
            >
              <span>Follow @glossip</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="aspect-square rounded-2xl overflow-hidden bg-white border border-[#242124]/10 relative group">
              <img
                src="/src/assets/images/hero_glossy_lips_1792654517004.jpg"
                alt="Mirror gloss lips close up"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold">
                Tea Spiller Gloss 💋
              </div>
            </div>
            <div className="aspect-square rounded-2xl overflow-hidden bg-white border border-[#242124]/10 relative group">
              <img
                src="/src/assets/images/product_swatch_macro_1792654554203.jpg"
                alt="Gloss texture swatch"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold">
                Swatches in Sun ✨
              </div>
            </div>
            <div className="aspect-square rounded-2xl overflow-hidden bg-white border border-[#242124]/10 relative group">
              <img
                src="/src/assets/images/editorial_lip_model_1792654519826.jpg"
                alt="Model smiling with lip oil"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold">
                Natural Glow @tasha 📸
              </div>
            </div>
            <div className="aspect-square rounded-2xl overflow-hidden bg-white border border-[#242124]/10 relative group">
              <img
                src="/src/assets/images/product_berry_oil_1792654519280.jpg"
                alt="Lip oil dewy drops"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold">
                Dewy Barrier Drops 🍒
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
