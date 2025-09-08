
'use client';

import { HeroSection } from './home/HeroSection';
import { CtaSection } from './home/CtaSection';
import { MusicShowcase } from './home/MusicShowcase';
import { MoviesShowcase } from './home/MoviesShowcase';
import { FeaturedAiTools } from './home/FeaturedAiTools';
import { User, Globe } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React, { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

type HomeViewProps = {
  name: string;
};

const Section = ({ id, children, className }: { id: string, children: React.ReactNode, className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      {
        threshold: 0.5, // Trigger when 50% of the section is visible
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);
  
  return (
      <section
          ref={ref}
          id={id}
          className={cn(
              "h-screen w-full flex flex-col items-center justify-center p-4 snap-start transition-opacity duration-1000 ease-in-out",
              inView ? "opacity-100" : "opacity-0",
              className
          )}
      >
          <div className={cn("transition-transform duration-1000 ease-out", inView ? "translate-y-0" : "translate-y-10")}>
             {children}
          </div>
      </section>
  )
};

const AboutMeSection = () => (
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
);


export function HomeView({ name }: HomeViewProps) {
  return (
    <div className="h-screen w-full snap-y snap-mandatory overflow-y-scroll overflow-x-hidden">
      <Section id="home" className="p-0">
         <HeroSection name={name} />
      </Section>
      
      <Section id="music">
        <MusicShowcase />
      </Section>
      
      <Section id="movies">
         <MoviesShowcase />
      </Section>

       <Section id="ai-tools">
         <FeaturedAiTools />
      </Section>
      
      <Section id="about">
        <AboutMeSection />
      </Section>

      <Section id="contact">
        <CtaSection />
      </Section>
    </div>
  );
}
