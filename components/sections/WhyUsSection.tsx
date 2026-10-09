"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

const reasons = [
  "At Cucina, we are committed to delivering excellence through carefully selected premium wood from the finest global sources, ensuring durability and long-lasting quality in every project.",
  "We offer premium 20 mm quartz surfaces as well as porcelain surfaces, both sourced from the finest international manufacturers and renowned for their exceptional quality.",
  "Our clients benefit from expert advice and creative design suggestions provided by specialized engineers, helping transform ideas into practical and elegant solutions.",
  "We guarantee true 100% assurance on all materials used in our projects, reflecting our confidence in quality and reliability.",
  "We are distinguished by our precise execution, comprehensive supervision of every project phase, and continuous follow-up, ensuring a flawlessly delivered project that reaches its highest standard upon final handover."
];

export default function WhyUsSection() {
  return (
    <section id="why-us" className="bg-charcoal text-white py-24 relative overflow-hidden">
      
      {/* Decorative top yellow accent */}
      <div className="absolute top-0 right-0 w-64 h-2 bg-gold" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="lg:w-2/3">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif font-bold text-gold text-4xl md:text-5xl mb-12"
          >
            Why Choose Us?
          </motion.h2>

          <div className="space-y-8">
            {reasons.map((reason, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4 group"
              >
                <div className="mt-1 flex-shrink-0">
                  <ChevronRight size={20} className="text-gold group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="text-sm md:text-base text-white/80 font-light leading-relaxed">
                  {reason}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
