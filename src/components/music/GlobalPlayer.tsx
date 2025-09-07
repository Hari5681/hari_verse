
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

    const isVisible = hasMounted && (!!currentSong || forceShow);

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 h-16">
            {isVisible && <Player />}
            {!currentSong && forceShow && <div className="h-full border-t border-border/50 bg-background/80 backdrop-blur-lg" />}
        </div>
    );
}
