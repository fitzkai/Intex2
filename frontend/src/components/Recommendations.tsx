import React, { useEffect, useState } from 'react';

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

const Recommendations: React.FC = () => {
  const [movies, setMovies] = useState<RecommendedMovie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getRecommendations = async () => {
      try {
        const storedPrefs = localStorage.getItem('userPrefs');
        if (!storedPrefs) {
          setError('User preferences not found.');
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

        const transformed: RecommendedMovie[] = [];

        for (const [genre, titles] of Object.entries(genreMap)) {
          for (const title of titles as string[]) {
            const existing = transformed.find((m) => m.title === title);
            if (existing) {
              existing.genres.push(genre);
            } else {
              transformed.push({
                title,
                genres: [genre],
              });
            }
          }
        }

        setMovies(transformed);
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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Recommendations</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {movies.map((movie) => (
          <div className="rounded-xl shadow-md p-4 bg-white">
            <h2 className="text-xl font-semibold">{movie.title}</h2>
            <p className="text-sm text-gray-600">{movie.genres.join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommendations;
