
'use client';

import { FeaturedArtists } from './FeaturedArtists';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function MusicShowcase() {
    return (
        <section className="container mx-auto">
            <div className="text-center mb-12 animate-fade-in-up">
                <h2 className="text-4xl font-bold sm:text-5xl tracking-tight">
                    <span className="animate-shimmer bg-gradient-to-r from-primary via-foreground to-primary bg-[length:200%_100%] bg-clip-text text-transparent">
                        Discover Your Sound
                    </span>
                </h2>
                <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto" style={{ animationDelay: '200ms' }}>
                    Stream your favorite tracks, explore curated playlists, and enjoy nonstop music.
                </p>
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                <FeaturedArtists />
            </div>
             <div className="text-center mt-12 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
                <Link href="/music" passHref>
                    <Button size="lg">
                        Go to Music Player
                    </Button>
                </Link>
            </div>
        </section>
    );
}
