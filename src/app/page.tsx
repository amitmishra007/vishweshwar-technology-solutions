import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import AboutSection from "./components/AboutSection";
// import SmartOpenLocator from "./components/SmartOpenLocator";

export default function HomePage() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      {/* <AboutSection /> */}
      <Services />
      {/* <SmartOpenLocator /> */}
    </main>
  );
}
