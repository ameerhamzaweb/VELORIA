import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Filter, ChevronDown, Grid3X3, List, X, Search } from 'lucide-react';
import { PRODUCTS } from '../constants';
import ProductCard from '../components/ProductCard';
import QuickView from '../components/QuickView';
import { Product, Category, Size } from '../types';
import { cn } from '../utils/cn';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Filters
  const categoryFilter = searchParams.get('category') as Category | null;
  const sizeFilter = searchParams.get('size') as Size | null;
  const sortFilter = searchParams.get('sort') || 'newest';

  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    if (categoryFilter) {
      result = result.filter(p => p.category === categoryFilter);
    }

    if (sizeFilter) {
      result = result.filter(p => p.sizes.includes(sizeFilter));
    }

    if (searchQuery) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sorting
    switch (sortFilter) {
      case 'price-low':
        result.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
        break;
      case 'price-high':
        result.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
        break;
      case 'newest':
      default:
        result.sort((a, b) => (a.isNew ? -1 : 1));
        break;
    }

    return result;
  }, [categoryFilter, sizeFilter, sortFilter, searchQuery]);

  const categories: Category[] = ['Men', 'Women', 'Accessories', 'Shoes'];
  const sizes: Size[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  const toggleFilter = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (newParams.get(key) === value) {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setSearchParams(new URLSearchParams());
    setSearchQuery('');
  };

  return (
    <div className="pt-24 min-h-screen">
      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {isFilterOpen && (
          <div className="lg:hidden fixed inset-0 z-[100]">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterOpen(false)}
              className="absolute inset-0 bg-onyx/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 h-full w-[80%] max-w-sm bg-onyx border-l border-white/10 p-8 overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-12">
                <h2 className="text-xl font-serif">Filters</h2>
                <button onClick={() => setIsFilterOpen(false)} className="text-cream/40 hover:text-cream">
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-12">
                <div className="space-y-6">
                  <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => toggleFilter('category', cat)}
                        className={cn(
                          "px-4 py-2 text-[10px] uppercase tracking-widest border transition-all",
                          categoryFilter === cat ? "bg-gold border-gold text-onyx" : "border-white/10 text-cream/60"
                        )}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Sizes</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => toggleFilter('size', size)}
                        className={cn(
                          "h-10 border text-[10px] font-bold uppercase tracking-widest transition-all",
                          sizeFilter === size ? "bg-gold border-gold text-onyx" : "border-white/10 text-cream/60"
                        )}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Price Range</h3>
                  <div className="space-y-4">
                    <input type="range" className="w-full accent-gold" />
                    <div className="flex justify-between text-[10px] uppercase tracking-widest text-cream/40">
                      <span>€0</span>
                      <span>€1000+</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={clearFilters}
                  className="w-full py-4 border border-gold text-gold text-[10px] font-bold uppercase tracking-widest hover:bg-gold hover:text-onyx transition-all"
                >
                  Clear All Filters
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Page Header */}
      <div className="py-20 px-6 lg:px-12 bg-white/[0.02] border-b border-white/5">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <p className="text-gold uppercase tracking-[0.4em] text-[10px] font-bold">Explore</p>
          <h1 className="text-5xl md:text-7xl font-serif tracking-tight">The Collection</h1>
        </div>
      </div>

      {/* Toolbar */}
      <div className="sticky top-[64px] lg:top-[72px] z-40 bg-onyx/90 backdrop-blur-md border-b border-white/5 px-6 lg:px-12 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={cn(
                "flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-colors",
                isFilterOpen ? "text-gold" : "text-cream hover:text-gold"
              )}
            >
              <Filter size={16} />
              {isFilterOpen ? 'Hide Filters' : 'Show Filters'}
            </button>
            <div className="hidden md:flex items-center gap-2 text-[10px] text-cream/40 uppercase tracking-widest border-l border-white/10 pl-4">
              Showing {filteredProducts.length} Products
            </div>
          </div>

          <div className="flex-1 max-w-md hidden lg:block">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-cream/40" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-xs focus:border-gold outline-none transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative group hidden sm:block">
              <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-gold transition-colors">
                Sort By <ChevronDown size={14} />
              </button>
              <div className="absolute right-0 top-full mt-2 w-48 glass hidden group-hover:block p-2 space-y-1">
                {[
                  { label: 'Newest', value: 'newest' },
                  { label: 'Price: Low to High', value: 'price-low' },
                  { label: 'Price: High to Low', value: 'price-high' },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => toggleFilter('sort', option.value)}
                    className={cn(
                      "w-full text-left px-4 py-2 text-[10px] uppercase tracking-widest hover:bg-white/5 transition-colors",
                      sortFilter === option.value ? "text-gold" : "text-cream/60"
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex items-center gap-2 border-l border-white/10 pl-6">
              <button
                onClick={() => setViewMode('grid')}
                className={cn("p-1 transition-colors", viewMode === 'grid' ? "text-gold" : "text-cream/40 hover:text-cream")}
              >
                <Grid3X3 size={18} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={cn("p-1 transition-colors", viewMode === 'list' ? "text-gold" : "text-cream/40 hover:text-cream")}
              >
                <List size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 flex gap-12">
        {/* Sidebar Filters */}
        <AnimatePresence>
          {isFilterOpen && (
            <motion.aside
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 280, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="hidden lg:block space-y-12 shrink-0 overflow-hidden"
            >
              <div className="space-y-6">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Categories</h3>
                <div className="space-y-3">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => toggleFilter('category', cat)}
                      className={cn(
                        "block text-sm transition-colors",
                        categoryFilter === cat ? "text-cream font-bold" : "text-cream/40 hover:text-cream"
                      )}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Sizes</h3>
                <div className="grid grid-cols-3 gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => toggleFilter('size', size)}
                      className={cn(
                        "h-10 border text-[10px] font-bold uppercase tracking-widest transition-all",
                        sizeFilter === size
                          ? "bg-gold border-gold text-onyx"
                          : "border-white/10 hover:border-white/40"
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Price Range</h3>
                <div className="space-y-4">
                  <input type="range" className="w-full accent-gold" />
                  <div className="flex justify-between text-[10px] uppercase tracking-widest text-cream/40">
                    <span>€0</span>
                    <span>€1000+</span>
                  </div>
                </div>
              </div>

              <button
                onClick={clearFilters}
                className="text-[10px] uppercase tracking-widest text-gold hover:text-cream transition-colors underline underline-offset-4"
              >
                Clear All Filters
              </button>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Product Grid */}
        <main className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="h-96 flex flex-col items-center justify-center text-center space-y-6">
              <p className="text-xl font-serif">No products found matching your criteria.</p>
              <button
                onClick={clearFilters}
                className="bg-gold text-onyx px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className={cn(
              "grid gap-x-8 gap-y-12",
              viewMode === 'grid' ? "grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
            )}>
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={setQuickViewProduct}
                />
              ))}
            </div>
          )}
        </main>
      </div>

      <QuickView
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
};

export default Shop;
