'use client';

import { useState, useEffect, useRef } from 'react';
import { getModules, searchSongs, getAlbumDetails, getPlaylistDetails } from '@/lib/jiosaavn';
import type { Song, Album, Playlist } from '@/lib/jiosaavn';
import { SongCard } from '@/components/music/SongCard';
import { SongList } from '@/components/music/SongList';
import { MusicPlayer } from '@/components/music/MusicPlayer';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export default function MusicPage() {
  const [modules, setModules] = useState<any>(null);
  const [searchResults, setSearchResults] = useState<Song[]>([]);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [playlist, setPlaylist] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    async function fetchModules() {
      try {
        const data = await getModules();
        setModules(data);
      } catch (error) {
        console.error("Failed to fetch modules:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchModules();
  }, []);
  
  useEffect(() => {
    // Create a shared audio element
    if (!audioRef.current) {
        audioRef.current = new Audio();
    }
    // Set up ended event listener to play next song
    const handleSongEnd = () => handleNext();
    audioRef.current.addEventListener('ended', handleSongEnd);
    return () => {
        if (audioRef.current) {
            audioRef.current.removeEventListener('ended', handleSongEnd);
        }
    };
  }, []);

  const handleSearch = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setIsLoading(true);
      const query = e.currentTarget.value;
      if (query) {
        const results = await searchSongs(query);
        setSearchResults(results.results);
      } else {
        setSearchResults([]);
      }
      setIsLoading(false);
    }
  };

  const playSong = (song: Song, context: Song[]) => {
    // Filter out songs without a valid streaming link
    const playableSong = { ...song, media_url: song.downloadUrl.find(q => q.quality === '160kbps' || q.quality === '320kbps')?.link };
    if (playableSong.media_url) {
      setCurrentSong(playableSong);
      setPlaylist(context);
    } else {
        console.warn('No playable media URL found for this song.');
        // Optionally, play the next available song
        handleNext();
    }
  };
  
  const handlePlayItem = async (item: Album | Playlist | Song) => {
    let songs: Song[] = [];
    if (item.type === 'song') {
        songs = [item];
    } else if (item.type === 'album') {
        const albumDetails = await getAlbumDetails(item.id);
        songs = albumDetails.songs || [];
    } else if (item.type === 'playlist') {
        const playlistDetails = await getPlaylistDetails(item.id);
        songs = playlistDetails.songs || [];
    }

    if (songs.length > 0) {
        const firstPlayable = songs.find(s => s.downloadUrl.some(q => q.quality === '160kbps' || q.quality === '320kbps'));
        if (firstPlayable) {
            playSong(firstPlayable, songs);
        }
    }
  };

  const handleNext = () => {
    if (!currentSong || playlist.length === 0) return;
    const currentIndex = playlist.findIndex(s => s.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % playlist.length;
    playSong(playlist[nextIndex], playlist);
  };

  const handlePrev = () => {
    if (!currentSong || playlist.length === 0) return;
    const currentIndex = playlist.findIndex(s => s.id === currentSong.id);
    const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    playSong(playlist[prevIndex], playlist);
  };
  
  const renderSection = (title: string, data: (Album | Playlist | Song)[]) => (
    <section className="mb-12">
      <h2 className="text-3xl font-bold mb-6">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {data.map((item) => (
          <SongCard key={item.id} item={item} onPlay={handlePlayItem} />
        ))}
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-background text-foreground pt-24 pb-32">
        <div className="container mx-auto px-4">
            <header className="mb-12">
                <h1 className="text-5xl font-extrabold tracking-tight mb-4">HariVerse Music 🎶</h1>
                <div className="relative max-w-lg mx-auto">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input 
                        type="text"
                        placeholder="Search for songs, artists, or albums..."
                        className="w-full bg-background/50 backdrop-blur-sm rounded-full pl-12 pr-4 h-12 text-lg"
                        onKeyDown={handleSearch}
                    />
                </div>
            </header>

            <main>
              {isLoading ? (
                  <div className="text-center">Loading music...</div>
              ) : searchResults.length > 0 ? (
                  <SongList songs={searchResults} onPlay={playSong} />
              ) : (
                  modules && (
                      <>
                          {modules.trending && renderSection('Trending Now', modules.trending.albums)}
                          {modules.playlists && renderSection('Top Playlists', modules.playlists)}
                          {modules.albums && renderSection('New Albums', modules.albums)}
                      </>
                  )
              )}
            </main>
        </div>
        {currentSong && audioRef && (
            <MusicPlayer 
                song={currentSong} 
                audioRef={audioRef}
                onNext={handleNext}
                onPrev={handlePrev}
            />
        )}
    </div>
  );
}
