
'use client';

import { HeroSection } from './HeroSection';
import { MusicShowcase } from './MusicShowcase';
import { MoviesShowcase } from './MoviesShowcase';
import { FeaturedAiTools } from './FeaturedAiTools';
import { User } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React, { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

type HomeViewProps = {
  name: string;
};

const Section = React.forwardRef<HTMLDivElement, { id: string; children: React.ReactNode; className?: string }>(
  ({ id, children, className }, ref) => {
    return (
      <section
        ref={ref}
        id={id}
        className={cn(
          "w-full flex flex-col items-center justify-center p-4 min-h-[60vh] md:min-h-screen transition-all duration-1000 ease-out py-16 md:py-4 data-[inview=false]:opacity-0 data-[inview=false]:translate-y-16 data-[inview=false]:scale-95 data-[inview=true]:opacity-100 data-[inview=true]:translate-y-0 data-[inview=true]:scale-100",
          className
        )}
      >
        {children}
      </section>
    );
  }
);
Section.displayName = "Section";


const AboutMeSection = () => (
    <div className="container mx-auto">
       <Card className="w-full max-w-3xl mx-auto text-center bg-card/50 backdrop-blur-sm border-border/30">
        <CardHeader>
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 mb-4 animate-pulse-glow">
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
);


export function HomeView({ name }: HomeViewProps) {
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-inview', 'true');
          }
        });
      },
      {
        threshold: 0.2,
      }
    );

    sectionsRef.current.forEach((section) => {
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      sectionsRef.current.forEach((section) => {
        if (section) {
          observer.unobserve(section);
        }
      });
    };
  }, []);
  
  return (
    <div className="w-full">
      <section id="home" className="h-screen w-full flex flex-col items-center justify-center relative">
        <div className="absolute inset-0 w-full h-full bg-black">
            <div className="absolute inset-0 bg-grid-pattern opacity-30 animate-grid-pan" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
        <HeroSection name={name} />
      </section>
      
      <div className='space-y-16 md:space-y-0'>
        <Section id="music" ref={el => sectionsRef.current[0] = el}>
          <MusicShowcase />
        </Section>
        
        <Section id="movies" ref={el => sectionsRef.current[1] = el}>
           <MoviesShowcase />
        </Section>

         <Section id="ai-tools" ref={el => sectionsRef.current[2] = el}>
           <FeaturedAiTools />
        </Section>
        
        <Section id="about" ref={el => sectionsRef.current[3] = el}>
          <AboutMeSection />
        </Section>
      </div>
    </div>
  );
}
