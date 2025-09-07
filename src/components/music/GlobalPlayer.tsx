
'use client';

import { useMusicPlayer } from '@/context/MusicPlayerContext';
import { Player } from './Player';

export function GlobalPlayer({ forceShow = false }: { forceShow?: boolean }) {
    const { currentSong } = useMusicPlayer();

    // The player should only be visible if there's a song loaded,
    // or if we are forcing it to show (on music pages).
    if (!currentSong && !forceShow) {
        return null;
    }
    
    // If we forceShow but have no song, the Player component will render a placeholder.
    // Otherwise, it will render the full or mini player.
    return <Player />;
}
