import AboutHero from '../components/about/AboutHero';
import AboutStory from '../components/about/AboutStory';
import AboutSkills from '../components/about/AboutSkills';
import AboutExperience from '../components/about/AboutExperience';
import AboutValues from '../components/about/AboutValues';
import AboutCTA from '../components/about/AboutCTA';

export const metadata = {
  title: 'About - Sann | Full-Stack Developer',
  description: 'Learn more about Sann, a passionate full-stack developer with expertise in modern web technologies.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-900">
      <AboutHero />
      <AboutStory />
      <AboutSkills />
      <AboutExperience />
      <AboutValues />
      <AboutCTA />
    </div>
  );
}
