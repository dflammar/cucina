import Link from "next/link";
import { Phone, MapPin, Share2 } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-cream">
      {/* Main footer — Nolte dark multi-column */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">

          {/* Brand — 2 cols */}
          <div className="lg:col-span-2">
            <div className="flex flex-col leading-none mb-6">
              <span className="text-2xl font-black tracking-tight text-cream">
                Cucina <span className="text-gold lowercase">plus</span>
              </span>
              <span className="text-[9px] font-medium tracking-[0.25em] uppercase text-cream/40 mt-0.5">
                Premium Interiors
              </span>
            </div>
            <p className="text-cream/50 font-light text-sm leading-relaxed mb-8 max-w-xs">
              Designing and crafting premium kitchens and interiors in Baghdad since 2018.
              Made with care, built to last.
            </p>
            <div className="flex gap-2 flex-wrap">
              <a
                href="https://www.instagram.com/cucina._plus?stkn=MTJnOWh5NWJjMmVlOQ%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-2 border border-cream/15 text-cream/50 hover:border-cream/40 hover:text-cream/80 transition-all duration-200 text-xs font-medium rounded-full"
              >
                <Share2 size={12} />
                Instagram
              </a>
              <a
                href="https://www.facebook.com/share/1LaWxwJvuX/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-2 border border-cream/15 text-cream/50 hover:border-cream/40 hover:text-cream/80 transition-all duration-200 text-xs font-medium rounded-full"
              >
                <Share2 size={12} />
                Facebook
              </a>
            </div>
          </div>

          {/* Inspiration */}
          <div>
            <h4 className="font-bold text-cream text-xs tracking-[0.2em] uppercase mb-6">Inspiration</h4>
            <ul className="space-y-3">
              {["Our Portfolio", "Design Magazine", "Kitchen Trends", "Real Homes"].map((item) => (
                <li key={item}>
                  <Link href="#portfolio" className="text-cream/50 hover:text-cream/90 transition-colors duration-200 text-sm font-light">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-cream text-xs tracking-[0.2em] uppercase mb-6">Services</h4>
            <ul className="space-y-3">
              {["Kitchen Design", "Bedrooms", "Interior Decor", "Custom Solutions", "3D Planning"].map((item) => (
                <li key={item}>
                  <Link href="#services" className="text-cream/50 hover:text-cream/90 transition-colors duration-200 text-sm font-light">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-cream text-xs tracking-[0.2em] uppercase mb-6">Contact</h4>
            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <MapPin size={14} className="text-gold mt-1 flex-shrink-0" />
                <div>
                  <p className="text-cream/80 text-xs font-semibold mb-1">Mansour Showroom</p>
                  <p className="text-cream/40 text-xs font-light leading-relaxed">Al-Ruwad Intersection, Baghdad</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={14} className="text-gold mt-1 flex-shrink-0" />
                <div>
                  <p className="text-cream/80 text-xs font-semibold mb-1">Cairo Showroom</p>
                  <p className="text-cream/40 text-xs font-light leading-relaxed">Cairo District, Baghdad</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={14} className="text-gold flex-shrink-0" />
                <div className="space-y-1">
                  <a href="tel:07738666767" className="block text-cream/50 hover:text-cream/90 text-xs font-medium transition-colors">+964 773 866 6767</a>
                  <a href="tel:07737779776" className="block text-cream/50 hover:text-cream/90 text-xs font-medium transition-colors">+964 773 777 9776</a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-cream/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-cream/30 text-xs font-light">
            © {year} Cucina Plus. All rights reserved.
          </p>
          <p className="text-cream/20 text-xs">
            Baghdad · Iraq
          </p>
        </div>
      </div>
    </footer>
  );
}
