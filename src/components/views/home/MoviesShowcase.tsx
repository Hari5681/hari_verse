
'use client';

import { MovieCarousel } from '@/components/movies/MovieCarousel';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function MoviesShowcase() {
    return (
        <section className="container mx-auto px-0 sm:px-6 lg:px-8">
             <div className="text-center mb-12 px-4">
                <h2 className="text-4xl font-bold sm:text-5xl tracking-tight">
                    <span className="animate-shimmer bg-gradient-to-r from-primary via-foreground to-primary bg-[length:200%_100%] bg-clip-text text-transparent">
                        Find Your Next Favorite Film
                    </span>
                </h2>
                <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                    Browse trending movies, explore different genres, and dive into a world of cinema.
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
                        Explore All Movies
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </Link>
            </div>
        </section>
    );
}
