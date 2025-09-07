
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Star, AlertTriangle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
}

export default function SearchResultsPage() {
  const params = useParams();
  const router = useRouter();
  const { query } = params;

  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const decodedQuery = decodeURIComponent(query as string);

  useEffect(() => {
    if (!query) return;

    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/movies/search?query=${query}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch search results.');
        }

        setMovies(data.movies);
        setError(null);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [query]);

  return (
    <div className="min-h-screen bg-background p-4 pt-20">
      <div className="container mx-auto">
        <header className="mb-8 flex items-center gap-4 animate-fade-in-down">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
              Search Results
            </h1>
            <p className="mt-1 text-lg text-muted-foreground">
              Showing results for: "{decodedQuery}"
            </p>
          </div>
        </header>

        {loading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
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
          </div>
        )}

        {!loading && !error && movies.length === 0 && (
            <div className="text-center py-16">
                <h2 className="text-2xl font-semibold">No movies found</h2>
                <p className="text-muted-foreground mt-2">Try a different search term.</p>
            </div>
        )}

        {!loading && !error && movies.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {movies.map((movie, index) => (
              <Link key={movie.id} href={`/movies/${movie.id}`} passHref>
                <div 
                  className="animate-fade-in-up" 
                  style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'both' }}
                >
                  <MovieCard movie={movie} />
                </div>
              </Link>
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
    : `https://picsum.photos/500/750?random=${movie.id}`;
    
  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';

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
            <div className="flex justify-between items-center text-xs mt-1">
                <span>{releaseYear}</span>
                {movie.vote_average > 0 && (
                    <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                    <span className="font-semibold">{movie.vote_average.toFixed(1)}</span>
                    </div>
                )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
