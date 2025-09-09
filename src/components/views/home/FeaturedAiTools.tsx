
'use client';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, MessageSquare, Code, Palette, Clapperboard } from 'lucide-react';
import React, { useRef, useState } from 'react';

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
];

const ToolCard = ({ tool }: { tool: typeof featuredTools[0] }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [style, setStyle] = useState({});

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const { left, top, width, height } = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - left - width / 2) / 25;
        const y = (e.clientY - top - height / 2) / 25;
        const xPercentage = e.clientX - left;
        const yPercentage = e.clientY - top;

        setStyle({
            transform: `perspective(1000px) rotateX(${-y}deg) rotateY(${x}deg) scale3d(1.05, 1.05, 1.05)`,
            '--mouse-x': `${xPercentage}px`,
            '--mouse-y': `${yPercentage}px`,
        });
    };

    const handleMouseLeave = () => {
        setStyle({
            transform: 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)',
        });
    };

    return (
        <Card 
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={style as React.CSSProperties}
            className="group relative h-full flex flex-col justify-between p-6 bg-card/50 transition-transform duration-300 ease-out will-change-transform card-content overflow-hidden border-border/30"
        >
            <div className="absolute inset-0 bg-grid-pattern opacity-0 transition-opacity duration-300 group-hover:opacity-10" style={{ backgroundSize: '2rem 2rem' }}></div>
            <div className="mouse-orb" style={{ background: 'radial-gradient(circle at center, hsl(var(--primary) / 0.1) 0%, transparent 70%)' }}></div>
            
            <div className="flex-grow flex flex-col transition-transform duration-300 ease-out">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20">
                    {tool.icon}
                </div>
                <CardHeader className="p-0">
                  <CardTitle className="text-xl font-semibold">{tool.name}</CardTitle>
                </CardHeader>
                <CardContent className="p-0 pt-2">
                  <CardDescription className="text-base">{tool.description}</CardDescription>
                </CardContent>
            </div>
            
             <div className="absolute bottom-0 left-0 right-0 p-6 pt-0 transition-all duration-300 ease-out transform opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0">
                <Link href={tool.link} className="w-full">
                    <Button variant="outline" className="w-full bg-background/50 hover:bg-white/10 hover:text-white mt-4">
                        Learn More <ArrowUpRight className="h-4 w-4 ml-2" />
                    </Button>
                </Link>
            </div>
        </Card>
    )
}

export function FeaturedAiTools() {
  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
            <h2 className="text-4xl font-bold sm:text-5xl tracking-tight">
                <span className="animate-shimmer bg-gradient-to-r from-blue-500 via-foreground to-blue-500 bg-[length:200%_100%] bg-clip-text text-transparent">
                    AI Tools Showcase
                </span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
               Find the best free AI tools for productivity, design, coding, and more.
            </p>
        </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {featuredTools.map((tool) => (
             <ToolCard key={tool.name} tool={tool} />
        ))}
      </div>
      <div className="text-center mt-12">
        <Link href="/ai-tools" passHref>
            <Button size="lg">
                Browse All AI Tools
            </Button>
        </Link>
      </div>
    </section>
  );
}
