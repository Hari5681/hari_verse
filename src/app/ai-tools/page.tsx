
'use client';

import React, { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, SlidersHorizontal } from 'lucide-react';
import { toolCategories } from '@/lib/ai-tools';
import { AIToolCard } from '@/components/ai/AIToolCard';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

const FilterSidebar = ({ selectedCategories, setSelectedCategories }: { selectedCategories: string[], setSelectedCategories: (cats: string[]) => void }) => {

  const toggleCategory = (category: string) => {
    setSelectedCategories(
      selectedCategories.includes(category)
        ? selectedCategories.filter(c => c !== category)
        : [...selectedCategories, category]
    );
  };

  return (
    <Card className="p-4 bg-background/80 backdrop-blur-sm border-none">
      <h3 className="text-lg font-semibold mb-4">Categories</h3>
      <div className="space-y-2">
        {toolCategories.map(category => (
          <Button
            key={category.category}
            variant={selectedCategories.includes(category.category) ? 'secondary' : 'ghost'}
            className="w-full justify-start"
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
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const filteredCategories = useMemo(() => {
    return toolCategories
      .map(category => {
        const filteredTools = category.tools.filter(tool => {
            const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                  tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                  category.category.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesSearch;
        });
        return { ...category, tools: filteredTools };
      })
      .filter(category => {
          const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(category.category);
          return matchesCategory && category.tools.length > 0;
      });
  }, [searchQuery, selectedCategories]);

  const totalFilteredTools = filteredCategories.reduce((sum, cat) => sum + cat.tools.length, 0);

  return (
    <div className="min-h-screen bg-background text-foreground p-4 pt-20">
      <div className="fixed inset-0 -z-10 bg-ai-tools-bg bg-cover bg-center" />
      <div className="fixed inset-0 -z-10 bg-grid-pattern opacity-30" />
      <div className="fixed inset-0 -z-10 bg-black/80 backdrop-blur-sm" />

      {/* Hero Section */}
      <header className="text-center my-8 md:my-16 animate-fade-in-down">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight animate-shimmer bg-gradient-to-r from-primary via-foreground to-primary bg-[length:200%_100%] bg-clip-text text-transparent">
          Discover The Next Generation of AI Tools
        </h1>
        <p className="mt-3 text-lg text-muted-foreground max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          Explore a curated list of AI tools for creativity, productivity, development, and more.
        </p>
        <div className="mt-8 max-w-2xl mx-auto relative animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search for a tool, category, or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 pl-12 pr-4 rounded-full bg-background/50 border-2 border-border focus:border-primary transition-colors"
          />
        </div>
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
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="md:hidden">
                      <SlidersHorizontal className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-full max-w-sm">
                     <FilterSidebar selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} />
                  </SheetContent>
                </Sheet>
              </div>
            </div>

            <div className="space-y-12">
              {filteredCategories.map(category => (
                <section key={category.category} className="animate-fade-in-up">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-primary w-6 h-6">{category.icon}</div>
                    <h2 className="text-xl sm:text-2xl font-bold">{category.category}</h2>
                  </div>
                  <Separator className="mb-6 bg-border/20"/>
                   <Carousel
                      opts={{
                          align: 'start',
                          slidesToScroll: 'auto',
                          loop: true,
                      }}
                      plugins={[Autoplay({ delay: 3000, stopOnInteraction: true })]}
                      className="w-full"
                    >
                      <CarouselContent className="-ml-4">
                        {category.tools.map((tool, index) => (
                          <CarouselItem key={tool.name} className="basis-1/2 sm:basis-1/2 md:basis-1/2 lg:basis-1/3 xl:basis-1/4 pl-4 pb-4">
                            <AIToolCard tool={{...tool, category: category.category}} index={index} />
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious className="hidden md:flex" />
                      <CarouselNext className="hidden md:flex" />
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
