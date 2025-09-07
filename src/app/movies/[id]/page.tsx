
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Star, Clock, Calendar, Film, Users, AlertTriangle, ArrowLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface MovieDetails {
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  runtime: number;
  genres: { id: number; name: string }[];
  cast: { id: number; name: string; character: string; profile_path: string }[];
  trailer: { key: string } | null;
}

export default function MovieDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;

  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/movies/${id}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch movie details.');
        }

        setMovie(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-background">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background text-center p-4">
        <AlertTriangle className="h-16 w-16 text-destructive mb-4" />
        <h1 className="text-2xl font-bold text-destructive-foreground mb-2">An Error Occurred</h1>
        <p className="text-muted-foreground">{error}</p>
        <Button onClick={() => router.back()} className="mt-6">Go Back</Button>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <p>Movie not found.</p>
      </div>
    );
  }

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : 'https://picsum.photos/1280/720';
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://picsum.photos/500/750';

  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
       <Button variant="ghost" size="icon" className="absolute top-6 left-6 z-20 bg-background/50 backdrop-blur-sm" onClick={() => router.push('/movies')}>
            <ArrowLeft className="h-6 w-6" />
       </Button>
      <div className="relative h-[40vh] md:h-[60vh] w-full">
        <Image
          src={backdropUrl}
          alt={`Backdrop for ${movie.title}`}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
      </div>

      <div className="container mx-auto px-4 pb-16 -mt-24 md:-mt-48 relative z-10">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/3 lg:w-1/4 flex-shrink-0">
            <Image
              src={posterUrl}
              alt={`Poster for ${movie.title}`}
              width={500}
              height={750}
              className="rounded-xl shadow-2xl"
            />
          </div>
          <div className="w-full md:w-2/3 lg:w-3/4 pt-8 md:pt-16">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">{movie.title}</h1>
            <div className="flex items-center flex-wrap gap-4 mt-4 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                <span className="font-bold text-lg text-white">{movie.vote_average.toFixed(1)}</span>
              </div>
              <Separator orientation="vertical" className="h-6" />
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>{new Date(movie.release_date).getFullYear()}</span>
              </div>
              <Separator orientation="vertical" className="h-6" />
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>{formatRuntime(movie.runtime)}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {movie.genres.map(genre => (
                <Badge key={genre.id} variant="secondary">{genre.name}</Badge>
              ))}
            </div>
            <p className="mt-6 text-lg text-foreground/80">{movie.overview}</p>
          </div>
        </div>

        {movie.trailer && (
          <div className="mt-12">
            <h2 className="text-3xl font-bold mb-4">Trailer</h2>
            <div className="aspect-video">
              <iframe
                className="w-full h-full rounded-lg"
                src={`https://www.youtube.com/embed/${movie.trailer.key}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}
        
        {movie.cast && movie.cast.length > 0 && (
             <div className="mt-12">
                <h2 className="text-3xl font-bold mb-6">Top Billed Cast</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {movie.cast.slice(0, 12).map(actor => (
                        <div key={actor.id} className="text-center">
                            <Image 
                                src={actor.profile_path ? `https://image.tmdb.org/t/p/w185${actor.profile_path}` : 'https://picsum.photos/185/278'}
                                alt={actor.name}
                                width={185}
                                height={278}
                                className="rounded-lg object-cover w-full h-auto aspect-[2/3] shadow-md"
                                />
                            <p className="font-bold mt-2 text-sm">{actor.name}</p>
                            <p className="text-xs text-muted-foreground">{actor.character}</p>
                        </div>
                    ))}
                </div>
            </div>
        )}

      </div>
    </div>
  );
}
