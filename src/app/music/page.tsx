'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Music, PlayCircle, Download, AlertTriangle, PauseCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';


interface Song {
  key: string;
  title: string;
  url: string;
}

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
            setSongs(data.songs);
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

  return (
    <div className="flex min-h-screen flex-col items-center bg-background p-4 pt-20">
      <Card className="w-full max-w-5xl bg-background/50 backdrop-blur-sm">
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
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {songs.map((song) => (
                        <Card key={song.key} className="group flex flex-col justify-between bg-secondary/30 transition-all hover:bg-secondary/60">
                             <CardHeader className="flex-row items-center justify-between p-4">
                                <p className="font-semibold truncate flex-1">{song.title}</p>
                                <a href={song.url} download={song.title} className="text-primary hover:text-primary/80 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <Download size={20} />
                                </a>
                            </CardHeader>
                            <CardContent className="p-4 pt-0 flex items-center justify-center">
                                <button onClick={() => handlePlayPause(song)} className="text-primary hover:text-primary/80">
                                    {isPlaying && currentSong?.key === song.key ? <PauseCircle size={48} /> : <PlayCircle size={48} />}
                                </button>
                            </CardContent>
                        </Card>
                    ))}
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
