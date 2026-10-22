import React, { useState } from 'react';
import { Search, Heart, ShoppingBag, Menu, X, Sparkles, SlidersHorizontal } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface NavbarProps {
  onNavigateSection?: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigateSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const {
    cartCount,
    setIsCartOpen,
    wishlist,
    setIsWishlistOpen,
    setIsSearchOpen,
    setIsQuizOpen,
    setIsAdminOpen,
  } = useCart();

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    if (id === 'shade-quiz') {
      setIsQuizOpen(true);
      return;
    }
    if (onNavigateSection) {
      onNavigateSection(id);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <header className="sticky top-0 z-30 bg-[#FFF4F0]/95 backdrop-blur-md border-b border-[#242124]/10 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
          {/* Zone 1: Single Brand Wordmark element */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleLinkClick('hero')}
              className="group flex items-center gap-2 text-left cursor-pointer focus:outline-none"
            >
              <div className="w-8 h-8 rounded-full bg-[#C91636] flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
                <span className="text-base select-none">💋</span>
              </div>
              <span className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-[#242124] uppercase whitespace-nowrap">
                GLOSSIP
              </span>
            </button>
          </div>

          {/* Zone 2: 4–5 single-line clean text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-[#242124]">
            <button
              onClick={() => handleLinkClick('catalog')}
              className="hover:text-[#C91636] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Shop All
            </button>
            <button
              onClick={() => handleLinkClick('lip-gloss')}
              className="hover:text-[#C91636] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Lip Gloss
            </button>
            <button
              onClick={() => handleLinkClick('lip-oils')}
              className="hover:text-[#C91636] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Lip Oils
            </button>
            <button
              onClick={() => setIsQuizOpen(true)}
              className="flex items-center gap-1.5 text-[#F32F68] hover:text-[#C91636] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Find Your Shade</span>
            </button>
            <button
              onClick={() => handleLinkClick('the-gossip')}
              className="hover:text-[#C91636] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              The Gossip
            </button>
          </nav>

          {/* Zone 3: Functional Interactive Actions */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search shades and formulas"
              className="p-2 text-[#242124] hover:text-[#C91636] hover:bg-[#FFB7C9]/30 rounded-full transition-colors cursor-pointer"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Trigger */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              aria-label="View saved wishlist"
              className="relative p-2 text-[#242124] hover:text-[#C91636] hover:bg-[#FFB7C9]/30 rounded-full transition-colors cursor-pointer"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#F32F68] text-white text-[10px] font-bold flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Bag Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Shopping bag"
              className="flex items-center gap-2 bg-[#C91636] hover:bg-[#a5122b] text-white px-3.5 py-2 rounded-full font-semibold text-xs tracking-wide transition-all shadow-sm hover:shadow cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Bag</span>
              <span className="bg-white/20 px-1.5 py-0.5 rounded-full text-[11px] tabular-nums">
                {cartCount}
              </span>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              className="md:hidden p-2 text-[#242124] hover:bg-[#FFB7C9]/30 rounded-lg transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#FFF4F0] border-b border-[#242124]/10 px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
            <button
              onClick={() => handleLinkClick('catalog')}
              className="block w-full text-left py-2 text-base font-semibold text-[#242124] hover:text-[#C91636]"
            >
              Shop All Catalogue
            </button>
            <button
              onClick={() => handleLinkClick('lip-gloss')}
              className="block w-full text-left py-2 text-base font-semibold text-[#242124] hover:text-[#C91636]"
            >
              Lip Gloss Collection
            </button>
            <button
              onClick={() => handleLinkClick('lip-oils')}
              className="block w-full text-left py-2 text-base font-semibold text-[#242124] hover:text-[#C91636]"
            >
              Nourishing Lip Oils
            </button>
            <button
              onClick={() => handleLinkClick('shade-quiz')}
              className="flex items-center gap-2 w-full text-left py-2 text-base font-bold text-[#F32F68]"
            >
              <Sparkles className="w-4 h-4" />
              <span>Find Your Shade (Quiz)</span>
            </button>
            <button
              onClick={() => handleLinkClick('the-gossip')}
              className="block w-full text-left py-2 text-base font-semibold text-[#242124] hover:text-[#C91636]"
            >
              The Gossip Room
            </button>
            <button
              onClick={() => handleLinkClick('reviews')}
              className="block w-full text-left py-2 text-base font-semibold text-[#242124] hover:text-[#C91636]"
            >
              Customer Reviews
            </button>

            <div className="pt-3 border-t border-[#242124]/10 flex items-center justify-between text-xs text-[#242124]/70">
              <span>Admin & Store Manager:</span>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsAdminOpen(true);
                }}
                className="flex items-center gap-1 font-semibold text-[#C91636] hover:underline"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Quick Price / Stock Editor</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
