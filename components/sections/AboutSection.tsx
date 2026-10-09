"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function AboutSection() {
  return (
    <section id="about">

      {/* ── Part 1: Cream — editorial split story ── */}
      <div className="bg-cream py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28 items-start">

            {/* Left: Big heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p
                className="font-bold text-xs tracking-[0.3em] uppercase mb-6"
                style={{ color: "var(--color-gold)" }}
              >
                About Cucina Plus
              </p>
              <h2
                className="font-black leading-[1.04]"
                style={{
                  fontSize: "clamp(2.8rem, 6vw, 5rem)",
                  color: "var(--color-charcoal)",
                }}
              >
                A kitchen is
                <br />
                with you for
                <br />
                <em
                  className="not-italic"
                  style={{ color: "var(--color-gold)" }}
                >
                  many years.
                </em>
              </h2>
            </motion.div>

            {/* Right: Story */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="lg:pt-20"
            >
              <p
                className="text-lg font-light leading-[1.9] mb-6"
                style={{ color: "var(--color-charcoal-light)" }}
              >
                Founded in 2018 in Baghdad, Iraq, Cucina Plus was built on a single
                belief: every home deserves a kitchen and interior designed with the
                same precision as those found in Europe&apos;s finest residences.
              </p>
              <p
                className="text-base font-light leading-[1.9] mb-10"
                style={{ color: "var(--color-charcoal-light)" }}
              >
                With two showrooms in{" "}
                <strong style={{ fontWeight: 700, color: "var(--color-charcoal)" }}>
                  Mansour
                </strong>{" "}
                and{" "}
                <strong style={{ fontWeight: 700, color: "var(--color-charcoal)" }}>
                  Cairo district
                </strong>
                , our team works closely with each client — turning personal visions
                into lasting spaces.
              </p>
              <Link href="#contact" className="btn-pill btn-pill-dark inline-flex text-sm">
                Find a showroom
              </Link>
            </motion.div>

          </div>
        </div>
      </div>

      {/* ── Part 2: DARK STATS BAND — full bleed, charcoal ── */}
      <div
        className="py-20"
        style={{ backgroundColor: "var(--color-charcoal)" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            {[
              { number: "7+", label: "Years of Excellence" },
              { number: "500+", label: "Projects Completed" },
              { number: "2", label: "Baghdad Showrooms" },
              { number: "100%", label: "Satisfaction Guarantee" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                className="text-center"
              >
                <p
                  className="font-black leading-none mb-3"
                  style={{
                    fontSize: "clamp(2.5rem, 5vw, 4rem)",
                    color: "var(--color-gold)",
                  }}
                >
                  {stat.number}
                </p>
                <p
                  className="text-xs font-semibold tracking-[0.15em] uppercase"
                  style={{ color: "rgba(247,243,237,0.5)" }}
                >
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Part 3: Full-bleed image ── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative w-full overflow-hidden"
        style={{ height: "clamp(320px, 55vw, 680px)" }}
      >
        <Image
          src="https://images.unsplash.com/photo-1556909172-54557c7e4fb7?q=85&w=2070&auto=format&fit=crop"
          alt="Cucina Plus showroom"
          fill
          className="object-cover"
          sizes="100vw"
        />
        {/* subtle dark gradient bottom */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(18,16,13,0.5) 0%, transparent 50%)",
          }}
        />
      </motion.div>

      {/* ── Part 4: Vision & Mission ── */}
      <div
        className="py-28"
        style={{ backgroundColor: "var(--color-cream-dark)" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
            {[
              {
                title: "Our Vision",
                body: "To become the first choice in Iraq and the region for premium kitchen and interior design — inspiring a refined lifestyle that blends beauty and function in every home.",
              },
              {
                title: "Our Mission",
                body: "To deliver innovative, high-quality design solutions that transform spaces into true reflections of their owners — upholding European standards in materials, execution, and service.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: i * 0.15 }}
              >
                <div
                  className="w-10 h-0.5 mb-6"
                  style={{ backgroundColor: "var(--color-gold)" }}
                />
                <h3
                  className="font-black mb-5 leading-tight"
                  style={{
                    fontSize: "clamp(1.6rem, 2.5vw, 2.25rem)",
                    color: "var(--color-charcoal)",
                  }}
                >
                  {item.title}
                </h3>
                <p
                  className="font-light leading-[1.9] text-base"
                  style={{ color: "var(--color-charcoal-light)" }}
                >
                  {item.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
