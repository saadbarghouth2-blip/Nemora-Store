export interface Product {
  id: string;
  name: string;
  nameEn?: string;
  description: string;
  descriptionEn?: string;
  price: number;
  image: string;
  category: 'tshirt' | 'hoodie' | 'tank-top' | 'polo' | 'sweatshirt' | 'jacket';
  sizes: string[];
  colors: string[];
  colorsEn?: string[];
  inStock: boolean;
  basePrice: number;
  material?: string;
  materialEn?: string;
  careInstructions?: string;
  careInstructionsEn?: string;
  isNew?: boolean; 
  onSale?: boolean;
  reviews?: number;
  rating?: number;
}

// هذا الجزء هو الذي سيحل الـ 35 خطأ
export interface CartItem extends Product {
  cartItemId: string; // معرف فريد للمنتج داخل السلة (لتمييز نفس التيشيرت بمقاسين مختلفين)
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export interface Category {
  id: string;
  name: string;
  nameEn: string;
  image?: string;
}

export type Language = 'en' | 'ar' | 'eg';