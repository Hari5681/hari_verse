
'use client';

import { MovieCarousel } from '@/components/movies/MovieCarousel';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function MoviesShowcase() {
    return (
        <section className="container mx-auto px-0 sm:px-6 lg:px-8">
             <div className="text-center mb-12 px-4">
                <h2 className="text-4xl font-bold sm:text-5xl tracking-tight">
                    <span className="animate-shimmer bg-gradient-to-r from-primary via-foreground to-primary bg-[length:200%_100%] bg-clip-text text-transparent">
                        Your Movie World
                    </span>
                </h2>
                <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                    Discover top-rated, trending, and Telugu-dubbed Hollywood movies.
                </p>
            </div>
            <MovieCarousel
                title=""
                subtitle=""
                endpoint="/api/movies/popular"
            />
            <div className="text-center mt-12">
                <Link href="/movies" passHref>
                    <Button size="lg">
                        Explore Movies
                    </Button>
                </Link>
            </div>
        </section>
    );
}
