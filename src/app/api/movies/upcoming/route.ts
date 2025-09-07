
import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.TMDB_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: 'TMDB API key is not configured.' },
      { status: 500 }
    );
  }

  const fetchPage = async (page: number) => {
    const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=${page}`;
    const response = await fetch(url, {
      next: { revalidate: 3600 } // Revalidate every hour
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.status_message || 'Failed to fetch from TMDB.');
    }
    const data = await response.json();
    return data.results.map((movie: any) => ({
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      vote_average: movie.vote_average,
    }));
  };

  try {
    const [page1, page2] = await Promise.all([fetchPage(1), fetchPage(2)]);
    const movies = [...page1, ...page2];

    return NextResponse.json({ movies });
  } catch (error: any) {
    console.error('TMDB API Error:', error);
    return NextResponse.json(
      { error: error.message || 'An internal server error occurred.' },
      { status: 500 }
    );
  }
}
