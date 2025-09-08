
'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
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

            const preferredOrder = ['Xxx Tentacion', 'Lana Del Rey', 'The Neighbourhood', 'NF', 'The Weeknd'];
            const sortedArtists = uniqueArtists.sort((a, b) => {
                const aIndex = preferredOrder.indexOf(a.name);
                const bIndex = preferredOrder.indexOf(b.name);

                if (aIndex > -1 && bIndex > -1) return aIndex - bIndex;
                if (aIndex > -1) return -1;
                if (bIndex > -1) return 1;
                return a.name.localeCompare(b.name);
            });
            setArtists(sortedArtists.slice(0, 10)); // Limit to 10 featured artists
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
        <Carousel 
            opts={{ align: "start", loop: false }} 
            className="w-full"
        >
            <CarouselContent className="-ml-4">
                {artists.map((artist) => (
                    <CarouselItem key={artist.name} className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 pl-4 pb-4">
                        <Link href={`/music/artist/${encodeURIComponent(artist.name)}`} passHref>
                            <div className="group flex flex-col items-center text-center gap-2 cursor-pointer">
                                <div className="relative w-28 h-28 md:w-40 md:h-40">
                                    <Image 
                                        src={artist.imageUrl} 
                                        layout="fill" 
                                        alt={artist.name} 
                                        className="rounded-full object-cover transition-all duration-300 group-hover:scale-105 shadow-lg group-hover:shadow-primary/30" 
                                        data-ai-hint="artist portrait" 
                                        sizes="(max-width: 768px) 30vw, (max-width: 1200px) 20vw, 15vw"
                                    />
                                </div>
                                <p className="font-semibold text-base mt-3 truncate w-full">{artist.name}</p>
                            </div>
                        </Link>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex"/>
            <CarouselNext className="hidden sm:flex"/>
        </Carousel>
    </section>
  );
}
