
'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getArtistImageUrl, getArtistFromTitle } from '@/lib/musicUtils';
import { AlertTriangle } from 'lucide-react';

interface Song {
  key: string;
  title: string;
  url:string;
  artist: string;
}
interface Artist {
    name: string;
    imageUrl: string;
}

export function FeaturedArtists() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAndSetArtists = async () => {
      try {
        const response = await fetch('/api/music');
        const data = await response.json();

        if (!response.ok) {
           throw new Error(data.error || 'Failed to fetch songs for artists');
        }

        if (data.songs && data.songs.length > 0) {
            const songsWithArtists: Song[] = data.songs.map((song: Omit<Song, 'artist'>) => ({
                ...song,
                artist: getArtistFromTitle(song.title)
            }));
            
            const uniqueArtists = songsWithArtists.reduce((acc, song) => {
                if (!acc.find(a => a.name === song.artist) && song.artist !== 'Unknown Artist') {
                    acc.push({
                         name: song.artist,
                         imageUrl: getArtistImageUrl(song.artist)
                    });
                }
                return acc;
            }, [] as Artist[]);

            const featuredArtistNames = ['Xxx Tentacion', 'Lana Del Rey'];
            const featuredArtists = uniqueArtists
              .filter(artist => featuredArtistNames.includes(artist.name))
              .sort((a, b) => featuredArtistNames.indexOf(a.name) - featuredArtistNames.indexOf(b.name));
            
            setArtists(featuredArtists);
        }
      } catch (err: any) {
        setError(err.message);
      }
    };
    fetchAndSetArtists();
  }, []);

  if (error) {
     return (
        <section className="animate-fade-in-up">
            <div className="flex flex-col items-center justify-center rounded-lg bg-destructive/10 p-6 text-center text-destructive-foreground">
                <AlertTriangle className="h-10 w-10 text-destructive" />
                <h3 className="mt-4 text-lg font-semibold">Could Not Load Artists</h3>
                <p className="mt-1 text-sm">{error}</p>
            </div>
        </section>
    );
  }
  
  if (artists.length === 0 && !error) {
      return (
        <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
        </div>
      );
  }

  return (
    <section className="animate-fade-in-up w-full">
        <div className="grid grid-cols-2 gap-8 max-w-xl mx-auto">
            {artists.map((artist) => (
                <Link key={artist.name} href={`/music/artist/${encodeURIComponent(artist.name)}`} passHref>
                    <div className="group flex flex-col items-center text-center gap-2 cursor-pointer">
                        <div className="relative w-40 h-40">
                            <Image 
                                src={artist.imageUrl} 
                                layout="fill" 
                                alt={artist.name} 
                                className="rounded-full object-cover transition-all duration-300 group-hover:scale-105 shadow-lg group-hover:shadow-primary/30" 
                                data-ai-hint="artist portrait" 
                                sizes="(max-width: 768px) 50vw, 25vw"
                            />
                        </div>
                        <p className="font-semibold text-base mt-3 truncate w-full">{artist.name}</p>
                    </div>
                </Link>
            ))}
        </div>
    </section>
  );
}
