import React, { useState } from 'react';
import { ProductCard } from './ProductCard';
import { useCart } from '../context/CartContext';
import { ProductType } from '../types';

export const BestsellersSection: React.FC = () => {
  const { products } = useCart();
  const [activeTab, setActiveTab] = useState<'all' | ProductType>('all');

  // Filter products by tab
  const filteredProducts = products.filter((p) => {
    if (activeTab === 'all') return true;
    return p.productType === activeTab;
  });

  return (
    <section id="catalog" className="py-16 sm:py-20 bg-[#FFF4F0] border-b border-[#242124]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-[#C91636] mb-2 flex items-center gap-2">
              <span>✦ TOP PICKS</span>
              <span>·</span>
              <span>VERIFIED OBSESSIONS</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#242124] tracking-tight">
              THE CURRENT OBSESSION
            </h2>
            <p className="text-sm sm:text-base text-[#242124]/70 mt-2 max-w-xl">
              Your new favourites are here. Non-sticky, glazed finishes with main-character pigmentation. Don't gatekeep.
            </p>
          </div>

          {/* Interactive Filter Control (Functional segmented button tabs) */}
          <div className="flex items-center gap-1.5 p-1 bg-white rounded-full border border-[#242124]/10 shadow-xs self-start md:self-auto">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 text-xs font-bold rounded-full transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-[#C91636] text-white shadow-xs'
                  : 'text-[#242124]/70 hover:text-[#242124]'
              }`}
            >
              All Drops ({products.length})
            </button>
            <button
              onClick={() => setActiveTab('Lip Gloss')}
              className={`px-4 py-2 text-xs font-bold rounded-full transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'Lip Gloss'
                  ? 'bg-[#C91636] text-white shadow-xs'
                  : 'text-[#242124]/70 hover:text-[#242124]'
              }`}
            >
              Lip Glosses
            </button>
            <button
              onClick={() => setActiveTab('Lip Oil')}
              className={`px-4 py-2 text-xs font-bold rounded-full transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'Lip Oil'
                  ? 'bg-[#C91636] text-white shadow-xs'
                  : 'text-[#242124]/70 hover:text-[#242124]'
              }`}
            >
              Lip Oils
            </button>
          </div>
        </div>

        {/* 4-column Grid on Desktop, 2-column on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-[#242124]/20 p-8">
            <p className="text-base font-semibold text-[#242124]">No products found in this category</p>
            <button
              onClick={() => setActiveTab('all')}
              className="mt-4 px-5 py-2 bg-[#C91636] text-white rounded-full text-xs font-bold"
            >
              View All Products
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
