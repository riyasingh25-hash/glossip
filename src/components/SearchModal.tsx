import React, { useState } from 'react';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, products, openProductModal } = useCart();
  const [searchTerm, setSearchTerm] = useState('');

  if (!isSearchOpen) return null;

  const results = products.filter((p) => {
    const q = searchTerm.toLowerCase().trim();
    if (!q) return false;
    return (
      p.name.toLowerCase().includes(q) ||
      p.shadeName.toLowerCase().includes(q) ||
      p.finish.toLowerCase().includes(q) ||
      p.productType.toLowerCase().includes(q) ||
      p.tagline.toLowerCase().includes(q) ||
      p.availableShades.some((s) => s.name.toLowerCase().includes(q))
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 sm:pt-24 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#FFF4F0] rounded-3xl border border-[#242124]/10 shadow-2xl max-w-xl w-full p-6 relative max-h-[80vh] flex flex-col">
        
        {/* Close Button */}
        <button
          onClick={() => setIsSearchOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-full text-[#242124]/60 hover:text-[#242124]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Search Bar Input */}
        <div className="relative mb-4 pr-10">
          <Search className="w-5 h-5 text-[#C91636] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            autoFocus
            placeholder="Search shades (e.g. cherry, pink, oil, shimmer)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white rounded-2xl border border-[#242124]/20 text-sm font-medium focus:outline-none focus:border-[#C91636] shadow-xs"
          />
        </div>

        {/* Popular Tags */}
        {!searchTerm && (
          <div className="py-2 text-xs">
            <span className="text-[#242124]/50 block mb-2 font-bold uppercase tracking-wider">
              Trending Searches:
            </span>
            <div className="flex flex-wrap gap-2">
              {['Cherry Red', 'Lip Oil', 'Non-sticky', 'Baby Pink', 'Shimmer', 'Dewy'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSearchTerm(tag)}
                  className="px-3 py-1.5 rounded-full bg-white border border-[#242124]/10 hover:border-[#C91636] text-[#242124] text-xs transition-colors cursor-pointer"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results List */}
        <div className="flex-1 overflow-y-auto space-y-3 mt-2">
          {searchTerm && results.length === 0 && (
            <div className="text-center py-8 text-xs text-[#242124]/60">
              No lip shades found for "{searchTerm}". Try searching "cherry" or "oil".
            </div>
          )}

          {results.map((product) => (
            <div
              key={product.id}
              onClick={() => {
                setIsSearchOpen(false);
                openProductModal(product);
              }}
              className="bg-white rounded-2xl p-3 border border-[#242124]/10 hover:border-[#C91636] transition-all flex items-center justify-between cursor-pointer group shadow-xs hover:shadow"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-[#FFF4F0] shrink-0 border border-[#242124]/10">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-display text-sm font-bold text-[#242124] group-hover:text-[#C91636] transition-colors">
                    {product.name}
                  </h4>
                  <div className="flex items-center gap-2 text-[11px] text-[#242124]/60">
                    <span
                      className="w-2.5 h-2.5 rounded-full border border-black/15 inline-block"
                      style={{ backgroundColor: product.shadeHex }}
                    />
                    <span>{product.shadeName}</span>
                    <span>·</span>
                    <span>{product.finish}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-mono font-bold text-sm text-[#242124] tabular-nums">
                  ₹{product.price}
                </span>
                <ArrowRight className="w-4 h-4 text-[#242124]/30 group-hover:text-[#C91636] group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
