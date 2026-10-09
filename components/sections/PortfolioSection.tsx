"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import Image from "next/image";
import { Play } from "lucide-react";

type Project = {
  id: string;
  title: string;
  image_url: string;
  category: string;
};

const categories = [
  { id: "all", label: "All Projects" },
  { id: "kitchen", label: "Kitchens" },
  { id: "bedroom", label: "Bedrooms" },
  { id: "decor", label: "Decor" },
];

export default function PortfolioSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filter, setFilter] = useState("all");

  const fetchProjects = useCallback(async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });
    setProjects(data ?? []);
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const filtered =
    filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="portfolio" className="bg-charcoal text-white py-24 relative overflow-hidden">
      
      {/* Decorative top yellow accent */}
      <div className="absolute top-10 left-0 w-3 h-24 bg-gold" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <h2 className="font-serif font-bold text-gold text-4xl md:text-5xl mb-4">
              Our Portfolio
            </h2>
            <p className="text-white/60 font-light max-w-xl text-sm md:text-base leading-relaxed">
              Explore our latest projects showcasing our commitment to quality, modern design, and exceptional elegance.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setFilter(c.id)}
                className={`px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 ${
                  filter === c.id
                    ? "bg-gold text-charcoal"
                    : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project) => (
            <div
              key={project.id}
              className="group relative aspect-[4/5] overflow-hidden bg-charcoal-mid rounded-3xl"
            >
              {/* Yellow background shape visible on hover */}
              <div className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
              
              <Image
                src={project.image_url}
                alt={project.title}
                fill
                className="object-cover transition-all duration-500 group-hover:scale-105 group-hover:opacity-40"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              
              <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="w-12 h-12 bg-charcoal text-gold flex items-center justify-center rounded-full mb-4 shadow-xl">
                  <Play size={18} className="ml-1" />
                </span>
                <h3 className="text-charcoal font-black text-xl text-center px-4">
                  {project.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
