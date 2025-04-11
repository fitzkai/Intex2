import React, { useEffect, useState } from 'react';
import '../css/recommendations.css'
import AuthorizeView from './AuthorizeView';
import BarNav from './BarNav';

interface RecommendedMovie {
  title: string;
  genres: string[];
}

interface UserPrefs {
  age: number;
  gender: string;
  platforms: {
    [platform: string]: number;
  };
  genres: string[];
}

interface GroupedByGenre {
  [genre: string]: RecommendedMovie[];
}

function sanitizeFileName(title: string): string {
  return title.replace(/[^\p{L}\p{Nd} ]+/gu, '');
}

const Recommendations: React.FC = () => {
  const [movies, setMovies] = useState<GroupedByGenre>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getRecommendations = async () => {
      try {
        const storedPrefs = localStorage.getItem('userPrefs');
        if (!storedPrefs) {
          setError('Sign in to see recommendations!');
          return;
        }

        const preferences: UserPrefs = JSON.parse(storedPrefs);

        const response = await fetch(
          'https://flaskapi-fi03.onrender.com/recommendations',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(preferences),
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch recommendations.');
        }

        const data = await response.json();
        const genreMap = data.recommendations;

        const grouped: GroupedByGenre = {};

        for (const [genre, titles] of Object.entries(genreMap)) {
          for (const title of titles as string[]) {
            if (!grouped[genre]) {
              grouped[genre] = [];
            }

            const exists = grouped[genre].some((m) => m.title === title);
            if (!exists) {
              grouped[genre].push({
                title,
                genres: [genre],
              });
            }
          }
        }

        setMovies(grouped);
      } catch (err: any) {
        console.error(err);
        setError('Something went wrong fetching recommendations.');
      } finally {
        setLoading(false);
      }
    };

    getRecommendations();
  }, []);

  if (loading) return <p>Loading your recommendations...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <AuthorizeView>
    <BarNav />
      <div className="recommendations-page">
        <h1 className="page-title">Recommended For You</h1>

        {Object.entries(movies).map(([genre, movieList]) => (
          <div key={genre} className="genre-section">
            <h2 className="genre-title">{genre}</h2>
            <div className="movie-carousel">
              {movieList.map((movie, index) => (
                <div key={index} className="movie-card">
                  <img
                    src={`https://moviepostersintex48.blob.core.windows.net/movieposters/${encodeURIComponent(sanitizeFileName(movie.title))}.jpg`}
                    alt={movie.title}
                  />
                  <h3 className="movie-title">{movie.title}</h3>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </AuthorizeView>
  );
};

export default Recommendations;
