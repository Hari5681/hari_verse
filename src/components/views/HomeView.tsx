
'use client';

import { HeroSection } from './home/HeroSection';
import { MovieCarousel } from '@/components/movies/MovieCarousel';
import { Separator } from '@/components/ui/separator';
import { FeaturedArtists } from './home/FeaturedArtists';
import { FeaturedAiTools } from './home/FeaturedAiTools';
import { ThematicSection } from './home/ThematicSection';
import { CtaSection } from './home/CtaSection';

type HomeViewProps = {
  name: string;
};

export function HomeView({ name }: HomeViewProps) {
  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-background">
      <HeroSection name={name} />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24 py-16 sm:py-24">
        
        <MovieCarousel
          title="🔥 Trending Movies"
          subtitle="What's popular in the world of cinema right now."
          endpoint="/api/movies/popular"
        />

        <Separator className="bg-border/50" />

        <FeaturedArtists />

        <Separator className="bg-border/50" />
        
        <FeaturedAiTools />

        <Separator className="bg-border/50" />

        <ThematicSection />

        <Separator className="bg-border/50" />

        <CtaSection />

      </div>
    </div>
  );
}
