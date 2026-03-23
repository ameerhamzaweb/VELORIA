import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Size, Color, CartContextType } from '../types';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('veloria_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('veloria_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product, size: Size, color: Color, quantity: number = 1) => {
    if (!color || !size) return;
    setCart((prev) => {
      const existingItemIndex = prev.findIndex(
        (item) => item.id === product.id && item.selectedSize === size && item.selectedColor?.hex === color?.hex
      );

      if (existingItemIndex > -1) {
        return prev.map((item, index) => 
          index === existingItemIndex 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...prev, { ...product, selectedSize: size, selectedColor: color, quantity }];
    });
  };

  const removeFromCart = (id: string, size: Size, color: Color) => {
    setCart((prev) => prev.filter(
      (item) => !(item.id === id && item.selectedSize === size && item.selectedColor?.hex === (color?.hex || ''))
    ));
  };

  const updateQuantity = (id: string, size: Size, color: Color, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(id, size, color);
      return;
    }
    setCart((prev) => prev.map((item) => 
      (item.id === id && item.selectedSize === size && item.selectedColor?.hex === (color?.hex || ''))
        ? { ...item, quantity }
        : item
    ));
  };

  const clearCart = () => setCart([]);

  const subtotal = cart.reduce((acc, item) => acc + (item.salePrice || item.price) * item.quantity, 0);
  const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, subtotal, itemCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
