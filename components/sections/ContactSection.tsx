"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Phone, MapPin, Send, CheckCircle2 } from "lucide-react";

const serviceOptions = [
  "Kitchen Design & Installation",
  "Interior Decoration",
  "Bedroom Design & Furniture",
  "Custom Solutions",
];

const branches = [
  {
    name: "Mansour Showroom",
    address: "Al-Ruwad Intersection, Mansour, Baghdad",
    phone: "+964 773 866 6767",
    raw: "07738666767",
  },
  {
    name: "Cairo Showroom",
    address: "Near Al-Nida Mosque, Cairo district, Baghdad",
    phone: "+964 773 777 9776",
    raw: "07737779776",
  },
];

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: "", phone: "", service: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      setStatus(res.ok ? "sent" : "error");
      if (res.ok) setFormData({ name: "", phone: "", service: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="bg-cream-dark py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="mb-16"
        >
          <p className="text-gold font-bold text-xs tracking-[0.25em] uppercase mb-4">
            Find a showroom · Get in touch
          </p>
          <h2
            className="font-black text-charcoal leading-[1.1]"
            style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)" }}
          >
            Together, we&apos;ll design
            <br />
            the kitchen you deserve.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {status === "sent" ? (
              <div className="flex flex-col items-center justify-center py-20 text-center gap-6">
                <CheckCircle2 size={56} className="text-gold" />
                <h3 className="font-black text-2xl text-charcoal">Thank you!</h3>
                <p className="text-charcoal-light font-light">We&apos;ll be in touch very soon.</p>
                <button
                  onClick={() => setStatus("idle")}
                  className="btn-pill btn-pill-outline"
                  style={{ borderRadius: "9999px" }}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-charcoal mb-2 tracking-wide uppercase">
                      Full name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Ahmed Al-Rashid"
                      className="w-full bg-cream border border-cream-mid px-4 py-3.5 text-charcoal placeholder:text-charcoal-light/50 focus:outline-none focus:border-charcoal transition-colors duration-200 text-sm rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-charcoal mb-2 tracking-wide uppercase">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="+964 7XX XXX XXXX"
                      className="w-full bg-cream border border-cream-mid px-4 py-3.5 text-charcoal placeholder:text-charcoal-light/50 focus:outline-none focus:border-charcoal transition-colors duration-200 text-sm rounded-lg"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-charcoal mb-2 tracking-wide uppercase">
                    Service
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full bg-cream border border-cream-mid px-4 py-3.5 text-charcoal focus:outline-none focus:border-charcoal transition-colors duration-200 text-sm rounded-lg appearance-none"
                  >
                    <option value="">Select a service...</option>
                    {serviceOptions.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-charcoal mb-2 tracking-wide uppercase">
                    Your message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Tell us about your project, space, or inspiration..."
                    className="w-full bg-cream border border-cream-mid px-4 py-3.5 text-charcoal placeholder:text-charcoal-light/50 focus:outline-none focus:border-charcoal transition-colors duration-200 text-sm resize-none rounded-lg"
                  />
                </div>

                {status === "error" && (
                  <p className="text-red-500 text-sm">Something went wrong. Please try again.</p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="btn-pill btn-pill-dark w-full flex items-center justify-center gap-2 disabled:opacity-60"
                  style={{ borderRadius: "9999px", paddingTop: "1rem", paddingBottom: "1rem" }}
                >
                  <Send size={16} />
                  {status === "sending" ? "Sending..." : "Send message"}
                </button>
              </form>
            )}
          </motion.div>

          {/* Showroom info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.12 }}
            className="space-y-6"
          >
            <h3 className="font-black text-xl text-charcoal mb-6">Our Showrooms</h3>

            {branches.map((branch) => (
              <div
                key={branch.name}
                className="bg-cream rounded-[12px] p-8 border border-cream-mid hover:border-charcoal/30 transition-all duration-300"
              >
                <h4 className="font-black text-charcoal text-lg mb-5">{branch.name}</h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 text-charcoal-light text-sm">
                    <MapPin size={16} className="text-gold mt-0.5 flex-shrink-0" />
                    <span className="font-light leading-relaxed">{branch.address}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone size={16} className="text-gold flex-shrink-0" />
                    <a
                      href={`tel:${branch.raw}`}
                      className="font-bold text-charcoal hover:text-gold transition-colors duration-200 text-sm tracking-wide"
                    >
                      {branch.phone}
                    </a>
                  </div>
                </div>
              </div>
            ))}

            {/* Social */}
            <div className="pt-4">
              <p className="text-xs font-bold text-charcoal-light tracking-widest uppercase mb-4">Follow us</p>
              <div className="flex gap-2">
                {["Instagram", "Facebook", "TikTok"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="px-4 py-2 border border-cream-mid text-sm font-semibold text-charcoal-light hover:border-charcoal hover:text-charcoal transition-all duration-200 rounded-full"
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
