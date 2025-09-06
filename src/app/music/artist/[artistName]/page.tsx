
'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Music, Play, MoreHorizontal, Share, UserPlus, AlertTriangle, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

interface Song {
  key: string;
  title: string;
  url: string;
  artist: string;
}

const getArtistFromTitle = (title: string): string => {
  const parts = title.split(' - ');
  return parts.length > 1 ? parts[0].trim() : 'Unknown Artist';
};

const cleanSongTitle = (title: string, artist: string): string => {
    const titleWithoutArtist = title.replace(`${artist} - `, '');
    // Remove common extra text like (Official Music Video)
    return titleWithoutArtist.replace(/\s*\(.*\)/i, '').trim();
}

export default function ArtistPage() {
  const params = useParams();
  const router = useRouter();
  const artistName = params.artistName ? decodeURIComponent(params.artistName as string) : 'Unknown Artist';

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
            setSongs([]);
        } else {
            const songsWithArtists = data.songs
                .map((song: Omit<Song, 'artist'>) => ({
                    ...song,
                    artist: getArtistFromTitle(song.title)
                }))
                .filter((song: Song) => song.artist === artistName);
            
            if (songsWithArtists.length === 0) {
                setError(`No songs found for ${artistName}.`);
            }
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
  }, [artistName, toast]);

  const handlePlaySong = (song: Song) => {
    setCurrentSong(song);
  };
  
  const handlePlayArtistTop = () => {
    if (songs.length > 0) {
        setCurrentSong(songs[0]);
    }
  }

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
    <div className="flex min-h-screen flex-col bg-background p-4 pt-20">
      <div className="w-full max-w-7xl mx-auto">
        <header className="relative flex flex-col items-center md:items-start text-center md:text-left pt-8">
            <Button variant="ghost" size="icon" className="absolute top-4 left-0" onClick={() => router.push('/music')}>
                <ArrowLeft className="h-6 w-6" />
            </Button>
            <Image 
                src="https://raw.githubusercontent.com/Hari5681/hariverse-assets/main/assets/lena%20del%20rey/lena%20del%20rey%20profile.jpg"
                alt={artistName}
                width={200}
                height={200}
                data-ai-hint="artist portrait"
                className="rounded-full shadow-2xl w-40 h-40 md:w-48 md:h-48 object-cover"
            />
            <h1 className="text-5xl md:text-7xl font-bold mt-6">{artistName}</h1>
            <p className="text-muted-foreground mt-2">Digital Creator</p>
            <div className="mt-6 flex items-center gap-4">
                <Button variant="outline" className="rounded-full">
                    <UserPlus className="mr-2 h-4 w-4" /> Follow
                </Button>
                 <Button variant="ghost" size="icon">
                    <Share className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-5 w-5" />
                </Button>
                <Button 
                    size="icon" 
                    className="ml-auto md:ml-8 rounded-full bg-green-500 hover:bg-green-600 w-16 h-16 shadow-lg"
                    onClick={handlePlayArtistTop}
                >
                    <Play className="h-8 w-8 fill-current" />
                </Button>
            </div>
        </header>

        <main className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Popular</h2>
            {error && (
                <div className="flex flex-col items-center justify-center rounded-lg bg-destructive/10 p-6 text-center text-destructive-foreground">
                    <AlertTriangle className="h-10 w-10 text-destructive" />
                    <h3 className="mt-4 text-lg font-semibold">An Error Occurred</h3>
                    <p className="mt-1 text-sm">{error}</p>
                </div>
            )}
            {!error && songs.length > 0 ? (
                <div className="flex flex-col gap-2">
                    {songs.map((song, index) => (
                        <SongListItem
                            key={song.key}
                            song={song}
                            index={index + 1}
                            isPlaying={isPlaying && currentSong?.key === song.key}
                            onPlay={() => handlePlaySong(song)}
                        />
                    ))}
                </div>
            ) : (
             !error && <p className="text-center text-muted-foreground">Loading songs for {artistName}...</p>
            )}
        </main>
      </div>

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


function SongListItem({ song, index, isPlaying, onPlay }: { song: Song; index: number; isPlaying: boolean; onPlay: () => void; }) {
    return (
        <div 
            className="flex items-center p-2 rounded-md hover:bg-white/10 cursor-pointer group transition-colors"
            onClick={onPlay}
        >
            <div className="w-10 text-center text-muted-foreground group-hover:hidden">{index}</div>
            <div className="w-10 text-center text-white hidden group-hover:block">
                <Play className="h-5 w-5 fill-current" />
            </div>
            <Image 
                src={`https://picsum.photos/seed/${song.key}/200/200`}
                alt={song.title}
                width={40}
                height={40}
                className="rounded-md ml-4"
                data-ai-hint="song album cover"
            />
            <div className="ml-4 flex-grow">
                <p className={`font-semibold truncate ${isPlaying ? 'text-green-400' : 'text-white'}`}>
                    {cleanSongTitle(song.title, song.artist)}
                </p>
            </div>
            <div className="text-muted-foreground text-sm mr-4">
                <MoreHorizontal className="h-5 w-5" />
            </div>
        </div>
    );
}
