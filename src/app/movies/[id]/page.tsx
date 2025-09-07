
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Star, AlertTriangle, ArrowLeft, Users, Video, Share2, PlayCircle, Heart, ThumbsUp, MoreVertical } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import React from 'react';
import { MovieCarousel } from '@/components/movies/MovieCarousel';
import Link from 'next/link';
import { genres } from '@/lib/genres';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';


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
  "watch/providers": any;
}

const AnimatedRating = ({ rating }: { rating: number }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    // Delay to allow for initial render before animation
    const timer = setTimeout(() => setWidth(rating * 10), 100);
    return () => clearTimeout(timer);
  }, [rating]);

  const getRatingColor = (r: number) => {
    if (r >= 7) return 'bg-green-500';
    if (r >= 4) return 'bg-yellow-500';
    return 'bg-red-500';
  };
  
  const getRatingTextColor = (r: number) => {
    if (r >= 7) return 'text-green-500';
    if (r >= 4) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="w-full max-w-xs">
      <div className="flex justify-between items-center mb-1">
        <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            <span className="text-base font-medium text-foreground">TMDb Rating</span>
        </div>
        <span className={cn("text-sm font-medium", getRatingTextColor(rating))}>{rating.toFixed(1)}/10</span>
      </div>
      <div className="w-full bg-secondary rounded-full h-2.5">
        <div
          className={cn("h-2.5 rounded-full transition-all duration-1000 ease-out", getRatingColor(rating))}
          style={{ width: `${width}%` }}
        ></div>
      </div>
    </div>
  );
};


export default function MovieDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  const { toast } = useToast();

  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showTrailer, setShowTrailer] = useState(false);

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
    ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
    : `https://picsum.photos/1280/720?random=${movie.id}`;
  
  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };
  
  const director = movie.crew?.find(person => person.job === 'Director');
  const writers = movie.crew?.filter(person => person.job === 'Writer' || person.job === 'Screenplay').slice(0, 2);

  return (
    <div className="min-h-screen bg-background text-foreground pt-16">
      <main className="pb-12">
        {/* Header section with backdrop */}
        <header className="relative w-full h-[40vh] md:h-[50vh] bg-black">
          {showTrailer && movie.trailer ? (
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${movie.trailer.key}?autoplay=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <>
              <Image
                src={backdropUrl}
                alt={`Backdrop for ${movie.title}`}
                fill
                className="object-cover object-top"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                {movie.trailer && (
                  <button
                    onClick={() => setShowTrailer(true)}
                    className="text-white bg-black/30 backdrop-blur-sm p-4 rounded-full transition-transform hover:scale-105"
                  >
                    <PlayCircle size={64} />
                  </button>
                )}
              </div>
            </>
          )}

           {!showTrailer && (
            <>
                <div className="absolute bottom-4 left-4 md:left-8 text-white">
                    <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-shadow-lg">{movie.title}</h1>
                    <div className="flex items-center flex-wrap gap-x-4 gap-y-1 mt-2 text-sm md:text-base text-shadow">
                        <span>{new Date(movie.release_date).getFullYear()}</span>
                        <span className="w-1 h-1 bg-white/50 rounded-full" />
                        <span>{formatRuntime(movie.runtime)}</span>
                    </div>
                </div>
            </>
           )}
        </header>

        {showTrailer && (
             <div className="container mx-auto max-w-5xl px-4 mt-4 relative z-10">
                <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">{movie.title}</h1>
                <div className="flex items-center flex-wrap gap-x-4 gap-y-1 mt-2 text-sm md:text-base text-muted-foreground">
                    <span>{new Date(movie.release_date).getFullYear()}</span>
                    <span className="w-1 h-1 bg-border rounded-full" />
                    <span>{formatRuntime(movie.runtime)}</span>
                </div>
            </div>
        )}

        <div className="container mx-auto max-w-5xl px-4 mt-8 relative z-10 space-y-8">
            <section className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
                <div className="w-full space-y-4">
                    <div className="flex flex-wrap gap-2">
                        {movie.genres.map(genre => (
                            <Badge key={genre.id} variant="secondary" className="cursor-pointer hover:bg-primary/20">{genre.name}</Badge>
                        ))}
                    </div>
                    <p className="text-base text-foreground/80 leading-relaxed">{movie.overview}</p>
                </div>
            </section>
            
            <Separator />
            
            <section className="flex items-center justify-start">
              <AnimatedRating rating={movie.vote_average} />
            </section>
            
            <Separator />

             <section className="space-y-4">
                {director && (
                    <div className="flex items-baseline gap-4">
                        <h2 className="text-lg font-bold w-24 flex-shrink-0">Director</h2>
                        <p className="text-lg text-primary">{director.name}</p>
                    </div>
                )}
                {writers && writers.length > 0 && (
                    <div className="flex items-baseline gap-4">
                        <h2 className="text-lg font-bold w-24 flex-shrink-0">Writers</h2>
                        <div className="flex flex-wrap gap-x-2">
                            {writers.map((writer, index) => (
                               <React.Fragment key={writer.id}>
                                    <p className="text-lg text-primary">{writer.name}</p>
                                    {index < writers.length - 1 && <span className="text-muted-foreground">·</span>}
                               </React.Fragment>
                            ))}
                        </div>
                    </div>
                )}
             </section>

            <Separator />

            {movie.cast && movie.cast.length > 0 && (
                 <section className="space-y-4">
                    <h2 className="text-2xl font-bold flex items-center gap-2">Stars</h2>
                    <Carousel
                        opts={{
                            align: 'start',
                            slidesToScroll: 'auto',
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

            <Separator />

             <div className="space-y-16">
                 <MovieCarousel
                    title="Similar Movies"
                    subtitle="If you liked this, you might also like..."
                    endpoint={`/api/movies/${id}/similar`}
                 />
                 
                <section className="animate-fade-in-up">
                    <h2 className="text-2xl font-bold">Explore Other Sections</h2>
                    <p className="text-muted-foreground mb-6">Browse movies by your favorite genre.</p>
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
            </div>
        </div>
      </main>
    </div>
  );
}
