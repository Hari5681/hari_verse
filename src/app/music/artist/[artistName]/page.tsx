
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Music, Play, MoreHorizontal, Share, UserPlus, AlertTriangle, ArrowLeft, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import PlayingAnimation from '@/components/music/PlayingAnimation';
import { getArtistFromTitle, cleanSongTitle, getArtistImageUrl, getSongImageUrl } from '@/lib/musicUtils';
import { useMusicPlayer } from '@/context/MusicPlayerContext';
import { BannerCarousel } from '@/components/music/BannerCarousel';

interface Song {
  key: string;
  title: string;
  url: string;
  artist: string;
}

const xxxTentacionBanners = [
    'https://raw.githubusercontent.com/Hari5681/hariverse-assets/main/assets/xxx%20tentacion/banner%202.jpg',
    'https://raw.githubusercontent.com/Hari5681/hariverse-assets/main/assets/xxx%20tentacion/banner%203.jpg',
    'https://raw.githubusercontent.com/Hari5681/hariverse-assets/main/assets/xxx%20tentacion/banner%204.jpg',
    'https://raw.githubusercontent.com/Hari5681/hariverse-assets/main/assets/xxx%20tentacion/banner%204.jpg',
]

export default function ArtistPage() {
  const params = useParams();
  const router = useRouter();
  const decodedArtistName = params.artistName ? decodeURIComponent(params.artistName as string) : 'Unknown Artist';
  
  // Standardize artist names
  let artistName = decodedArtistName;
  if (decodedArtistName.toLowerCase() === 'lena del rey') {
    artistName = 'Lana Del Rey';
  } else if (decodedArtistName.toLowerCase() === 'the neighbourhood') {
    artistName = 'The Neighbourhood';
  } else if (decodedArtistName.toLowerCase() === 'xxxtentacion') {
    artistName = 'XXXTentacion';
  }

  const [songs, setSongs] = useState<Song[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const [isFollowing, setIsFollowing] = useState(false);
  
  const { playSong, currentSong, isPlaying } = useMusicPlayer();

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
                .filter((song: Song) => song.artist.toLowerCase() === artistName.toLowerCase());
            
            if (songsWithArtists.length === 0) {
                setError(`No songs found for ${artistName}. Check if the songs are in the correct folder or named correctly.`);
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

    if (artistName && artistName !== 'Unknown Artist') {
      fetchSongs();
    }
  }, [artistName, toast]);

  const handlePlaySong = (song: Song) => {
    playSong(song, songs);
  };

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    toast({
        title: isFollowing ? `Unfollowed ${artistName}` : `Followed ${artistName}`,
        description: isFollowing ? "You'll no longer get updates." : "You'll now get updates from this artist.",
    })
  }

  const handleShare = async () => {
    const shareData = {
        title: `Check out ${artistName} on HariVerse`,
        text: `Listen to ${artistName}'s music on HariVerse!`,
        url: window.location.href
    }
    try {
        if (navigator.share) {
            await navigator.share(shareData);
            toast({ title: 'Shared successfully!' });
        } else {
            await navigator.clipboard.writeText(window.location.href);
            toast({ title: 'Link Copied!', description: 'Artist page URL has been copied to your clipboard.' });
        }
    } catch(err) {
        console.error("Share error:", err);
        toast({
            variant: "destructive",
            title: 'Sharing failed',
            description: 'Could not share at this moment.'
        })
    }
  }

  const artistImageUrl = getArtistImageUrl(artistName);

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/20 to-background p-4 pt-20 pb-40">
      <div className="w-full max-w-7xl mx-auto">
        <header className="relative flex flex-col items-center text-center pt-8">
            <Button variant="ghost" size="icon" className="absolute top-4 left-0 md:left-4" onClick={() => router.push('/music')}>
                <ArrowLeft className="h-6 w-6" />
            </Button>
            <Image 
                src={artistImageUrl}
                alt={artistName}
                width={200}
                height={200}
                data-ai-hint="artist portrait"
                className="rounded-full shadow-2xl w-32 h-32 md:w-48 md:h-48 object-cover"
            />
            <h1 className="text-4xl md:text-7xl font-bold mt-4">{artistName}</h1>
            <p className="text-muted-foreground mt-1 md:mt-2">Digital Creator</p>
            <div className="mt-4 flex items-center justify-center gap-2 md:gap-4 w-full flex-wrap">
                <Button 
                    variant={isFollowing ? 'secondary' : 'outline'}
                    className="rounded-full px-4 md:px-6 text-sm"
                    onClick={handleFollow}
                >
                    {isFollowing ? 'Following' : 'Follow'}
                </Button>
                 <Button variant="ghost" size="icon" onClick={handleShare}>
                    <Share className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-5 w-5" />
                </Button>
            </div>
        </header>

        <main className="mt-8 md:mt-12">
            {artistName.toLowerCase() === 'xxxtentacion' && (
                <div className="mb-8">
                    <BannerCarousel images={xxxTentacionBanners} />
                </div>
            )}
            <h2 className="text-xl md:text-2xl font-bold mb-4">Popular</h2>
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
    </div>
  );
}


function SongListItem({ song, index, isPlaying, onPlay }: { song: Song; index: number; isPlaying: boolean; onPlay: () => void; }) {
    const imageUrl = getSongImageUrl(song.artist, song.key);
    return (
        <div 
            className="flex items-center p-2 rounded-md hover:bg-white/10 cursor-pointer group transition-colors"
        >
            <div 
                className="flex-shrink-0 flex items-center justify-center w-10 text-center text-muted-foreground group-hover:hidden"
                onClick={onPlay}
            >
                {index}
            </div>
            <div 
                className="flex-shrink-0 w-10 text-center text-white hidden group-hover:flex items-center justify-center"
                onClick={onPlay}
            >
                <Play className="h-5 w-5 fill-current" />
            </div>
            <Image 
                src={imageUrl}
                alt={song.title}
                width={40}
                height={40}
                className="rounded-md ml-4 flex-shrink-0 object-cover aspect-square"
                data-ai-hint="song album cover"
                onClick={onPlay}
            />
            <div className="ml-4 flex-grow overflow-hidden" onClick={onPlay}>
                <p className={`font-semibold truncate ${isPlaying ? 'text-green-400' : 'text-white'}`}>
                    {cleanSongTitle(song.title, song.artist)}
                </p>
            </div>
            <div className="text-muted-foreground text-sm mr-4 ml-4">
                {isPlaying ? (
                    <PlayingAnimation />
                ) : (
                    <a 
                        href={song.url} 
                        download={song.title} 
                        className="text-white/70 opacity-0 transition-opacity hover:text-white group-hover:opacity-100"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Download size={20} />
                    </a>
                )}
            </div>
        </div>
    );
}
