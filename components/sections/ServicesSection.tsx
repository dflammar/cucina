"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const cards = [
  {
    category: "Kitchens",
    title: "Designed for real life.",
    description:
      "European craftsmanship meets everyday living — kitchens built around you, your family, and the way you cook.",
    image:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=85&w=900&auto=format&fit=crop",
    href: "#portfolio",
  },
  {
    category: "Bedrooms",
    title: "Rest in refined comfort.",
    description:
      "Custom bedroom furniture built around you — your space, your personality, your perfect night's rest.",
    image:
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=85&w=900&auto=format&fit=crop",
    href: "#portfolio",
  },
  {
    category: "Interiors",
    title: "Every space, elevated.",
    description:
      "From entryways to living rooms — we design spaces where function and beauty exist in perfect harmony.",
    image:
      "https://images.unsplash.com/photo-1616137466211-f939a420be84?q=85&w=900&auto=format&fit=crop",
    href: "#portfolio",
  },
  {
    category: "Custom",
    title: "Your vision, our craft.",
    description:
      "Have a unique challenge? Our designers love bringing creative solutions to any dimension or layout.",
    image:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=85&w=900&auto=format&fit=crop",
    href: "#contact",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-28" style={{ backgroundColor: "var(--color-cream)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Header row — left heading, right subtext */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="font-black leading-[1.06] max-w-lg"
            style={{
              fontSize: "clamp(2.2rem, 4.5vw, 3.75rem)",
              color: "var(--color-charcoal)",
            }}
          >
            More Than Just
            <br />a Kitchen — Spaces
            <br />
            <em className="not-italic" style={{ color: "var(--color-gold)" }}>
              That Complement
              <br />
              Each Other
            </em>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="md:max-w-xs"
          >
            <p
              className="text-base font-light leading-[1.85] mb-6"
              style={{ color: "var(--color-charcoal-light)" }}
            >
              With Cucina Plus, you can design not only your kitchen but every
              room around it — creating a home where design and function come
              together.
            </p>
            <Link href="#portfolio" className="read-more font-bold">
              See all our work <span>→</span>
            </Link>
          </motion.div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cards.map((card, i) => (
            <motion.div
              key={card.category}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group rounded-[12px] overflow-hidden flex flex-col"
              style={{ backgroundColor: "var(--color-cream-dark)" }}
            >
              {/* Image */}
              <div className="relative overflow-hidden" style={{ height: "240px" }}>
                <Image
                  src={card.image}
                  alt={card.category}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-107"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                {/* Category badge on image */}
                <div className="absolute top-4 left-4">
                  <span
                    className="text-[10px] font-black tracking-[0.2em] uppercase px-3 py-1.5 rounded-full"
                    style={{
                      backgroundColor: "rgba(18,16,13,0.75)",
                      color: "var(--color-gold)",
                    }}
                  >
                    {card.category}
                  </span>
                </div>
              </div>

              {/* Text */}
              <div className="p-6 flex flex-col flex-1">
                <h3
                  className="font-black text-lg mb-2 leading-snug"
                  style={{ color: "var(--color-charcoal)" }}
                >
                  {card.title}
                </h3>
                <p
                  className="text-sm font-light leading-relaxed flex-1 mb-6"
                  style={{ color: "var(--color-charcoal-light)" }}
                >
                  {card.description}
                </p>
                <Link href={card.href} className="read-more">
                  Read more <span>→</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
