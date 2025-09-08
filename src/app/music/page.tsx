
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { PlayCircle, Download, AlertTriangle, PauseCircle, Play } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { getArtistFromTitle, cleanSongTitle, getArtistImageUrl, getSongImageUrl } from '@/lib/musicUtils';
import { useMusicPlayer } from '@/context/MusicPlayerContext';


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

export default function MusicPage() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const [recentlyPlayed, setRecentlyPlayed] = useState<Song[]>([]);
  const [topPicks, setTopPicks] = useState<Song[]>([]);

  const { playSong, pauseSong, currentSong } = useMusicPlayer();

  useEffect(() => {
    try {
      const storedSongs = localStorage.getItem('recentlyPlayed');
      if (storedSongs) {
        setRecentlyPlayed(JSON.parse(storedSongs));
      }
    } catch (e) {
      console.error("Failed to parse recently played songs from localStorage", e);
      localStorage.removeItem('recentlyPlayed');
    }
  }, []);

  useEffect(() => {
    const fetchR2Songs = async () => {
      try {
        setError(null);
        const response = await fetch('/api/music');
        const data = await response.json();
        
        if (!response.ok) {
           throw new Error(data.error || 'Failed to fetch songs');
        }

        if (!data.songs || data.songs.length === 0) {
            setError('No songs found in your R2 bucket. Please upload music to your bucket.');
            setSongs([]);
        } else {
            const songsWithArtists: Song[] = data.songs.map((song: Omit<Song, 'artist'>) => ({
                ...song,
                artist: getArtistFromTitle(song.title)
            }));
            setSongs(songsWithArtists);

            const picksOrder = [
              'young and beautiful',
              'changes',
              'when i grow up',
              'sweater weather',
              'lovely',
              'blinding lights',
            ];

            const uniquePicks = picksOrder.reduce((acc, pick) => {
                const foundSong = songsWithArtists.find(song => 
                    cleanSongTitle(song.title, song.artist).toLowerCase().includes(pick)
                );
                if (foundSong && !acc.find(s => s.key === foundSong.key)) {
                    acc.push(foundSong);
                }
                return acc;
            }, [] as Song[]);
            
            setTopPicks(uniquePicks);
            
            const uniqueArtists = songsWithArtists.reduce((acc, song) => {
                if (!acc.find(a => a.name === song.artist) && song.artist !== 'Unknown Artist') {
                    acc.push({
                         name: song.artist,
                         imageUrl: getArtistImageUrl(song.artist)
                    });
                }
                return acc;
            }, [] as Artist[]);

            const preferredOrder = ['Xxx Tentacion', 'Lana Del Rey'];
            const sortedArtists = uniqueArtists.sort((a, b) => {
                const aIndex = preferredOrder.indexOf(a.name);
                const bIndex = preferredOrder.indexOf(b.name);

                if (aIndex > -1 && bIndex > -1) {
                    return aIndex - bIndex;
                }
                if (aIndex > -1) {
                    return -1;
                }
                if (bIndex > -1) {
                    return 1;
                }
                return a.name.localeCompare(b.name);
            });


            setArtists(sortedArtists);
        }
      } catch (error: any) {
        console.error("Fetch R2 songs error:", error);
        const errorMessage = error.message || 'An unexpected error occurred while fetching songs.';
        setError(errorMessage);
        toast({
            variant: "destructive",
            title: "Error Fetching Your Music",
            description: errorMessage,
        })
      }
    };

    fetchR2Songs();
  }, [toast]);
  
  const handlePlaySong = (song: Song, songList: Song[]) => {
    playSong(song, songList);

    const newRecentlyPlayed = [
      song,
      ...recentlyPlayed.filter(s => s.key !== song.key)
    ].slice(0, 10);
    setRecentlyPlayed(newRecentlyPlayed);
    localStorage.setItem('recentlyPlayed', JSON.stringify(newRecentlyPlayed));
  };
  
  const handlePauseSong = () => {
    pauseSong();
  };

  const backgroundStyle = {
    backgroundImage: `url(https://raw.githubusercontent.com/Hari5681/hariverse-assets/main/assets/music-wallpaper.jpg)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed'
  };
  
  return (
    <div className="relative min-h-screen w-full">
      <div 
        className="absolute inset-0"
        style={backgroundStyle}
      ></div>
      <div 
        className="absolute inset-0 bg-black/60"
      ></div>
    <div className="relative flex min-h-screen flex-col items-center p-4 pt-20">
      <Card className="w-full max-w-7xl border-none bg-transparent">
        <CardContent>
            {error && (
                <div className="mb-8 flex flex-col items-center justify-center rounded-lg bg-destructive/10 p-6 text-center text-destructive-foreground">
                    <AlertTriangle className="h-10 w-10 text-destructive" />
                    <h3 className="mt-4 text-lg font-semibold">An Error Occurred</h3>
                    <p className="mt-1 text-sm">{error}</p>
                    <p className="mt-2 text-xs opacity-70">Please check your .env file and Cloudflare R2 settings.</p>
                </div>
            )}
            
            <div className="space-y-12">
                <header className="text-center animate-fade-in-down">
                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-primary">
                        HariVerse Music
                    </h1>
                    <p className="mt-3 text-lg text-muted-foreground">
                        Stream. Groove. Repeat.
                    </p>
                    <Separator className="my-12"/>
                </header>

                 {recentlyPlayed.length > 0 && (
                    <section>
                        <h2 className="text-2xl font-bold mb-4">Recently Played</h2>
                        <div className="flex flex-col gap-2">
                           {recentlyPlayed.slice(0, 5).map((song, index) => (
                               <RecentlyPlayedSongItem
                                   key={`recent-${song.key}`}
                                   song={song}
                                   index={index + 1}
                                   onPlay={() => handlePlaySong(song, recentlyPlayed)}
                               />
                           ))}
                       </div>
                        <Separator className="my-12"/>
                    </section>
                )}

                <section>
                    <h2 className="text-2xl font-bold mb-4">Top Picks</h2>
                     {topPicks.length > 0 ? (
                        <Carousel
                            opts={{ align: "start", loop: false }}
                            className="w-full"
                        >
                            <CarouselContent className="-ml-4">
                                {topPicks.map((song) => (
                                    <CarouselItem key={song.key} className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 pl-4">
                                        <SongCard 
                                            song={song} 
                                            currentSong={currentSong} 
                                            onPlay={() => handlePlaySong(song, songs)}
                                            onPause={handlePauseSong}
                                        />
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious className="hidden md:flex"/>
                            <CarouselNext className="hidden md:flex"/>
                        </Carousel>
                    ) : (
                         !error && <div className="flex items-center justify-center h-40 rounded-lg bg-muted/20">
                            <p className="text-muted-foreground">Loading your top picks...</p>
                        </div>
                    )}
                </section>
                
                {artists.length > 0 && (
                    <section>
                        <Separator className="my-12"/>
                        <h2 className="text-2xl font-bold mb-4">Artists</h2>
                         <Carousel 
                            opts={{ align: "start", loop: false }} 
                            className="w-full"
                         >
                            <CarouselContent className="-ml-4">
                                {artists.map((artist) => (
                                    <CarouselItem key={artist.name} className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 pl-4">
                                        <Link href={`/music/artist/${encodeURIComponent(artist.name)}`} passHref>
                                            <div className="group flex flex-col items-center text-center gap-2 cursor-pointer">
                                                <div className="relative w-24 h-24 md:w-32 md:h-32">
                                                    <Image src={artist.imageUrl} layout="fill" alt={artist.name} className="rounded-full object-cover transition-all duration-300 group-hover:scale-110" data-ai-hint="artist portrait" />
                                                </div>
                                                <p className="font-semibold text-sm mt-2 truncate w-full">{artist.name}</p>
                                            </div>
                                        </Link>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious className="hidden md:flex"/>
                            <CarouselNext className="hidden md:flex"/>
                        </Carousel>
                    </section>
                )}

                {!error && songs.length === 0 && (
                  <p className="text-center text-muted-foreground pt-8">Loading your music library...</p>
                )}

                <div className="mt-12 text-center text-muted-foreground animate-fade-in-up" style={{ animationDelay: '500ms' }}>
                    <p className="animate-shimmer bg-gradient-to-r from-primary via-foreground to-primary bg-[length:200%_100%] bg-clip-text text-transparent">
                        Music updates in progress…
                    </p>
                    <p className="animate-shimmer bg-gradient-to-r from-primary via-foreground to-primary bg-[length:200%_100%] bg-clip-text text-transparent">
                        Please stay tuned!
                    </p>
                </div>
            </div>
        </CardContent>
      </Card>
    </div>
    </div>
  );
}

function RecentlyPlayedSongItem({ song, index, onPlay }: { song: Song; index: number; onPlay: () => void; }) {
    const imageUrl = getSongImageUrl(song.artist, song.key);
    return (
        <div 
            onClick={onPlay} 
            className="group flex items-center p-2 rounded-md hover:bg-white/10 cursor-pointer transition-colors"
        >
            <div className="flex-shrink-0 flex items-center justify-center w-10 text-center">
                <span className="font-bold text-muted-foreground group-hover:hidden">#{index}</span>
                 <div className="text-white hidden group-hover:flex items-center justify-center">
                    <Play className="h-5 w-5 fill-current" />
                </div>
            </div>
            <Image
                src={imageUrl}
                alt={song.title}
                width={40}
                height={40}
                className="rounded-md ml-4 flex-shrink-0 object-cover aspect-square"
                data-ai-hint="song album cover"
            />
            <div className="ml-4 flex-grow overflow-hidden">
                <p className="font-semibold truncate text-foreground">
                    {cleanSongTitle(song.title, song.artist)}
                </p>
                <p className="text-xs truncate text-muted-foreground">
                    {song.artist}
                </p>
            </div>
        </div>
    );
}

function SongCard({ song, currentSong, onPlay, onPause }: { song: Song; currentSong: Song | null; onPlay: () => void; onPause: () => void; }) {
    const isPlaying = currentSong?.key === song.key;
    const imageUrl = getSongImageUrl(song.artist, song.key, 500);

    const handlePlayPause = () => {
        if (isPlaying) {
            onPause();
        } else {
            onPlay();
        }
    };

    return (
        <div key={song.key} className="group relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-primary/20">
          <Image 
            src={imageUrl} 
            alt={song.title} 
            width={500} 
            height={500} 
            data-ai-hint="song album cover"
            className="aspect-square w-full h-auto object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 flex flex-col p-4">
              <h3 className="truncate text-base md:text-lg font-bold text-white">{cleanSongTitle(song.title, song.artist)}</h3>
              <p className="text-xs md:text-sm text-gray-300">{song.artist}</p>
          </div>
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <button onClick={handlePlayPause} className="text-white transform transition-transform duration-300 group-hover:scale-110">
              <div className="w-12 h-12 md:w-16 md:h-16">
                {isPlaying ? <PauseCircle className="w-full h-full" /> : <PlayCircle className="w-full h-full" />}
              </div>
            </button>
          </div>
           <a href={song.url} download={cleanSongTitle(song.title, song.artist)} className="absolute top-2 right-2 text-white/70 opacity-0 transition-opacity hover:text-white group-hover:opacity-100" onClick={(e) => e.stopPropagation()}>
                <Download size={20} />
           </a>
        </div>
    );
}
