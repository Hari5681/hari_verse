
'use client';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import Link from 'next/link';

export function HeroSection({ name }: { name: string }) {
  const handleScrollDown = () => {
    const nextSection = document.getElementById('music');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative z-10 flex h-full flex-col items-center justify-center p-4 text-center">
      <div className="flex-grow flex flex-col items-center justify-center">
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tighter text-shadow-lg animate-fade-in-down">
            Hey, <span className="animate-shimmer bg-gradient-to-r from-primary via-foreground to-primary bg-[length:200%_100%] bg-clip-text text-transparent">{name}</span>!
        </h1>
        <p className="mt-6 max-w-3xl text-lg sm:text-xl text-foreground/80 text-shadow animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          Dive into HariVerse — where your favorite songs, top movies, and cutting-edge AI tools come together. Start exploring now!
        </p>
        <div className="mt-8 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <Link href="/about-me">
                <Button size="lg">Learn More About Me</Button>
            </Link>
        </div>
      </div>
      <button
        onClick={handleScrollDown}
        className="absolute bottom-10 animate-bounce"
        aria-label="Scroll down"
      >
        <ArrowDown className="h-8 w-8 text-foreground/50" />
      </button>
    </div>
  );
}
