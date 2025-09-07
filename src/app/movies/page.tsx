
'use client';

import { MovieCarousel } from '@/components/movies/MovieCarousel';

export default function MoviesPage() {
  return (
    <div className="min-h-screen bg-background p-4 pt-20">
      <div className="container mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Telugu-Dubbed Hollywood Movies
          </h1>
          <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore a curated collection of top Hollywood blockbusters, all available in Telugu.
          </p>
        </header>

        <div className="space-y-16">
          <MovieCarousel
            title="🎬 Action / Adventure"
            subtitle="Top Telugu-Dubbed Hollywood Movies"
            withKeywords="9715,236166" // hollywood, telugu dubbed
            withGenres="28,12" // Action, Adventure
            sortBy="popularity.desc"
          />
          <MovieCarousel
            title="🧙‍♂️ Fantasy / Sci-Fi"
            subtitle="Enter new worlds with these dubbed epics."
            withKeywords="236166,9715" // telugu dubbed, hollywood
            withGenres="14,878" // Fantasy, Science Fiction
            sortBy="vote_average.desc"
          />
          <MovieCarousel
            title="😂 Comedy / Family"
            subtitle="Fun for all ages, now in Telugu."
            withKeywords="236166,9715" // telugu dubbed, hollywood
            withGenres="35,10751" // Comedy, Family
            sortBy="vote_average.desc"
          />
          <MovieCarousel
            title="😱 Thriller / Mystery / Crime"
            subtitle="Edge-of-your-seat suspense in Telugu."
            withKeywords="236166,9715" // telugu dubbed, hollywood
            withGenres="53,9648,80" // Thriller, Mystery, Crime
            sortBy="vote_average.desc"
          />
           <MovieCarousel
            title="💖 Romance / Drama"
            subtitle="Powerful stories of love and life."
            withKeywords="236166,9715" // telugu dubbed, hollywood
            withGenres="10749,18" // Romance, Drama
            sortBy="vote_average.desc"
          />
          <MovieCarousel
            title="🧟 Horror / Supernatural"
            subtitle="Experience the fear in your own language."
            withKeywords="236166,9715" // telugu dubbed, hollywood
            withGenres="27,9648" // Horror, Supernatural is not a genre, using Mystery
            sortBy="vote_average.desc"
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
