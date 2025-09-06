
'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Music, PlayCircle, Download, AlertTriangle, PauseCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import { Player } from '@/components/music/Player';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import type { Album, Playlist, Song as JioSaavnSong } from '@/lib/jiosaavn';
import { getModules, getAlbumDetails, getPlaylistDetails } from '@/lib/jiosaavn';
import { SongCard as JioSaavnSongCard } from '@/components/music/SongCard';
import { MusicPlayer as JioSaavnPlayer } from '@/components/music/MusicPlayer';
import { SongList as JioSaavnSongList } from '@/components/music/SongList';


interface Song {
  key: string;
  title: string;
  url: string;
  artist: string;
}

interface Artist {
    name: string;
    imageUrl: string;
}

const getArtistFromTitle = (title: string): string => {
  const parts = title.split(' - ');
  return parts.length > 1 ? parts[0].trim() : 'Unknown Artist';
};

export default function MusicPage() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [playlist, setPlaylist] = useState<Song[]>([]);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const [recentlyPlayed, setRecentlyPlayed] = useState<Song[]>([]);

  // State for JioSaavn data
  const [trendingAlbums, setTrendingAlbums] = useState<Album[]>([]);
  const [topPlaylists, setTopPlaylists] = useState<Playlist[]>([]);
  const [currentJioSaavnSong, setCurrentJioSaavnSong] = useState<JioSaavnSong | null>(null);
  const jioSaavnAudioRef = useRef<HTMLAudioElement>(null);
  const [jioSaavnPlaylist, setJioSaavnPlaylist] = useState<JioSaavnSong[]>([]);

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
            setError('No songs found in your R2 bucket. You can still browse trending music.');
            setSongs([]);
        } else {
            const songsWithArtists: Song[] = data.songs.map((song: Omit<Song, 'artist'>) => ({
                ...song,
                artist: getArtistFromTitle(song.title)
            }));
            setSongs(songsWithArtists);
            
            const uniqueArtists = songsWithArtists.reduce((acc, song) => {
                if (!acc.find(a => a.name === song.artist)) {
                    acc.push({
                         name: song.artist,
                         imageUrl: song.artist === 'Lana Del Rey' 
                            ? 'https://raw.githubusercontent.com/Hari5681/hariverse-assets/main/assets/lena%20del%20rey/lena%20del%20rey%20profile.jpg'
                            : `https://picsum.photos/seed/${song.artist}/500/500`
                    });
                }
                return acc;
            }, [] as Artist[]);
            setArtists(uniqueArtists);
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

    const fetchJioSaavnModules = async () => {
        try {
            const modules = await getModules();
            if (modules.albums) {
                setTrendingAlbums(modules.albums);
            }
            if(modules.playlists) {
                setTopPlaylists(modules.playlists);
            }
        } catch(e) {
            console.error("Failed to fetch JioSaavn modules", e);
             toast({
                variant: "destructive",
                title: "Could not load trending music",
                description: "There was an issue fetching data from JioSaavn.",
            })
        }
    }

    fetchR2Songs();
    fetchJioSaavnModules();
  }, [toast]);
  
  const handlePlaySong = (song: Song, songList: Song[]) => {
    setCurrentJioSaavnSong(null);
    setCurrentSong(song);
    setPlaylist(songList);

    const newRecentlyPlayed = [
      song,
      ...recentlyPlayed.filter(s => s.key !== song.key)
    ].slice(0, 10);
    setRecentlyPlayed(newRecentlyPlayed);
    localStorage.setItem('recentlyPlayed', JSON.stringify(newRecentlyPlayed));
  };

  const handlePlayJioSaavnItem = async (item: Album | Playlist | JioSaavnSong) => {
    setCurrentSong(null);
    let songsToPlay: JioSaavnSong[] = [];
  
    try {
      if (item.type === 'song') {
        songsToPlay = [item];
      } else if (item.type === 'album') {
        const albumDetails = await getAlbumDetails(item.id);
        songsToPlay = albumDetails.songs || [];
      } else if (item.type === 'playlist') {
        const playlistDetails = await getPlaylistDetails(item.id);
        songsToPlay = playlistDetails.songs || [];
      }
  
      if (songsToPlay.length > 0) {
        // Since we may not have direct stream URLs for all songs, find the first playable one.
        // For a real app, you'd fetch song details with downloadUrl here.
        // For now, we'll assume the first song is playable.
        const playableSong = songsToPlay.find(s => s.downloadUrl.some(u => u.link));
        if (playableSong) {
            const songWithMediaUrl = {
                ...playableSong,
                media_url: playableSong.downloadUrl.find(u => u.quality === '160kbps' || u.quality === '320kbps')?.link || playableSong.downloadUrl[0].link
            };
            setCurrentJioSaavnSong(songWithMediaUrl);
            setJioSaavnPlaylist(songsToPlay);
        } else {
             toast({ variant: 'destructive', title: 'No playable songs found.' });
        }
      } else {
        toast({ variant: 'destructive', title: 'No songs found in this item.' });
      }
    } catch (e) {
      console.error('Error playing JioSaavn item:', e);
      toast({ variant: 'destructive', title: 'Error loading song', description: 'Could not load the selected music.' });
    }
  };
  
  const handleNext = () => {
    if (!currentSong || playlist.length === 0) return;
    const currentIndex = playlist.findIndex(s => s.key === currentSong.key);
    const nextIndex = (currentIndex + 1) % playlist.length;
    setCurrentSong(playlist[nextIndex]);
  };
  
  const handlePrev = () => {
    if (!currentSong || playlist.length === 0) return;
    const currentIndex = playlist.findIndex(s => s.key === currentSong.key);
    const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    setCurrentSong(playlist[prevIndex]);
  };
  
  const handleJioSaavnNext = () => {
    if (!currentJioSaavnSong || jioSaavnPlaylist.length === 0) return;
    const currentIndex = jioSaavnPlaylist.findIndex(s => s.id === currentJioSaavnSong.id);
    const nextIndex = (currentIndex + 1) % jioSaavnPlaylist.length;
    const nextSong = jioSaavnPlaylist[nextIndex];
    const songWithMediaUrl = {
        ...nextSong,
        media_url: nextSong.downloadUrl.find(u => u.quality === '160kbps' || u.quality === '320kbps')?.link || nextSong.downloadUrl[0].link
    };
    setCurrentJioSaavnSong(songWithMediaUrl);
  };
  
  const handleJioSaavnPrev = () => {
     if (!currentJioSaavnSong || jioSaavnPlaylist.length === 0) return;
    const currentIndex = jioSaavnPlaylist.findIndex(s => s.id === currentJioSaavnSong.id);
    const prevIndex = (currentIndex - 1 + jioSaavnPlaylist.length) % jioSaavnPlaylist.length;
    const prevSong = jioSaavnPlaylist[prevIndex];
    const songWithMediaUrl = {
        ...prevSong,
        media_url: prevSong.downloadUrl.find(u => u.quality === '160kbps' || u.quality === '320kbps')?.link || prevSong.downloadUrl[0].link
    };
    setCurrentJioSaavnSong(songWithMediaUrl);
  };

  const otherSongs = songs.filter(song => song.artist !== 'Lana Del Rey' || !artists.some(a => a.name === 'Lana Del Rey'));

  return (
    <div className="flex min-h-screen flex-col items-center bg-background p-4 pt-20">
      <Card className="w-full max-w-7xl border-none bg-transparent">
        <CardContent className="pb-32">
            {error && (
                <div className="mb-8 flex flex-col items-center justify-center rounded-lg bg-destructive/10 p-6 text-center text-destructive-foreground">
                    <AlertTriangle className="h-10 w-10 text-destructive" />
                    <h3 className="mt-4 text-lg font-semibold">An Error Occurred</h3>
                    <p className="mt-1 text-sm">{error}</p>
                    <p className="mt-2 text-xs opacity-70">Please check your .env file and Cloudflare R2 settings.</p>
                </div>
            )}
            
            <div className="space-y-12">
                 {recentlyPlayed.length > 0 && (
                    <section>
                        <h2 className="text-2xl font-bold mb-4">Recently Played</h2>
                         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                            {recentlyPlayed.map((song) => (
                                <RecentlyPlayedSongCard key={`recent-${song.key}`} song={song} onPlay={() => handlePlaySong(song, recentlyPlayed)} />
                            ))}
                        </div>
                        <Separator className="my-12"/>
                    </section>
                )}

                {trendingAlbums.length > 0 && (
                    <section>
                        <h2 className="text-2xl font-bold mb-4">Trending Albums</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                            {trendingAlbums.map((album) => (
                                <JioSaavnSongCard key={album.id} item={album} onPlay={handlePlayJioSaavnItem} />
                            ))}
                        </div>
                        <Separator className="my-12"/>
                    </section>
                )}

                {topPlaylists.length > 0 && (
                    <section>
                        <h2 className="text-2xl font-bold mb-4">Top Playlists</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                            {topPlaylists.map((playlist) => (
                                <JioSaavnSongCard key={playlist.id} item={playlist} onPlay={handlePlayJioSaavnItem} />
                            ))}
                        </div>
                        <Separator className="my-12"/>
                    </section>
                )}
                
                <h2 className="text-2xl font-bold -mb-8">Your Library</h2>

                {artists.length > 0 && (
                    <section>
                        <h2 className="text-2xl font-bold mb-4">Artists</h2>
                         <Carousel 
                            opts={{ align: "start", loop: artists.length > 5 }} 
                            className="w-full"
                         >
                            <CarouselContent className="-ml-4">
                                {artists.map((artist) => (
                                    <CarouselItem key={artist.name} className="basis-1/3 md:basis-1/4 lg:basis-1/6 pl-4">
                                        <Link href={`/music/artist/${encodeURIComponent(artist.name)}`} passHref>
                                            <div className="group flex flex-col items-center text-center gap-2 cursor-pointer">
                                                <div className="relative w-28 h-28 md:w-32 md:h-32">
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

                {otherSongs.length > 0 && (
                   <section>
                        <Separator className="my-12"/>
                        <h2 className="text-2xl font-bold mb-4">All Songs</h2>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                            {songs.map((song) => (
                                <SongCard key={song.key} song={song} currentSong={currentSong} onPlay={() => handlePlaySong(song, songs)} />
                            ))}
                        </div>
                    </section>
                )}

                {!error && songs.length === 0 && artists.length === 0 && (
                  <p className="text-center text-muted-foreground pt-8">Loading your music library...</p>
                )}
            </div>
        </CardContent>
      </Card>
      
      {currentSong && (
        <Player
          audioRef={audioRef}
          song={currentSong}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      )}
      {currentJioSaavnSong && (
        <JioSaavnPlayer 
            song={currentJioSaavnSong}
            audioRef={jioSaavnAudioRef}
            onNext={handleJioSaavnNext}
            onPrev={handleJioSaavnPrev}
        />
      )}

      <audio ref={audioRef} onEnded={handleNext} />
      <audio ref={jioSaavnAudioRef} onEnded={handleJioSaavnNext} />
    </div>
  );
}

function RecentlyPlayedSongCard({ song, onPlay }: { song: Song; onPlay: () => void; }) {
    return (
        <div onClick={onPlay} className="group cursor-pointer">
            <div className="relative aspect-square w-full overflow-hidden rounded-lg transition-all duration-300 group-hover:scale-105">
                <Image
                    src={`https://picsum.photos/seed/${song.key}/200/200`}
                    alt={song.title}
                    width={200}
                    height={200}
                    className="w-full h-full object-cover"
                    data-ai-hint="song album cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <PlayCircle size={48} className="text-white" />
                </div>
            </div>
            <p className="mt-2 text-sm font-semibold truncate text-foreground">
                {song.title.replace(`${song.artist} - `, '')}
            </p>
        </div>
    );
}


function SongCard({ song, currentSong, onPlay }: { song: Song; currentSong: Song | null; onPlay: () => void; }) {
    const isPlaying = currentSong?.key === song.key;

    return (
        <div key={song.key} className="group relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-primary/20">
          <Image 
            src={`https://picsum.photos/seed/${song.key}/500/500`} 
            alt={song.title} 
            width={500} 
            height={500} 
            data-ai-hint="song album cover"
            className="aspect-square w-full h-auto object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 flex flex-col p-4">
              <h3 className="truncate text-lg font-bold text-white">{song.title.replace(`${song.artist} - `, '')}</h3>
              <p className="text-sm text-gray-300">{song.artist}</p>
          </div>
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <button onClick={onPlay} className="text-white transform transition-transform duration-300 group-hover:scale-110">
                  {isPlaying ? <PauseCircle size={64} /> : <PlayCircle size={64} />}
              </button>
          </div>
           <a href={song.url} download={song.title} className="absolute top-2 right-2 text-white/70 opacity-0 transition-opacity hover:text-white group-hover:opacity-100">
                <Download size={20} />
           </a>
        </div>
    );
}

    