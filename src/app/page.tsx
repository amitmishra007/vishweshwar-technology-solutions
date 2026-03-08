import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import { Footer } from "./components/Footer";
import Testimonials from "./components/Testimonials";
import AboutSection from "./components/AboutSection";

export default function HomePage() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <AboutSection />
      {/* <SmartOpenLocator /> */}
      <Testimonials />
      <Footer />
    </main>
  );
}
