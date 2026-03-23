import React from 'react';
import { motion } from 'motion/react';

const Newsletter = () => {
  return (
    <section className="py-32 px-6 bg-onyx relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[120px]" />
      
      <div className="max-w-3xl mx-auto text-center relative z-10 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <h2 className="text-4xl md:text-5xl font-serif tracking-tight">Join the Inner Circle</h2>
          <p className="text-cream/60 text-lg max-w-xl mx-auto">
            Subscribe to receive early access to new collections, exclusive events, and the latest editorial stories.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto"
        >
          <input
            type="email"
            placeholder="Your email address"
            className="flex-1 bg-white/5 border border-white/10 px-6 py-4 text-sm focus:border-gold outline-none transition-all"
            required
          />
          <button
            type="submit"
            className="bg-gold text-onyx px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-white transition-all duration-300"
          >
            Subscribe
          </button>
        </motion.form>

        <p className="text-[10px] uppercase tracking-[0.2em] text-cream/30">
          By subscribing, you agree to our Privacy Policy and Terms of Service.
        </p>
      </div>
    </section>
  );
};

export default Newsletter;
