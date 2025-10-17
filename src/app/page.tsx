import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";

export default function HomePage() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <Services />
    </main>
  );
}
