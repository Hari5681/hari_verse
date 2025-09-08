
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUpRight } from 'lucide-react';
import type { AITool } from '@/lib/ai-tools';
import { cn } from '@/lib/utils';
import { ToolLogo } from './ToolLogo';

interface AIToolCardProps {
    tool: AITool & { category: string };
    index: number;
}

export function AIToolCard({ tool, index }: AIToolCardProps) {
    return (
        <div 
            className="animate-fade-in-up" 
            style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'both' }}
        >
            <Card className="group h-full flex flex-col justify-between p-4 bg-background/50 hover:bg-card transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20">
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

