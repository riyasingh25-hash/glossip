import React, { useState } from 'react';
import { Heart, Plus, Check } from 'lucide-react';
import { Product, ShadeOption } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, toggleWishlist, isWishlisted, openProductModal } = useCart();
  const [selectedShade, setSelectedShade] = useState<ShadeOption>(
    product.availableShades[0] || {
      name: product.shadeName,
      hex: product.shadeHex,
      description: '',
    }
  );
  const [isHovered, setIsHovered] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const isFavorite = isWishlisted(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, selectedShade, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  const handleCardClick = () => {
    openProductModal(product);
  };

  return (
    <div
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group bg-white rounded-3xl border border-[#242124]/10 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer relative"
    >
      {/* Top Image Container */}
      <div className="relative aspect-[4/3] bg-[#FFF4F0] overflow-hidden p-3 flex items-center justify-center">
        {/* Main Product Image with subtle fallback and secondary preview on hover */}
        <img
          src={isHovered && product.secondaryImage ? product.secondaryImage : product.image}
          alt={`${product.name} - ${selectedShade.name}`}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105"
        />

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          aria-label={isFavorite ? 'Remove from wishlist' : 'Save to wishlist'}
          className={`absolute top-5 right-5 p-2 rounded-full backdrop-blur-md transition-all z-10 cursor-pointer ${
            isFavorite
              ? 'bg-[#C91636] text-white shadow-md'
              : 'bg-white/80 hover:bg-white text-[#242124] shadow-sm'
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
        </button>

        {/* Optional 1 Clean Tag (No badge spam) */}
        {product.badge && (
          <span className="absolute top-5 left-5 bg-white/95 backdrop-blur-md text-[#242124] border border-[#242124]/10 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
            {product.badge}
          </span>
        )}

        {/* Dynamic shade preview chip inside image container */}
        <div className="absolute bottom-5 left-5 bg-black/60 backdrop-blur-md text-white text-[11px] px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
          <span
            className="w-2.5 h-2.5 rounded-full border border-white/60 shrink-0"
            style={{ backgroundColor: selectedShade.hex }}
          />
          <span className="font-medium tracking-wide truncate max-w-[120px]">
            {selectedShade.name}
          </span>
        </div>
      </div>

      {/* Card Body & Metadata */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        {/* Title, Category & Finish */}
        <div>
          <div className="flex items-center justify-between text-xs text-[#242124]/60 font-medium mb-1">
            <span>{product.productType}</span>
            <span>·</span>
            <span>{product.finish}</span>
          </div>

          <h3 className="font-display text-lg font-bold text-[#242124] tracking-tight group-hover:text-[#C91636] transition-colors">
            {product.name}
          </h3>

          <p className="text-xs text-[#242124]/70 line-clamp-1 mt-1">
            {product.tagline}
          </p>
        </div>

        {/* Shade Swatch Selector */}
        <div className="pt-1">
          <div className="flex items-center gap-2">
            {product.availableShades.map((shade) => {
              const isSelected = selectedShade.name === shade.name;
              return (
                <button
                  key={shade.name}
                  type="button"
                  title={`${shade.name} - ${shade.description}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedShade(shade);
                  }}
                  className={`w-5 h-5 rounded-full transition-transform cursor-pointer relative ${
                    isSelected
                      ? 'ring-2 ring-[#C91636] ring-offset-2 scale-110'
                      : 'hover:scale-105 opacity-85 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: shade.hex }}
                >
                  <span className="sr-only">{shade.name}</span>
                </button>
              );
            })}
            <span className="text-[11px] text-[#242124]/50 ml-1">
              {product.availableShades.length} {product.availableShades.length === 1 ? 'shade' : 'shades'}
            </span>
          </div>
        </div>

        {/* Price & Quick Add Button */}
        <div className="pt-3 border-t border-[#242124]/10 flex items-center justify-between">
          <div>
            <div className="text-xs text-[#242124]/50 uppercase tracking-wider font-semibold">
              Price
            </div>
            <div className="text-lg font-bold text-[#242124] tabular-nums font-mono">
              ₹{product.price}
            </div>
          </div>

          <button
            onClick={handleQuickAdd}
            disabled={product.stock <= 0}
            className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all flex items-center gap-1.5 cursor-pointer ${
              justAdded
                ? 'bg-emerald-600 text-white'
                : product.stock <= 0
                ? 'bg-neutral-200 text-neutral-500 cursor-not-allowed'
                : 'bg-[#C91636] hover:bg-[#a5122b] text-white shadow-xs hover:shadow'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>ADDED</span>
              </>
            ) : product.stock <= 0 ? (
              <span>OUT OF STOCK</span>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>QUICK ADD</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
