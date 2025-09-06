'use client';

import { useState, useEffect } from "react";

export default function MusicPage() {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);

  // Fetch Trending / Recommended on page load
  useEffect(() => {
    fetch("https://saavn.me/modules?language=hindi")
      .then((res) => res.json())
      .then((data) => {
        // Flatten modules into song list
        const trending = [];
        if (data.data.trending && data.data.trending.albums) {
            trending.push(...data.data.trending.albums);
        }
         if (data.data.playlists) {
            trending.push(...data.data.playlists);
        }
        setSongs(trending);
      });
  }, []);

  // Search function
  async function searchSongs(query) {
    const res = await fetch(`https://saavn.me/search/songs?query=${encodeURIComponent(query)}`);
    const data = await res.json();
    setSongs(data.data.results);
  }

  const handlePlay = (song) => {
    if (song.type === 'song') {
        const quality = song.downloadUrl.find(q => q.quality === '320kbps') || song.downloadUrl.find(q => q.quality === '160kbps') || song.downloadUrl[0];
        if (quality) {
            setCurrentSong({ ...song, media_url: quality.link });
        }
    }
    // Note: Playing entire albums/playlists would require fetching their details first.
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col pt-16">
      {/* Header */}
      <header className="p-4 flex justify-between items-center bg-black shadow-lg">
        <h1 className="text-2xl font-bold text-green-400">🎶 HariVerse Music</h1>
        <input
          type="text"
          placeholder="Search songs..."
          className="p-2 rounded text-black w-1/3 bg-gray-200"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
                const target = e.target as HTMLInputElement;
                if (target.value.trim()) {
                    searchSongs(target.value);
                }
            }
          }}
        />
      </header>

      {/* Songs Grid */}
      <main className="flex-1 p-4 overflow-y-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {songs.map((song) => (
            <div
              key={song.id}
              className="bg-gray-800 p-3 rounded-lg shadow-lg hover:scale-105 hover:bg-gray-700 transition cursor-pointer"
              onClick={() => handlePlay(song)}
            >
              <img
                src={song.image[2]?.link || song.image[1]?.link || song.image[0]?.link}
                alt={song.title || song.name}
                className="rounded-lg w-full aspect-square object-cover"
              />
              <h3 className="text-md mt-2 font-bold truncate">{song.title || song.name}</h3>
              <p className="text-sm text-gray-400 truncate" dangerouslySetInnerHTML={{ __html: song.primaryArtists || song.subtitle || '' }}></p>
            </div>
          ))}
        </div>
      </main>

      {/* Bottom Player */}
      {currentSong && (
        <footer className="bg-black/80 backdrop-blur-md p-4 flex items-center justify-between fixed bottom-0 w-full shadow-2xl border-t border-gray-700">
          <div className="flex items-center gap-4">
            <img
              src={currentSong.image[1]?.link}
              alt={currentSong.name}
              className="w-14 h-14 rounded"
            />
            <div>
              <h3 className="font-semibold">{currentSong.name}</h3>
              <p className="text-sm text-gray-400" dangerouslySetInnerHTML={{ __html: currentSong.primaryArtists }}></p>
            </div>
          </div>
          <audio
            controls
            autoPlay
            src={currentSong.media_url}
            className="w-1/2"
          ></audio>
        </footer>
      )}
    </div>
  );
}
