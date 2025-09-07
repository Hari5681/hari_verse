
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const apiKey = process.env.TMDB_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: 'TMDB API key is not configured.' },
      { status: 500 }
    );
  }

  const baseUrl = 'https://api.themoviedb.org/3';
  const commonParams = `api_key=${apiKey}&language=en-US`;

  const detailsUrl = `${baseUrl}/movie/${id}?${commonParams}`;
  const creditsUrl = `${baseUrl}/movie/${id}/credits?${commonParams}`;
  const videosUrl = `${baseUrl}/movie/${id}/videos?${commonParams}`;

  try {
    const [detailsRes, creditsRes, videosRes] = await Promise.all([
      fetch(detailsUrl, { next: { revalidate: 3600 } }), // Revalidate every hour
      fetch(creditsUrl, { next: { revalidate: 3600 } }),
      fetch(videosUrl, { next: { revalidate: 3600 } }),
    ]);

    if (!detailsRes.ok) {
      const errorData = await detailsRes.json();
      throw new Error(errorData.status_message || 'Failed to fetch movie details from TMDB.');
    }
     if (!creditsRes.ok) {
      const errorData = await creditsRes.json();
      throw new Error(errorData.status_message || 'Failed to fetch movie credits from TMDB.');
    }
     if (!videosRes.ok) {
      const errorData = await videosRes.json();
      throw new Error(errorData.status_message || 'Failed to fetch movie videos from TMDB.');
    }

    const details = await detailsRes.json();
    const credits = await creditsRes.json();
    const videos = await videosRes.json();

    // Find the official trailer
    const trailer = videos.results.find(
      (video: any) => video.site === 'YouTube' && video.type === 'Trailer' && video.official
    ) || videos.results.find( // Fallback to any trailer
      (video: any) => video.site === 'YouTube' && video.type === 'Trailer'
    ) || null;
    
    const movieData = {
      ...details,
      cast: credits.cast || [],
      trailer: trailer ? { key: trailer.key } : null,
    };

    return NextResponse.json(movieData);

  } catch (error: any) {
    console.error('TMDB API Error:', error);
    return NextResponse.json(
      { error: error.message || 'An internal server error occurred.' },
      { status: 500 }
    );
  }
}
