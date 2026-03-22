import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import { Footer } from "./components/Footer";
import Testimonials from "./components/Testimonials";
import AboutSection from "./components/AboutSection";
import WhoWeAre from "./components/WhoWeAre";
import ContactSection from "./components/ContactSection";
import PortfolioSection from "./components/PortfolioSection";

export default function HomePage() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <AboutSection />
      <PortfolioSection />
      <WhoWeAre />
      <ContactSection />
      {/* <SmartOpenLocator /> */}
      <Testimonials />
      <Footer />
    </main>
  );
}
