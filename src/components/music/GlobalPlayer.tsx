
'use client';

import { useMusicPlayer } from '@/context/MusicPlayerContext';
import { Player } from './Player';
import { useEffect, useState } from 'react';

export function GlobalPlayer({ forceShow = false }: { forceShow?: boolean }) {
    const { currentSong } = useMusicPlayer();
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    if (!hasMounted) {
        // On the server and during initial client render, render a static placeholder
        // that takes up the same space as the player.
        return <div className="fixed bottom-0 left-0 right-0 z-50 h-16" />;
    }

    const isVisible = !!currentSong || forceShow;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 h-16">
            {isVisible && currentSong && <Player />}
            {isVisible && !currentSong && <div className="h-full border-t border-border/50 bg-background/80 backdrop-blur-lg" />}
        </div>
    );
}
