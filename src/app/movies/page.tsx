
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
            title="🔥 Popular Movies"
            subtitle="What's trending in the world of cinema."
            endpoint="/api/movies/popular"
          />
          <MovieCarousel
            title="⭐ Top Rated Movies"
            subtitle="The highest-rated movies on TMDb."
            endpoint="/api/movies/top-rated"
          />
          <MovieCarousel
            title="💥 Action Movies"
            subtitle="Get your adrenaline pumping."
            withGenres="28"
            sortBy="popularity.desc"
          />
          <MovieCarousel
            title="💖 Romance Movies"
            subtitle="Fall in love with these stories."
            withGenres="10749"
            sortBy="popularity.desc"
          />
           <MovieCarousel
            title="😂 Comedy Movies"
            subtitle="Have a laugh with these picks."
            withGenres="35"
            sortBy="popularity.desc"
          />
           <MovieCarousel
            title="😱 Horror Movies"
            subtitle="Dare to watch these scary films."
            withGenres="27"
            sortBy="popularity.desc"
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
