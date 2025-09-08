
'use client';
import { MovieCarousel } from '@/components/movies/MovieCarousel';

export function ThematicSection() {
    return (
        <section className="animate-fade-in-up">
             <div className="text-center mb-6">
                <h2 className="text-3xl font-bold">🌌 Sci-Fi & Cyberpunk</h2>
                <p className="text-muted-foreground mt-1 max-w-2xl mx-auto">Explore futuristic worlds, dystopian societies, and cutting-edge technology.</p>
            </div>

            <MovieCarousel
                title=""
                subtitle=""
                withGenres="878" // Science Fiction
                withKeywords="818,4354" // Cyberpunk, Dystopia
            />
        </section>
    );
}
