
'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function HeroSection({ name }: { name: string }) {
  return (
    <div className="relative z-10 flex flex-col items-center justify-center p-4 text-center">
      <h1 className="text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tighter text-shadow-lg animate-fade-in-down">
          Hey, <span className="animate-shimmer bg-gradient-to-r from-primary via-foreground to-primary bg-[length:200%_100%] bg-clip-text text-transparent">{name}</span>!
      </h1>
      <p className="mt-6 max-w-3xl text-lg sm:text-xl text-foreground/80 text-shadow animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
        Dive into HariVerse — where your favorite songs, top movies, and cutting-edge AI tools come together. Start exploring now!
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <Link href="#music">
              <Button size="lg" variant="outline" className="backdrop-blur-sm bg-white/5 border-white/10 hover:bg-white/10">Music</Button>
          </Link>
           <Link href="#movies">
              <Button size="lg" variant="outline" className="backdrop-blur-sm bg-white/5 border-white/10 hover:bg-white/10">Movies</Button>
          </Link>
           <Link href="#ai-tools">
              <Button size="lg" variant="outline" className="backdrop-blur-sm bg-white/5 border-white/10 hover:bg-white/10">AI Tools</Button>
          </Link>
      </div>
    </div>
  );
}
