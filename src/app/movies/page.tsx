
'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { MovieCarousel } from '@/components/movies/MovieCarousel';
import { Separator } from '@/components/ui/separator';
import { genres } from '@/lib/genres';
import Link from 'next/link';
import { Card, CardTitle, CardHeader } from '@/components/ui/card';
import { ArrowRight, Search, View } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface Movie {
  id: number;
  title: string;
}

export default function MoviesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Movie[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchPopularMovies = async () => {
        try {
            const response = await fetch('/api/movies/popular');
            const data = await response.json();
            if (response.ok) {
                const popularTitles = data.movies.slice(0, 10);
                if (searchQuery.length > 1) {
                    const filtered = popularTitles.filter((movie: Movie) => 
                        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
                    );
                    setSuggestions(filtered);
                } else {
                    setSuggestions(popularTitles);
                }
            }
        } catch (error) {
            console.error("Failed to fetch suggestions:", error);
        }
    };
    
    if (showSuggestions) {
        fetchPopularMovies();
    }
  }, [searchQuery, showSuggestions]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/movies/search/${encodeURIComponent(searchQuery.trim())}`);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (movie: Movie) => {
    router.push(`/movies/${movie.id}`);
    setShowSuggestions(false);
  }

  return (
    <div className="min-h-screen bg-background p-4 pt-20">
      <div className="container mx-auto">
        <header className="text-center mb-12 animate-fade-in-down">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Movie Discovery
          </h1>
          <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
            Find popular hits, top-rated gems, and the latest releases — or search for your favorites.
          </p>
          <div ref={searchRef} className="mt-6 max-w-xl mx-auto relative">
            <form onSubmit={handleSearchSubmit}>
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
            </form>
            {showSuggestions && (
                 <Card className="absolute top-full left-0 right-0 mt-2 z-20">
                    <ul className="p-2">
                        {suggestions.length > 0 ? (
                            suggestions.map(movie => (
                                <li key={movie.id} onClick={() => handleSuggestionClick(movie)} className="px-4 py-2 rounded-md hover:bg-accent cursor-pointer">
                                    {movie.title}
                                </li>
                            ))
                        ) : (
                             <li className="px-4 py-2 text-muted-foreground">No suggestions found.</li>
                        )}
                    </ul>
                 </Card>
            )}
          </div>
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
                loop: false,
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
                <CarouselItem className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5">
                    <Link href="/movies/categories" passHref>
                      <Card 
                        className="group flex flex-col justify-center items-center text-center h-40 overflow-hidden rounded-lg bg-card text-card-foreground shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-primary/20 hover:border-primary/50"
                      >
                         <View className="h-8 w-8 text-primary transition-transform duration-300 group-hover:scale-110" />
                         <p className="font-bold mt-2 text-lg">View All</p>
                      </Card>
                    </Link>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious className="transition-opacity disabled:opacity-0" />
              <CarouselNext className="transition-opacity disabled:opacity-0" />
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
            sortBy="release_date.desc"
            primaryReleaseDateLte={new Date().toISOString().split('T')[0]}
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
