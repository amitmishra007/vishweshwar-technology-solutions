import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import { Footer } from "./components/Footer";
import Testimonials from "./components/Testimonials";

export default function HomePage() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      {/* <SmartOpenLocator /> */}
      <Testimonials />
      <Footer />
    </main>
  );
}
