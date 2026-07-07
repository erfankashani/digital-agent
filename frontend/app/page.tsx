import { HeroGeometric } from '@/components/ui/shape-landing-hero';
import Twin from '@/components/twin';
import Resume from '@/components/resume';

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
    </main>
  );
}
