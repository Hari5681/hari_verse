
'use client';

import { HeroSection } from './home/HeroSection';
import { Separator } from '@/components/ui/separator';
import { CtaSection } from './home/CtaSection';
import { MoviesShowcase } from './home/MoviesShowcase';
import { MusicShowcase } from './home/MusicShowcase';

type HomeViewProps = {
  name: string;
};

export function HomeView({ name }: HomeViewProps) {
  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-background">
      <HeroSection name={name} />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24 py-16 sm:py-24">
        
        <MoviesShowcase />

        <Separator className="bg-border/50" />

        <MusicShowcase />

        <Separator className="bg-border/50" />

        <CtaSection />

      </div>
    </div>
  );
}
