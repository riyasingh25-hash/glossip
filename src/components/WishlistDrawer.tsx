import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const WishlistDrawer: React.FC = () => {
  const {
    isWishlistOpen,
    setIsWishlistOpen,
    wishlist,
    toggleWishlist,
    products,
    addToCart,
    openProductModal,
  } = useCart();

  if (!isWishlistOpen) return null;

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FFF4F0] border-l border-[#242124]/10 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-5 bg-white border-b border-[#242124]/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-[#C91636] fill-current" />
              <h3 className="font-display text-lg font-bold text-[#242124]">
                Your Saved Wishlist
              </h3>
              <span className="text-xs bg-[#FFB7C9]/40 text-[#C91636] font-bold px-2 py-0.5 rounded-full font-mono tabular-nums">
                {wishlistedProducts.length}
              </span>
            </div>

            <button
              onClick={() => setIsWishlistOpen(false)}
              aria-label="Close wishlist"
              className="p-2 text-[#242124]/60 hover:text-[#242124] hover:bg-neutral-100 rounded-full cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {wishlistedProducts.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-16 h-16 rounded-full bg-[#FFB7C9]/30 text-3xl flex items-center justify-center mx-auto text-[#C91636]">
                  ❤️
                </div>
                <h4 className="font-display text-lg font-bold text-[#242124]">
                  No saved shades yet
                </h4>
                <p className="text-xs text-[#242124]/60 max-w-xs mx-auto">
                  Tap the heart icon on any product card or detail view to save your favourite glosses for later.
                </p>
                <button
                  onClick={() => setIsWishlistOpen(false)}
                  className="mt-2 px-6 py-2.5 bg-[#C91636] text-white rounded-full text-xs font-bold uppercase tracking-wider shadow-xs cursor-pointer"
                >
                  Explore Drops
                </button>
              </div>
            ) : (
              wishlistedProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl p-4 border border-[#242124]/10 shadow-xs flex gap-3 relative"
                >
                  <div
                    onClick={() => {
                      setIsWishlistOpen(false);
                      openProductModal(product);
                    }}
                    className="w-20 h-20 rounded-xl overflow-hidden bg-[#FFF4F0] shrink-0 border border-[#242124]/10 cursor-pointer"
                  >
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <h4
                          onClick={() => {
                            setIsWishlistOpen(false);
                            openProductModal(product);
                          }}
                          className="font-display text-sm font-bold text-[#242124] hover:text-[#C91636] cursor-pointer"
                        >
                          {product.name}
                        </h4>
                        <button
                          onClick={() => toggleWishlist(product.id)}
                          className="text-[#242124]/40 hover:text-[#C91636] p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <p className="text-xs text-[#242124]/60 mt-0.5">
                        {product.shadeName} · {product.finish}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="font-mono font-bold text-sm text-[#242124] tabular-nums">
                        ₹{product.price}
                      </span>

                      <button
                        onClick={() => {
                          addToCart(product);
                        }}
                        className="px-3.5 py-1.5 bg-[#C91636] hover:bg-[#a5122b] text-white rounded-full text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>Move to Bag</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {wishlistedProducts.length > 0 && (
            <div className="p-5 bg-white border-t border-[#242124]/10">
              <button
                onClick={() => {
                  wishlistedProducts.forEach((p) => addToCart(p));
                  setIsWishlistOpen(false);
                }}
                className="w-full py-3 bg-[#242124] hover:bg-black text-white rounded-full font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
              >
                Add All To Bag
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
