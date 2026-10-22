import React, { useState, useEffect } from 'react';
import { Sparkles, ChevronRight, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ANNOUNCEMENTS = [
  { text: 'THE TEA IS HOT. THE GLOSS IS HOTTER. 💋', code: 'TEA15', actionText: 'USE CODE TEA15' },
  { text: 'FREE EXPRESS SHIPPING ACROSS INDIA ON ORDERS OVER ₹799 📦', code: 'GLOSSGIRL', actionText: 'SHOP BESTSELLERS' },
  { text: 'GET 10% OFF YOUR CART WITH CODE GLOSSGIRL ✨', code: 'GLOSSGIRL', actionText: 'COPY CODE' },
];

export const AnnouncementBar: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const { applyPromoCode, addToast } = useCart();

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  if (!visible) return null;

  const current = ANNOUNCEMENTS[index];

  const handleActionClick = () => {
    if (current.code) {
      applyPromoCode(current.code);
    } else {
      addToast('Explore our juicy catalog below!');
    }
  };

  return (
    <div
      role="banner"
      className="bg-[#C91636] text-white text-xs py-2 px-4 transition-all duration-300 relative z-40"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Left spacer for optical center balance */}
        <div className="hidden sm:flex items-center gap-1 opacity-70 text-[11px] uppercase tracking-wider font-semibold">
          <span>GLOSSIP DIRECT</span>
        </div>

        {/* Center rotating message */}
        <div className="flex-1 text-center flex items-center justify-center gap-2 font-medium tracking-wide">
          <span className="truncate">{current.text}</span>
          <button
            onClick={handleActionClick}
            className="hidden md:inline-flex items-center gap-1 underline underline-offset-2 hover:text-[#FFB7C9] transition-colors font-bold text-[11px] uppercase tracking-wider cursor-pointer"
          >
            <span>{current.actionText}</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        {/* Right close button */}
        <button
          onClick={() => setVisible(false)}
          aria-label="Dismiss announcement banner"
          className="text-white/80 hover:text-white p-1 rounded transition-colors cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
