/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { BestsellersSection } from './components/BestsellersSection';
import { ShopByMood } from './components/ShopByMood';
import { BrandStatement } from './components/BrandStatement';
import { EditorialPanels } from './components/EditorialPanels';
import { ShadeQuizModal } from './components/ShadeQuizModal';
import { GossipRoomSection } from './components/GossipRoomSection';
import { ReviewsSection } from './components/ReviewsSection';
import { NewsletterSection } from './components/NewsletterSection';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { AdminProductManagerModal } from './components/AdminProductManagerModal';
import { SearchModal } from './components/SearchModal';
import { ToastContainer } from './components/ToastContainer';
import { Sparkles, ShoppingBag } from 'lucide-react';

const MainLayout: React.FC = () => {
  const { setIsQuizOpen, setIsCartOpen, cartCount } = useCart();

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF4F0] text-[#242124] antialiased selection:bg-[#FFB7C9] selection:text-[#C91636]">
      {/* 1. Announcement Bar */}
      <AnnouncementBar />

      {/* 2. Primary Navigation */}
      <Navbar />

      {/* 3. Hero Section */}
      <main className="flex-1">
        <HeroSection />

        {/* 4. Bestsellers & Full Catalog */}
        <BestsellersSection />

        {/* 5. Shop By Mood */}
        <ShopByMood />

        {/* 6. Brand Statement Manifesto */}
        <BrandStatement />

        {/* 7. Lip Gloss & Lip Oil Contrasting Editorial Feature */}
        <EditorialPanels />

        {/* 8. The Gossip Room */}
        <GossipRoomSection />

        {/* 9. Verified Customer Reviews */}
        <ReviewsSection />

        {/* 10. Newsletter */}
        <NewsletterSection />
      </main>

      {/* 11. Footer */}
      <Footer />

      {/* Mobile Sticky Quick Bar (Under 15% mobile viewport cap) */}
      <div className="md:hidden fixed bottom-3 left-3 right-3 z-30 flex items-center gap-2 p-1.5 bg-[#242124]/95 backdrop-blur-md rounded-full shadow-2xl border border-white/10">
        <button
          onClick={() => setIsQuizOpen(true)}
          className="flex-1 py-2 px-3 rounded-full bg-white/10 text-white text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#F32F68]" />
          <span>Shade Quiz</span>
        </button>

        <button
          onClick={() => setIsCartOpen(true)}
          className="flex-1 py-2 px-3 rounded-full bg-[#C91636] text-white text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>View Bag ({cartCount})</span>
        </button>
      </div>

      {/* Modals & Drawers */}
      <ProductDetailModal />
      <CartDrawer />
      <WishlistDrawer />
      <ShadeQuizModal />
      <CheckoutModal />
      <AdminProductManagerModal />
      <SearchModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <CartProvider>
      <MainLayout />
    </CartProvider>
  );
}
