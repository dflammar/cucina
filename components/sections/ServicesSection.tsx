"use client";

import { motion } from "framer-motion";

const services = [
  {
    id: "01",
    title: "Modern Kitchen Design & Execution",
    description: "Cucina offers integrated solutions in designing and executing modern kitchens, combining practical elegance with advanced functionality to create spaces that reflect your lifestyle and personal taste. We focus on premium-quality materials, smart storage solutions, and carefully crafted details that bring together comfort, efficiency, and refined aesthetics.\n\nOur process begins with understanding the client's needs and taking accurate measurements, followed by developing detailed 3D design concepts that visualize every aspect of the space. The project then moves into material selection and precision execution according to the highest standards, ending with professional installation and a fully completed delivery that embodies luxury, quality, and craftsmanship."
  },
  {
    id: "02",
    title: "Interior Decoration Execution",
    description: "At Cucina, we believe interior décor is far more than simply filling a space with elements — it is a complete experience carefully crafted to give every environment its own identity and character. We transform ideas into elegant living spaces through professional execution that combines premium materials, precise craftsmanship, and harmonious design in every detail.\n\nOur approach begins with understanding the space itself and the lifestyle or purpose behind it, allowing us to create tailored solutions that deliver not only visual beauty, but also a true sense of comfort and atmosphere. With a specialized team overseeing every stage, we ensure a smooth and refined process — from selecting materials and finishes to applying the final touches that define quality, sophistication, and luxury."
  },
  {
    id: "03",
    title: "Bedroom Design & Manufacturing",
    description: "At Cucina, we see the bedroom as more than just a furnished space — it is a personal sanctuary designed to bring comfort, tranquility, and a true sense of harmony. That is why we create bedrooms that blend modern elegance with practical functionality, transforming everyday living into a refined and comfortable experience that reflects each client's unique style.\n\nOur journey begins by understanding the client's lifestyle and the details that define their personal comfort, allowing us to develop a carefully planned design vision that considers dimensions, usability, and spatial flow. The concept then moves into the manufacturing stage, where selected premium materials and precise finishes showcase the quality of craftsmanship, followed by professional installation and final touches that give the space its elegant presence and warm atmosphere."
  },
  {
    id: "04",
    title: "Creative Solutions Combining Premium Quality & Functional Elegance",
    description: "Cucina delivers creative interior solutions that combine premium quality with functional elegance, crafting balanced spaces that meet everyday needs without compromising sophistication and style. We carefully select materials, harmonize colors and textures with a refined design approach, and implement smart ideas that maximize space efficiency while creating a distinctive modern identity.\n\nOur process begins with understanding the client's needs and the nature of the space, followed by developing practical and innovative design concepts tailored for seamless execution. Each stage is carried out with precision and attention to the highest quality standards, resulting in spaces that achieve both visual comfort and practical performance in every detail."
  }
];

export default function ServicesSection() {
  return (
    <section id="services" className="bg-cream-dark py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="font-serif font-bold text-charcoal text-4xl md:text-5xl mb-6 relative inline-block">
            <span className="relative z-10">Areas of Expertise</span>
            <div className="absolute left-0 bottom-1 w-full h-3 bg-gold/40 -z-0" />
          </h2>
          <div className="mt-4">
            <p className="font-serif font-bold text-lg text-charcoal">Cucina Plus Company</p>
            <p className="text-sm font-medium text-charcoal-light mt-1">Here, elegance is perfected and luxury stands out.</p>
          </div>
        </div>

        {/* Services List */}
        <div className="space-y-24">
          {services.map((service, index) => (
            <div key={service.id} className="relative max-w-4xl mx-auto">
              {/* Number and Yellow Bar */}
              <div className="flex flex-col items-center md:items-start mb-8 relative">
                <div className="absolute left-1/2 md:left-6 -top-12 md:-top-16 w-8 h-24 bg-gold -z-0 -translate-x-1/2 md:translate-x-0" />
                <span className="relative z-10 font-serif font-bold text-5xl md:text-6xl text-charcoal drop-shadow-sm md:ml-2">
                  {service.id}
                </span>
                <h3 className="font-serif font-bold text-2xl md:text-3xl text-charcoal mt-6 text-center md:text-left">
                  {service.title}
                </h3>
              </div>
              
              <div className="text-center md:text-left space-y-4 max-w-3xl">
                {service.description.split('\n\n').map((paragraph, i) => (
                  <p key={i} className="text-sm md:text-base text-charcoal/80 leading-relaxed font-medium">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
