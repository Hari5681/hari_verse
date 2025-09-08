
'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

const heroImages = [
  { src: 'https://raw.githubusercontent.com/Hari5681/hariverse-assets/main/assets/wallpapers/hero-movies.jpg', alt: 'A scene from a blockbuster movie' },
  { src: 'https://raw.githubusercontent.com/Hari5681/hariverse-assets/main/assets/wallpapers/hero-music.jpg', alt: 'A live concert with vibrant lights' },
  { src: 'https://raw.githubusercontent.com/Hari5681/hariverse-assets/main/assets/wallpapers/hero-ai.jpg', alt: 'A futuristic artificial intelligence interface' },
];

export function HeroSection({ name }: { name: string }) {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            // This would redirect to a unified search results page in a full implementation
            console.log(`Searching for: ${searchQuery.trim()}`);
        }
    };

  return (
    <div className="relative w-full h-[60vh] sm:h-[80vh] text-white overflow-hidden">
        <Carousel 
            className="absolute inset-0 w-full h-full"
            opts={{ loop: true }}
            plugins={[Autoplay({ delay: 5000, stopOnInteraction: false })]}
        >
            <CarouselContent>
                {heroImages.map((image, index) => (
                    <CarouselItem key={index}>
                        <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            className="object-cover"
                            priority={index === 0}
                            sizes="100vw"
                        />
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
      
      <div className="absolute inset-0 bg-black/60 bg-gradient-to-t from-background via-black/50 to-transparent" />

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center p-4">
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-shadow-lg animate-fade-in-down">
          Your Universe of <span className="text-primary">Entertainment & Innovation</span>
        </h1>
        <p className="mt-4 sm:mt-6 max-w-2xl text-lg sm:text-xl text-foreground/80 text-shadow animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          Discover movies, stream music, and explore the future with cutting-edge AI tools. All in one place.
        </p>
        <form onSubmit={handleSearchSubmit} className="mt-8 sm:mt-10 w-full max-w-lg animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <div className="relative">
                <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                    type="text"
                    placeholder="Search for a movie, artist, or AI tool..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-12 sm:h-14 pl-11 sm:pl-12 pr-4 rounded-full bg-background/80 border-2 border-border focus:border-primary transition-colors"
                />
                <Button type="submit" className="absolute right-1.5 sm:right-2.5 top-1/2 -translate-y-1/2 h-9 sm:h-10 rounded-full px-4 sm:px-6">
                    Search
                </Button>
            </div>
        </form>
      </div>
    </div>
  );
}
