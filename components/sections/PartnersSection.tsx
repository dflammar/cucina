"use client";

const partners = [
  "Blum",
  "Hettich",
  "Belenco",
  "Cimstone",
  "Blum",
  "Hettich",
  "Belenco",
  "Cimstone",
];

export default function PartnersSection() {
  return (
    <section className="bg-cream py-20 border-y border-cream-dark overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 mb-12 text-center">
        <p className="text-xs font-bold tracking-[0.3em] uppercase text-charcoal-light">
          Trusted partners
        </p>
      </div>

      {/* Marquee */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-cream to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-cream to-transparent z-10 pointer-events-none" />

        <div className="flex overflow-hidden">
          <div className="flex shrink-0 animate-marquee">
            {partners.map((p, i) => (
              <div
                key={`a-${i}`}
                className="flex items-center justify-center px-14 py-4 border-x border-cream-dark min-w-[180px] group cursor-default"
              >
                <span className="font-black text-xl text-charcoal-light group-hover:text-charcoal transition-colors duration-300 tracking-wider uppercase">
                  {p}
                </span>
              </div>
            ))}
          </div>
          <div className="flex shrink-0 animate-marquee" aria-hidden>
            {partners.map((p, i) => (
              <div
                key={`b-${i}`}
                className="flex items-center justify-center px-14 py-4 border-x border-cream-dark min-w-[180px] group cursor-default"
              >
                <span className="font-black text-xl text-charcoal-light group-hover:text-charcoal transition-colors duration-300 tracking-wider uppercase">
                  {p}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
