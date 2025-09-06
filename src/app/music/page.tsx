
'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Music, PlayCircle, Download, AlertTriangle, PauseCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface Song {
  key: string;
  title: string;
  url: string;
  artist: string;
}

// Simple parser to extract artist from title like "Artist - Song"
const getArtistFromTitle = (title: string): string => {
  const parts = title.split(' - ');
  return parts.length > 1 ? parts[0].trim() : 'Unknown Artist';
};


export default function MusicPage() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        setError(null);
        const response = await fetch('/api/music');
        const data = await response.json();
        
        if (!response.ok) {
           throw new Error(data.error || 'Failed to fetch songs');
        }

        if (!data.songs || data.songs.length === 0) {
            setError('No songs found. Please upload .mp3 files to your R2 bucket.');
            setSongs([]);
        } else {
            const songsWithArtists = data.songs.map((song: Omit<Song, 'artist'>) => ({
                ...song,
                artist: getArtistFromTitle(song.title)
            }));
            setSongs(songsWithArtists);
        }
      } catch (error: any) {
        console.error("Fetch songs error:", error);
        const errorMessage = error.message || 'An unexpected error occurred while fetching songs.';
        setError(errorMessage);
        toast({
            variant: "destructive",
            title: "Error Fetching Music",
            description: errorMessage,
        })
      }
    };

    fetchSongs();
  }, [toast]);
  
  const handlePlayPause = (song: Song) => {
    if (currentSong?.key === song.key) {
      if (isPlaying) {
        audioRef.current?.pause();
      } else {
        audioRef.current?.play();
      }
    } else {
      setCurrentSong(song);
    }
  };
  
  useEffect(() => {
    if (currentSong && audioRef.current) {
        const audio = audioRef.current;
        audio.src = currentSong.url;
        audio.play().catch(e => {
            console.error("Error playing audio:", e);
            const errorMessage = (e as Error).message || "The selected song could not be played.";
            setError(errorMessage);
            toast({
                variant: "destructive",
                title: "Playback Error",
                description: errorMessage,
            });
        });
    }
  }, [currentSong, toast]);
  
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const handlePlayEvent = () => setIsPlaying(true);
    const handlePauseEvent = () => setIsPlaying(false);
    const handleEndedEvent = () => setIsPlaying(false);
    
    audio.addEventListener('play', handlePlayEvent);
    audio.addEventListener('pause', handlePauseEvent);
    audio.addEventListener('ended', handleEndedEvent);
    
    return () => {
      audio.removeEventListener('play', handlePlayEvent);
      audio.removeEventListener('pause', handlePauseEvent);
      audio.removeEventListener('ended', handleEndedEvent);
    }
  }, []);

  const lanaDelReySongs = songs.filter(song => song.artist === 'Lana Del Rey');
  const otherSongs = songs.filter(song => song.artist !== 'Lana Del Rey');

  return (
    <div className="flex min-h-screen flex-col items-center bg-background p-4 pt-20">
      <Card className="w-full max-w-7xl bg-transparent border-none">
        <CardHeader className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Music className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="mt-4 text-3xl font-bold">HariVerse Music</CardTitle>
          <p className="text-muted-foreground">Your personal collection from Cloudflare R2</p>
        </CardHeader>
        <CardContent>
            {error && (
                <div className="flex flex-col items-center justify-center rounded-lg bg-destructive/10 p-6 text-center text-destructive-foreground">
                    <AlertTriangle className="h-10 w-10 text-destructive" />
                    <h3 className="mt-4 text-lg font-semibold">An Error Occurred</h3>
                    <p className="mt-1 text-sm">{error}</p>
                    <p className="mt-2 text-xs opacity-70">Please check your .env file, Cloudflare R2 settings, and ensure songs are uploaded.</p>
                </div>
            )}
            {!error && songs.length > 0 ? (
                <div className="space-y-12">
                    {lanaDelReySongs.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-bold mb-4">Artists</h2>
                             <Dialog>
                                <DialogTrigger asChild>
                                    <Card className="bg-card/50 cursor-pointer transition-all hover:shadow-primary/20 hover:scale-[1.02]">
                                        <CardHeader>
                                            <div className="flex items-center gap-4">
                                                <Image src="https://raw.githubusercontent.com/Hari5681/hariverse-assets/main/assets/lena%20del%20rey/lena%20del%20rey%20profile.jpg" width={100} height={100} alt="Lana Del Rey" className="rounded-full" data-ai-hint="artist portrait" />
                                                <div>
                                                    <CardTitle className="text-2xl">Lana Del Rey</CardTitle>
                                                    <p className="text-muted-foreground">Featured Artist</p>
                                                </div>
                                            </div>
                                        </CardHeader>
                                    </Card>
                                </DialogTrigger>
                                <DialogContent className="max-w-4xl bg-background/90 backdrop-blur-sm">
                                    <DialogHeader>
                                        <DialogTitle className="text-2xl">Lana Del Rey's Songs</DialogTitle>
                                    </DialogHeader>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-4 max-h-[60vh] overflow-y-auto">
                                        {lanaDelReySongs.map((song) => (
                                            <SongCard key={song.key} song={song} isPlaying={isPlaying} currentSong={currentSong} onPlayPause={handlePlayPause} />
                                        ))}
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </section>
                    )}

                    {otherSongs.length > 0 && (
                       <section>
                            <Separator className="my-12"/>
                            <h2 className="text-2xl font-bold mb-4">All Songs</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                                {otherSongs.map((song) => (
                                    <SongCard key={song.key} song={song} isPlaying={isPlaying} currentSong={currentSong} onPlayPause={handlePlayPause} />
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            ) : (
             !error && <p className="text-center text-muted-foreground">Loading songs...</p>
            )}
        </CardContent>
      </Card>
      {currentSong && (
        <footer className="fixed bottom-0 left-0 right-0 z-50 mt-8 flex w-full flex-col items-center justify-center border-t border-border bg-background/80 p-4 backdrop-blur-sm">
           <p className="text-sm text-center font-bold mb-2">{currentSong.title}</p>
           <audio controls autoPlay ref={audioRef} className="w-full max-w-2xl">
              Your browser does not support the audio element.
           </audio>
        </footer>
      )}
    </div>
  );
}


function SongCard({ song, isPlaying, currentSong, onPlayPause }: { song: Song; isPlaying: boolean; currentSong: Song | null; onPlayPause: (song: Song) => void; }) {
    return (
        <div key={song.key} className="group relative rounded-2xl overflow-hidden shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-primary/20">
          <Image 
            src={`https://picsum.photos/seed/${song.key}/500/500`} 
            alt={song.title} 
            width={500} 
            height={500} 
            data-ai-hint="song album cover"
            className="w-full h-auto object-cover aspect-square"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-end p-4">
              <h3 className="font-bold text-lg text-white truncate">{song.title.replace(`${song.artist} - `, '')}</h3>
              <p className="text-sm text-gray-300">{song.artist}</p>
          </div>
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button onClick={() => onPlayPause(song)} className="text-white transform transition-transform duration-300 group-hover:scale-110">
                  {isPlaying && currentSong?.key === song.key ? <PauseCircle size={64} /> : <PlayCircle size={64} />}
              </button>
          </div>
           <a href={song.url} download={song.title} className="absolute top-2 right-2 text-white/70 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Download size={20} />
           </a>
        </div>
    );
}

    