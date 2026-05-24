import { Navigation } from '@/components/navigation'
import { 
  HeroSection, 
  AboutSection, 
  ExperienceSection, 
  ProjectsSection, 
  OpenSourceSection,
  SkillsSection,
  ContactSection, 
  Footer 
} from '@/components/sections'
import { EducationSection, AchievementsSection } from '@/components/education'

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      <HeroSection />
      
      <section id="about">
        <AboutSection />
      </section>
      
      <EducationSection />
      
      <section id="experience">
        <ExperienceSection />
      </section>
      
      <section id="projects">
        <ProjectsSection />
      </section>
      
      <section id="opensource">
        <OpenSourceSection />
      </section>
      
      <AchievementsSection />
      
      <SkillsSection />
      
      <section id="contact">
        <ContactSection />
      </section>
      
      <Footer />
    </main>
  )
}
