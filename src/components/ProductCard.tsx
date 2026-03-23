import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { motion } from 'motion/react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { cn } from '../utils/cn';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  // Some of our image URLs (especially "secondary" hover images) can be invalid.
  // If the secondary image fails to load, fall back to the primary one.
  const [secondaryFailed, setSecondaryFailed] = useState(false);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const isWishlisted = isInWishlist(product.id);
  const primaryImage = product.images[0];
  const secondaryImage = product.images[1];

  const shouldShowSecondary =
    isHovered && activeImageIndex === 0 && !!secondaryImage && !secondaryFailed;

  const chosenSrc =
    (shouldShowSecondary ? secondaryImage : product.images[activeImageIndex]) ?? primaryImage;

  const finalSrc = secondaryFailed && chosenSrc === secondaryImage ? primaryImage : chosenSrc;

  const handleColorClick = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    // If we have more images, we could map colors to images, 
    // but for now let's just cycle through available images if they exist
    if (product.images[index]) {
      setActiveImageIndex(index);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setActiveImageIndex(0);
      }}
    >
      <Link to={`/product/${product.id}`} className="block overflow-hidden aspect-[3/4] bg-white/5 relative">
        <img
          src={finalSrc}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          referrerPolicy="no-referrer"
          onError={() => {
            // If the secondary (hover) image is broken, permanently mark it failed for this card instance.
            if (secondaryImage && finalSrc === secondaryImage) setSecondaryFailed(true);
          }}
        />
        
        {product.isNew && (
          <span className="absolute top-4 left-4 bg-gold text-onyx text-[10px] font-bold uppercase tracking-widest px-2 py-1">
            New
          </span>
        )}
        
        {product.isSale && (
          <span className="absolute top-4 left-4 bg-crimson text-cream text-[10px] font-bold uppercase tracking-widest px-2 py-1">
            Sale
          </span>
        )}

        <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-12 group-hover:translate-x-0 transition-transform duration-500">
          <button 
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(product);
            }}
            className={cn(
              "p-2 bg-onyx/80 backdrop-blur-md transition-colors",
              isWishlisted ? "text-gold" : "text-cream hover:text-gold"
            )}
          >
            <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
          </button>
          {onQuickView && (
            <button 
              onClick={(e) => {
                e.preventDefault();
                onQuickView(product);
              }}
              className="p-2 bg-onyx/80 backdrop-blur-md text-cream hover:text-gold transition-colors"
            >
              <Eye size={18} />
            </button>
          )}
        </div>

        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={isHovered ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          onClick={(e) => {
            e.preventDefault();
            if (product.sizes?.length > 0 && product.colors?.length > 0) {
              addToCart(product, product.sizes[0], product.colors[0]);
            }
          }}
          className="absolute bottom-0 left-0 w-full bg-gold text-onyx py-4 text-xs font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-white transition-colors"
        >
          <ShoppingBag size={16} />
          Quick Add
        </motion.button>
      </Link>

      <div className="mt-4 space-y-1">
        <div className="flex justify-between items-start">
          <Link to={`/product/${product.id}`} className="text-sm font-medium tracking-wide hover:text-gold transition-colors">
            {product.name}
          </Link>
          <div className="text-sm font-medium">
            {product.isSale ? (
              <div className="flex gap-2">
                <span className="text-crimson">€{product.salePrice}</span>
                <span className="text-cream/40 line-through">€{product.price}</span>
              </div>
            ) : (
              <span>€{product.price}</span>
            )}
          </div>
        </div>
        <p className="text-[10px] uppercase tracking-widest text-cream/40">{product.category}</p>
        
        <div className="flex gap-1.5 mt-2">
          {product.colors.map((color, index) => (
            <button
              key={color?.hex || index}
              onClick={(e) => handleColorClick(e, index)}
              className={cn(
                "w-3 h-3 rounded-full border transition-all",
                activeImageIndex === index ? "border-gold scale-125" : "border-white/10"
              )}
              style={{ backgroundColor: color?.hex }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
