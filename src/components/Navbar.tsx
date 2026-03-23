import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Search, ShoppingBag, Heart, User, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { cn } from '../utils/cn';

const Navbar = ({ onCartOpen }: { onCartOpen: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { itemCount } = useCart();
  const { wishlist } = useWishlist();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Collection', path: '/shop' },
    { name: 'Journal', path: '/journal' },
    { name: 'About', path: '/about' },
  ];

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 w-full z-50 transition-all duration-500 px-6 py-4 flex items-center justify-between',
          isScrolled ? 'bg-onyx/90 backdrop-blur-md py-3 border-b border-white/5' : 'bg-transparent'
        )}
      >
        <div className="flex items-center gap-8">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden text-cream hover:text-gold transition-colors"
          >
            <Menu size={24} />
          </button>
          
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  'text-sm font-medium tracking-widest uppercase transition-all hover:text-gold relative group',
                  location.pathname === link.path ? 'text-gold' : 'text-cream'
                )}
              >
                {link.name}
                <span className={cn(
                  'absolute -bottom-1 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full',
                  location.pathname === link.path && 'w-full'
                )} />
              </Link>
            ))}
          </div>
        </div>

        <Link to="/" className="absolute left-1/2 -translate-x-1/2">
          <h1 className="text-2xl lg:text-3xl font-serif tracking-[0.2em] text-gold uppercase">
            Veloria
          </h1>
        </Link>

        <div className="flex items-center gap-4 lg:gap-6">
          <button className="hidden sm:block text-cream hover:text-gold transition-colors">
            <Search size={20} />
          </button>
          <button className="hidden sm:block text-cream hover:text-gold transition-colors">
            <User size={20} />
          </button>
          <Link 
            to="/wishlist" 
            className="flex items-center gap-2 text-cream hover:text-gold transition-colors relative"
          >
            <Heart size={20} />
            <span className="hidden xl:block text-[10px] font-bold uppercase tracking-widest">Wishlist</span>
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 xl:right-auto xl:left-3 xl:-top-2 bg-gold text-onyx text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </Link>
          <button
            onClick={onCartOpen}
            className="flex items-center gap-2 text-cream hover:text-gold transition-colors relative"
          >
            <ShoppingBag size={20} />
            <span className="hidden xl:block text-[10px] font-bold uppercase tracking-widest">Bag</span>
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 xl:right-auto xl:left-3 xl:-top-2 bg-gold text-onyx text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-onyx lg:hidden"
          >
            <div className="p-6 flex justify-between items-center border-b border-white/5">
              <h1 className="text-xl font-serif tracking-[0.2em] text-gold uppercase">Veloria</h1>
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-cream">
                <X size={24} />
              </button>
            </div>
            <div className="flex flex-col p-12 gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    to={link.path}
                    className={cn(
                      "text-4xl font-serif tracking-tight transition-colors",
                      location.pathname === link.path ? "text-gold" : "text-cream hover:text-gold"
                    )}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: navLinks.length * 0.1 }}
                className="pt-8 border-t border-white/5 space-y-6"
              >
                <Link to="/wishlist" className="flex items-center gap-4 text-xl font-serif text-cream/60 hover:text-gold transition-colors">
                  <Heart size={24} /> Wishlist ({wishlist.length})
                </Link>
                <button 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onCartOpen();
                  }}
                  className="flex items-center gap-4 text-xl font-serif text-cream/60 hover:text-gold transition-colors"
                >
                  <ShoppingBag size={24} /> Bag ({itemCount})
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
