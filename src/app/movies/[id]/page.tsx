
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Star, AlertTriangle, ArrowLeft, Plus, Users, Video } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

interface MovieDetails {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  runtime: number;
  genres: { id: number; name: string }[];
  cast: { id: number; name: string; character: string; profile_path: string }[];
  crew: { id: number; name: string; job: string }[];
  trailer: { key: string } | null;
  videos: { results: any[] };
  images: { backdrops: any[], posters: any[], logos: any[] };
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
        
        const director = data.crew.find((person: any) => person.job === 'Director');
        
        setMovie({ ...data, crew: director ? [director] : [] });

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
  
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://picsum.photos/500/750';
  
  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const director = movie.crew?.find(person => person.job === 'Director');

  return (
    <div className="min-h-screen bg-background text-foreground p-4 pt-20">
      <div className="container mx-auto">
        
        <header className="mb-8 animate-fade-in-down">
          <Button variant="ghost" className="mb-4" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Movies
          </Button>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">{movie.title}</h1>
          <div className="flex items-center flex-wrap gap-4 mt-2 text-muted-foreground text-sm">
            <span>{new Date(movie.release_date).getFullYear()}</span>
            <span className="w-1 h-1 bg-muted-foreground rounded-full" />
            <span>{formatRuntime(movie.runtime)}</span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <main className="lg:col-span-9">
                <section className="flex flex-col md:flex-row gap-4 animate-fade-in-up">
                    <div className="w-full md:w-1/3 flex-shrink-0">
                        <Image
                            src={posterUrl}
                            alt={`Poster for ${movie.title}`}
                            width={500}
                            height={750}
                            className="rounded-lg shadow-lg w-full"
                        />
                    </div>
                    {movie.trailer ? (
                        <div className="w-full md:w-2/3 aspect-video">
                            <iframe
                                className="w-full h-full rounded-lg"
                                src={`https://www.youtube.com/embed/${movie.trailer.key}`}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    ) : (
                        <div className="w-full md:w-2/3 aspect-video bg-muted rounded-lg flex items-center justify-center">
                            <Video className="w-16 h-16 text-muted-foreground"/>
                        </div>
                    )}
                </section>

                <section className="mt-8 animate-fade-in-up" style={{animationDelay: '200ms'}}>
                    <div className="flex flex-wrap gap-2">
                    {movie.genres.map(genre => (
                        <Badge key={genre.id} variant="secondary">{genre.name}</Badge>
                    ))}
                    </div>
                    <p className="mt-4 text-base text-foreground/80">{movie.overview}</p>
                </section>
                
                <Separator className="my-8"/>
                
                {director && (
                    <section className="animate-fade-in-up" style={{animationDelay: '300ms'}}>
                        <div className="flex items-center gap-4">
                           <h3 className="font-bold">Director</h3>
                           <p className="text-primary hover:underline cursor-pointer">{director.name}</p>
                        </div>
                        <Separator className="my-8"/>
                    </section>
                )}

                {movie.cast && movie.cast.length > 0 && (
                     <section className="animate-fade-in-up" style={{animationDelay: '400ms'}}>
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Users className="w-6 h-6"/> Top Billed Cast</h2>
                        <Carousel
                            opts={{
                                align: 'start',
                                slidesToScroll: 3,
                            }}
                            className="w-full"
                            >
                            <CarouselContent>
                                {movie.cast.slice(0, 15).map(actor => (
                                <CarouselItem key={actor.id} className="basis-1/3 sm:basis-1/4 md:basis-1/5 lg:basis-1/6">
                                    <div className="text-center group">
                                    <div className="overflow-hidden rounded-full w-24 h-24 mx-auto transform transition-transform duration-300 group-hover:scale-105">
                                        <Image 
                                            src={actor.profile_path ? `https://image.tmdb.org/t/p/w185${actor.profile_path}` : 'https://picsum.photos/185/185'}
                                            alt={actor.name}
                                            width={185}
                                            height={185}
                                            className="rounded-full object-cover w-full h-full aspect-square shadow-md"
                                        />
                                    </div>
                                    <p className="font-bold mt-2 text-sm">{actor.name}</p>
                                    <p className="text-xs text-muted-foreground">{actor.character}</p>
                                    </div>
                                </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious className="hidden md:flex" />
                            <CarouselNext className="hidden md:flex" />
                        </Carousel>
                    </section>
                )}

            </main>
            <aside className="lg:col-span-3">
                <div className="sticky top-24 space-y-6">
                   <div className="animate-fade-in-left" style={{animationDelay: '200ms'}}>
                       <h3 className="text-sm font-semibold uppercase text-muted-foreground mb-2">TMDb RATING</h3>
                        <div className="flex items-center gap-2">
                             <Star className="h-8 w-8 text-yellow-400 fill-yellow-400" />
                             <div>
                                <p className="text-xl font-bold">{movie.vote_average.toFixed(1)} <span className="text-base text-muted-foreground">/ 10</span></p>
                                <p className="text-xs text-muted-foreground">{(movie.vote_count / 1000).toFixed(1)}K</p>
                             </div>
                        </div>
                   </div>
                    <div className="animate-fade-in-left" style={{animationDelay: '300ms'}}>
                        <h3 className="text-sm font-semibold uppercase text-muted-foreground mb-2">YOUR RATING</h3>
                         <Button variant="outline" className="w-full justify-start">
                             <Star className="h-6 w-6 mr-2 text-primary"/> Rate
                         </Button>
                    </div>

                    <div className="animate-fade-in-left" style={{animationDelay: '400ms'}}>
                        <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold">
                            <Plus className="w-5 h-5 mr-2"/> Add to Watchlist
                        </Button>
                         <p className="text-xs text-muted-foreground text-center mt-1">Added by {(Math.random() * 200 + 50).toFixed(0)}K users</p>
                    </div>

                </div>
            </aside>
        </div>

      </div>
    </div>
  );
}

    