
'use client';

import { MovieCarousel } from '@/components/movies/MovieCarousel';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function MoviesShowcase() {
    return (
        <section className="container mx-auto px-0 sm:px-6 lg:px-8">
             <div className="text-center mb-12 px-4 animate-fade-in-up">
                <h2 className="text-4xl font-bold sm:text-5xl tracking-tight">
                    <span className="animate-shimmer bg-gradient-to-r from-purple-500 via-foreground to-purple-500 bg-[length:200%_100%] bg-clip-text text-transparent">
                        Your Movie World
                    </span>
                </h2>
                <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto" style={{ animationDelay: '200ms' }}>
                    Discover top-rated, trending, and Telugu-dubbed Hollywood movies.
                </p>
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                <MovieCarousel
                    title=""
                    subtitle=""
                    endpoint="/api/movies/popular"
                />
            </div>
            <div className="text-center mt-12 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
                <Link href="/movies" passHref>
                    <Button size="lg">
                        Explore Movies
                    </Button>
                </Link>
            </div>
        </section>
    );
}
