import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, ShieldCheck, Truck, CreditCard, Lock, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';
import { cn } from '../utils/cn';

const Checkout = () => {
  const { cart, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'United Kingdom',
    shippingMethod: 'standard',
  });

  const shipping = formData.shippingMethod === 'express' ? 25 : (subtotal > 150 ? 0 : 15);
  const tax = subtotal * 0.2;
  const total = subtotal + shipping + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      clearCart();
      navigate('/');
    }, 5000);
  };

  if (cart.length === 0 && !isSuccess) {
    return (
      <div className="pt-24 min-h-screen flex flex-col items-center justify-center px-6 text-center space-y-8">
        <h1 className="text-4xl font-serif">Your bag is empty</h1>
        <Link to="/shop" className="bg-gold text-onyx px-12 py-5 text-xs font-bold uppercase tracking-[0.3em]">
          Return to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen pb-32">
      <AnimatePresence>
        {isSuccess ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[100] bg-onyx flex flex-col items-center justify-center p-6 text-center space-y-8"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', damping: 15 }}
              className="w-24 h-24 rounded-full bg-emerald flex items-center justify-center text-onyx"
            >
              <CheckCircle2 size={48} />
            </motion.div>
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-serif tracking-tight">Order Confirmed.</h1>
              <p className="text-cream/60 text-lg max-w-md mx-auto">
                Thank you for joining the movement. Your order #VL-92837 is being prepared for shipment.
              </p>
            </div>
            <p className="text-[10px] uppercase tracking-[0.4em] text-gold animate-pulse">
              Redirecting to home...
            </p>
          </motion.div>
        ) : (
          <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Left: Checkout Form */}
            <div className="space-y-12">
              <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest font-bold">
                <span className="text-gold">Information</span>
                <ChevronRight size={12} className="text-cream/20" />
                <span className="text-cream/20">Shipping</span>
                <ChevronRight size={12} className="text-cream/20" />
                <span className="text-cream/20">Payment</span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-12">
                {/* Contact Info */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-serif tracking-tight">Contact Information</h2>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-cream/40">Email Address</label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-white/5 border border-white/10 px-6 py-4 text-sm focus:border-gold outline-none transition-all"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-serif tracking-tight">Shipping Address</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-cream/40">First Name</label>
                      <input
                        required
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full bg-white/5 border border-white/10 px-6 py-4 text-sm focus:border-gold outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-cream/40">Last Name</label>
                      <input
                        required
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full bg-white/5 border border-white/10 px-6 py-4 text-sm focus:border-gold outline-none transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-cream/40">Address</label>
                    <input
                      required
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full bg-white/5 border border-white/10 px-6 py-4 text-sm focus:border-gold outline-none transition-all"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-cream/40">City</label>
                      <input
                        required
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full bg-white/5 border border-white/10 px-6 py-4 text-sm focus:border-gold outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-cream/40">Postal Code</label>
                      <input
                        required
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        className="w-full bg-white/5 border border-white/10 px-6 py-4 text-sm focus:border-gold outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Shipping Method */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-serif tracking-tight">Shipping Method</h2>
                  <div className="space-y-4">
                    <label className={cn(
                      "flex items-center justify-between p-6 border cursor-pointer transition-all",
                      formData.shippingMethod === 'standard' ? "border-gold bg-gold/5" : "border-white/10 hover:border-white/20"
                    )}>
                      <div className="flex items-center gap-4">
                        <input
                          type="radio"
                          name="shippingMethod"
                          value="standard"
                          checked={formData.shippingMethod === 'standard'}
                          onChange={handleInputChange}
                          className="accent-gold"
                        />
                        <div className="space-y-1">
                          <p className="text-sm font-bold uppercase tracking-widest">Standard Delivery</p>
                          <p className="text-xs text-cream/40">3-5 Business Days</p>
                        </div>
                      </div>
                      <span className="text-sm font-bold">{subtotal > 150 ? 'FREE' : '€15.00'}</span>
                    </label>
                    <label className={cn(
                      "flex items-center justify-between p-6 border cursor-pointer transition-all",
                      formData.shippingMethod === 'express' ? "border-gold bg-gold/5" : "border-white/10 hover:border-white/20"
                    )}>
                      <div className="flex items-center gap-4">
                        <input
                          type="radio"
                          name="shippingMethod"
                          value="express"
                          checked={formData.shippingMethod === 'express'}
                          onChange={handleInputChange}
                          className="accent-gold"
                        />
                        <div className="space-y-1">
                          <p className="text-sm font-bold uppercase tracking-widest">Express Delivery</p>
                          <p className="text-xs text-cream/40">1-2 Business Days</p>
                        </div>
                      </div>
                      <span className="text-sm font-bold">€25.00</span>
                    </label>
                  </div>
                </div>

                {/* Payment */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-serif tracking-tight">Payment</h2>
                  <div className="glass p-8 space-y-6">
                    <div className="flex items-center justify-between pb-4 border-b border-white/10">
                      <div className="flex items-center gap-3">
                        <CreditCard size={20} className="text-gold" />
                        <span className="text-sm font-bold uppercase tracking-widest">Credit Card</span>
                      </div>
                      <div className="flex gap-2 opacity-60">
                        <Lock size={14} />
                        <span className="text-[10px] uppercase tracking-widest">Secure</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-cream/40">Card Number</label>
                        <input
                          type="text"
                          placeholder="•••• •••• •••• ••••"
                          className="w-full bg-white/5 border border-white/10 px-6 py-4 text-sm focus:border-gold outline-none transition-all"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-widest font-bold text-cream/40">Expiry Date</label>
                          <input
                            type="text"
                            placeholder="MM / YY"
                            className="w-full bg-white/5 border border-white/10 px-6 py-4 text-sm focus:border-gold outline-none transition-all"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-widest font-bold text-cream/40">CVC</label>
                          <input
                            type="text"
                            placeholder="•••"
                            className="w-full bg-white/5 border border-white/10 px-6 py-4 text-sm focus:border-gold outline-none transition-all"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gold text-onyx py-6 text-xs font-bold uppercase tracking-[0.4em] hover:bg-white transition-all duration-500 shadow-2xl shadow-gold/20"
                >
                  Complete Purchase — €{total.toFixed(2)}
                </button>
              </form>
            </div>

            {/* Right: Order Summary Sticky */}
            <div className="lg:sticky lg:top-32 h-fit space-y-8">
              <div className="glass p-8 space-y-8">
                <h2 className="text-xl font-serif tracking-widest uppercase">Order Summary</h2>
                
                <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {cart.map((item) => (
                    <div key={`${item.id}-${item.selectedSize}-${item.selectedColor?.hex || 'no-hex'}`} className="flex gap-4">
                      <div className="w-20 aspect-[3/4] bg-white/5 overflow-hidden shrink-0">
                        <img src={item.images?.[0] || 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop'} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex justify-between items-start">
                          <h3 className="text-xs font-bold uppercase tracking-widest">{item.name}</h3>
                          <span className="text-xs font-bold">€{(item.salePrice || item.price) * item.quantity}</span>
                        </div>
                        <p className="text-[10px] uppercase tracking-widest text-cream/40">
                          {item.selectedSize} / {item.selectedColor?.name || 'Unknown Color'}
                        </p>
                        <p className="text-[10px] uppercase tracking-widest text-cream/40">
                          Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4 pt-8 border-t border-white/10 text-sm uppercase tracking-widest">
                  <div className="flex justify-between text-cream/60">
                    <span>Subtotal</span>
                    <span>€{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-cream/60">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'FREE' : `€${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-cream/60">
                    <span>Estimated Tax</span>
                    <span>€{tax.toFixed(2)}</span>
                  </div>
                  <div className="pt-4 border-t border-white/10 flex justify-between text-xl font-bold text-gold">
                    <span>Total</span>
                    <span>€{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-8 opacity-40">
                <ShieldCheck size={24} />
                <Truck size={24} />
                <Lock size={24} />
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Checkout;
