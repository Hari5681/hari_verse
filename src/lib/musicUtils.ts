

type HSLColor = { h: number; s: number; l: number };

export interface ArtistTheme {
    color: HSLColor;
    gradient: string;
}

interface ArtistAssets {
    profile?: string;
    banner?: string;
    wallpaper?: string;
    theme: ArtistTheme;
}

const defaultTheme: ArtistTheme = {
    color: { h: 217.2, s: 91.2, l: 59.8 }, // Default primary blue
    gradient: 'linear-gradient(to bottom, hsl(217.2, 91.2%, 20%), hsl(240, 10%, 3.9%))',
};

const artistAssets: Record<string, ArtistAssets> = {
    'lana del rey': {
        profile: 'https://raw.githubusercontent.com/Hari5681/hariverse-assets/main/assets/lana%20del%20rey/lana%20del%20rey%20profile.jpg',
        wallpaper: 'https://raw.githubusercontent.com/Hari5681/hariverse-assets/main/assets/lana%20del%20rey/wallpaper.jpg',
        theme: {
            color: { h: 350, s: 80, l: 60 }, // Vintage Rose
            gradient: 'linear-gradient(to bottom, hsl(350, 80%, 30%), hsl(240, 10%, 3.9%))',
        },
    },
    'the neighbourhood': {
        profile: 'https://raw.githubusercontent.com/Hari5681/hariverse-assets/main/assets/the%20neighbourhood/the%20neighbourhood%20profile.jpeg',
        wallpaper: 'https://raw.githubusercontent.com/Hari5681/hariverse-assets/main/assets/the%20neighbourhood/wallpaper.jpg',
        theme: {
            color: { h: 0, s: 0, l: 80 }, // Grayscale
            gradient: 'linear-gradient(to bottom, hsl(0, 0%, 20%), hsl(240, 10%, 3.9%))',
        },
    },
    'xxx tentacion': {
        profile: 'https://raw.githubusercontent.com/Hari5681/hariverse-assets/main/assets/xxx%20tentacion/images.jpg',
        banner: 'https://raw.githubusercontent.com/Hari5681/hariverse-assets/main/assets/xxx%20tentacion/banner%203.jpg?raw=true',
        wallpaper: 'https://raw.githubusercontent.com/Hari5681/hariverse-assets/main/assets/xxx%20tentacion/wallpaper.jpg',
        theme: {
            color: { h: 210, s: 50, l: 55 }, // Moody Blue
            gradient: 'linear-gradient(to bottom, hsl(210, 50%, 25%), hsl(240, 10%, 3.9%))',
        },
    },
    'nf': {
        wallpaper: 'https://raw.githubusercontent.com/Hari5681/hariverse-assets/main/assets/nf/wallpaper.jpg',
        theme: {
            color: { h: 60, s: 80, l: 60 }, // Yellow
            gradient: 'linear-gradient(to bottom, hsl(60, 80%, 30%), hsl(240, 10%, 3.9%))',
        },
    },
    'billie eilish': {
        profile: 'https://raw.githubusercontent.com/Hari5681/hariverse-assets/main/assets/Billie%20Eilish/biile%20-%20pro.jpg',
        banner: 'https://raw.githubusercontent.com/Hari5681/hariverse-assets/main/assets/Billie%20Eilish/bille%20_%20cover%20.jpg',
        wallpaper: 'https://raw.githubusercontent.com/Hari5681/hariverse-assets/main/assets/billie%20eilish/wallpaper.jpg',
        theme: {
            color: { h: 100, s: 80, l: 60 }, // Green
            gradient: 'linear-gradient(to bottom, hsl(100, 80%, 30%), hsl(240, 10%, 3.9%))',
        },
    },
    'the weeknd': {
        wallpaper: 'https://raw.githubusercontent.com/Hari5681/hariverse-assets/main/assets/the%20weeknd/wallpaper.jpg',
        theme: {
            color: { h: 270, s: 80, l: 60 }, // Violet
            gradient: 'linear-gradient(to bottom, hsl(270, 80%, 30%), hsl(240, 10%, 3.9%))',
        },
    }
};


/**
 * Extracts the artist's name from a song's title (which is often a file path).
 *
 * This function handles two primary cases:
 * 1.  Songs organized in folders by artist (e.g., "Artist Name/Song.mp3").
 * 2.  Songs with the artist in the filename (e.g., "Artist Name - Song.mp3").
 *
 * It also standardizes 'Lena Del Rey' to 'Lana Del Rey'.
 *
 * @param title The full title of the song, typically the file path from the bucket.
 * @returns The extracted artist name, or "Unknown Artist" if one cannot be found.
 */
export const getArtistFromTitle = (title: string): string => {
    if (!title) return 'Unknown Artist';
    const lowerCaseTitle = title.toLowerCase();

    // Standardize artist names first
    if (lowerCaseTitle.includes('xxxtentacion') || lowerCaseTitle.includes('xxx tentacion')) {
        return 'Xxx Tentacion';
    }
    if (lowerCaseTitle.includes('lana del rey') || lowerCaseTitle.includes('lena del rey')) {
        return 'Lana Del Rey';
    }
    if (lowerCaseTitle.includes('the neighbourhood')) {
        return 'The Neighbourhood';
    }
    if (lowerCaseTitle.includes('billie eilish')) {
        return 'Billie Eilish';
    }
    if (lowerCaseTitle.includes('the weeknd')) {
        return 'The Weeknd';
    }
    if (lowerCaseTitle.includes('nf')) {
        return 'NF';
    }

    const parts = title.split('/');
    
    // Case 1: Artist name is the folder name
    if (parts.length > 1 && parts[0].trim() !== '') {
        const artistCandidate = parts[0].trim();
        // Capitalize first letter of each word
        const formattedArtist = artistCandidate.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        return formattedArtist;
    }
    
    // Case 2: Artist is in the filename, e.g., "Artist - Song.mp3"
    const fileName = parts[parts.length - 1] || '';
    const fileNameParts = fileName.split(' - ');
    if (fileNameParts.length > 1) {
        return fileNameParts[0].trim();
    }

    return 'Unknown Artist';
};

/**
 * Cleans up a song title for display by removing artist prefixes, folder paths,
 * and file extensions.
 *
 * @param title The full title of the song (file path).
 * @param artist The name of the artist.
 * @returns A cleaned-up, display-friendly song title.
 */
export const cleanSongTitle = (title: string, artist: string): string => {
    let cleanTitle = title;
    
    // Remove folder path if it exists
    if (cleanTitle.includes('/')) {
        cleanTitle = cleanTitle.split('/').pop() || '';
    }

    // Remove the artist prefix if it exists and the artist is known
    if (artist !== 'Unknown Artist') {
        const artistPrefix = `${artist} - `;
        if (cleanTitle.toLowerCase().startsWith(artistPrefix.toLowerCase())) {
            cleanTitle = cleanTitle.substring(artistPrefix.length);
        }
    }
    
    // Remove file extension and other common text like (Official Video), etc.
    return cleanTitle
        .replace(/\.(mp3|m4a)$/i, '')
        .replace(/\s*\(.*?\)/g, '') // Removes text in parentheses
        .replace(/\[.*?\]/g, '')   // Removes text in square brackets
        .trim();
};


/**
 * Gets the profile image URL for a given artist.
 * @param artistName The name of the artist.
 * @returns A URL for the artist's profile image.
 */
export const getArtistImageUrl = (artistName: string): string => {
    const assets = artistAssets[artistName.toLowerCase()];
    return assets?.profile || `https://picsum.photos/seed/${encodeURIComponent(artistName)}/400/400`;
};

/**
 * Gets the wallpaper image URL for a given artist.
 * @param artistName The name of the artist.
 * @returns A URL for the artist's wallpaper image, or a generic one.
 */
export const getArtistWallpaperUrl = (artistName: string): string => {
    const assets = artistAssets[artistName.toLowerCase()];
    return assets?.wallpaper || `https://picsum.photos/seed/${encodeURIComponent(artistName)}-wallpaper/1920/1080`;
};


/**
 * Gets an image URL for a song. For specific artists, it may return a specific banner.
 * Otherwise, it returns a placeholder image based on the song's key.
 * @param artistName The name of the song's artist.
 * @param songKey A unique key for the song.
 * @param size The desired size of the image (for picsum placeholders).
 * @returns A URL for the song's image.
 */
export const getSongImageUrl = (artistName: string, songKey: string, size: number = 200): string => {
    const lowerArtistName = artistName.toLowerCase();
    const assets = artistAssets[lowerArtistName];
    
    if (assets?.banner) {
        return assets.banner;
    }
    
    return `https://picsum.photos/seed/${songKey}/${size}/${size}`;
};

/**
 * Gets the theme for a given artist.
 * @param artistName The name of the artist.
 * @returns The artist's theme or the default theme.
 */
export const getArtistTheme = (artistName: string): ArtistTheme => {
    const assets = artistAssets[artistName.toLowerCase()];
    return assets?.theme || defaultTheme;
}
