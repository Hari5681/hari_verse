
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
import { ScrollToTopButton } from '@/components/common/ScrollToTopButton';

type HomeViewProps = {
  name: string;
};

const AnimatedSection = React.forwardRef<HTMLDivElement, { id: string; children: React.ReactNode; className?: string, animationClass: string }>(
  ({ id, children, className, animationClass }, ref) => {
    const [inView, setInView] = useState(false);
    const internalRef = useRef<HTMLDivElement | null>(null);

    React.useImperativeHandle(ref, () => internalRef.current!);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    if (internalRef.current) {
                      observer.unobserve(internalRef.current);
                    }
                }
            },
            { threshold: 0.2 }
        );

        if (internalRef.current) {
            observer.observe(internalRef.current);
        }

        return () => {
            if (internalRef.current) {
                // This condition is to prevent error `DOMException: The node to be unobserved is not being observed.`
                // The error occurs when the component is unmounted before the observer is disconnected.
                // It is safe to ignore this error as it does not affect the functionality.
                // For more info, see: https://github.com/w3c/IntersectionObserver/issues/114
                try {
                    observer.unobserve(internalRef.current);
                } catch (e) {}
            }
        };
    }, []);

    return (
      <section
        ref={internalRef}
        id={id}
        className={cn(
          "w-full flex flex-col items-center justify-center py-16 md:py-24 transition-all duration-1000 ease-out",
          inView ? "opacity-100 translate-x-0 translate-y-0" : "opacity-0",
          inView ? "" : animationClass,
          className
        )}
      >
        {children}
      </section>
    );
  }
);
AnimatedSection.displayName = "AnimatedSection";


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
  return (
    <div className="w-full">
      <section id="home" className="h-screen w-full flex flex-col items-center justify-center relative">
        <div className="absolute inset-0 w-full h-full bg-black">
            <div className="absolute inset-0 bg-grid-pattern opacity-30 animate-grid-pan" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
        <HeroSection name={name} />
      </section>
      
      <AnimatedSection id="music" animationClass="-translate-x-20">
        <MusicShowcase />
      </AnimatedSection>
      
      <AnimatedSection id="movies" animationClass="translate-x-20">
         <MoviesShowcase />
      </AnimatedSection>

       <AnimatedSection id="ai-tools" animationClass="translate-y-20">
         <FeaturedAiTools />
      </AnimatedSection>
      
      <AnimatedSection id="about" animationClass="translate-y-20">
        <AboutMeSection />
      </AnimatedSection>

      <ScrollToTopButton />
    </div>
  );
}
