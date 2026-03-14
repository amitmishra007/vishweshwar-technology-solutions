import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import { Footer } from "./components/Footer";
import Testimonials from "./components/Testimonials";
import AboutSection from "./components/AboutSection";
import WhoWeAre from "./components/WhoWeAre";
import ContactSection from "./components/ContactSection";

export default function HomePage() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <AboutSection />
      <WhoWeAre />
      <ContactSection />
      {/* <SmartOpenLocator /> */}
      <Testimonials />
      <Footer />
    </main>
  );
}
