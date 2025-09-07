
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Star, AlertTriangle } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
}

interface MovieCarouselProps {
    title: string;
    subtitle: string;
    endpoint?: string;
    language?: string;
    sortBy?: string;
    withKeywords?: string;
    withGenres?: string;
    primaryReleaseDateLte?: string;
}

export function MovieCarousel({ title, subtitle, endpoint, language, sortBy, withKeywords, withGenres, primaryReleaseDateLte }: MovieCarouselProps) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        let url: string;
        if (endpoint) {
          url = endpoint;
        } else {
          const params = new URLSearchParams();
          if (language) params.append('language', language);
          if (sortBy) params.append('sort_by', sortBy);
          if (withKeywords) params.append('with_keywords', withKeywords);
          if (withGenres) params.append('with_genres', withGenres);
          if (primaryReleaseDateLte) params.append('primary_release_date.lte', primaryReleaseDateLte);
          url = `/api/movies/discover?${params.toString()}`;
        }
        
        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || `Failed to fetch movies.`);
        }

        setMovies(data.movies);
        setError(null);
      } catch (err: any) {
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [endpoint, language, sortBy, withKeywords, withGenres, primaryReleaseDateLte]);

  return (
    <section className="animate-fade-in-up">
        <h2 className="text-3xl font-bold">{title}</h2>
        <p className="text-muted-foreground mb-6">{subtitle}</p>

        {loading && (
             <div className="flex space-x-4">
                {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 shrink-0">
                    <div className="animate-pulse bg-muted/50 rounded-lg aspect-[2/3]"></div>
                </div>
                ))}
            </div>
        )}

        {error && (
          <div className="flex flex-col items-center justify-center rounded-lg bg-destructive/10 p-6 text-center text-destructive-foreground">
            <AlertTriangle className="h-10 w-10 text-destructive" />
            <h3 className="mt-4 text-lg font-semibold">An Error Occurred</h3>
            <p className="mt-1 text-sm">{error}</p>
            <p className="mt-2 text-xs opacity-70">Please ensure your TMDB_API_KEY is set in the .env file.</p>
          </div>
        )}

        {!loading && !error && movies.length > 0 && (
            <Carousel opts={{ align: "start", loop: false }} className="w-full">
                <CarouselContent className="-ml-4">
                    {movies.map((movie) => (
                        <CarouselItem key={movie.id} className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6 pl-4">
                            <Link href={`/movies/${movie.id}`} passHref>
                                <MovieCard movie={movie} />
                            </Link>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="hidden md:flex"/>
                <CarouselNext className="hidden md:flex"/>
            </Carousel>
        )}

        {!loading && !error && movies.length === 0 && (
             <p className="text-muted-foreground">No movies found for this category.</p>
        )}
    </section>
  );
}

function MovieCard({ movie }: { movie: Movie }) {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : `https://picsum.photos/500/750?random=${movie.id}`;

  return (
    <Card className="overflow-hidden bg-card border-none shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-primary/20">
      <CardContent className="p-0">
        <div className="relative aspect-[2/3]">
          <Image
            src={imageUrl}
            alt={movie.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-3 text-white w-full">
            <h3 className="font-bold text-sm sm:text-base truncate">{movie.title}</h3>
            {movie.vote_average > 0 && (
                <div className="flex items-center gap-1 mt-1">
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <span className="text-xs font-semibold">{movie.vote_average.toFixed(1)}</span>
                </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
