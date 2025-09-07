
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
  // Appending credits, videos, and images to the main movie details request
  const commonParams = `api_key=${apiKey}&language=en-US&append_to_response=credits,videos,images`;

  const detailsUrl = `${baseUrl}/movie/${id}?${commonParams}`;

  try {
    const detailsRes = await fetch(detailsUrl, { next: { revalidate: 3600 } }); // Revalidate every hour

    if (!detailsRes.ok) {
      const errorData = await detailsRes.json();
      throw new Error(errorData.status_message || 'Failed to fetch movie details from TMDB.');
    }
    
    const details = await detailsRes.json();

    // Find the official trailer
    const trailer = details.videos?.results.find(
      (video: any) => video.site === 'YouTube' && video.type === 'Trailer' && video.official
    ) || details.videos?.results.find( // Fallback to any trailer
      (video: any) => video.site === 'YouTube' && video.type === 'Trailer'
    ) || null;
    
    const movieData = {
      ...details,
      cast: details.credits?.cast || [],
      crew: details.credits?.crew || [],
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
