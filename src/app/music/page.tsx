'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Music, PlayCircle, Download } from 'lucide-react';

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

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch('/api/music');
        if (!response.ok) {
          throw new Error('Failed to fetch songs');
        }
        const data = await response.json();
        setSongs(data.songs);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSongs();
  }, []);
  
  const handlePlay = (song: Song) => {
    if (currentSong?.key === song.key) {
      if (isPlaying) {
        audioRef.current?.pause();
        setIsPlaying(false);
      } else {
        audioRef.current?.play();
        setIsPlaying(true);
      }
    } else {
      setCurrentSong(song);
      if (audioRef.current) {
        audioRef.current.src = song.url;
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };
  
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const handlePlayEvent = () => setIsPlaying(true);
    const handlePauseEvent = () => setIsPlaying(false);
    
    audio.addEventListener('play', handlePlayEvent);
    audio.addEventListener('pause', handlePauseEvent);
    
    return () => {
      audio.removeEventListener('play', handlePlayEvent);
      audio.removeEventListener('pause', handlePauseEvent);
    }
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center bg-background p-4 pt-20">
      <Card className="w-full max-w-4xl bg-background/50 backdrop-blur-sm">
        <CardHeader className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Music className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="mt-4 text-3xl font-bold">HariVerse Music</CardTitle>
          <p className="text-muted-foreground">Your personal collection from Cloudflare R2</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {songs.length > 0 ? (
              songs.map((song) => (
                <div key={song.key} className="flex items-center justify-between rounded-lg bg-secondary/30 p-4 transition-all hover:bg-secondary/60">
                  <p className="font-semibold">{song.title}</p>
                  <div className="flex items-center gap-4">
                    <button onClick={() => handlePlay(song)} className="text-primary hover:text-primary/80">
                      <PlayCircle size={28} />
                    </button>
                    <a href={song.url} download={song.title} className="text-primary hover:text-primary/80">
                      <Download size={24} />
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-muted-foreground">Loading songs or no songs found in bucket.</p>
            )}
          </div>
        </CardContent>
      </Card>
      {currentSong && (
        <footer className="fixed bottom-0 left-0 right-0 z-50 mt-8 flex w-full flex-col items-center justify-center border-t border-border bg-background/80 p-4 backdrop-blur-sm">
           <p className="text-sm text-center font-bold mb-2">{currentSong.title}</p>
           <audio controls autoPlay ref={audioRef} src={currentSong.url} className="w-full max-w-2xl">
              Your browser does not support the audio element.
           </audio>
        </footer>
      )}
    </div>
  );
}
