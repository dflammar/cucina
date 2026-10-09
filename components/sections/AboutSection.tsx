"use client";

import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section id="about" className="bg-charcoal text-white pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        
        {/* Who We Are */}
        <div className="flex flex-col lg:flex-row mb-24 relative">
          {/* Decorative Yellow Box pointing like a tag */}
          <div className="hidden lg:flex absolute -left-10 top-0 h-16 w-16 bg-gold items-center justify-center">
            <span className="font-bold text-charcoal text-sm">01</span>
          </div>

          <div className="lg:w-1/3 mb-10 lg:mb-0 lg:pl-12">
            <h2 className="font-serif font-bold text-gold text-4xl md:text-5xl mb-6">
              Who We Are?
            </h2>
          </div>
          
          <div className="lg:w-2/3">
            <div className="bg-white text-charcoal p-8 md:p-12 shadow-2xl relative">
              <p className="text-sm md:text-base leading-relaxed mb-6 font-medium">
                Cocina Plus Kitchens & Decorations is a specialized company in the field of kitchen design, manufacturing, and interior decoration solutions. Since its establishment, the company has been committed to delivering modern and innovative concepts that meet clients&apos; needs while keeping pace with the latest trends in the world of interior design.
              </p>
              <p className="text-sm md:text-base leading-relaxed mb-8 font-medium">
                Founded in 2018 in Baghdad, Iraq. Cocina Plus has successfully built a strong reputation in the market within a short period, thanks to the quality of its work and its attention to the finest details in both design and execution.
              </p>
              
              <div className="border-t border-charcoal/10 pt-6">
                <p className="text-sm font-bold text-gold-dark mb-4">The company has two main branches in Baghdad:</p>
                <div className="flex flex-wrap gap-8">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-gold inline-block" />
                    <span className="font-black text-charcoal tracking-wide uppercase">Al-Mansour</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-gold inline-block" />
                    <span className="font-black text-charcoal tracking-wide uppercase">Al-Qahira</span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-charcoal-light mt-6 leading-relaxed">
                The company also boasts a professional team of experienced and highly qualified engineers and staff specializing in design and execution.
              </p>
            </div>
          </div>
        </div>

        {/* Vision & Mission Split */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
          <div className="hidden lg:flex absolute right-0 -top-8 h-12 w-12 bg-white items-center justify-center z-10 rounded-full shadow-lg">
            <span className="font-bold text-charcoal text-xs">02</span>
          </div>

          <div className="bg-gold text-charcoal p-10 md:p-14">
            <h3 className="font-serif font-bold text-4xl mb-6">Our Vision</h3>
            <p className="text-sm md:text-base leading-relaxed font-medium">
              Cucina Plus aspires to become one of the leading companies in the field of kitchen design, manufacturing, and interior decoration in Iraq, through continuous innovation and a strong commitment to the highest standards of quality and customer service.
            </p>
          </div>

          <div className="bg-charcoal-mid text-white p-10 md:p-14 border border-white/5">
            <h3 className="font-serif font-bold text-4xl mb-6">Our Mission</h3>
            <p className="text-sm md:text-base leading-relaxed text-white/70 font-light">
              Cucina Plus is dedicated to delivering the best of its expertise and high-quality materials to serve its clients. The company relies on premium wood selections and top-quality products to ensure customer satisfaction and deliver projects that reflect the highest standards of quality and professionalism in the world of kitchens and interior decor.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
