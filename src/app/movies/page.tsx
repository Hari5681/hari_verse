
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Star, AlertTriangle } from 'lucide-react';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
}

export default function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/movies/top-rated');
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch movies.');
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
  }, []);

  return (
    <div className="min-h-screen bg-background p-4 pt-20">
      <div className="container mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Top Rated Movies
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            A curated list of the highest-rated movies of all time.
          </p>
        </header>

        {loading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {Array.from({ length: 10 }).map((_, index) => (
              <div key={index} className="animate-pulse bg-muted/50 rounded-lg aspect-[2/3]"></div>
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

        {!loading && !error && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function MovieCard({ movie }: { movie: Movie }) {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : `https://picsum.photos/500/750?random=${movie.id}`; // Fallback

  return (
    <Card className="overflow-hidden bg-card border-none shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-primary/20">
      <CardContent className="p-0">
        <div className="relative aspect-[2/3]">
          <Image
            src={imageUrl}
            alt={movie.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-3 text-white">
            <h3 className="font-bold text-sm sm:text-base truncate">{movie.title}</h3>
            <div className="flex items-center gap-1 mt-1">
              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              <span className="text-xs font-semibold">{movie.vote_average.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
