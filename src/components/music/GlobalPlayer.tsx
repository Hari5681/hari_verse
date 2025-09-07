
'use client';

import { useMusicPlayer } from '@/context/MusicPlayerContext';
import { Player } from './Player';

export function GlobalPlayer({ forceShow = false }: { forceShow?: boolean }) {
    const { currentSong } = useMusicPlayer();

    if (!currentSong && !forceShow) {
        return null;
    }
    
    return <Player />;
}
