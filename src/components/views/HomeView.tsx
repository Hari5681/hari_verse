
'use client';

import { HeroSection } from './home/HeroSection';
import { CtaSection } from './home/CtaSection';
import { MusicShowcase } from './home/MusicShowcase';
import { MoviesShowcase } from './home/MoviesShowcase';
import { FeaturedAiTools } from './home/FeaturedAiTools';
import { Separator } from '@/components/ui/separator';
import { User, Github, Linkedin, Instagram, Mail, Globe } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

type HomeViewProps = {
  name: string;
};

const AboutMeSection = () => (
  <section id="about" className="w-full py-16 sm:py-24 animate-fade-in-up">
    <div className="container mx-auto">
       <Card className="w-full max-w-3xl mx-auto text-center bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 mb-4">
            <User className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold">Hari Krishna</CardTitle>
          <CardDescription className="text-md text-muted-foreground">
            App & Web Developer
          </CardDescription>
        </CardHeader>
        <CardContent className="text-left text-base text-foreground/80 space-y-4 px-8 pb-8">
          <p>
            Hi, I’m Hari Krishna, a 3rd-year ECE student at Chaitanya Engineering College, Kommadi. I’m an App & Web Developer who loves building creative digital experiences.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col items-center gap-6 border-t border-border/20 pt-6">
            <Link href="/about-me">
              <Button>Learn More About Me</Button>
            </Link>
        </CardFooter>
      </Card>
    </div>
  </section>
);


export function HomeView({ name }: HomeViewProps) {
  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-background">
      <HeroSection name={name} />
      
      <div id="music" className="w-full pt-16">
        <MusicShowcase />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Separator className="my-16 bg-border/50" />
      </div>
      
      <div id="movies" className="w-full">
         <MoviesShowcase />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Separator className="my-16 bg-border/50" />
      </div>

       <div id="ai-tools" className="w-full">
         <FeaturedAiTools />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Separator className="my-16 bg-border/50" />
      </div>
      
      <AboutMeSection />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Separator className="my-16 bg-border/50" />
      </div>

      <div id="contact" className="w-full">
        <CtaSection />
      </div>

    </div>
  );
}
