import React from 'react';
import { Link } from 'react-router-dom';
import { X, ShoppingBag, Trash2, Plus, Minus, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { cn } from '../utils/cn';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity, subtotal, itemCount } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-onyx z-[80] flex flex-col shadow-2xl border-l border-white/5"
          >
            <div className="p-6 flex justify-between items-center border-b border-white/5">
              <div className="flex items-center gap-3">
                <ShoppingBag size={20} className="text-gold" />
                <h2 className="text-lg font-serif tracking-widest uppercase">Your Bag ({itemCount})</h2>
              </div>
              <button onClick={onClose} className="text-cream hover:text-gold transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                  <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center">
                    <ShoppingBag size={32} className="text-cream/20" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-lg font-serif">Your bag is empty</p>
                    <p className="text-sm text-cream/40">Explore our collection and find your next statement piece.</p>
                  </div>
                  <Link
                    to="/shop"
                    onClick={onClose}
                    className="bg-gold text-onyx px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors"
                  >
                    Start Shopping
                  </Link>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={`${item.id}-${item.selectedSize}-${item.selectedColor?.hex || 'no-hex'}`} className="flex gap-4">
                    <div className="w-24 aspect-[3/4] bg-white/5 overflow-hidden">
                      <img
                        src={item.images?.[0] || 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop'}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex justify-between items-start">
                        <h3 className="text-sm font-medium tracking-wide leading-tight max-w-[150px]">{item.name}</h3>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleWishlist(item)}
                            className={cn(
                              "p-1.5 rounded-full transition-all duration-300",
                              isInWishlist(item.id) 
                                ? "bg-gold/10 text-gold" 
                                : "bg-white/5 text-cream/40 hover:text-gold hover:bg-white/10"
                            )}
                            title="Save for later"
                          >
                            <Heart size={14} fill={isInWishlist(item.id) ? "currentColor" : "none"} />
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id, item.selectedSize, item.selectedColor)}
                            className="p-1.5 rounded-full bg-white/5 text-cream/40 hover:text-crimson hover:bg-crimson/10 transition-all duration-300"
                            title="Remove from bag"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                      <p className="text-[10px] uppercase tracking-widest text-cream/40">
                        {item.selectedSize} / {item.selectedColor?.name || 'Unknown Color'}
                      </p>
                      <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center border border-white/10">
                          <button
                            onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity - 1)}
                            className="p-1 hover:text-gold transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="px-3 text-xs">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity + 1)}
                            className="p-1 hover:text-gold transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <span className="text-sm font-medium">€{(item.salePrice || item.price) * item.quantity}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t border-white/5 space-y-4 bg-onyx/50 backdrop-blur-md">
                <div className="flex justify-between text-sm uppercase tracking-widest">
                  <span className="text-cream/60">Subtotal</span>
                  <span className="font-bold">€{subtotal}</span>
                </div>
                <p className="text-[10px] text-cream/40 text-center uppercase tracking-widest">
                  Shipping and taxes calculated at checkout
                </p>
                <div className="grid grid-cols-1 gap-3">
                  <Link
                    to="/checkout"
                    onClick={onClose}
                    className="bg-[#00FF00] text-onyx py-5 text-center text-xs font-black uppercase tracking-[0.3em] hover:bg-white transition-all duration-500 shadow-[0_0_20px_rgba(0,255,0,0.15)]"
                  >
                    Checkout Now
                  </Link>
                  <Link
                    to="/cart"
                    onClick={onClose}
                    className="border border-white/10 py-4 text-center text-xs font-bold uppercase tracking-[0.2em] hover:bg-white/10 transition-colors"
                  >
                    View Bag
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
