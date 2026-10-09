"use client";

import Image from "next/image";

const partners = [
  { name: "Cimstone", src: "https://upload.wikimedia.org/wikipedia/commons/8/8c/Cimstone_logo.png" }, // Placeholder for actual logo
  { name: "Belenco", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Belenco_Logo.png/800px-Belenco_Logo.png" }, // Placeholder
  { name: "Hettich", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Hettich_logo.svg/1200px-Hettich_logo.svg.png" },
  { name: "Blum", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Julius_Blum_GmbH_Logo.svg/1200px-Julius_Blum_GmbH_Logo.svg.png" },
];

export default function PartnersSection() {
  return (
    <section className="bg-cream-dark py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:items-center">
          
          <div className="lg:w-1/2">
            <div className="bg-gold inline-block px-4 py-2 mb-8">
              <h2 className="font-serif font-bold text-charcoal text-3xl md:text-4xl">
                Our Partners
              </h2>
            </div>
            <p className="text-sm md:text-base text-charcoal-light leading-relaxed font-medium">
              We collaborate with leading international brands and manufacturers, enabling us to provide warranties extending over 10 years on our executed projects. We also import wood from top factories in Germany, Spain, Italy, and Turkey, selected for their superior quality and excellent resistance to various conditions, ensuring long-lasting durability and timeless elegance.
            </p>
          </div>

          <div className="lg:w-1/2">
            <div className="grid grid-cols-2 gap-8 md:gap-12 items-center justify-items-center">
              <div className="flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
                <span className="font-black text-2xl text-red-600 tracking-tighter">ÇİMSTONE</span>
              </div>
              <div className="flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
                <span className="font-bold text-2xl text-purple-800 tracking-tight">belenco</span>
              </div>
              <div className="flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
                <span className="font-bold text-3xl text-charcoal tracking-tight">Hettich</span>
              </div>
              <div className="flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
                <div className="bg-[#eb6b29] text-white font-bold text-xl px-4 py-1">blum</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
