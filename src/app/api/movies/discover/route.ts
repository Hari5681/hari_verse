
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const apiKey = process.env.TMDB_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: 'TMDB API key is not configured.' },
      { status: 500 }
    );
  }

  const { searchParams } = new URL(req.url);
  const language = searchParams.get('language') || 'en';

  // Construct the URL for the TMDb API
  const url = new URL('https://api.themoviedb.org/3/discover/movie');
  url.searchParams.append('api_key', apiKey);
  url.searchParams.append('language', 'en-US'); // For titles, overviews in English
  url.searchParams.append('sort_by', 'vote_average.desc');
  url.searchParams.append('include_adult', 'false');
  url.searchParams.append('include_video', 'false');
  url.searchParams.append('page', '1');
  url.searchParams.append('vote_count.gte', '1000'); // Ensure movies have a decent number of votes
  url.searchParams.append('with_original_language', language);
  

  try {
    const response = await fetch(url.toString(), {
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.status_message || 'Failed to fetch from TMDB.');
    }

    const data = await response.json();

    const movies = data.results.map((movie: any) => ({
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      vote_average: movie.vote_average,
    }));

    return NextResponse.json({ movies });
  } catch (error: any) {
    console.error('TMDB API Error:', error);
    return NextResponse.json(
      { error: error.message || 'An internal server error occurred.' },
      { status: 500 }
    );
  }
}

