
'use client';
import { usePathname } from 'next/navigation';
import { Player } from './Player';

export function GlobalPlayer() {
    const pathname = usePathname();
    const isMusicPage = pathname.startsWith('/music');

    return <Player />;
}
