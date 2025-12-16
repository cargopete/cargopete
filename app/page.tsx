import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { TechStack } from "./components/TechStack";
import { Projects } from "./components/Projects";
import { Experience } from "./components/Experience";
import { Community } from "./components/Community";
import { Contact } from "./components/Contact";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main className="relative">
        <Hero />
        <About />
        <TechStack />
        <Projects />
        <Experience />
        <Community />
        <Contact />
      </main>
    </div>
  );
}
