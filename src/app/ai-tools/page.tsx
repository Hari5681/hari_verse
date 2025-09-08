
'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LayoutGrid, List, Search, SlidersHorizontal, X } from 'lucide-react';
import { toolCategories, AITool } from '@/lib/ai-tools';
import { AIToolCard } from '@/components/ai/AIToolCard';
import { AIToolList } from '@/components/ai/AIToolList';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const allTools = toolCategories.flatMap(category => category.tools.map(tool => ({ ...tool, category: category.category })));

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
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredTools = useMemo(() => {
    return allTools
      .filter(tool => {
        const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(tool.category);
        const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              tool.category.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [searchQuery, selectedCategories]);

  return (
    <div className="min-h-screen bg-background text-foreground p-4 pt-20">
      <div className="fixed inset-0 -z-10 bg-ai-tools-bg bg-cover bg-center" />
      <div className="fixed inset-0 -z-10 bg-grid-pattern opacity-30" />
      <div className="fixed inset-0 -z-10 bg-black/80 backdrop-blur-sm" />

      {/* Hero Section */}
      <header className="text-center my-8 md:my-16 animate-fade-in-down">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
          Discover The Next Generation of AI Tools
        </h1>
        <p className="mt-3 text-lg text-muted-foreground max-w-3xl mx-auto">
          Explore a curated list of AI tools for creativity, productivity, development, and more.
        </p>
        <div className="mt-8 max-w-2xl mx-auto relative">
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
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
              <p className="text-muted-foreground mb-4 sm:mb-0">
                Showing <span className="font-bold text-foreground">{filteredTools.length}</span> of <span className="font-bold text-foreground">{allTools.length}</span> tools
              </p>
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
                <Button variant={viewMode === 'grid' ? 'secondary' : 'outline'} size="icon" onClick={() => setViewMode('grid')}>
                  <LayoutGrid className="h-5 w-5" />
                </Button>
                <Button variant={viewMode === 'list' ? 'secondary' : 'outline'} size="icon" onClick={() => setViewMode('list')}>
                  <List className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in-up">
                {filteredTools.map((tool, index) => (
                  <AIToolCard key={tool.name} tool={tool} index={index} />
                ))}
              </div>
            ) : (
              <div className="space-y-4 animate-fade-in-up">
                {filteredTools.map((tool, index) => (
                  <AIToolList key={tool.name} tool={tool} index={index} />
                ))}
              </div>
            )}
            
            {filteredTools.length === 0 && (
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
