"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown } from "lucide-react";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-charcoal"
    >
      {/* Background Image Setup */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=90&w=2070&auto=format&fit=crop"
          alt="Cucina Plus Interior"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Very dark solid overlay to match the high-contrast brand look */}
        <div className="absolute inset-0 bg-charcoal/80" />
        
        {/* Left bold yellow block decoration */}
        <div className="absolute top-0 left-0 w-2 h-full bg-gold hidden md:block" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 w-full pt-[72px]">
        <div className="max-w-4xl">
          {/* Logo / Brand Name in Hero */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8"
          >
            <span className="text-[clamp(3rem,6vw,4.5rem)] font-black tracking-tight text-gold leading-none">
              CUCINA <sup className="text-[0.4em] lowercase align-super -ml-1 text-white">plus</sup>
            </span>
          </motion.div>

          {/* Hero headline - using the exact brand text and serif font */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.2 }}
            className="font-serif font-bold text-white leading-tight mb-8"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
          >
            Interior Design Solutions
            <br />
            <span className="text-white/90 font-light italic">Luxury Kitchens & Bedroom Designs</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-white/60 font-light text-lg md:text-xl leading-relaxed mb-12 max-w-xl"
          >
            Delivering excellence through carefully selected premium materials, ensuring durability, long-lasting quality, and timeless elegance in every project.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <Link 
              href="#portfolio" 
              className="px-8 py-4 bg-gold text-charcoal font-bold text-sm hover:bg-gold-light transition-colors uppercase tracking-widest"
            >
              Our Portfolio
            </Link>
            <Link
              href="#contact"
              className="px-8 py-4 border-2 border-white/20 text-white font-bold text-sm hover:bg-white hover:text-charcoal transition-colors uppercase tracking-widest"
            >
              Contact Us
            </Link>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/30"
      >
        <span className="text-[10px] tracking-[0.25em] uppercase font-bold">Discover</span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ArrowDown size={16} className="text-gold" />
        </motion.div>
      </motion.div>
    </section>
  );
}
