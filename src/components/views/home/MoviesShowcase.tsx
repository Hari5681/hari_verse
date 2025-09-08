
'use client';

import { MovieCarousel } from '@/components/movies/MovieCarousel';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function MoviesShowcase() {
    return (
        <section className="animate-fade-in-up">
             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <div>
                    <h2 className="text-3xl font-bold">🎬 Movie Showcase</h2>
                    <p className="text-muted-foreground mt-1">Discover your next favorite film.</p>
                </div>
                <Link href="/movies" passHref className="mt-4 sm:mt-0">
                    <Button variant="ghost">Explore All Movies <ArrowRight className="ml-2 h-4 w-4" /></Button>
                </Link>
            </div>
            <MovieCarousel
                title="🔥 Trending Movies"
                subtitle="What's popular in the world of cinema right now."
                endpoint="/api/movies/popular"
            />
        </section>
    );
}
