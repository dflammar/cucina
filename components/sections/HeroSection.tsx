"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown } from "lucide-react";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Full-screen background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=90&w=2070&auto=format&fit=crop"
          alt="Cucina Plus premium kitchen"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Rich dark overlay for drama */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, rgba(18,16,13,0.88) 0%, rgba(18,16,13,0.70) 50%, rgba(18,16,13,0.30) 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 w-full pt-[72px]">
        <div className="max-w-3xl">

          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xs font-bold tracking-[0.35em] uppercase mb-8"
            style={{ color: "var(--color-gold)" }}
          >
            Baghdad · Iraq &nbsp;·&nbsp; Since 2018
          </motion.p>

          {/* Hero headline — large, bold, multi-line */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.2 }}
            className="font-black leading-[1.0] mb-8 text-white"
            style={{ fontSize: "clamp(3.5rem, 9vw, 7.5rem)" }}
          >
            Cucina Plus
            <br />
            <em
              className="not-italic"
              style={{ color: "var(--color-gold)" }}
            >
              kitchens
            </em>
            <br />
            &amp; interiors
          </motion.h1>

          {/* Body */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-white/70 font-light text-lg md:text-xl leading-relaxed mb-12 max-w-xl"
          >
            European craftsmanship. Iraqi passion. Spaces designed to
            last a lifetime — kitchens, bedrooms, and interiors that
            truly feel like home.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.6 }}
            className="flex flex-wrap gap-3"
          >
            <Link href="#portfolio" className="btn-pill btn-pill-gold text-sm">
              Explore our work
            </Link>
            <Link
              href="#contact"
              className="btn-pill text-sm"
              style={{
                borderRadius: "9999px",
                border: "1.5px solid rgba(255,255,255,0.5)",
                color: "#fff",
                backgroundColor: "transparent",
              }}
            >
              Book a free consultation
            </Link>
          </motion.div>

          {/* At a glance strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 1.0 }}
            className="mt-20 pt-8 border-t border-white/15 flex flex-wrap gap-x-8 gap-y-3"
          >
            {[
              "European-Grade Wood",
              "20mm Quartz Surfaces",
              "5-Year Warranty",
              "3D Design Preview",
              "2 Baghdad Showrooms",
            ].map((item) => (
              <span
                key={item}
                className="flex items-center gap-2 text-xs font-semibold text-white/60"
              >
                <span style={{ color: "var(--color-gold)" }}>✓</span>
                {item}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        style={{ color: "rgba(255,255,255,0.4)" }}
      >
        <span className="text-[10px] tracking-[0.25em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}
