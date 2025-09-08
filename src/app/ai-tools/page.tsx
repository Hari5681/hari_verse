
'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SlidersHorizontal, Search, Check, X } from 'lucide-react';
import { toolCategories } from '@/lib/ai-tools';
import { AIToolCard } from '@/components/ai/AIToolCard';
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogClose, DialogFooter } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { cn } from '@/lib/utils';

const FilterSidebar = ({ activeCategories, onApply }: { activeCategories: string[], onApply: (cats: string[]) => void }) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(activeCategories);
  
  useEffect(() => {
    setSelectedCategories(activeCategories);
  }, [activeCategories]);

  const toggleCategory = (category: string | null) => {
    if (category === null) {
      setSelectedCategories([]);
    } else {
      setSelectedCategories(prev => 
        prev.includes(category)
          ? prev.filter(c => c !== category)
          : [...prev, category]
      );
    }
  };

  const handleApply = () => {
    onApply(selectedCategories);
  };
  
  const allCategoriesOption = { category: 'All', icon: <Search className="w-full h-full" /> };
  const displayCategories = [allCategoriesOption, ...toolCategories];


  return (
    <div className="flex flex-col h-full">
       <div className="flex-grow my-4">
          <div className="flex flex-wrap gap-2">
            {displayCategories.map(category => {
                const isSelected = category.category === 'All'
                    ? selectedCategories.length === 0
                    : selectedCategories.includes(category.category);
                
                return (
                  <Button
                    key={category.category}
                    variant={'ghost'}
                    size="sm"
                    className={cn(
                        "rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-foreground/80 transition-all duration-300",
                        "hover:bg-white/10 hover:text-white hover:border-white/20",
                        isSelected && "bg-primary/20 border-primary/50 text-primary shadow-[0_0_15px_hsl(var(--primary)/0.5)]"
                    )}
                    onClick={() => toggleCategory(category.category === 'All' ? null : category.category)}
                  >
                    {category.category}
                  </Button>
                );
            })}
          </div>
       </div>
       <DialogFooter className="mt-auto pt-4 border-t border-border/20">
            <DialogClose asChild>
                <Button variant="ghost" onClick={() => setSelectedCategories(activeCategories)}>Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
                <Button onClick={handleApply}>
                  <Check className="h-4 w-4 mr-2" />
                  Apply
                </Button>
            </DialogClose>
       </DialogFooter>
    </div>
  );
};


export default function AiToolsPage() {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const filteredCategories = useMemo(() => {
    return toolCategories
      .map(category => {
        const filteredTools = category.tools.filter(tool => {
            const matchesCategory = activeFilters.length === 0 || activeFilters.includes(category.category);
            return matchesCategory;
        });
        return { ...category, tools: filteredTools };
      })
      .filter(category => {
          return category.tools.length > 0;
      });
  }, [activeFilters]);

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
            <Card className="sticky top-20 p-4 bg-black/30 backdrop-blur-lg border border-white/10 shadow-lg">
               <DialogHeader>
                  <DialogTitle className="flex items-center gap-2 text-lg">
                    <Search className="h-5 w-5 text-primary" />
                    Filter Tools
                  </DialogTitle>
               </DialogHeader>
              <FilterSidebar activeCategories={activeFilters} onApply={setActiveFilters} />
            </Card>
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
                  <DialogContent className="w-full max-w-sm bg-black/30 backdrop-blur-lg border border-white/10 shadow-lg">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-lg">
                            <Search className="h-5 w-5 text-primary" />
                            Filter Tools
                        </DialogTitle>
                    </DialogHeader>
                     <FilterSidebar activeCategories={activeFilters} onApply={setActiveFilters} />
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
