"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { MapPin, Phone, CheckCircle2, Link as LinkIcon, AtSign } from "lucide-react";

export default function ContactSection() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      service: formData.get("service"),
      message: formData.get("message"),
    };

    const supabase = createClient();
    await supabase.from("messages").insert([data]);

    setLoading(false);
    setSuccess(true);
    e.currentTarget.reset();

    setTimeout(() => setSuccess(false), 5000);
  };

  return (
    <section id="contact" className="bg-charcoal text-white py-24 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Left: Contact Info */}
          <div>
            <div className="mb-12">
              <div className="flex flex-col leading-none mb-4">
                <span className="text-5xl font-black tracking-tight text-gold">
                  CUCINA <sup className="text-[0.4em] lowercase align-super -ml-1 text-white">plus</sup>
                </span>
              </div>
              <p className="font-serif font-bold text-white text-xl md:text-2xl mt-4">
                Your Elegance is Our Specialty
              </p>
            </div>

            <div className="space-y-10">
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-full bg-gold/10 text-gold flex items-center justify-center shrink-0 group-hover:bg-gold group-hover:text-charcoal transition-colors">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-2">Al-Mansour</h4>
                  <p className="text-white/60 text-sm leading-relaxed mb-3">
                    Al-Aqwas Intersection - Next to Asasil Company<br/>Next to Chocolate Saray
                  </p>
                  <a href="tel:07738666767" className="text-gold font-bold hover:text-gold-light text-sm">07738666767</a>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-full bg-gold/10 text-gold flex items-center justify-center shrink-0 group-hover:bg-gold group-hover:text-charcoal transition-colors">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-2">Branch 2: Cairo District</h4>
                  <p className="text-white/60 text-sm leading-relaxed mb-3">
                    near Al-Nidaa Mosque - opposite Sanabel Lebanon
                  </p>
                  <a href="tel:07737779776" className="text-gold font-bold hover:text-gold-light text-sm">07737779776</a>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                <div className="w-10 h-10 rounded-full bg-gold/10 text-gold flex items-center justify-center shrink-0">
                  <AtSign size={20} />
                </div>
                <p className="text-sm font-medium text-white/80">cucina._plus</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gold/10 text-gold flex items-center justify-center shrink-0">
                  <LinkIcon size={20} />
                </div>
                <p className="text-sm font-medium text-white/80">مطابخ كوجينا بلس</p>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-charcoal-mid p-8 md:p-10 rounded-xl border border-white/5 relative overflow-hidden">
            <h3 className="font-serif font-bold text-2xl text-white mb-6">Book a Consultation</h3>
            
            {success ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gold/10 text-gold p-6 rounded-lg text-center flex flex-col items-center justify-center h-[300px]"
              >
                <CheckCircle2 size={48} className="mb-4" />
                <p className="font-bold">Thank you!</p>
                <p className="text-sm mt-2 opacity-80">We will contact you shortly.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Your Name"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-gold transition-colors text-sm"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="Phone Number"
                    dir="ltr"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-gold transition-colors text-sm text-left"
                  />
                </div>
                <div>
                  <select
                    name="service"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors text-sm appearance-none"
                  >
                    <option value="" disabled selected className="text-charcoal">Select Service</option>
                    <option value="Kitchen Design" className="text-charcoal">Kitchen Design</option>
                    <option value="Bedroom Design" className="text-charcoal">Bedroom Design</option>
                    <option value="Interior Decoration" className="text-charcoal">Interior Decoration</option>
                  </select>
                </div>
                <div>
                  <textarea
                    name="message"
                    required
                    placeholder="Tell us about your project..."
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-gold transition-colors text-sm resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gold text-charcoal font-bold py-3.5 rounded-lg hover:bg-gold-light transition-colors disabled:opacity-70 text-sm uppercase tracking-wider"
                >
                  {loading ? "Sending..." : "Send Request"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
