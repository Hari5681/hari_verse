
'use client';

import React, { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SlidersHorizontal } from 'lucide-react';
import { toolCategories } from '@/lib/ai-tools';
import { AIToolCard } from '@/components/ai/AIToolCard';
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { cn } from '@/lib/utils';

const FilterSidebar = ({ selectedCategories, setSelectedCategories }: { selectedCategories: string[], setSelectedCategories: (cats: string[]) => void }) => {

  const toggleCategory = (category: string) => {
    setSelectedCategories(
      selectedCategories.includes(category)
        ? selectedCategories.filter(c => c !== category)
        : [...selectedCategories, category]
    );
  };

  return (
    <Card className="p-4 bg-background/80 backdrop-blur-sm border-none shadow-inner-glow transition-shadow hover:shadow-primary/20">
      <h3 className="text-lg font-semibold mb-4 animate-shimmer bg-gradient-to-r from-primary via-foreground to-primary bg-[length:200%_100%] bg-clip-text text-transparent">
          Categories
      </h3>
      <div className="space-y-2">
        {toolCategories.map(category => (
          <Button
            key={category.category}
            variant={selectedCategories.includes(category.category) ? 'secondary' : 'ghost'}
            className={cn(
                "w-full justify-start transition-all duration-300 ease-in-out",
                "hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-1"
            )}
            onClick={() => toggleCategory(category.category)}
          >
            {category.icon}
            <span className="ml-2">{category.category}</span>
          </Button>
        ))}
      </div>
      {selectedCategories.length > 0 && (
        <Button variant="link" className="text-primary w-full mt-4" onClick={() => setSelectedCategories([])}>
          Clear Filters
        </Button>
      )}
    </Card>
  );
};


export default function AiToolsPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const filteredCategories = useMemo(() => {
    return toolCategories
      .map(category => {
        const filteredTools = category.tools.filter(tool => {
            const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(category.category);
            return matchesCategory;
        });
        return { ...category, tools: filteredTools };
      })
      .filter(category => {
          return category.tools.length > 0;
      });
  }, [selectedCategories]);

  const totalFilteredTools = filteredCategories.reduce((sum, cat) => sum + cat.tools.length, 0);

  return (
    <div className="min-h-screen bg-background text-foreground p-4 pt-20">
      <div className="fixed inset-0 -z-10 bg-ai-tools-bg bg-cover bg-center" />
      <div className="fixed inset-0 -z-10 bg-grid-pattern opacity-30 animate-grid-pan" />
      <div className="fixed inset-0 -z-10 bg-black/80 backdrop-blur-sm" />

      {/* Hero Section */}
      <header className="text-center my-8 md:my-16 animate-fade-in-down">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight animate-shimmer bg-gradient-to-r from-primary via-foreground to-primary bg-[length:200%_100%] bg-clip-text text-transparent">
          AI Made Simple
        </h1>
        <p className="mt-3 text-lg text-muted-foreground max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          The best free tools, all in one place. No fluff, just what you need.
        </p>
      </header>

      <div className="container mx-auto max-w-screen-2xl">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden md:block w-full md:w-64 lg:w-72 flex-shrink-0 animate-fade-in-left">
            <div className="sticky top-20">
              <FilterSidebar selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} />
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 w-full min-w-0">
            <div className="flex flex-col sm:flex-row justify-end items-center mb-6">
              <div className="flex items-center gap-2">
                {/* Mobile Filter Trigger */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="md:hidden">
                      <SlidersHorizontal className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="w-full max-w-sm">
                    <DialogHeader>
                        <DialogTitle className="sr-only">Filter AI Tools</DialogTitle>
                    </DialogHeader>
                     <FilterSidebar selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} />
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <div className="space-y-12">
              {filteredCategories.map(category => (
                <section key={category.category} className="animate-fade-in-up">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-primary w-8 h-8">{category.icon}</div>
                    <h2 className="text-xl sm:text-2xl font-bold">{category.category}</h2>
                  </div>
                  <Separator className="mb-6 bg-border/20"/>
                   <Carousel
                      opts={{
                          align: 'start',
                          slidesToScroll: 'auto',
                          loop: false,
                      }}
                      className="w-full"
                    >
                      <CarouselContent className="-ml-4">
                        {category.tools.map((tool, index) => (
                          <CarouselItem key={tool.name} className="basis-1/2 sm:basis-1/2 md:basis-1/2 lg:basis-1/3 xl:basis-1/4 pl-4 pb-4">
                            <AIToolCard tool={{...tool, category: category.category}} index={index} />
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious className="transition-opacity disabled:opacity-0" />
                      <CarouselNext className="transition-opacity disabled:opacity-0" />
                   </Carousel>
                </section>
              ))}
            </div>
            
            {totalFilteredTools === 0 && (
                 <div className="text-center py-16">
                    <h2 className="text-2xl font-semibold">No tools found</h2>
                    <p className="text-muted-foreground mt-2">Try adjusting your search or filters.</p>
                </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
