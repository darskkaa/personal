import Hero from "@/components/dom/Hero";
import Projects from "@/components/dom/Projects";
import About from "@/components/dom/About";
import ContactSection from "@/components/dom/ContactSection";

export default function Home() {
  return (
    <div className="w-full">
      <Hero />
      <About />
      <Projects />
      <ContactSection />
    </div>
  );
}
