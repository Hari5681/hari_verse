
'use client';

import { useMusicPlayer } from '@/context/MusicPlayerContext';
import { Player } from './Player';
import { useEffect, useState } from 'react';

export function GlobalPlayer({ isMusicPage }: { isMusicPage: boolean }) {
    const { currentSong } = useMusicPlayer();
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    if (!hasMounted) {
        // On the server and during initial client render, render a static placeholder
        // that takes up the same space as the player.
        return <div className="h-16" />;
    }

    const isVisible = !!currentSong || isMusicPage;

    return (
        <div className="h-16">
            {isVisible && currentSong && <Player />}
            {isVisible && !currentSong && <div className="h-full border-t border-border/50 bg-background/80 backdrop-blur-lg" />}
        </div>
    );
}
