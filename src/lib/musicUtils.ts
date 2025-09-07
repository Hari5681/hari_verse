
/**
 * Extracts the artist's name from a song's title (which is often a file path).
 *
 * This function handles two primary cases:
 * 1.  Songs organized in folders by artist (e.g., "Artist Name/Song.mp3").
 * 2.  Songs with the artist in the filename (e.g., "Artist Name - Song.mp3").
 *
 * @param title The full title of the song, typically the file path from the bucket.
 * @returns The extracted artist name, or "Unknown Artist" if one cannot be found.
 */
export const getArtistFromTitle = (title: string): string => {
    if (!title) return 'Unknown Artist';

    const parts = title.split('/');
    
    // Case 1: Artist name is the folder name
    if (parts.length > 1) {
        const artistCandidate = parts[0].trim();
        // Capitalize first letter of each word for better display
        return artistCandidate.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }
    
    // Case 2: Artist is in the filename, e.g., "Artist - Song.mp3"
    const fileName = parts[0] || '';
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
    
    // Remove file extension and other common text
    return cleanTitle
        .replace(/\.(mp3|m4a)$/i, '')
        .replace(/\s*\(.*\)/i, '') // Removes text in parentheses like (Official Video)
        .trim();
}
