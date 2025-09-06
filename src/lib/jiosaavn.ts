const API_BASE = 'https://saavn.me';

export interface Image {
    quality: '50x50' | '150x150' | '500x500';
    link: string;
}

export interface DownloadUrl {
    quality: '12kbps' | '48kbps' | '96kbps' | '160kbps' | '320kbps';
    link: string;
}

export interface Song {
    id: string;
    name: string;
    title: string;
    type: 'song';
    album: { id: string; name: string; url: string };
    year: string;
    releaseDate: string;
    duration: string;
    label: string;
    primaryArtists: string;
    primaryArtistsId: string;
    featuredArtists: string;
    featuredArtistsId: string;
    explicitContent: number;
    playCount: number;
    language: string;
    hasLyrics: boolean;
    url: string;
    copyright: string;
    image: Image[];
    downloadUrl: DownloadUrl[];
    media_url?: string;
}

export interface Album {
    id: string;
    name: string;
    title: string;
    type: 'album';
    year: string;
    playCount: number;
    language: string;
    explicitContent: boolean;
    songCount: number;
    url: string;
    image: Image[];
    songs?: Song[];
    subtitle?: string;
    description?: string;
}

export interface Playlist {
    id: string;
    title: string;
    name: string;
    type: 'playlist';
    subtitle: string;
    url: string;
    image: Image[];
    songCount: number;
    explicitContent: boolean;
    firstname: string;
    followerCount: number;
    lastUpdated: number;
    description?: string;
}

export const getModules = async () => {
  const response = await fetch(`${API_BASE}/modules?language=hindi,english`);
  if (!response.ok) {
    throw new Error('Failed to fetch modules');
  }
  const json = await response.json();
  return json.data;
};

export const searchSongs = async (query: string) => {
    const response = await fetch(`${API_BASE}/search/songs?query=${encodeURIComponent(query)}&limit=10`);
    if (!response.ok) {
        throw new Error('Failed to search songs');
    }
    const json = await response.json();
    return json.data;
};

export const getAlbumDetails = async (albumId: string) => {
    const response = await fetch(`${API_BASE}/albums?id=${albumId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch album details');
    }
    const json = await response.json();
    return json.data;
};

export const getPlaylistDetails = async (playlistId: string) => {
    const response = await fetch(`${API_BASE}/playlists?id=${playlistId}`);
     if (!response.ok) {
        throw new Error('Failed to fetch playlist details');
    }
    const json = await response.json();
    return json.data;
}
