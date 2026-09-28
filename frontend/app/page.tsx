import { HeroGeometric } from '@/components/ui/shape-landing-hero';
import Twin from '@/components/twin';
import Resume from '@/components/resume';
import Projects from '@/components/projects';

export default function Home() {
  return (
    <main className="bg-[#030303] text-white">
      <HeroGeometric
        title1="Erfan Kashani"
        title2="Building AI for Production."
      >
        <Twin />
      </HeroGeometric>

      <Resume />

      <Projects />
    </main>
  );
}
