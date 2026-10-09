"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const features = [
  {
    number: "01",
    title: "European-Grade Wood",
    description:
      "Only the finest moisture and heat-resistant boards — the same materials used across Europe's most respected kitchen studios.",
  },
  {
    number: "02",
    title: "20mm Quartz Surfaces",
    description:
      "Premium quartz countertops at 20mm thickness — durable, non-porous, and effortlessly elegant.",
  },
  {
    number: "03",
    title: "3D Design Preview",
    description:
      "See your kitchen in photorealistic 3D before a single cabinet is made. Full confidence from day one.",
  },
  {
    number: "04",
    title: "Genuine 5-Year Warranty",
    description:
      "We stand behind every project — a full warranty on all executed work, with dedicated after-sales support.",
  },
];

export default function WhyUsSection() {
  return (
    <section id="why-us">

      {/* ── Top: FULL DARK section ── */}
      <div
        className="py-28"
        style={{ backgroundColor: "var(--color-charcoal)" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">

          {/* Header row */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 mb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p
                className="font-bold text-xs tracking-[0.3em] uppercase mb-5"
                style={{ color: "var(--color-gold)" }}
              >
                Why Cucina Plus?
              </p>
              <h2
                className="font-black text-white leading-[1.05]"
                style={{ fontSize: "clamp(2.4rem, 5vw, 4.5rem)" }}
              >
                Excellence in every
                <br />
                <em className="not-italic" style={{ color: "var(--color-gold)" }}>
                  detail.
                </em>
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.15 }}
              className="text-base font-light leading-[1.85] max-w-md"
              style={{ color: "rgba(247,243,237,0.55)" }}
            >
              A kitchen is with you for many years. That&apos;s why it&apos;s not
              just about design — it&apos;s about choosing the right partner,
              the right materials, and the right craftsmen.
            </motion.p>
          </div>

          {/* Features grid — numbered */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 border-l border-white/10">
            {features.map((feat, i) => (
              <motion.div
                key={feat.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="p-10 border-r border-b border-white/10 group hover:bg-white/3 transition-colors duration-300"
              >
                <p
                  className="font-black text-5xl mb-6 leading-none"
                  style={{ color: "rgba(201,168,76,0.25)" }}
                >
                  {feat.number}
                </p>
                <h3
                  className="font-black text-white text-lg mb-3"
                >
                  {feat.title}
                </h3>
                <p
                  className="text-sm font-light leading-relaxed"
                  style={{ color: "rgba(247,243,237,0.50)" }}
                >
                  {feat.description}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>

      {/* ── Bottom: CREAM — split anti-fingerprint section ── */}
      <div className="py-28" style={{ backgroundColor: "var(--color-cream)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-24 items-center">

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: -28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75 }}
            >
              <h2
                className="font-black leading-[1.1] mb-6"
                style={{
                  fontSize: "clamp(2rem, 4vw, 3.25rem)",
                  color: "var(--color-charcoal)",
                }}
              >
                Anti-fingerprint surfaces.
                <br />
                <em className="not-italic" style={{ color: "var(--color-gold)" }}>
                  Spotless by design.
                </em>
              </h2>
              <p
                className="font-light text-base leading-[1.9] mb-10 max-w-lg"
                style={{ color: "var(--color-charcoal-light)" }}
              >
                With premium matte finishes and anti-fingerprint technology, your
                Cucina Plus kitchen stays cleaner for longer — ideal for families,
                passionate cooks, and anyone with little time for cleaning.
              </p>
              <Link href="#contact" className="btn-pill btn-pill-dark inline-flex text-sm">
                Discover anti-fingerprint →
              </Link>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 0.1 }}
              className="relative overflow-hidden rounded-[12px]"
              style={{ height: "480px" }}
            >
              <Image
                src="https://images.unsplash.com/photo-1556909172-54557c7e4fb7?q=85&w=1200&auto=format&fit=crop"
                alt="Premium kitchen surfaces"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>

          </div>
        </div>
      </div>

    </section>
  );
}
