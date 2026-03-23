import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Instagram, ArrowRight, ShieldCheck, Leaf, Clock, Users } from 'lucide-react';
import Newsletter from '../components/Newsletter';

const About = () => {
  const values = [
    {
      icon: <ShieldCheck size={32} />,
      title: 'Craftsmanship',
      description: 'Every garment is engineered with precision, using only the finest materials sourced from heritage mills.',
    },
    {
      icon: <Leaf size={32} />,
      title: 'Sustainability',
      description: 'We believe in conscious luxury. Our production processes are designed to minimize environmental impact.',
    },
    {
      icon: <Clock size={32} />,
      title: 'Timelessness',
      description: 'We defy the ordinary by creating pieces that transcend seasons and trends. Luxury that lasts.',
    },
    {
      icon: <Users size={32} />,
      title: 'Community',
      description: 'Veloria is more than a brand; it is a movement. A collective of avant-garde souls redefining the night.',
    },
  ];

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="h-[80vh] relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?q=80&w=2000&auto=format&fit=crop"
            alt="About Hero"
            className="w-full h-full object-cover opacity-40"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-onyx via-transparent to-onyx" />
        </div>
        <div className="relative z-10 text-center max-w-4xl px-6 space-y-8">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-serif tracking-tight"
          >
            WE DRESS THE BOLD.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-cream/60 font-light italic"
          >
            "Luxury is not about excess; it is about the raw emotion of a perfectly engineered silhouette."
          </motion.p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-32 px-6 lg:px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <p className="text-gold uppercase tracking-[0.3em] text-[10px] font-bold">The Narrative</p>
          <h2 className="text-5xl md:text-6xl font-serif tracking-tight">Our Story</h2>
          <div className="space-y-6 text-cream/60 text-lg font-light leading-relaxed">
            <p>
              Founded in 2022, Veloria emerged from a desire to bridge the gap between high-fashion couture and the raw energy of contemporary streetwear.
            </p>
            <p>
              Our journey began in a small atelier in London, where we experimented with silhouettes that defied traditional gender norms and textures that captured the essence of the urban night.
            </p>
            <p>
              Today, Veloria is a global brand recognized for its uncompromising commitment to quality, its avant-garde aesthetic, and its mission to empower the modern soul through timeless rebellion.
            </p>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="aspect-[4/5] bg-white/5 overflow-hidden"
        >
          <img
            src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1000&auto=format&fit=crop"
            alt="Atelier"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </section>

      {/* Our Values */}
      <section className="py-32 px-6 lg:px-12 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto space-y-20">
          <div className="text-center space-y-4">
            <p className="text-gold uppercase tracking-[0.3em] text-[10px] font-bold">The Foundation</p>
            <h2 className="text-4xl md:text-5xl font-serif tracking-tight">Our Values</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass p-10 space-y-6 group hover:border-gold/30 transition-all duration-500"
              >
                <div className="text-gold group-hover:scale-110 transition-transform duration-500">{value.icon}</div>
                <h3 className="text-xl font-serif tracking-widest uppercase">{value.title}</h3>
                <p className="text-sm text-cream/40 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Team */}
      <section className="py-32 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="space-y-20">
          <div className="text-center space-y-4">
            <p className="text-gold uppercase tracking-[0.3em] text-[10px] font-bold">The Visionaries</p>
            <h2 className="text-4xl md:text-5xl font-serif tracking-tight">Behind the Brand</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { name: 'Alexander Thorne', role: 'Creative Director', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop' },
              { name: 'Elena Rossi', role: 'Head of Design', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&auto=format&fit=crop' },
              { name: 'Marcus Chen', role: 'Sustainability Lead', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop' },
            ].map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="space-y-6 text-center group"
              >
                <div className="aspect-square overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xl font-serif tracking-tight">{member.name}</h4>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-gold font-bold">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-32 px-6 lg:px-12 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="space-y-8">
            <h2 className="text-4xl font-serif tracking-tight">Get in Touch</h2>
            <p className="text-cream/60 text-lg font-light leading-relaxed">
              Whether you have a question about our collections or simply want to share your journey, we'd love to hear from you.
            </p>
            <div className="space-y-4 text-sm uppercase tracking-widest text-gold font-bold">
              <p>Email: concierge@veloria.com</p>
              <p>Phone: +44 (0) 20 7946 0123</p>
              <p>Atelier: 124 Savile Row, London, UK</p>
            </div>
          </div>
          
          <form className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-cream/40">Name</label>
              <input type="text" className="w-full bg-white/5 border border-white/10 px-6 py-4 text-sm focus:border-gold outline-none transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-cream/40">Email</label>
              <input type="email" className="w-full bg-white/5 border border-white/10 px-6 py-4 text-sm focus:border-gold outline-none transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-cream/40">Message</label>
              <textarea rows={4} className="w-full bg-white/5 border border-white/10 px-6 py-4 text-sm focus:border-gold outline-none transition-all resize-none" />
            </div>
            <button className="w-full bg-gold text-onyx py-5 text-xs font-bold uppercase tracking-[0.3em] hover:bg-white transition-all duration-500">
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-40 px-6 text-center space-y-12">
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif tracking-tight">READY TO JOIN THE MOVEMENT?</h2>
        <Link
          to="/shop"
          className="inline-flex items-center gap-4 bg-gold text-onyx px-16 py-6 text-xs font-bold uppercase tracking-[0.4em] hover:bg-white transition-all duration-500 group"
        >
          Explore the Collection
          <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
        </Link>
      </section>

      <Newsletter />
    </div>
  );
};

export default About;
