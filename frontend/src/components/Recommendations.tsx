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

interface GroupedByGenre {
  [genre: string]: RecommendedMovie[];
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
    <div className="p-6 bg-gradient-to-br from-indigo-900 to-blue-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6">Your Recommendations</h1>

      {Object.entries(movies).map(([genre, movieList]) => (
        <div key={genre} className="mb-8">
          <h2 className="text-xl font-semibold mb-2">{genre}</h2>
          <div className="flex overflow-x-auto space-x-4 pb-2 w-full">
            {movieList.map((movie, index) => (
              <div
                key={index}
                className="min-w-[200px] max-w-[200px] flex-shrink-0 bg-white text-black rounded-lg shadow-md p-4"
              >
                <h3 className="font-semibold text-lg">{movie.title}</h3>
                <p className="text-sm text-gray-600">
                  {movie.genres.join(', ')}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Recommendations;
