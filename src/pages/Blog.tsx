import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, User, Tag } from 'lucide-react';

const BLOG_POSTS = [
  {
    id: '1',
    title: 'The Art of the Midnight Silhouette',
    excerpt: 'Exploring the engineering behind our signature silk shirts and how they capture the essence of the urban night.',
    image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=1000&auto=format&fit=crop',
    date: 'March 15, 2026',
    author: 'Alexander Thorne',
    category: 'Design',
  },
  {
    id: '2',
    title: 'Sustainable Luxury: A New Standard',
    excerpt: 'How Veloria is redefining the fashion industry through conscious production and heritage craftsmanship.',
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1000&auto=format&fit=crop',
    date: 'March 10, 2026',
    author: 'Marcus Chen',
    category: 'Sustainability',
  },
  {
    id: '3',
    title: 'The Rebellion of the Emerald Trench',
    excerpt: 'A deep dive into the inspiration behind our most avant-garde piece yet: The Emerald Leather Trench.',
    image: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?q=80&w=1000&auto=format&fit=crop',
    date: 'March 05, 2026',
    author: 'Elena Rossi',
    category: 'Collection',
  },
];

const Blog = () => {
  return (
    <div className="pt-24 min-h-screen">
      {/* Page Header */}
      <div className="py-20 px-6 lg:px-12 bg-white/[0.02] border-b border-white/5 text-center space-y-4">
        <p className="text-gold uppercase tracking-[0.4em] text-[10px] font-bold">The Narrative</p>
        <h1 className="text-5xl md:text-7xl font-serif tracking-tight">Veloria Journal</h1>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {BLOG_POSTS.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group space-y-6"
            >
              <div className="aspect-[16/10] overflow-hidden bg-white/5 relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-onyx/80 backdrop-blur-md text-gold text-[10px] uppercase tracking-widest px-3 py-1 font-bold">
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-6 text-[10px] uppercase tracking-widest text-cream/40 font-bold">
                  <div className="flex items-center gap-2">
                    <Clock size={12} /> {post.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <User size={12} /> {post.author}
                  </div>
                </div>
                <h2 className="text-2xl font-serif tracking-tight group-hover:text-gold transition-colors">
                  {post.title}
                </h2>
                <p className="text-cream/60 text-sm leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
                <button className="text-xs font-bold uppercase tracking-widest text-gold flex items-center gap-2 group/btn">
                  Read Article <ArrowRight size={14} className="group-hover/btn:translate-x-2 transition-transform" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Featured Section */}
      <section className="py-32 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <p className="text-gold uppercase tracking-[0.3em] text-[10px] font-bold">Featured Story</p>
            <h2 className="text-5xl md:text-6xl font-serif tracking-tight">Redefining the Night</h2>
            <p className="text-cream/60 text-lg font-light leading-relaxed">
              Our latest editorial explores the intersection of architecture and anatomy. How we use structure to create emotion, and why the night is our greatest inspiration.
            </p>
            <button className="bg-gold text-onyx px-12 py-5 text-xs font-bold uppercase tracking-[0.3em] hover:bg-white transition-all duration-500">
              Read the Editorial
            </button>
          </div>
          <div className="aspect-square bg-white/5 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000&auto=format&fit=crop"
              alt="Editorial"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-40 px-6 text-center space-y-12">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-4xl md:text-5xl font-serif tracking-tight">JOIN THE INNER CIRCLE</h2>
          <p className="text-cream/60 text-sm uppercase tracking-widest">
            Receive exclusive early access to new collections and the Veloria Journal.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 pt-8">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 bg-white/5 border border-white/10 px-8 py-5 text-sm focus:border-gold outline-none transition-all"
            />
            <button className="bg-gold text-onyx px-12 py-5 text-xs font-bold uppercase tracking-[0.3em] hover:bg-white transition-all duration-500">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Blog;
