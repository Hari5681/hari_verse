
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUpRight } from 'lucide-react';
import type { AITool } from '@/lib/ai-tools';
import { ToolLogo } from './ToolLogo';

interface AIToolListProps {
    tool: AITool & { category: string };
    index: number;
}

export function AIToolList({ tool, index }: AIToolListProps) {
    return (
        <div 
            className="animate-fade-in-up" 
            style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'both' }}
        >
            <Card className="p-4 bg-background/50 hover:bg-card transition-colors duration-300">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="flex items-center gap-4 flex-shrink-0 w-full sm:w-64">
                         <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                           <ToolLogo toolName={tool.name} className="h-7 w-7 text-primary" />
                         </div>
                        <h3 className="font-semibold text-lg">{tool.name}</h3>
                    </div>
                    <p className="text-muted-foreground text-sm flex-grow">{tool.description}</p>
                    <Link href={`/redirect?url=${encodeURIComponent(tool.link)}`} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                        <Button variant="outline" className="w-full sm:w-auto bg-background/50 hover:bg-white/10 hover:text-white">
                            Visit <ArrowUpRight className="h-4 w-4 ml-2" />
                        </Button>
                    </Link>
                </div>
            </Card>
        </div>
    );
}
