
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { MovieCarousel } from '@/components/movies/MovieCarousel';
import { Separator } from '@/components/ui/separator';
import { genres } from '@/lib/genres';
import Link from 'next/link';
import { Card, CardTitle, CardHeader } from '@/components/ui/card';
import { ArrowRight, Search, Film, Loader2 } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface MovieSuggestion {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
}


export default function MoviesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<MovieSuggestion[]>([]);
  const [isSuggestionsLoading, setIsSuggestionsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter();
  const searchContainerRef = useRef<HTMLFormElement>(null);


  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/movies/search/${encodeURIComponent(searchQuery.trim())}`);
      setShowSuggestions(false);
    }
  };
  
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
      setShowSuggestions(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);


  useEffect(() => {
    if (searchQuery.trim().length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setShowSuggestions(true);
    setIsSuggestionsLoading(true);

    const debounceTimeout = setTimeout(async () => {
      try {
        const response = await fetch(`/api/movies/search?query=${encodeURIComponent(searchQuery.trim())}`);
        if (response.ok) {
          const data = await response.json();
          setSuggestions(data.movies.slice(0, 7)); // Limit to 7 suggestions
        } else {
          setSuggestions([]);
        }
      } catch (error) {
        setSuggestions([]);
        console.error("Failed to fetch search suggestions", error);
      } finally {
        setIsSuggestionsLoading(false);
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(debounceTimeout);

  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-background p-4 pt-20">
      <div className="container mx-auto">
        <header className="text-center mb-12 animate-fade-in-down">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Movie Discovery
          </h1>
          <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore popular, top-rated, and upcoming movies, or search for something specific.
          </p>
          <form onSubmit={handleSearchSubmit} className="mt-6 max-w-xl mx-auto relative" ref={searchContainerRef}>
            <div className="flex items-center gap-2">
                <Input 
                type="text"
                placeholder="Search for a movie..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                className="bg-background/80"
                />
                <Button type="submit" size="icon">
                <Search className="h-5 w-5" />
                </Button>
            </div>
             {showSuggestions && (searchQuery.length >= 2) && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-black border border-border rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
                {isSuggestionsLoading ? (
                  <div className="flex items-center justify-center p-4">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  </div>
                ) : suggestions.length > 0 ? (
                  suggestions.map(movie => (
                    <Link key={movie.id} href={`/movies/${movie.id}`} passHref>
                        <div 
                            className="flex items-center p-3 hover:bg-accent cursor-pointer transition-colors"
                            onClick={() => setShowSuggestions(false)}
                        >
                            <Image
                                src={movie.poster_path ? `https://image.tmdb.org/t/p/w92${movie.poster_path}` : `https://picsum.photos/40/60?random=${movie.id}`}
                                alt={movie.title}
                                width={40}
                                height={60}
                                className="rounded-md object-cover"
                            />
                            <div className="ml-4">
                                <p className="font-semibold">{movie.title}</p>
                                <p className="text-sm text-muted-foreground">{movie.release_date?.split('-')[0] || 'N/A'}</p>
                            </div>
                        </div>
                    </Link>
                  ))
                ) : (
                  <div className="p-4 text-center text-muted-foreground">
                    <p>No movies found for "{searchQuery}"</p>
                  </div>
                )}
              </div>
            )}
          </form>
        </header>

        <div className="space-y-16">
          <MovieCarousel
            title="🔥 Popular Movies"
            subtitle="What's trending in the world of cinema."
            endpoint="/api/movies/popular"
          />
          <MovieCarousel
            title="⭐ Top Rated Movies"
            subtitle="The highest-rated movies on TMDb."
            endpoint="/api/movies/top-rated"
          />

          <section className="animate-fade-in-up">
            <div className='text-center'>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
                Categories
              </h2>
              <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
                Browse movies by your favorite genre.
              </p>
            </div>
            <Separator className="my-12"/>
            <Carousel
              opts={{
                align: 'start',
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {genres.map((genre, index) => (
                  <CarouselItem key={genre.id} className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5">
                    <Link href={`/movies/category/${genre.name.toLowerCase()}`} passHref>
                      <Card 
                        className="group flex flex-col justify-between h-40 overflow-hidden rounded-lg bg-card text-card-foreground shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-primary/20 hover:border-primary/50"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <CardHeader>
                          <CardTitle className="text-xl font-bold flex items-center justify-between">
                            <span>{genre.name}</span>
                            <ArrowRight className="h-5 w-5 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
                          </CardTitle>
                        </CardHeader>
                      </Card>
                    </Link>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex" />
              <CarouselNext className="hidden md:flex" />
            </Carousel>
          </section>

          <MovieCarousel
            title="🎌 Anime"
            subtitle="Explore the world of Japanese animation."
            withGenres="16"
            withKeywords="210024" 
          />
          
          <MovieCarousel
            title="Tollywood"
            subtitle="The best of Telugu cinema."
            language="te"
            sortBy="vote_average.desc"
          />

          <MovieCarousel
            title="Kollywood"
            subtitle="The finest from Tamil cinema."
            language="ta"
            sortBy="vote_average.desc"
          />

          <MovieCarousel
            title="🎬 Upcoming Movies"
            subtitle="Get a glimpse of future blockbusters."
            endpoint="/api/movies/upcoming"
          />
        </div>
      </div>
    </div>
  );
}
