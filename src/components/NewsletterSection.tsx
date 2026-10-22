import React, { useState } from 'react';
import { Send, Check, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { addToast, applyPromoCode } = useCart();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      addToast('Please enter a valid email address', 'info');
      return;
    }
    setSubscribed(true);
    applyPromoCode('TEA15');
    addToast('Welcome to the tea party! Code TEA15 (15% OFF) unlocked! 🧋');
  };

  return (
    <section className="bg-[#FFB7C9] py-16 sm:py-20 text-[#242124] relative overflow-hidden">
      {/* Playful background stickers */}
      <div className="absolute top-4 right-10 text-[#F32F68]/20 text-6xl select-none pointer-events-none font-display">
        GLOSSIP
      </div>
      <div className="absolute bottom-4 left-8 text-[#C91636]/15 text-5xl select-none pointer-events-none">
        💋
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/60 text-[#C91636] text-xs font-bold uppercase tracking-widest mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>VIP INNER CIRCLE</span>
        </div>

        <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#242124] tracking-tight">
          GET THE TEA FIRST.
        </h2>

        <p className="text-sm sm:text-base text-[#242124]/80 mt-3 max-w-lg mx-auto">
          New drops, exclusive secret sales, and all things glossy. Straight to your inbox before TikTok sells them out.
        </p>

        {!subscribed ? (
          <form onSubmit={handleSubmit} className="mt-8 max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-2.5">
              <input
                type="email"
                required
                placeholder="Enter your email for 15% off..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-5 py-3.5 rounded-full bg-white text-sm text-[#242124] border border-[#242124]/15 focus:outline-none focus:ring-2 focus:ring-[#C91636] placeholder:text-[#242124]/40 shadow-sm"
              />
              <button
                type="submit"
                className="px-7 py-3.5 bg-[#C91636] hover:bg-[#a5122b] text-white rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 shrink-0 cursor-pointer"
              >
                <span>SUBSCRIBE</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-[11px] text-[#242124]/60 mt-3">
              By subscribing, you agree to receive GLOSSIP beauty updates. Unsubscribe anytime. No spam, pinky promise.
            </p>
          </form>
        ) : (
          <div className="mt-6 p-4 rounded-2xl bg-white/80 border border-[#242124]/10 max-w-md mx-auto text-center animate-in zoom-in-95 duration-200">
            <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 mb-2">
              <Check className="w-4 h-4" />
            </div>
            <p className="font-bold text-sm text-[#242124]">You're on the list, gorgeous!</p>
            <p className="text-xs text-[#242124]/70 mt-1">
              Your 15% VIP discount code <strong className="text-[#C91636]">TEA15</strong> has been auto-applied to your cart.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
