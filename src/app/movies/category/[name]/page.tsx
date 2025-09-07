
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Star, AlertTriangle, ArrowLeft } from 'lucide-react';
import { genres } from '@/lib/genres';
import { Button } from '@/components/ui/button';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
}

export default function CategoryPage() {
  const params = useParams();
  const router = useRouter();
  const { name } = params;

  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const genre = genres.find(g => g.name.toLowerCase() === (name as string)?.toLowerCase());

  useEffect(() => {
    if (!genre) {
        setError('Invalid genre selected.');
        setLoading(false);
        return;
    }

    const fetchMovies = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        params.append('with_genres', String(genre.id));
        params.append('sort_by', 'popularity.desc');
        
        const response = await fetch(`/api/movies/discover?${params.toString()}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch movies.');
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
  }, [genre]);

  return (
    <div className="min-h-screen bg-background p-4 pt-20">
      <div className="container mx-auto">
        <header className="mb-8 flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
              {genre ? genre.name : 'Category'}
            </h1>
            <p className="mt-1 text-lg text-muted-foreground">
              Discover the best movies in this genre.
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

        {!loading && !error && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {movies.map((movie) => (
              <Link key={movie.id} href={`/movies/${movie.id}`} passHref>
                <MovieCard movie={movie} />
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

  return (
    <Card className="overflow-hidden bg-card border-none shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-primary/20">
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
