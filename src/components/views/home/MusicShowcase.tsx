
'use client';

import { FeaturedArtists } from './FeaturedArtists';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function MusicShowcase() {
    return (
        <section className="animate-fade-in-up">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <div>
                    <h2 className="text-3xl font-bold">🎧 Music Showcase</h2>
                    <p className="text-muted-foreground mt-1">Handpicked sounds for every mood.</p>
                </div>
                <Link href="/music" passHref className="mt-4 sm:mt-0">
                    <Button variant="ghost">Discover More Music <ArrowRight className="ml-2 h-4 w-4" /></Button>
                </Link>
            </div>
            <FeaturedArtists />
        </section>
    );
}
