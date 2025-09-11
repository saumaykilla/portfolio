import { AboutMe } from "@/components/AboutMe";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";

export default function Home() {
  return (
    <main>
      {/* Home/Hero Section */}
     <Hero/>

      {/* About Section */}
      <AboutMe />

      {/* Projects Section */}
      <Projects />
     
    </main>
  );
}
