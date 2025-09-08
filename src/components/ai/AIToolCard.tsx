
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUpRight } from 'lucide-react';
import type { AITool } from '@/lib/ai-tools';
import { cn } from '@/lib/utils';
import { ToolLogo } from './ToolLogo';
import React, { useRef, useState } from 'react';

interface AIToolCardProps {
    tool: AITool & { category: string };
    index: number;
}

export function AIToolCard({ tool, index }: AIToolCardProps) {
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
            transform: `perspective(500px) rotateX(${-y}deg) rotateY(${x}deg) scale3d(1.05, 1.05, 1.05)`,
            '--mouse-x': `${xPercentage}px`,
            '--mouse-y': `${yPercentage}px`,
        });
    };

    const handleMouseLeave = () => {
        setStyle({
            transform: 'perspective(500px) rotateX(0) rotateY(0) scale3d(1, 1, 1)',
        });
    };

    return (
        <div 
            className="animate-fade-in-up h-full" 
            style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'both' }}
        >
            <Card 
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={style as React.CSSProperties}
                className="group relative h-full flex flex-col justify-between p-4 bg-background/50 transition-transform duration-300 ease-out will-change-transform"
            >
                <div className="absolute inset-0 bg-grid-pattern opacity-0 transition-opacity duration-300 group-hover:opacity-10"></div>
                <div className="mouse-orb"></div>
              <div className="flex-grow">
                <CardHeader className="p-0 flex-row items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20">
                    <ToolLogo toolName={tool.name} className="h-7 w-7 text-primary" />
                  </div>
                  <CardTitle className="text-lg font-semibold">{tool.name}</CardTitle>
                </CardHeader>
                <CardContent className="p-0 pt-3">
                  <CardDescription>{tool.description}</CardDescription>
                </CardContent>
              </div>
              <div className="mt-4">
                <Link href={`/redirect?url=${encodeURIComponent(tool.link)}`} target="_blank" rel="noopener noreferrer" className="w-full">
                    <Button variant="outline" className="w-full bg-background/50 hover:bg-white/10 hover:text-white">
                        Visit <ArrowUpRight className="h-4 w-4 ml-2" />
                    </Button>
                </Link>
              </div>
            </Card>
        </div>
    );
}
