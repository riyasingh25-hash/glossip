import React, { useState } from 'react';
import { X, Save, RotateCcw, SlidersHorizontal, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Product } from '../types';

export const AdminProductManagerModal: React.FC = () => {
  const { isAdminOpen, setIsAdminOpen, products, updateProduct, resetProducts, addToast } = useCart();
  const [selectedId, setSelectedId] = useState(products[0]?.id || 'tea-spiller');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Sync selection
  React.useEffect(() => {
    const found = products.find((p) => p.id === selectedId) || products[0];
    if (found) {
      setEditingProduct({ ...found });
    }
  }, [selectedId, products]);

  if (!isAdminOpen || !editingProduct) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      updateProduct(editingProduct);
      addToast(`Saved changes for ${editingProduct.name}! ✨`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/60 backdrop-blur-md overflow-y-auto">
      <div className="bg-white rounded-3xl border border-[#242124]/10 shadow-2xl max-w-2xl w-full my-auto overflow-hidden relative max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="p-5 bg-[#FFF4F0] border-b border-[#242124]/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-[#C91636]" />
            <div>
              <h3 className="font-display text-lg font-bold text-[#242124]">
                GLOSSIP Store Catalog Manager
              </h3>
              <p className="text-[11px] text-[#242124]/60">
                Live admin editor: tweak prices (₹), inventory stock, shades & copy
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAdminOpen(false)}
            aria-label="Close admin manager"
            className="p-2 text-[#242124]/60 hover:text-[#242124] hover:bg-white rounded-full cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5">
          
          {/* Select Product to Edit */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#242124]/70 mb-1">
              Select Formula To Configure:
            </label>
            <select
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#242124]/20 text-xs font-bold bg-white focus:outline-none focus:border-[#C91636]"
            >
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.shadeName}) — ₹{p.price} [Stock: {p.stock}]
                </option>
              ))}
            </select>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold uppercase text-[#242124]/70 mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  required
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#242124]/20 text-xs focus:outline-none focus:border-[#C91636]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-[#242124]/70 mb-1">
                  Price in INR (₹)
                </label>
                <input
                  type="number"
                  required
                  min={100}
                  max={2000}
                  value={editingProduct.price}
                  onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl border border-[#242124]/20 text-xs font-mono font-bold focus:outline-none focus:border-[#C91636]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold uppercase text-[#242124]/70 mb-1">
                  Primary Shade Name
                </label>
                <input
                  type="text"
                  required
                  value={editingProduct.shadeName}
                  onChange={(e) => setEditingProduct({ ...editingProduct, shadeName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#242124]/20 text-xs focus:outline-none focus:border-[#C91636]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-[#242124]/70 mb-1">
                  Stock Units Available
                </label>
                <input
                  type="number"
                  required
                  min={0}
                  value={editingProduct.stock}
                  onChange={(e) => setEditingProduct({ ...editingProduct, stock: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl border border-[#242124]/20 text-xs font-mono focus:outline-none focus:border-[#C91636]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase text-[#242124]/70 mb-1">
                Short Tagline / Punchy Description
              </label>
              <textarea
                rows={2}
                value={editingProduct.tagline}
                onChange={(e) => setEditingProduct({ ...editingProduct, tagline: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-[#242124]/20 text-xs focus:outline-none focus:border-[#C91636] resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold uppercase text-[#242124]/70 mb-1">
                  Product Type
                </label>
                <select
                  value={editingProduct.productType}
                  onChange={(e) => setEditingProduct({ ...editingProduct, productType: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl border border-[#242124]/20 text-xs bg-white"
                >
                  <option value="Lip Gloss">Lip Gloss</option>
                  <option value="Lip Oil">Lip Oil</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-[#242124]/70 mb-1">
                  Badge (Optional)
                </label>
                <input
                  type="text"
                  value={editingProduct.badge || ''}
                  placeholder="e.g. Bestseller, Trending"
                  onChange={(e) => setEditingProduct({ ...editingProduct, badge: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#242124]/20 text-xs"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-[#242124]/10 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={resetProducts}
                className="px-4 py-2.5 text-xs font-bold text-[#242124]/70 hover:text-[#C91636] flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All Defaults</span>
              </button>

              <button
                type="submit"
                className="px-6 py-2.5 bg-[#C91636] hover:bg-[#a5122b] text-white rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Live Changes</span>
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};
