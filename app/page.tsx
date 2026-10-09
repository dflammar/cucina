import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ServicesSection from "@/components/sections/ServicesSection";
import WhyUsSection from "@/components/sections/WhyUsSection";
import PortfolioSection from "@/components/sections/PortfolioSection";
import PartnersSection from "@/components/sections/PartnersSection";
import ContactSection from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <WhyUsSection />
      <PortfolioSection />
      <PartnersSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
