





const artistAssets: Record<string, { profile?: string; banner?: string }> = {
    'lana del rey': {
        profile: 'https://raw.githubusercontent.com/Hari5681/hariverse-assets/main/assets/lena%20del%20rey/lena%20del%20rey%20profile.jpg'
    },
    'the neighbourhood': {
        profile: 'https://raw.githubusercontent.com/Hari5681/hariverse-assets/main/assets/the%20neighbourhood/the%20neighbourhood%20profile.jpeg'
    },
    'xxx tentacion': {
        profile: 'https://raw.githubusercontent.com/Hari5681/hariverse-assets/main/assets/xxx%20tentacion/images.jpg',
        banner: 'https://raw.githubusercontent.com/Hari5681/hariverse-assets/main/assets/xxx%20tentacion/banner%203.jpg',
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

    // Standardize artist names
    if (lowerCaseTitle.includes('lana del rey') || lowerCaseTitle.includes('lena del rey')) {
        return 'Lana Del Rey';
    }
    if (lowerCaseTitle.includes('the neighbourhood')) {
        return 'The Neighbourhood';
    }
     if (lowerCaseTitle.includes('xxxtentacion')) {
        return 'Xxx Tentacion';
    }

    const parts = title.split('/');
    
    // Case 1: Artist name is the folder name
    if (parts.length > 1 && parts[0].trim() !== '') {
        const artistCandidate = parts[0].trim();
        // Capitalize first letter of each word
        const formattedArtist = artistCandidate.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        if (formattedArtist.toLowerCase() === 'xxxtentacion') return 'Xxx Tentacion';
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
