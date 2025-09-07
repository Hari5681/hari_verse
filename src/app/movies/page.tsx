
'use client';

import { MovieCarousel } from '@/components/movies/MovieCarousel';

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
            title="⭐ Top Rated Movies"
            subtitle="The highest-rated movies on TMDb."
            endpoint="/api/movies/top-rated"
          />
           <MovieCarousel
            title="🔥 Popular Movies"
            subtitle="What's trending in the world of cinema."
            endpoint="/api/movies/popular"
          />
          <MovieCarousel
            title="🎬 Upcoming Movies"
            subtitle="Get a glimpse of future blockbusters."
            endpoint="/api/movies/upcoming"
          />
          <MovieCarousel
            title="Top Rated Telugu Movies"
            subtitle="Celebrating the best of Tollywood."
            language="te"
            sortBy="vote_average.desc"
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
