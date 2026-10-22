import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, ShadeOption } from '../types';
import { INITIAL_PRODUCTS } from '../data/products';

interface ToastMessage {
  id: string;
  message: string;
  type?: 'success' | 'info';
}

interface CartContextType {
  products: Product[];
  updateProduct: (updated: Product) => void;
  resetProducts: () => void;
  cart: CartItem[];
  addToCart: (product: Product, shade?: ShadeOption, quantity?: number) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  selectedProductForModal: Product | null;
  openProductModal: (product: Product) => void;
  closeProductModal: () => void;
  isQuizOpen: boolean;
  setIsQuizOpen: (open: boolean) => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  promoCode: string;
  setPromoCode: (code: string) => void;
  appliedDiscount: { code: string; percent?: number; fixed?: number; description: string } | null;
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;
  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  freeShippingThreshold: number;
  total: number;
  cartCount: number;
  toasts: ToastMessage[];
  addToast: (msg: string, type?: 'success' | 'info') => void;
  removeToast: (id: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const FREE_SHIPPING_THRESHOLD = 799;
const STANDARD_SHIPPING = 70;

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Products with local storage persistence for admin edits
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('glossip_products_v1');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_PRODUCTS;
  });

  // Cart persistence
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('glossip_cart_v1');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [];
  });

  // Wishlist persistence
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('glossip_wishlist_v1');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [];
  });

  // UI Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Promo code
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<{
    code: string;
    percent?: number;
    fixed?: number;
    description: string;
  } | null>(null);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (message: string, type: 'success' | 'info' = 'success') => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 6);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 3200);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  useEffect(() => {
    try {
      localStorage.setItem('glossip_products_v1', JSON.stringify(products));
    } catch {
      // ignore
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('glossip_cart_v1', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('glossip_wishlist_v1', JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  const updateProduct = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    addToast(`Updated ${updated.name} in catalogue`);
  };

  const resetProducts = () => {
    setProducts(INITIAL_PRODUCTS);
    localStorage.removeItem('glossip_products_v1');
    addToast('Product catalogue reset to defaults');
  };

  const addToCart = (product: Product, shade?: ShadeOption, quantity = 1) => {
    const activeShade = shade || product.availableShades[0] || {
      name: product.shadeName,
      hex: product.shadeHex,
      description: '',
    };
    const cartItemId = `${product.id}-${activeShade.name}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          product,
          quantity,
          selectedShade: activeShade.name,
          selectedShadeHex: activeShade.hex,
        },
      ];
    });

    addToast(`Added "${product.name}" (${activeShade.name}) to bag! 💋`);
    setIsCartOpen(true);
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.id === cartItemId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
    addToast('Item removed from your bag');
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        addToast('Removed from wishlist');
        return prev.filter((id) => id !== productId);
      } else {
        addToast('Saved to wishlist! ❤️');
        return [...prev, productId];
      }
    });
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  const openProductModal = (product: Product) => {
    setSelectedProductForModal(product);
  };

  const closeProductModal = () => {
    setSelectedProductForModal(null);
  };

  // Promo Code Validation
  const applyPromoCode = (code: string): boolean => {
    const cleaned = code.trim().toUpperCase();
    if (cleaned === 'GLOSSGIRL') {
      setAppliedDiscount({
        code: 'GLOSSGIRL',
        percent: 10,
        description: '10% off your entire order',
      });
      addToast('Code GLOSSGIRL applied: 10% off! ✨');
      return true;
    } else if (cleaned === 'TEA15') {
      setAppliedDiscount({
        code: 'TEA15',
        percent: 15,
        description: '15% off gossip subscriber special',
      });
      addToast('Code TEA15 applied: 15% off! 🧋');
      return true;
    } else if (cleaned === 'FIRSTSIP') {
      setAppliedDiscount({
        code: 'FIRSTSIP',
        fixed: 100,
        description: '₹100 flat off first order',
      });
      addToast('Code FIRSTSIP applied: ₹100 off! 💋');
      return true;
    }
    addToast('Invalid promo code. Try TEA15 or GLOSSGIRL', 'info');
    return false;
  };

  const removePromoCode = () => {
    setAppliedDiscount(null);
    setPromoCode('');
    addToast('Promo code removed');
  };

  // Calculations
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  let discountAmount = 0;
  if (appliedDiscount) {
    if (appliedDiscount.percent) {
      discountAmount = Math.round((subtotal * appliedDiscount.percent) / 100);
    } else if (appliedDiscount.fixed) {
      discountAmount = Math.min(subtotal, appliedDiscount.fixed);
    }
  }

  const shippingFee = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING;
  const total = Math.max(0, subtotal - discountAmount + shippingFee);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        products,
        updateProduct,
        resetProducts,
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        wishlist,
        toggleWishlist,
        isWishlisted,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        selectedProductForModal,
        openProductModal,
        closeProductModal,
        isQuizOpen,
        setIsQuizOpen,
        isAdminOpen,
        setIsAdminOpen,
        isSearchOpen,
        setIsSearchOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        promoCode,
        setPromoCode,
        appliedDiscount,
        applyPromoCode,
        removePromoCode,
        subtotal,
        discountAmount,
        shippingFee,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        total,
        cartCount,
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
