'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Particles } from '@/components/common/Particles';

export default function Home() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-background">
      <Particles
        className="absolute inset-0 -z-10"
        quantity={500}
        color="hsl(var(--primary))"
      />
      <div className="z-10 flex flex-col items-center text-center">
        <h1 className="text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl">
          Welcome to HariVerse
        </h1>
        <p className="mt-4 max-w-xl text-lg text-muted-foreground md:text-xl">
          Explore a universe of music, movies, AI tools, and quizzes, all in one
          place.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/quiz">Take a Quiz</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/about-me">About Me</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
