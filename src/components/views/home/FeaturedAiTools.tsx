
'use client';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, MessageSquare, Code, Clapperboard, Palette, Bot } from 'lucide-react';
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
    <section className="animate-fade-in-up">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <div>
                <h2 className="text-3xl font-bold">Top AI Tools</h2>
                <p className="text-muted-foreground mt-1">Boost your creativity and productivity.</p>
            </div>
            <Link href="/ai-tools" passHref className="mt-4 sm:mt-0">
                <Button variant="ghost">Browse All Tools <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </Link>
        </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredTools.map((tool, index) => (
          <Link href={tool.link} key={tool.name} className="block h-full">
            <Card className="group h-full flex flex-col justify-between p-6 bg-card/50 hover:bg-card transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20">
              <div>
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20">
                  {tool.icon}
                </div>
                <CardHeader className="p-0">
                  <CardTitle className="text-xl font-semibold">{tool.name}</CardTitle>
                </CardHeader>
                <CardContent className="p-0 pt-2">
                  <CardDescription>{tool.description}</CardDescription>
                </CardContent>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
