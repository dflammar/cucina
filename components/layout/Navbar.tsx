"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Search } from "lucide-react";
import { useScrolled } from "@/hooks/useScrolled";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Inspiration", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Why Us", href: "#why-us" },
];

export default function Navbar() {
  const scrolled = useScrolled(80);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-cream/95 backdrop-blur-md border-b border-cream-dark shadow-sm"
          : "bg-transparent"
      )}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-[72px]">

          {/* Logo */}
          <Link href="#home" className="flex flex-col leading-none">
            <span className="text-[22px] font-black tracking-tight text-charcoal">
              Cucina <span className="text-gold lowercase">plus</span>
            </span>
            <span className="text-[9px] font-medium tracking-[0.25em] uppercase text-charcoal-light">
              Premium Interiors
            </span>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm font-semibold text-charcoal hover:text-gold transition-colors duration-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-3">
            <button
              aria-label="Search"
              className="p-2 text-charcoal hover:text-gold transition-colors duration-200"
            >
              <Search size={18} />
            </button>
            <Link
              href="#contact"
              className="btn-pill btn-pill-outline text-sm px-5 py-2.5"
              style={{ borderRadius: "9999px" }}
            >
              Find a showroom
            </Link>
            <Link
              href="#contact"
              className="btn-pill btn-pill-dark text-sm px-5 py-2.5"
              style={{ borderRadius: "9999px" }}
            >
              Free consultation
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-charcoal"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300",
            mobileOpen ? "max-h-96 pb-6" : "max-h-0"
          )}
        >
          <div className="border-t border-cream-dark pt-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block py-3 text-base font-semibold text-charcoal hover:text-gold transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 flex flex-col gap-2">
              <Link
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="btn-pill btn-pill-dark w-full text-center text-sm py-3"
                style={{ borderRadius: "9999px" }}
              >
                Free consultation
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
