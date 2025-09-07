
'use client';

import { useMusicPlayer } from '@/context/MusicPlayerContext';
import { Player } from './Player';

export function GlobalPlayer() {
    const { currentSong } = useMusicPlayer();

    if (!currentSong) {
        return null;
    }
    
    return <Player />;
}
