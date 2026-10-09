"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type Project = {
  id: string;
  title: string;
  image_url: string;
  category: string;
};

const placeholderProjects: Project[] = [
  { id: "1", title: "Warm Oak Open Kitchen", image_url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=85&w=900&auto=format&fit=crop", category: "kitchen" },
  { id: "2", title: "Matte White Linear Kitchen", image_url: "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?q=85&w=900&auto=format&fit=crop", category: "kitchen" },
  { id: "3", title: "Dark Handleless Kitchen", image_url: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=85&w=900&auto=format&fit=crop", category: "kitchen" },
  { id: "4", title: "Ivory & Gold Master Bedroom", image_url: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=85&w=900&auto=format&fit=crop", category: "bedroom" },
  { id: "5", title: "Minimalist Grey Bedroom", image_url: "https://images.unsplash.com/photo-1616594039971-2f3ea3a73ead?q=85&w=900&auto=format&fit=crop", category: "bedroom" },
  { id: "6", title: "Open-Plan Kitchen & Living", image_url: "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?q=85&w=900&auto=format&fit=crop", category: "kitchen" },
];

const categories = [
  { label: "All Projects", value: "all" },
  { label: "Kitchens", value: "kitchen" },
  { label: "Bedrooms", value: "bedroom" },
];

export default function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [projects, setProjects] = useState<Project[]>(placeholderProjects);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .order("created_at", { ascending: false });
        if (!error && data && data.length > 0) setProjects(data);
      } catch { /* keep placeholders */ }
      finally { setLoading(false); }
    };
    fetch();
  }, []);

  const filtered =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="portfolio" style={{ backgroundColor: "var(--color-cream-dark)" }}>

      {/* ── Header zone ── */}
      <div className="py-28 pb-0">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">

          {/* Two-col header like Nolte "Real homes" */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 mb-12 items-end">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65 }}
              className="font-black leading-[1.06]"
              style={{
                fontSize: "clamp(2.4rem, 5vw, 4.5rem)",
                color: "var(--color-charcoal)",
              }}
            >
              Real Cucina Plus
              <br />
              <em className="not-italic" style={{ color: "var(--color-gold)" }}>
                kitchens.
              </em>
              <br />
              Real homes.
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <p
                className="text-base font-light leading-[1.9] mb-8"
                style={{ color: "var(--color-charcoal-light)" }}
              >
                Get inspired by real projects designed and installed by our team
                across Baghdad. Would you like your project featured here?{" "}
                <a
                  href="#contact"
                  className="font-semibold underline underline-offset-2 transition-colors"
                  style={{ color: "var(--color-charcoal)" }}
                >
                  Contact us.
                </a>
              </p>

              {/* Category pills */}
              <div className="flex gap-2 flex-wrap">
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => setActiveCategory(cat.value)}
                    className="px-5 py-2 text-sm font-bold transition-all duration-200"
                    style={{
                      borderRadius: "9999px",
                      backgroundColor:
                        activeCategory === cat.value
                          ? "var(--color-charcoal)"
                          : "transparent",
                      color:
                        activeCategory === cat.value
                          ? "var(--color-cream)"
                          : "var(--color-charcoal)",
                      border: `1.5px solid ${
                        activeCategory === cat.value
                          ? "var(--color-charcoal)"
                          : "rgba(28,26,23,0.3)"
                      }`,
                    }}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Grid ── */}
      <div className="pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-80 rounded-[12px] animate-pulse"
                  style={{ backgroundColor: "var(--color-cream-mid)" }} />
              ))}
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {filtered.map((project, i) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.45, delay: i * 0.07 }}
                    className="group relative overflow-hidden rounded-[12px] cursor-pointer"
                    style={{ height: "320px", backgroundColor: "var(--color-cream-mid)" }}
                  >
                    <Image
                      src={project.image_url}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {/* Hover overlay */}
                    <div
                      className="absolute inset-0 flex items-end transition-all duration-400"
                      style={{ background: "linear-gradient(to top, rgba(18,16,13,0) 0%, rgba(18,16,13,0) 100%)" }}
                    >
                      <div
                        className="absolute inset-0 transition-opacity duration-400 opacity-0 group-hover:opacity-100"
                        style={{ background: "linear-gradient(to top, rgba(18,16,13,0.75) 0%, rgba(18,16,13,0.1) 60%)" }}
                      />
                      <div className="relative p-6 translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400">
                        <div
                          className="w-6 h-0.5 mb-3"
                          style={{ backgroundColor: "var(--color-gold)" }}
                        />
                        <p className="text-white font-black text-lg">
                          {project.title}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}

          {/* Nav arrows */}
          <div className="flex justify-center gap-3 mt-10">
            {[{ icon: ArrowLeft, label: "Previous" }, { icon: ArrowRight, label: "Next" }].map(
              ({ icon: Icon, label }) => (
                <button
                  key={label}
                  aria-label={label}
                  className="p-3 rounded-full border transition-all duration-200"
                  style={{
                    border: "1.5px solid rgba(28,26,23,0.25)",
                    color: "var(--color-charcoal)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = "var(--color-charcoal)";
                    (e.currentTarget as HTMLButtonElement).style.color = "var(--color-cream)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
                    (e.currentTarget as HTMLButtonElement).style.color = "var(--color-charcoal)";
                  }}
                >
                  <Icon size={18} />
                </button>
              )
            )}
          </div>
        </div>
      </div>

    </section>
  );
}
