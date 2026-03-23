export type Category = 'Men' | 'Women' | 'Accessories' | 'Shoes';
export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';
export type Color = {
  name: string;
  hex: string;
};

export interface Product {
  id: string;
  name: string;
  price: number;
  category: Category;
  description: string;
  images: string[];
  sizes: Size[];
  colors: Color[];
  isNew?: boolean;
  isSale?: boolean;
  salePrice?: number;
  rating: number;
  reviewsCount: number;
}

export interface CartItem extends Product {
  selectedSize: Size;
  selectedColor: Color;
  quantity: number;
}

export interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, size: Size, color: Color, quantity?: number) => void;
  removeFromCart: (id: string, size: Size, color: Color) => void;
  updateQuantity: (id: string, size: Size, color: Color, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  itemCount: number;
}
