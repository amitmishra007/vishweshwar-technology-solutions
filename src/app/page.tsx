"use client";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import { Footer } from "./components/Footer";
import Testimonials from "./components/Testimonials";
import AboutSection from "./components/AboutSection";
import WhoWeAre from "./components/WhoWeAre";
import ContactSection from "./components/ContactSection";
import PortfolioSection from "./components/PortfolioSection";
import { useState } from "react";
import ServicesStrip from "./components/ServicesStrip";

export default function HomePage() {
  const [isPortfolioModalOpen, setIsPortfolioModalOpen] = useState(false);
  return (
    <main className="relative">
      <Navbar hide={isPortfolioModalOpen} />
      <Hero />
      <ServicesStrip />
      <AboutSection />
      <PortfolioSection setIsModalOpen={setIsPortfolioModalOpen} />
      <WhoWeAre />

      <ContactSection />
      {/* <SmartOpenLocator /> */}
      <Testimonials />
      <Footer />
    </main>
  );
}
