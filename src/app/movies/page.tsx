
'use client';

import { MovieCarousel } from '@/components/movies/MovieCarousel';
import { Separator } from '@/components/ui/separator';
import { genres } from '@/lib/genres';
import Link from 'next/link';
import { Card, CardTitle, CardHeader } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

export default function MoviesPage() {
  return (
    <div className="min-h-screen bg-background p-4 pt-20">
      <div className="container mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Movie Discovery
          </h1>
          <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore popular, top-rated, and upcoming movies.
          </p>
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

          <section>
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
                {genres.map((genre) => (
                  <CarouselItem key={genre.id} className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5">
                    <Link href={`/movies/category/${genre.name.toLowerCase()}`} passHref>
                      <Card className="group flex flex-col justify-between h-40 overflow-hidden rounded-lg bg-card text-card-foreground shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-primary/20 hover:border-primary/50">
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
            title="🎬 Upcoming Movies"
            subtitle="Get a glimpse of future blockbusters."
            endpoint="/api/movies/upcoming"
          />
        </div>
      </div>
    </div>
  );
}
