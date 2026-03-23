import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, ShoppingBag, Instagram, ChevronRight, ChevronLeft } from 'lucide-react';
import { PRODUCTS } from '../constants';
import ProductCard from '../components/ProductCard';
import QuickView from '../components/QuickView';
import Newsletter from '../components/Newsletter';
import { Product } from '../types';

const Home = () => {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const featuredCollections = [
    {
      title: 'Women',
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000&auto=format&fit=crop',
      link: '/shop?category=Women',
    },
    {
      title: 'Men',
      image: 'https://images.unsplash.com/photo-1516826957135-700dedea698c?q=80&w=1000&auto=format&fit=crop',
      link: '/shop?category=Men',
    },
    {
      title: 'Accessories',
      image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=1000&auto=format&fit=crop',
      link: '/shop?category=Accessories',
    },
  ];

  const bestSellers = PRODUCTS.slice(0, 4);
  const newArrivals = PRODUCTS.filter(p => p.isNew).slice(0, 6);

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="h-screen relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2000&auto=format&fit=crop"
            alt="Hero"
            className="w-full h-full object-cover opacity-60 scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-onyx via-transparent to-onyx/40" />
        </div>

        <div className="relative z-10 text-center space-y-8 px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-4"
          >
            <p className="text-gold uppercase tracking-[0.4em] text-xs font-bold">
              Season 5 — SS 2026
            </p>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif tracking-tight text-balance leading-[0.9]">
              DEFY THE <br /> ORDINARY.
            </h1>
            <p className="text-cream/60 text-lg md:text-xl max-w-2xl mx-auto font-light tracking-wide">
              Elevated essentials engineered for the avant-garde soul. Timeless rebellion in every stitch.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link
              to="/shop"
              className="group relative bg-gold text-onyx px-12 py-5 text-xs font-bold uppercase tracking-[0.3em] overflow-hidden transition-all duration-500 hover:bg-white"
            >
              <span className="relative z-10">Shop the Collection</span>
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </Link>
            <Link
              to="/about"
              className="text-cream uppercase tracking-[0.3em] text-xs font-bold hover:text-gold transition-colors flex items-center gap-2 group"
            >
              Our Story
              <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-40">
          <span className="text-[10px] uppercase tracking-[0.4em] rotate-90 origin-left translate-x-1">Scroll</span>
          <div className="w-px h-12 bg-cream/40 relative overflow-hidden">
            <motion.div
              animate={{ y: [0, 48] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-0 left-0 w-full h-1/2 bg-gold"
            />
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-32 px-6 lg:px-12 max-w-[1800px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredCollections.map((collection, i) => (
            <motion.div
              key={collection.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="group relative aspect-[4/5] overflow-hidden bg-white/5"
            >
              <img
                src={collection.image}
                alt={collection.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-onyx/20 group-hover:bg-onyx/40 transition-colors duration-500" />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
                <h3 className="text-4xl md:text-5xl font-serif tracking-tight mb-6">{collection.title}</h3>
                <Link
                  to={collection.link}
                  className="opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 bg-white text-onyx px-8 py-3 text-[10px] font-bold uppercase tracking-widest"
                >
                  Shop Now
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-32 px-6 lg:px-12 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="flex justify-between items-end">
            <div className="space-y-4">
              <p className="text-gold uppercase tracking-[0.3em] text-[10px] font-bold">Curated for you</p>
              <h2 className="text-4xl md:text-5xl font-serif tracking-tight">Most Wanted</h2>
            </div>
            <Link to="/shop" className="text-xs font-bold uppercase tracking-widest text-cream/40 hover:text-gold transition-colors flex items-center gap-2">
              View All <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {bestSellers.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={setQuickViewProduct}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Strip */}
      <section className="py-32 bg-onyx overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <p className="text-gold uppercase tracking-[0.3em] text-[10px] font-bold">The Lookbook</p>
            <h2 className="text-5xl md:text-7xl font-serif tracking-tight leading-tight">THE COLLECTION — SS 2026</h2>
            <p className="text-cream/60 text-lg font-light leading-relaxed">
              Explore the narrative behind our latest collection. A journey through texture, silhouette, and the raw emotion of the modern soul.
            </p>
            <Link
              to="/shop"
              className="inline-block border border-white/20 px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-onyx transition-all duration-500"
            >
              View Full Lookbook
            </Link>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative aspect-[3/4] bg-white/5"
          >
            <img
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop"
              alt="Editorial"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-10 -left-10 w-64 h-80 bg-onyx p-4 hidden md:block border border-white/5">
              <img
                src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1000&auto=format&fit=crop"
                alt="Editorial Detail"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="flex justify-between items-end">
            <div className="space-y-4">
              <p className="text-gold uppercase tracking-[0.3em] text-[10px] font-bold">Just Dropped</p>
              <h2 className="text-4xl md:text-5xl font-serif tracking-tight">New Arrivals</h2>
            </div>
          </div>

          <div className="flex overflow-x-auto gap-8 pb-8 snap-x no-scrollbar">
            {newArrivals.map((product) => (
              <div key={product.id} className="min-w-[280px] md:min-w-[320px] snap-start">
                <ProductCard
                  product={product}
                  onQuickView={setQuickViewProduct}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-32 px-6 lg:px-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <p className="text-gold uppercase tracking-[0.3em] text-[10px] font-bold">Styled by you</p>
            <h2 className="text-4xl md:text-5xl font-serif tracking-tight">@veloria_official</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=600&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=600&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=600&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=600&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=600&auto=format&fit=crop',
            ].map((img, i) => (
              <div key={i} className="aspect-square bg-white/5 relative group overflow-hidden">
                <img
                  src={img}
                  alt={`UGC ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-onyx/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Instagram size={24} className="text-cream" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
      
      <QuickView
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
};

export default Home;
