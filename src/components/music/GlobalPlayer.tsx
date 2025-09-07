
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

    const isVisible = !!currentSong || forceShow;

    if (!hasMounted) {
        return <div className="h-16" />;
    }

    return (
        <div className="h-16">
            {isVisible && (
                <div className="fixed bottom-0 left-0 right-0 z-50">
                    <Player />
                </div>
            )}
        </div>
    );
}
