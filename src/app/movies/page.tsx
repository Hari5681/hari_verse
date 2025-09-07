
'use client';

import { MovieCarousel } from '@/components/movies/MovieCarousel';

export default function MoviesPage() {
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

        <div className="space-y-12">
           <MovieCarousel
            title="Top Rated English Movies"
            language="en"
            subtitle="The best of Hollywood and beyond."
          />
           <MovieCarousel
            title="Top Rated Telugu Movies"
            language="te"
            subtitle="The finest from the Telugu film industry."
          />
           <MovieCarousel
            title="Top Rated Hindi Movies"
            language="hi"
            subtitle="Celebrating the best of Bollywood."
          />
        </div>
      </div>
    </div>
  );
}
