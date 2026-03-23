import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ChevronRight, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { PRODUCTS } from '../constants';
import ProductCard from '../components/ProductCard';
import QuickView from '../components/QuickView';
import { cn } from '../utils/cn';
import { Product } from '../types';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, subtotal, itemCount } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [quickViewProduct, setQuickViewProduct] = React.useState<Product | null>(null);

  const shipping = subtotal > 150 ? 0 : 15;
  const tax = subtotal * 0.2; // 20% tax
  const total = subtotal + shipping + tax;

  if (cart.length === 0) {
    return (
      <div className="pt-24 min-h-screen flex flex-col items-center justify-center px-6 text-center space-y-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-32 h-32 rounded-full bg-white/5 flex items-center justify-center"
        >
          <ShoppingBag size={48} className="text-cream/20" />
        </motion.div>
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-serif tracking-tight">Your bag is lonely</h1>
          <p className="text-cream/60 text-lg max-w-md mx-auto">
            Explore our latest collection and find your next statement piece.
          </p>
        </div>
        <Link
          to="/shop"
          className="bg-gold text-onyx px-12 py-5 text-xs font-bold uppercase tracking-[0.3em] hover:bg-white transition-all duration-500"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-32">
      {/* Page Header */}
      <div className="py-20 px-6 lg:px-12 bg-white/[0.02] border-b border-white/5">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <p className="text-gold uppercase tracking-[0.4em] text-[10px] font-bold">Your Selection</p>
          <h1 className="text-5xl md:text-7xl font-serif tracking-tight">Shopping Bag</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Left: Cart Items */}
        <div className="lg:col-span-2 space-y-12">
          <div className="hidden md:grid grid-cols-6 pb-6 border-b border-white/5 text-[10px] uppercase tracking-widest font-bold text-cream/40">
            <div className="col-span-3">Product</div>
            <div className="text-center">Price</div>
            <div className="text-center">Quantity</div>
            <div className="text-right">Total</div>
          </div>

          <div className="space-y-12">
            <AnimatePresence mode="popLayout">
              {cart.map((item) => (
                <motion.div
                  key={`${item.id}-${item.selectedSize}-${item.selectedColor?.hex || 'no-hex'}`}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="grid grid-cols-1 md:grid-cols-6 gap-6 md:items-center"
                >
                  <div className="col-span-3 flex gap-6">
                    <div className="w-24 md:w-32 aspect-[3/4] bg-white/5 overflow-hidden shrink-0">
                      <img
                        src={item.images?.[0] || 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop'}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-serif tracking-tight">{item.name}</h3>
                      <p className="text-[10px] uppercase tracking-widest text-cream/40">
                        Size: {item.selectedSize} / Color: {item.selectedColor?.name || 'Unknown Color'}
                      </p>
                      <div className="flex items-center gap-4 pt-4">
                        <button
                          onClick={() => toggleWishlist(item)}
                          className={cn(
                            "p-2 rounded-full transition-all duration-300",
                            isInWishlist(item.id) 
                              ? "bg-gold/10 text-gold" 
                              : "bg-white/5 text-cream/40 hover:text-gold hover:bg-white/10"
                          )}
                          title="Save for later"
                        >
                          <Heart size={16} fill={isInWishlist(item.id) ? "currentColor" : "none"} />
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id, item.selectedSize, item.selectedColor)}
                          className="p-2 rounded-full bg-white/5 text-cream/40 hover:text-crimson hover:bg-crimson/10 transition-all duration-300"
                          title="Remove from bag"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="text-center text-sm font-medium">
                    €{item.salePrice || item.price}
                  </div>

                  <div className="flex justify-center">
                    <div className="flex items-center border border-white/10 w-fit">
                      <button
                        onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity - 1)}
                        className="p-2 hover:text-gold transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="px-4 text-xs font-bold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity + 1)}
                        className="p-2 hover:text-gold transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>

                  <div className="text-right text-sm font-bold">
                    €{(item.salePrice || item.price) * item.quantity}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="pt-12 border-t border-white/5 flex justify-between items-center">
            <Link
              to="/shop"
              className="text-xs font-bold uppercase tracking-widest text-cream/40 hover:text-gold transition-colors flex items-center gap-2"
            >
              <ChevronRight size={16} className="rotate-180" /> Continue Shopping
            </Link>
            <button 
              onClick={clearCart}
              className="text-xs font-bold uppercase tracking-widest text-cream/40 hover:text-gold transition-colors"
            >
              Clear Bag
            </button>
          </div>
        </div>

        {/* Right: Order Summary */}
        <div className="space-y-8">
          <div className="glass p-8 space-y-8">
            <h2 className="text-xl font-serif tracking-widest uppercase">Order Summary</h2>
            
            <div className="space-y-4 text-sm uppercase tracking-widest">
              <div className="flex justify-between text-cream/60">
                <span>Subtotal</span>
                <span>€{subtotal}</span>
              </div>
              <div className="flex justify-between text-cream/60">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `€${shipping}`}</span>
              </div>
              <div className="flex justify-between text-cream/60">
                <span>Estimated Tax</span>
                <span>€{tax.toFixed(2)}</span>
              </div>
              <div className="pt-4 border-t border-white/10 flex justify-between text-lg font-bold text-gold">
                <span>Total</span>
                <span>€{total.toFixed(2)}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-cream/40">Promo Code</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter code"
                    className="flex-1 bg-white/5 border border-white/10 px-4 py-3 text-xs focus:border-gold outline-none transition-all"
                  />
                  <button className="bg-white/5 border border-white/10 px-6 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all">
                    Apply
                  </button>
                </div>
              </div>

              <Link
                to="/checkout"
                className="block w-full bg-[#00FF00] text-onyx py-6 text-center text-sm font-black uppercase tracking-[0.4em] hover:bg-white transition-all duration-500 shadow-[0_0_30px_rgba(0,255,0,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]"
              >
                Checkout Now
              </Link>
            </div>

            <div className="pt-6 border-t border-white/10 space-y-4">
              <p className="text-[10px] uppercase tracking-widest text-cream/40 text-center">We Accept</p>
              <div className="flex justify-center gap-4 opacity-40 grayscale hover:grayscale-0 transition-all">
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple Pay" className="h-5" />
              </div>
            </div>
          </div>

          <div className="glass p-8 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gold">Need Help?</h3>
            <p className="text-xs text-cream/60 leading-relaxed">
              Our customer care team is available Monday to Friday, 9am - 6pm CET.
            </p>
            <a href="mailto:support@veloria.com" className="block text-xs font-bold uppercase tracking-widest hover:text-gold transition-colors underline underline-offset-4">
              Contact Support
            </a>
          </div>
        </div>
      </div>

      {/* Related Fashions Section */}
      <section className="mt-32 py-32 border-t border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-16">
          <div className="space-y-4">
            <p className="text-gold uppercase tracking-[0.4em] text-[10px] font-bold">Complete the look</p>
            <h2 className="text-4xl md:text-5xl font-serif tracking-tight">Related Fashions</h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {PRODUCTS.filter(p => !cart.some(item => item.id === p.id)).slice(0, 4).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={setQuickViewProduct}
              />
            ))}
          </div>
        </div>
      </section>

      <QuickView
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
};

export default Cart;
