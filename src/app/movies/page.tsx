
'use client';

import { MovieCarousel } from '@/components/movies/MovieCarousel';

export default function MoviesPage() {
  return (
    <div className="min-h-screen bg-background p-4 pt-20">
      <div className="container mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Discover Movies
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            A curated list of movies for you to explore.
          </p>
        </header>

        <div className="space-y-12">
          <MovieCarousel
            title="Recently Added Telugu Movies"
            subtitle="The latest releases from the Telugu film industry."
            language="te"
            sortBy="primary_release_date.desc"
          />
          <MovieCarousel
            title="Top-Rated Telugu Movies"
            subtitle="The finest from the Telugu film industry."
            language="te"
            sortBy="vote_average.desc"
          />
          <MovieCarousel
            title="Popular Telugu Dubbed"
            subtitle="Hit movies from other languages, now in Telugu."
            withKeywords="236166" // Keyword for "telugu dubbed"
          />
          <MovieCarousel
            title="Anime in Telugu"
            subtitle="Japanese animation with Telugu dubbing."
            withKeywords="210024,236166" // Keywords for "anime" and "telugu dubbed"
          />
          <MovieCarousel
            title="Popular K-Dramas"
            subtitle="The best of Korean television series."
            language="ko"
            withKeywords="219803" // Keyword for "k-drama"
          />
           <MovieCarousel
            title="Top Rated Hindi Movies"
            language="hi"
            subtitle="Celebrating the best of Bollywood."
            sortBy="vote_average.desc"
          />
        </div>
      </div>
    </div>
  );
}
