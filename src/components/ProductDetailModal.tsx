import React, { useState } from 'react';
import {
  X,
  Heart,
  ShoppingBag,
  Star,
  Truck,
  ShieldCheck,
  RotateCcw,
  Plus,
  Minus,
  Sparkles,
  Info,
  Check,
  MapPin
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { ShadeOption } from '../types';

export const ProductDetailModal: React.FC = () => {
  const {
    selectedProductForModal,
    closeProductModal,
    addToCart,
    toggleWishlist,
    isWishlisted,
    products,
    openProductModal,
  } = useCart();

  const product = selectedProductForModal;

  // Selected shade state
  const [activeShade, setActiveShade] = useState<ShadeOption | null>(null);
  const [activeImage, setActiveImage] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [pinCode, setPinCode] = useState('');
  const [pinResult, setPinResult] = useState<{ valid: boolean; message: string; date?: string } | null>(null);
  const [activeTab, setActiveTab] = useState<'benefits' | 'ingredients' | 'how-to' | 'details'>('benefits');

  // Sync state whenever selected product changes
  React.useEffect(() => {
    if (product) {
      setActiveShade(product.availableShades[0] || {
        name: product.shadeName,
        hex: product.shadeHex,
        description: '',
      });
      setActiveImage(product.image);
      setQuantity(1);
      setPinResult(null);
    }
  }, [product]);

  if (!product) return null;

  const isFavorite = isWishlisted(product.id);
  const currentShade = activeShade || {
    name: product.shadeName,
    hex: product.shadeHex,
    description: '',
  };

  const handleCheckPin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPin = pinCode.trim();
    if (/^\d{6}$/.test(cleanPin)) {
      // Estimated delivery date (2-3 days from now)
      const date = new Date();
      date.setDate(date.getDate() + 3);
      const formattedDate = date.toLocaleDateString('en-IN', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      });
      setPinResult({
        valid: true,
        message: `Express shipping available to ${cleanPin}`,
        date: `Estimated delivery by ${formattedDate}`,
      });
    } else {
      setPinResult({
        valid: false,
        message: 'Please enter a valid 6-digit Indian PIN code',
      });
    }
  };

  const handleAddToCart = () => {
    addToCart(product, currentShade, quantity);
    closeProductModal();
  };

  // Find 2 related products
  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.productType === product.productType || p.moodCategory === product.moodCategory))
    .slice(0, 2);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/60 backdrop-blur-md overflow-y-auto">
      <div className="bg-[#FFF4F0] rounded-3xl border border-[#242124]/10 shadow-2xl max-w-4xl w-full my-auto overflow-hidden relative max-h-[92vh] flex flex-col md:flex-row">
        
        {/* Close Button */}
        <button
          onClick={closeProductModal}
          aria-label="Close product view"
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-[#242124] shadow-md transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Product Gallery */}
        <div className="md:w-1/2 p-6 flex flex-col justify-between bg-white border-b md:border-b-0 md:border-r border-[#242124]/10">
          <div>
            {/* Main Stage Image */}
            <div className="aspect-square rounded-2xl overflow-hidden bg-[#FFF4F0] relative mb-4 border border-[#242124]/10">
              <img
                src={activeImage || product.image}
                alt={`${product.name} - ${currentShade.name}`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-all duration-300"
              />

              {/* Wishlist Button inside image */}
              <button
                onClick={() => toggleWishlist(product.id)}
                aria-label="Wishlist"
                className={`absolute top-4 left-4 p-2.5 rounded-full shadow-md transition-all cursor-pointer ${
                  isFavorite ? 'bg-[#C91636] text-white' : 'bg-white/80 hover:bg-white text-[#242124]'
                }`}
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
              </button>

              {product.badge && (
                <span className="absolute top-4 right-14 bg-white/95 backdrop-blur-md text-[#242124] text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Thumbnail Selectors */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveImage(product.image)}
                className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                  activeImage === product.image ? 'border-[#C91636]' : 'border-neutral-200 opacity-70 hover:opacity-100'
                }`}
              >
                <img src={product.image} alt="Studio bottle view" className="w-full h-full object-cover" />
              </button>

              {product.secondaryImage && (
                <button
                  onClick={() => setActiveImage(product.secondaryImage!)}
                  className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                    activeImage === product.secondaryImage ? 'border-[#C91636]' : 'border-neutral-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={product.secondaryImage} alt="Texture and lip application swatch" className="w-full h-full object-cover" />
                </button>
              )}
            </div>
          </div>

          {/* Trust Guarantees */}
          <div className="grid grid-cols-3 gap-2 pt-6 mt-6 border-t border-[#242124]/10 text-center text-[10px] text-[#242124]/70 font-semibold">
            <div className="flex flex-col items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-[#C91636]" />
              <span>100% Authentic</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Truck className="w-4 h-4 text-[#C91636]" />
              <span>Pan-India Delivery</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <RotateCcw className="w-4 h-4 text-[#C91636]" />
              <span>Easy 7-Day Returns</span>
            </div>
          </div>
        </div>

        {/* Right Column: Contiguous Purchase Module */}
        <div className="md:w-1/2 p-6 sm:p-8 overflow-y-auto space-y-6">
          
          {/* Header & Price */}
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#242124]/60 uppercase tracking-wider mb-1">
              <span>{product.productType}</span>
              <span>·</span>
              <span>{product.finish}</span>
            </div>

            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#242124] tracking-tight">
              {product.name}
            </h2>

            <p className="text-xs sm:text-sm text-[#242124]/75 mt-1">
              {product.tagline}
            </p>

            {/* Price & Star Rating */}
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#242124]/10">
              <div>
                <span className="text-[11px] text-[#242124]/50 uppercase tracking-wider block font-semibold">
                  Price (Inclusive of all taxes)
                </span>
                <span className="text-2xl font-extrabold text-[#242124] font-mono tabular-nums">
                  ₹{product.price}
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-[#242124]">
                <div className="flex text-[#C91636]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="font-bold">{product.rating}</span>
                <span className="text-[#242124]/50">({product.reviewCount})</span>
              </div>
            </div>
          </div>

          {/* Shade Selection */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#242124] uppercase tracking-wider">
                Select Shade:
              </span>
              <span className="font-semibold text-[#C91636]">
                {currentShade.name}
              </span>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {product.availableShades.map((shade) => {
                const isSelected = currentShade.name === shade.name;
                return (
                  <button
                    key={shade.name}
                    type="button"
                    onClick={() => setActiveShade(shade)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#C91636] bg-[#FFB7C9]/30 text-[#242124] shadow-xs'
                        : 'border-[#242124]/15 bg-white text-[#242124]/80 hover:border-[#242124]/40'
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-black/15 shrink-0"
                      style={{ backgroundColor: shade.hex }}
                    />
                    <span>{shade.name}</span>
                  </button>
                );
              })}
            </div>
            {currentShade.description && (
              <p className="text-[11px] text-[#242124]/60 italic">
                "{currentShade.description}"
              </p>
            )}
          </div>

          {/* Stock & Quantity Stepper */}
          <div className="flex items-center justify-between pt-2">
            <div>
              <span className="text-xs font-bold text-[#242124] uppercase tracking-wider block mb-1">
                Quantity
              </span>
              <div className="inline-flex items-center bg-white border border-[#242124]/20 rounded-full p-1 shadow-xs">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-neutral-100 text-[#242124] cursor-pointer"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="w-8 text-center text-xs font-bold font-mono tabular-nums">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-neutral-100 text-[#242124] cursor-pointer"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md">
                ● {product.stock > 10 ? 'In Stock' : `Only ${product.stock} Left`}
              </span>
              <p className="text-[10px] text-[#242124]/50 mt-1">
                Net: {product.netQuantity}
              </p>
            </div>
          </div>

          {/* Primary Action Button: Prominent Cherry Red */}
          <button
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
            className="w-full py-3.5 bg-[#C91636] hover:bg-[#a5122b] text-white rounded-full font-bold text-sm uppercase tracking-wider transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>ADD TO BAG • ₹{product.price * quantity}</span>
          </button>

          {/* Indian PIN Code Delivery Checker */}
          <div className="bg-white p-4 rounded-2xl border border-[#242124]/10 shadow-xs">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#242124] uppercase tracking-wider mb-2">
              <MapPin className="w-3.5 h-3.5 text-[#C91636]" />
              <span>Check Delivery To Your PIN Code</span>
            </div>

            <form onSubmit={handleCheckPin} className="flex gap-2">
              <input
                type="text"
                maxLength={6}
                placeholder="Enter 6-digit PIN code (e.g. 400001)"
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value.replace(/\D/g, ''))}
                className="flex-1 px-3 py-2 rounded-xl border border-[#242124]/20 text-xs focus:outline-none focus:border-[#C91636]"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#242124] hover:bg-black text-white text-xs font-bold rounded-xl cursor-pointer"
              >
                Check
              </button>
            </form>

            {pinResult && (
              <div className="mt-2 text-xs">
                {pinResult.valid ? (
                  <div className="text-emerald-700">
                    <p className="font-semibold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      {pinResult.message}
                    </p>
                    <p className="text-[11px] text-[#242124]/70 mt-0.5">{pinResult.date}</p>
                  </div>
                ) : (
                  <p className="text-[#C91636] font-semibold">{pinResult.message}</p>
                )}
              </div>
            )}
          </div>

          {/* Tabs: Formula Benefits, Ingredients, Directions, Compliance */}
          <div className="border-t border-[#242124]/10 pt-4">
            <div className="flex border-b border-[#242124]/10 text-xs font-bold">
              <button
                onClick={() => setActiveTab('benefits')}
                className={`pb-2 mr-4 border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'benefits'
                    ? 'border-[#C91636] text-[#C91636]'
                    : 'border-transparent text-[#242124]/60 hover:text-[#242124]'
                }`}
              >
                Benefits
              </button>
              <button
                onClick={() => setActiveTab('ingredients')}
                className={`pb-2 mr-4 border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'ingredients'
                    ? 'border-[#C91636] text-[#C91636]'
                    : 'border-transparent text-[#242124]/60 hover:text-[#242124]'
                }`}
              >
                Ingredients
              </button>
              <button
                onClick={() => setActiveTab('how-to')}
                className={`pb-2 mr-4 border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'how-to'
                    ? 'border-[#C91636] text-[#C91636]'
                    : 'border-transparent text-[#242124]/60 hover:text-[#242124]'
                }`}
              >
                How To Use
              </button>
              <button
                onClick={() => setActiveTab('details')}
                className={`pb-2 border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'details'
                    ? 'border-[#C91636] text-[#C91636]'
                    : 'border-transparent text-[#242124]/60 hover:text-[#242124]'
                }`}
              >
                Origin Info
              </button>
            </div>

            <div className="pt-3 text-xs text-[#242124]/80 leading-relaxed min-h-[90px]">
              {activeTab === 'benefits' && (
                <ul className="space-y-1.5 list-disc pl-4">
                  {product.formulaBenefits.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              )}

              {activeTab === 'ingredients' && (
                <div className="space-y-2">
                  <p className="font-mono text-[11px] leading-relaxed text-[#242124]/70">
                    {product.ingredients}
                  </p>
                  <p className="text-[10px] text-[#242124]/50">
                    100% Cruelty-Free • Paraben-Free • Mineral Oil Free
                  </p>
                </div>
              )}

              {activeTab === 'how-to' && (
                <div className="space-y-2">
                  <p>{product.directions}</p>
                  <p className="text-[11px] text-[#C91636] font-medium">
                    Safety warning: {product.safetyWarnings}
                  </p>
                </div>
              )}

              {activeTab === 'details' && (
                <div className="space-y-1 text-[11px]">
                  <p><strong>Net Quantity:</strong> {product.netQuantity}</p>
                  <p><strong>Country of Origin:</strong> {product.origin}</p>
                  <p><strong>Manufacturer:</strong> {product.manufacturer}</p>
                  <p><strong>Shelf Life:</strong> 24 months from Mfg Date</p>
                </div>
              )}
            </div>
          </div>

          {/* Related product teaser */}
          {relatedProducts.length > 0 && (
            <div className="pt-4 border-t border-[#242124]/10">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#242124]/60 block mb-2">
                Pairs Iconically With:
              </span>
              <div className="grid grid-cols-2 gap-2">
                {relatedProducts.map((rel) => (
                  <button
                    key={rel.id}
                    onClick={() => openProductModal(rel)}
                    className="p-2 rounded-xl bg-white border border-[#242124]/10 hover:border-[#C91636] text-left flex items-center gap-2 group cursor-pointer"
                  >
                    <img src={rel.image} alt={rel.name} className="w-10 h-10 rounded-lg object-cover" />
                    <div className="overflow-hidden">
                      <p className="text-xs font-bold text-[#242124] truncate group-hover:text-[#C91636]">
                        {rel.name}
                      </p>
                      <p className="text-[11px] font-mono text-[#242124]/60 tabular-nums">
                        ₹{rel.price}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
