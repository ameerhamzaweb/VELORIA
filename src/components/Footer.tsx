import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-onyx border-t border-white/5 py-20 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div className="space-y-6">
          <h2 className="text-2xl font-serif tracking-[0.2em] text-gold uppercase">Veloria</h2>
          <p className="text-cream/60 text-sm leading-relaxed max-w-xs">
            Timeless rebellion for the modern soul. Elevated essentials crafted with precision and passion.
          </p>
          <div className="flex gap-4">
            <Instagram size={20} className="text-cream/60 hover:text-gold cursor-pointer transition-colors" />
            <Twitter size={20} className="text-cream/60 hover:text-gold cursor-pointer transition-colors" />
            <Facebook size={20} className="text-cream/60 hover:text-gold cursor-pointer transition-colors" />
            <Youtube size={20} className="text-cream/60 hover:text-gold cursor-pointer transition-colors" />
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-gold uppercase tracking-widest text-xs font-bold">Navigation</h3>
          <div className="flex flex-col gap-4 text-sm text-cream/60 uppercase tracking-widest text-[10px]">
            <Link to="/" className="hover:text-gold transition-colors">Home</Link>
            <Link to="/shop" className="hover:text-gold transition-colors">Collection</Link>
            <Link to="/journal" className="hover:text-gold transition-colors">Journal</Link>
            <Link to="/about" className="hover:text-gold transition-colors">About</Link>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-gold uppercase tracking-widest text-xs font-bold">Customer Care</h3>
          <div className="flex flex-col gap-4 text-sm text-cream/60 uppercase tracking-widest text-[10px]">
            <Link to="/wishlist" className="hover:text-gold transition-colors">Wishlist</Link>
            <Link to="/cart" className="hover:text-gold transition-colors">Shopping Bag</Link>
            <a href="#" className="hover:text-gold transition-colors">Shipping & Returns</a>
            <a href="#" className="hover:text-gold transition-colors">Contact Us</a>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-gold uppercase tracking-widest text-xs font-bold">Newsletter</h3>
          <p className="text-cream/60 text-sm">Join the inner circle for exclusive access and updates.</p>
          <form className="flex gap-2">
            <input
              type="email"
              placeholder="Email address"
              className="bg-transparent border-b border-white/20 py-2 text-sm focus:border-gold outline-none transition-all flex-1"
            />
            <button className="text-gold uppercase tracking-widest text-xs font-bold hover:text-cream transition-colors">
              Join
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-[0.2em] text-cream/40">
        <p>© 2026 Veloria. All rights reserved.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-cream transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-cream transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
