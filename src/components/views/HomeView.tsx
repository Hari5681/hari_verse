'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Music, Clapperboard, Bot, Puzzle } from 'lucide-react';

type HomeViewProps = {
  name: string;
};

const features = [
  {
    title: 'Music',
    href: '/music',
    icon: <Music className="h-8 w-8 text-primary" />,
    description: 'Listen to curated playlists.',
  },
  {
    title: 'Movies',
    href: '/movies',
    icon: <Clapperboard className="h-8 w-8 text-primary" />,
    description: 'Discover new movies to watch.',
  },
  {
    title: 'AI Tools',
    href: '/ai-tools',
    icon: <Bot className="h-8 w-8 text-primary" />,
    description: 'Explore powerful AI tools.',
  },
  {
    title: 'Quiz',
    href: '/quiz',
    icon: <Puzzle className="h-8 w-8 text-primary" />,
    description: 'Test your knowledge.',
  },
];

export function HomeView({ name }: HomeViewProps) {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4 pt-20">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Welcome, {name}!
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Explore the different sections of HariVerse.
        </p>
      </div>
      <div className="mt-12 grid w-full max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <Link href={feature.href} key={feature.title} legacyBehavior passHref>
            <a className="block h-full">
              <Card className="flex h-full transform flex-col items-center justify-center p-6 text-center transition-transform duration-300 hover:scale-105 hover:shadow-lg">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  {feature.icon}
                </div>
                <CardHeader className="p-0">
                  <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-0 pt-2">
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}
