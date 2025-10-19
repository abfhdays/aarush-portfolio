import { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import Section from '@/components/ui/Section';
import AboutSection from '@/components/sections/AboutSection';
import ExperienceTimeline from '@/components/sections/ExperienceTimeline';
import ProjectCard from '@/components/sections/ProjectCard';
import SkillsGrid from '@/components/sections/SkillsGrid';
import StatsSection from '@/components/sections/StatsSection';
import { about } from '@/content/about';
import { projects } from '@/content/projects';

export const metadata: Metadata = { 
  title: "Portfolio | Aarush Ghosh" 
};

const SKILL_CATEGORIES = [
  {
    title: "Programming Languages",
    skills: ["Python", "JavaScript/TypeScript", "C++", "C", "SQL", "R"]
  },
  {
    title: "Full Stack",
    skills: ["React.js", "Node.js", "PostgreSQL", "Django", "Flask", "Firebase", "MongoDB", "FastAPI"]
  },
  {
    title: "AI / Data",
    skills: ["Tensorflow", "PyTorch", "Keras", "Apache", "Databricks", "Fabric", "SQL", "Pandas", "Airflow"]
  },
  {
    title: "Developer Tools",
    skills: ["AWS", "Azure", "Docker", "Git", "Linux", "Redis", "Jira", "Pytest", "Pydantic"]
  }
];

const STATS = [
  { value: "97.3", suffix: "%", label: "Model Accuracy" },
  { value: "82", suffix: "%", label: "Pipeline Speedup" },
  { value: "3rd", label: "Place Hackathon" }
];

const ABOUT_HIGHLIGHTS = [
  { text: "shipped a department-scale text2sql RAG solution with CGI," },
  { text: "forecasted student tuition via markov chains with the Dean of Mathematics here at UW," },
  { text: "experimented with unsupervised ml models to detect malicious network activity with Wat.AI," },
  { text: "built a project portfolio which is a reflection of my personal interests and learning endeavours." }
];

const EXPERIENCE_LOGOS = {
  0: "/logo1.jpeg",
  1: "/logo2.jpeg"
};

export default function HomePage() {
  return (
    <div className="space-y-10">
      <Hero name="Aarush Ghosh" subtitle="Engineer" />
    
      <Section title="about me" id="about">
        <AboutSection
          description="I am a 3rd year Statistics major at the University of Waterloo pursuing minors in computing, combinatorics & optimization."
          highlights={ABOUT_HIGHLIGHTS}
          additionalInfo="In my own time I enjoy playing/watching/over-analyizing sports (mainly baseball and american football). A great reflection of this is a transformer encoder model I trained to investigate defensive coverages for the 2025 NFL Big Data Bowl (bdb25-blitz). I also love playing and listening to music—challenging myself with new soundscapes and lyrics every day."
          images={["/aboutme1.jpg", "/aboutme2.jpg"]}
        />
      </Section>

      <Section title="experience" id="experience">
        <ExperienceTimeline 
          experiences={about.experiences} 
          logos={EXPERIENCE_LOGOS}
        />
      </Section>

      <Section title="projects" id="projects">
        <div className="space-y-5">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </Section>

      <Section title="skills" id="skills">
        <SkillsGrid categories={SKILL_CATEGORIES} />
      </Section>
    </div>
  );
}