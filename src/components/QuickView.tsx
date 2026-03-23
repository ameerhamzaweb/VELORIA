import React, { useState } from 'react';
import { X, ShoppingBag, Heart, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product, Size, Color } from '../types';
import { useCart } from '../context/CartContext';
import { cn } from '../utils/cn';

interface QuickViewProps {
  product: Product | null;
  onClose: () => void;
}

const QuickView: React.FC<QuickViewProps> = ({ product, onClose }) => {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState<Size | null>(product.sizes?.[0] || null);
  const [selectedColor, setSelectedColor] = useState<Color | null>(product.colors?.[0] || null);
  const [currentImage, setCurrentImage] = useState(0);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (product && selectedSize && selectedColor) {
      addToCart(product, selectedSize, selectedColor);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {product && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-5xl md:h-[80vh] bg-onyx z-[110] flex flex-col md:flex-row shadow-2xl overflow-hidden border border-white/10"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-10 text-cream hover:text-gold transition-colors"
            >
              <X size={24} />
            </button>

            {/* Left: Image Gallery */}
            <div className="w-full md:w-1/2 h-1/2 md:h-full relative bg-white/5">
              <img
                src={product.images[currentImage]}
                alt={product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                {product.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImage(i)}
                    className={cn(
                      'w-2 h-2 rounded-full transition-all',
                      currentImage === i ? 'bg-gold w-6' : 'bg-white/20 hover:bg-white/40'
                    )}
                  />
                ))}
              </div>
            </div>

            {/* Right: Product Info */}
            <div className="w-full md:w-1/2 h-1/2 md:h-full p-8 md:p-12 overflow-y-auto space-y-8">
              <div className="space-y-2">
                <p className="text-[10px] uppercase tracking-[0.3em] text-gold font-bold">
                  {product.category}
                </p>
                <h2 className="text-3xl md:text-4xl font-serif tracking-tight">{product.name}</h2>
                <div className="flex items-center gap-4">
                  <div className="text-xl font-medium">
                    {product.isSale ? (
                      <div className="flex gap-3">
                        <span className="text-crimson">€{product.salePrice}</span>
                        <span className="text-cream/40 line-through">€{product.price}</span>
                      </div>
                    ) : (
                      <span>€{product.price}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-gold">
                    <Star size={14} fill="currentColor" />
                    <span className="text-xs font-bold tracking-widest">{product.rating}</span>
                    <span className="text-xs text-cream/40 ml-1">({product.reviewsCount} reviews)</span>
                  </div>
                </div>
              </div>

              <p className="text-cream/60 text-sm leading-relaxed">
                {product.description}
              </p>

              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between text-[10px] uppercase tracking-widest font-bold">
                    <span>Select Color</span>
                    <span className="text-gold">{selectedColor?.name || 'Select a color'}</span>
                  </div>
                  <div className="flex gap-3">
                    {product.colors.map((color) => (
                      <button
                        key={color?.hex || Math.random()}
                        onClick={() => setSelectedColor(color)}
                        className={cn(
                          'w-8 h-8 rounded-full border-2 transition-all p-0.5',
                          selectedColor?.hex === color?.hex ? 'border-gold' : 'border-transparent hover:border-white/20'
                        )}
                      >
                        <div
                          className="w-full h-full rounded-full"
                          style={{ backgroundColor: color?.hex }}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-[10px] uppercase tracking-widest font-bold">
                    <span>Select Size</span>
                    <button className="text-cream/40 hover:text-gold transition-colors underline underline-offset-4">
                      Size Guide
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={cn(
                          'min-w-[50px] h-10 border text-xs font-bold uppercase tracking-widest transition-all',
                          selectedSize === size
                            ? 'bg-gold border-gold text-onyx'
                            : 'border-white/10 hover:border-white/40'
                        )}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={handleAddToCart}
                  disabled={!selectedSize || !selectedColor}
                  className={cn(
                    "flex-1 py-4 text-xs font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all duration-300",
                    (!selectedSize || !selectedColor) 
                      ? "bg-white/5 text-cream/20 cursor-not-allowed" 
                      : "bg-gold text-onyx hover:bg-white"
                  )}
                >
                  <ShoppingBag size={18} />
                  Add to Bag
                </button>
                <button className="p-4 border border-white/10 hover:border-white/40 transition-all">
                  <Heart size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default QuickView;
