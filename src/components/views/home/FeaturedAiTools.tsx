
'use client';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, Code, Palette, Clapperboard } from 'lucide-react';
import React from 'react';

const featuredTools = [
  { 
    name: 'ChatGPT', 
    description: 'Conversational AI for coding, writing, and creative tasks.', 
    icon: <MessageSquare className="h-8 w-8 text-primary" />,
    link: '/ai-tools'
  },
  { 
    name: 'MidJourney', 
    description: 'Generate stunning, artistic images from text prompts.', 
    icon: <Palette className="h-8 w-8 text-primary" />,
    link: '/ai-tools'
  },
  { 
    name: 'GitHub Copilot', 
    description: 'Your AI pair programmer for faster, better coding.', 
    icon: <Code className="h-8 w-8 text-primary" />,
    link: '/ai-tools'
  },
  { 
    name: 'Runway ML', 
    description: 'Create and edit videos with powerful AI magic tools.', 
    icon: <Clapperboard className="h-8 w-8 text-primary" />,
    link: '/ai-tools'
  },
];

export function FeaturedAiTools() {
  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
            <h2 className="text-4xl font-bold sm:text-5xl tracking-tight">
                <span className="animate-shimmer bg-gradient-to-r from-primary via-foreground to-primary bg-[length:200%_100%] bg-clip-text text-transparent">
                    AI Tools Showcase
                </span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
               Find the best free AI tools for productivity, design, coding, and more.
            </p>
        </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {featuredTools.map((tool, index) => (
            <Card key={tool.name} className="group h-full flex flex-col justify-between p-4 sm:p-6 bg-card/50 hover:bg-card transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20 card-lift border-border/30">
              <div>
                <div className="mb-4 flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-primary/10 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20">
                  {tool.icon}
                </div>
                <CardHeader className="p-0">
                  <CardTitle className="text-lg sm:text-xl font-semibold">{tool.name}</CardTitle>
                </CardHeader>
                <CardContent className="p-0 pt-2">
                  <CardDescription className="text-sm sm:text-base">{tool.description}</CardDescription>
                </CardContent>
              </div>
            </Card>
        ))}
      </div>
      <div className="text-center mt-12">
        <Link href="/ai-tools" passHref>
            <Button size="lg">
                Browse AI Tools
            </Button>
        </Link>
      </div>
    </section>
  );
}
