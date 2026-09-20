import { Hero } from "@/components/Hero";
import { ProjectsExplorer } from "@/components/ProjectsExplorer";
import { ExperienceList } from "@/components/ExperienceList";
import { SkillsGrid } from "@/components/SkillsGrid";
import { AchievementsGrid } from "@/components/AchievementsGrid";
import { ContactView } from "@/components/ContactView";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProjectsExplorer />
      <ExperienceList />
      <SkillsGrid />
      <AchievementsGrid />
      <ContactView />
    </>
  );
}
