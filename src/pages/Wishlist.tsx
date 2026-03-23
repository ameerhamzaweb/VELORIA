import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

const Wishlist = () => {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (product: any) => {
    if (product.sizes?.length > 0 && product.colors?.length > 0) {
      addToCart(product, product.sizes[0], product.colors[0]);
    }
  };

  if (wishlist.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-8"
        >
          <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto border border-white/10">
            <Heart size={32} className="text-gold/40" />
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-serif tracking-tight">Your Wishlist is Empty</h1>
            <p className="text-cream/60 max-w-md mx-auto font-light leading-relaxed">
              Save your favorite pieces and they'll appear here. Start exploring our latest collections.
            </p>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-3 bg-gold text-onyx px-10 py-4 text-xs font-bold uppercase tracking-[0.3em] hover:bg-white transition-all duration-500"
          >
            Explore Collections <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-40 pb-32 px-6 lg:px-12 max-w-[1800px] mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <p className="text-gold uppercase tracking-[0.3em] text-[10px] font-bold">Saved Items</p>
          <h1 className="text-5xl md:text-6xl font-serif tracking-tight">My Wishlist</h1>
          <p className="text-cream/40 text-sm uppercase tracking-widest">{wishlist.length} items saved</p>
        </motion.div>
        
        <button 
          onClick={clearWishlist}
          className="text-xs font-bold uppercase tracking-widest text-cream/40 hover:text-gold transition-colors flex items-center gap-2 border-b border-white/10 pb-2"
        >
          <Trash2 size={14} /> Clear Wishlist
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
        {wishlist.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="space-y-6"
          >
            <ProductCard product={product} />
            <div className="flex gap-4">
              <button
                onClick={() => handleAddToCart(product)}
                className="flex-grow bg-white/5 border border-white/10 text-cream py-4 text-[10px] font-bold uppercase tracking-widest hover:bg-gold hover:text-onyx hover:border-gold transition-all duration-500 flex items-center justify-center gap-3"
              >
                <ShoppingBag size={14} /> Add to Bag
              </button>
              <button
                onClick={() => removeFromWishlist(product.id)}
                className="w-12 h-12 border border-white/10 flex items-center justify-center hover:bg-crimson hover:border-crimson hover:text-white transition-all duration-500"
                title="Remove from wishlist"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
