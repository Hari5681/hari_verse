
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

    if (!hasMounted || !currentSong) {
        return null;
    }

    return (
        <Player />
    );
}
