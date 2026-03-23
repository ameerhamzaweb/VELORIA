import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Heart, Star, ChevronRight, ChevronLeft, Plus, Minus, Share2, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { PRODUCTS } from '../constants';
import { Product, Size, Color } from '../types';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';
import QuickView from '../components/QuickView';
import { cn } from '../utils/cn';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = PRODUCTS.find(p => p.id === id);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes?.[0] || null);
      setSelectedColor(product.colors?.[0] || null);
      setCurrentImage(0);
      setQuantity(1);
      window.scrollTo(0, 0);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="h-screen flex flex-col items-center justify-center space-y-6">
        <h1 className="text-4xl font-serif">Product not found</h1>
        <Link to="/shop" className="bg-gold text-onyx px-8 py-3 text-xs font-bold uppercase tracking-widest">
          Back to Shop
        </Link>
      </div>
    );
  }

  const isWishlisted = isInWishlist(product.id);

  const relatedProducts = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'materials', label: 'Materials & Care' },
    { id: 'shipping', label: 'Shipping & Returns' },
  ];

  return (
    <div className="pt-24 pb-32">
      {/* Breadcrumbs */}
      <div className="px-6 lg:px-12 py-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-cream/40">
          <Link to="/" className="hover:text-gold transition-colors">Home</Link>
          <ChevronRight size={10} />
          <Link to="/shop" className="hover:text-gold transition-colors">Shop</Link>
          <ChevronRight size={10} />
          <Link to={`/shop?category=${product.category}`} className="hover:text-gold transition-colors">{product.category}</Link>
          <ChevronRight size={10} />
          <span className="text-cream">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        {/* Left: Image Gallery */}
        <div className="space-y-6">
          <div className="aspect-[3/4] bg-white/5 overflow-hidden relative group">
            <motion.img
              key={currentImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              src={product.images[currentImage]}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                onClick={() => setCurrentImage(prev => (prev === 0 ? product.images.length - 1 : prev - 1))}
                className="p-2 glass text-cream hover:text-gold transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={() => setCurrentImage(prev => (prev === product.images.length - 1 ? 0 : prev + 1))}
                className="p-2 glass text-cream hover:text-gold transition-colors"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-5 gap-4">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setCurrentImage(i)}
                className={cn(
                  "aspect-square bg-white/5 overflow-hidden border transition-all",
                  currentImage === i ? "border-gold" : "border-transparent hover:border-white/20"
                )}
              >
                <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="space-y-10">
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <p className="text-gold uppercase tracking-[0.3em] text-[10px] font-bold">{product.category}</p>
                <h1 className="text-4xl md:text-5xl font-serif tracking-tight">{product.name}</h1>
              </div>
              <button className="p-3 border border-white/10 hover:border-white/40 transition-all">
                <Share2 size={20} />
              </button>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="text-2xl font-medium">
                {product.isSale ? (
                  <div className="flex gap-4">
                    <span className="text-crimson">€{product.salePrice}</span>
                    <span className="text-cream/40 line-through">€{product.price}</span>
                  </div>
                ) : (
                  <span>€{product.price}</span>
                )}
              </div>
              <div className="flex items-center gap-1 text-gold">
                <Star size={16} fill="currentColor" />
                <span className="text-sm font-bold tracking-widest">{product.rating}</span>
                <span className="text-sm text-cream/40 ml-1">({product.reviewsCount} reviews)</span>
              </div>
            </div>
          </div>

          <p className="text-cream/60 text-lg font-light leading-relaxed">
            {product.description}
          </p>

          <div className="space-y-8">
            {/* Color Selector */}
            <div className="space-y-4">
              <div className="flex justify-between text-[10px] uppercase tracking-widest font-bold">
                <span>Color</span>
                <span className="text-gold">{selectedColor?.name}</span>
              </div>
              <div className="flex gap-4">
                {product.colors.map((color) => (
                  <button
                    key={color?.hex || Math.random()}
                    onClick={() => setSelectedColor(color)}
                    className={cn(
                      "w-10 h-10 rounded-full border-2 transition-all p-1",
                      selectedColor?.hex === color?.hex ? "border-gold" : "border-transparent hover:border-white/20"
                    )}
                  >
                    <div className="w-full h-full rounded-full" style={{ backgroundColor: color?.hex }} />
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="space-y-4">
              <div className="flex justify-between text-[10px] uppercase tracking-widest font-bold">
                <span>Size</span>
                <button className="text-cream/40 hover:text-gold transition-colors underline underline-offset-4">Size Guide</button>
              </div>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      "min-w-[64px] h-12 border text-xs font-bold uppercase tracking-widest transition-all",
                      selectedSize === size
                        ? "bg-gold border-gold text-onyx"
                        : "border-white/10 hover:border-white/40"
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-widest font-bold">Quantity</span>
              <div className="flex items-center border border-white/10 w-fit">
                <button 
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  className="p-4 hover:text-gold transition-colors"
                >
                  <Minus size={18} />
                </button>
                <span className="px-8 font-medium">{quantity}</span>
                <button 
                  onClick={() => setQuantity(prev => prev + 1)}
                  className="p-4 hover:text-gold transition-colors"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <button
              onClick={() => selectedSize && selectedColor && addToCart(product, selectedSize, selectedColor, quantity)}
              className="flex-1 bg-gold text-onyx py-5 text-xs font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-white transition-all duration-500"
            >
              <ShoppingBag size={20} />
              Add to Bag
            </button>
            <button
              onClick={() => toggleWishlist(product)}
              className={cn(
                "flex-1 border py-5 text-xs font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-3 transition-all duration-500",
                isWishlisted 
                  ? "bg-gold border-gold text-onyx" 
                  : "border-white/10 hover:bg-white/10"
              )}
            >
              <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
              {isWishlisted ? 'In Wishlist' : 'Add to Wishlist'}
            </button>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/5">
            <div className="flex flex-col items-center text-center gap-2">
              <Truck size={20} className="text-gold" />
              <span className="text-[8px] uppercase tracking-widest text-cream/60">Free Shipping</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2 border-x border-white/5">
              <RotateCcw size={20} className="text-gold" />
              <span className="text-[8px] uppercase tracking-widest text-cream/60">30-Day Returns</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <ShieldCheck size={20} className="text-gold" />
              <span className="text-[8px] uppercase tracking-widest text-cream/60">Secure Payment</span>
            </div>
          </div>

          {/* Tabs */}
          <div className="pt-12">
            <div className="flex border-b border-white/5">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "px-6 py-4 text-[10px] uppercase tracking-widest font-bold transition-all relative",
                    activeTab === tab.id ? "text-cream" : "text-cream/40 hover:text-cream"
                  )}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 w-full h-px bg-gold" />
                  )}
                </button>
              ))}
            </div>
            <div className="py-8 text-sm text-cream/60 leading-relaxed">
              {activeTab === 'description' && (
                <div className="space-y-4">
                  <p>{product.description}</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Premium quality materials</li>
                    <li>Designed for a modern silhouette</li>
                    <li>Signature Veloria gold hardware</li>
                    <li>Ethically sourced and produced</li>
                  </ul>
                </div>
              )}
              {activeTab === 'materials' && (
                <div className="space-y-4">
                  <p>Main: 100% Organic Cotton / Premium Silk / Italian Leather</p>
                  <p>Lining: 100% Recycled Polyester</p>
                  <p>Care: Dry clean only. Handle with care to preserve the timeless quality of the garment.</p>
                </div>
              )}
              {activeTab === 'shipping' && (
                <div className="space-y-4">
                  <p>Free standard shipping on all orders over €150.</p>
                  <p>Standard Delivery: 3-5 business days</p>
                  <p>Express Delivery: 1-2 business days</p>
                  <p>Returns: We offer a 30-day return policy for all unworn items in their original packaging.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <section className="mt-32 px-6 lg:px-12 max-w-7xl mx-auto border-t border-white/5 pt-32">
        <div className="space-y-16">
          <div className="text-center space-y-4">
            <p className="text-gold uppercase tracking-[0.3em] text-[10px] font-bold">Complete the look</p>
            <h2 className="text-4xl md:text-5xl font-serif tracking-tight">You May Also Like</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} onQuickView={setQuickViewProduct} />
            ))}
          </div>
        </div>
      </section>

      <QuickView product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </div>
  );
};

export default ProductDetail;
