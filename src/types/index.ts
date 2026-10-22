export type ProductType = 'Lip Gloss' | 'Lip Oil';

export type MoodCategory = 'soft-girl' | 'drama-queen' | 'gloss-addict' | 'glow-getter';

export interface ShadeOption {
  name: string;
  hex: string;
  description: string;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  shadeName: string;
  shadeHex: string;
  availableShades: ShadeOption[];
  price: number; // in INR (₹)
  productType: ProductType;
  finish: string;
  moodCategory: MoodCategory;
  image: string;
  secondaryImage?: string;
  stock: number;
  rating: number;
  reviewCount: number;
  badge?: string;
  formulaBenefits: string[];
  netQuantity: string;
  ingredients: string;
  directions: string;
  safetyWarnings: string;
  manufacturer: string;
  origin: string;
}

export interface CartItem {
  id: string; // product.id + '-' + shade
  product: Product;
  quantity: number;
  selectedShade: string;
  selectedShadeHex: string;
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  date: string;
  rating: number;
  shadePurchased: string;
  title: string;
  content: string;
  verifiedPurchase: boolean;
  helpfulCount: number;
}

export interface LipCombo {
  id: string;
  title: string;
  creatorHandle: string;
  creatorAvatar: string;
  description: string;
  products: {
    productId: string;
    productName: string;
    shade: string;
    price: number;
  }[];
  bundlePrice: number;
  tag: string;
}
