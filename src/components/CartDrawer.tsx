import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Tag, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    updateQuantity,
    removeFromCart,
    subtotal,
    discountAmount,
    shippingFee,
    freeShippingThreshold,
    total,
    appliedDiscount,
    applyPromoCode,
    removePromoCode,
    promoCode,
    setPromoCode,
    setIsCheckoutOpen,
  } = useCart();

  const [inputCode, setInputCode] = useState('');

  if (!isCartOpen) return null;

  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const handleApplyCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCode.trim()) {
      applyPromoCode(inputCode.trim());
      setInputCode('');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FFF4F0] border-l border-[#242124]/10 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-5 bg-white border-b border-[#242124]/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#C91636]" />
              <h3 className="font-display text-lg font-bold text-[#242124]">
                Your Gloss Bag
              </h3>
              <span className="text-xs bg-[#FFB7C9]/40 text-[#C91636] font-bold px-2 py-0.5 rounded-full font-mono tabular-nums">
                {cart.length}
              </span>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              aria-label="Close bag"
              className="p-2 text-[#242124]/60 hover:text-[#242124] hover:bg-neutral-100 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-[#FFF0F4] px-5 py-3 border-b border-[#FFB7C9]/40 text-xs">
            {amountNeededForFreeShipping > 0 ? (
              <div>
                <p className="text-[#242124] font-medium flex items-center justify-between">
                  <span>Add <strong className="text-[#C91636]">₹{amountNeededForFreeShipping}</strong> more for FREE shipping</span>
                  <span className="font-bold text-[#C91636]">{Math.round(freeShippingProgress)}%</span>
                </p>
                <div className="w-full bg-[#FFB7C9]/50 h-1.5 rounded-full overflow-hidden mt-1.5">
                  <div
                    className="bg-[#C91636] h-full transition-all duration-300"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>
            ) : (
              <p className="text-emerald-700 font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>You unlocked FREE Express Shipping across India! 🎉</span>
              </p>
            )}
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-16 h-16 rounded-full bg-[#FFB7C9]/30 text-3xl flex items-center justify-center mx-auto">
                  💋
                </div>
                <h4 className="font-display text-lg font-bold text-[#242124]">
                  Your bag is currently empty
                </h4>
                <p className="text-xs text-[#242124]/60 max-w-xs mx-auto">
                  No secrets, no shine. Check out our bestselling lip glosses and lip oils!
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-2 px-6 py-2.5 bg-[#C91636] text-white rounded-full text-xs font-bold uppercase tracking-wider shadow-xs cursor-pointer"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-3.5 border border-[#242124]/10 shadow-xs flex gap-3 relative"
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-[#FFF4F0] shrink-0 border border-[#242124]/10">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <h4 className="font-display text-sm font-bold text-[#242124]">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          aria-label="Remove item"
                          className="text-[#242124]/40 hover:text-[#C91636] p-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-1.5 text-xs text-[#242124]/60 mt-0.5">
                        <span
                          className="w-2.5 h-2.5 rounded-full border border-black/15"
                          style={{ backgroundColor: item.selectedShadeHex }}
                        />
                        <span>{item.selectedShade}</span>
                      </div>
                    </div>

                    {/* Quantity & Price */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="inline-flex items-center border border-[#242124]/15 rounded-full p-0.5 bg-[#FFF4F0]">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-5 h-5 flex items-center justify-center rounded-full hover:bg-white text-[#242124] cursor-pointer"
                        >
                          <Minus className="w-2.5 h-2.5" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold font-mono tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-5 h-5 flex items-center justify-center rounded-full hover:bg-white text-[#242124] cursor-pointer"
                        >
                          <Plus className="w-2.5 h-2.5" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="font-mono font-bold text-sm text-[#242124] tabular-nums">
                          ₹{item.product.price * item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Module */}
          {cart.length > 0 && (
            <div className="p-5 bg-white border-t border-[#242124]/10 space-y-4">
              
              {/* Promo Code Input */}
              <div>
                {appliedDiscount ? (
                  <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 px-3 py-2 rounded-xl text-xs text-emerald-800">
                    <div className="flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-emerald-600" />
                      <span>
                        Code <strong>{appliedDiscount.code}</strong> applied ({appliedDiscount.description})
                      </span>
                    </div>
                    <button
                      onClick={removePromoCode}
                      className="text-xs text-[#C91636] font-bold hover:underline cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCode} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo code (TEA15 or GLOSSGIRL)"
                      value={inputCode}
                      onChange={(e) => setInputCode(e.target.value.toUpperCase())}
                      className="flex-1 px-3 py-2 border border-[#242124]/20 rounded-xl text-xs focus:outline-none focus:border-[#C91636]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#242124] hover:bg-black text-white rounded-xl text-xs font-bold cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-[#242124]/75 border-t border-[#242124]/10 pt-3">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="font-mono tabular-nums font-semibold text-[#242124]">₹{subtotal}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Discount</span>
                    <span className="font-mono tabular-nums">-₹{discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className="font-mono tabular-nums font-semibold text-[#242124]">
                    {shippingFee === 0 ? <span className="text-emerald-700">FREE</span> : `₹${shippingFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#242124] border-t border-[#242124]/10 pt-2">
                  <span>Total Amount</span>
                  <span className="font-mono tabular-nums text-[#C91636]">₹{total}</span>
                </div>
                <p className="text-[10px] text-[#242124]/50">
                  GST included. No hidden surcharges at checkout.
                </p>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full py-3.5 bg-[#C91636] hover:bg-[#a5122b] text-white rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>PROCEED TO SECURE CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
