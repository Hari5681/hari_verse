
'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Star, AlertTriangle, ArrowLeft, Plus, Users, Video, Share2, PlayCircle, Heart, ThumbsUp, MoreVertical } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

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

export default function MovieDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  const { toast } = useToast();

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
    <div className="min-h-screen bg-background text-foreground">
        <Button variant="ghost" className="absolute top-4 left-4 z-20 flex items-center gap-2" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
            Back
        </Button>
      <main className="pb-12">
        {/* Header section with backdrop */}
        <header className="relative w-full h-[40vh] md:h-[50vh]">
          <Image
            src={backdropUrl}
            alt={`Backdrop for ${movie.title}`}
            fill
            className="object-cover object-top"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
             <Dialog>
                <DialogTrigger asChild>
                    <button className="text-white bg-black/30 backdrop-blur-sm p-4 rounded-full transition-transform hover:scale-105">
                        <PlayCircle size={64} />
                    </button>
                </DialogTrigger>
                {movie.trailer && (
                    <DialogContent className="bg-black border-none p-0 max-w-4xl w-full">
                         <div className="aspect-video">
                            <iframe
                                className="w-full h-full"
                                src={`https://www.youtube.com/embed/${movie.trailer.key}?autoplay=1`}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </DialogContent>
                )}
             </Dialog>
          </div>
           <div className="absolute top-4 right-4 z-20 flex gap-2">
                <Button size="icon" variant="outline" className="bg-background/30 border-none">
                    <ThumbsUp size={20} />
                </Button>
                <Button size="icon" variant="outline" className="bg-background/30 border-none">
                    <Heart size={20} />
                </Button>
                 <Button size="icon" variant="outline" className="bg-background/30 border-none">
                    <MoreVertical size={20} />
                </Button>
           </div>
          <div className="absolute bottom-4 left-4 md:left-8 text-white">
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-shadow-lg">{movie.title}</h1>
            <div className="flex items-center flex-wrap gap-x-4 gap-y-1 mt-2 text-sm md:text-base text-shadow">
                <span>{new Date(movie.release_date).getFullYear()}</span>
                <span className="w-1 h-1 bg-white/50 rounded-full" />
                <span>{formatRuntime(movie.runtime)}</span>
            </div>
          </div>
        </header>

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
            
            <section className="flex items-center gap-6 text-lg">
                <div className="flex items-center gap-2">
                    <Star className="h-8 w-8 text-yellow-400 fill-yellow-400" />
                    <div>
                        <p><span className="font-bold text-xl">{movie.vote_average.toFixed(1)}</span><span className="text-sm text-muted-foreground">/10</span></p>
                        <p className="text-xs text-muted-foreground">{movie.vote_count.toLocaleString()}</p>
                    </div>
                </div>
                 <div className="h-8 w-px bg-border" />
                 <Button variant="ghost" className="flex items-center gap-2 text-lg">
                    <Star className="h-6 w-6" /> Rate
                 </Button>
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

        </div>
      </main>
    </div>
  );
}
