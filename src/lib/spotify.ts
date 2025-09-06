// lib/spotify.ts
import { Buffer } from 'buffer';

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const PLAYLISTS_ENDPOINT = 'https://api.spotify.com/v1/browse/featured-playlists';
const PLAYLIST_ENDPOINT = 'https://api.spotify.com/v1/playlists/';

export interface SpotifyTrack {
  track: {
    id: string;
    name: string;
    artists: { name: string }[];
    duration_ms: number;
  }
}

const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch access token from Spotify: ${response.status} ${errorText}`);
  }

  const data = await response.json();
  return data;
};

export const getFeaturedPlaylists = async () => {
  const { access_token } = await getAccessToken();

  const response = await fetch(`${PLAYLISTS_ENDPOINT}?limit=4`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    cache: 'no-cache',
  });

   if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch featured playlists: ${errorText}`);
  }

  const data = await response.json();
  return data.playlists.items;
};

export const getPlaylist = async (playlistId: string) => {
    const { access_token } = await getAccessToken();

    const response = await fetch(`${PLAYLIST_ENDPOINT}${playlistId}`, {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
        cache: 'no-cache',
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch playlist ${playlistId}: ${errorText}`);
    }

    return response.json();
}
