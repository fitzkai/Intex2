import React, { useEffect, useState } from 'react';
import BarNav from '../components/BarNav';
import AuthorizeView from '../components/AuthorizeView';

interface RecommendedMovie {
  movieId: number;
  title: string;
  genres: string[];
  rating: number;
}

const Recommendations: React.FC = () => {
  const [movies, setMovies] = useState<RecommendedMovie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedRecs = localStorage.getItem('recommendations');

    if (storedRecs) {
      try {
        const parsed = JSON.parse(storedRecs);
        setMovies(parsed);
        localStorage.removeItem('recommendations'); // optional: clear after use
      } catch (err) {
        setError('Failed to load your recommendations.');
        console.error(err);
      }
    } else {
      setError('No recommendations found. Please complete the setup form.');
    }

    setLoading(false);
  }, []);

  if (loading) return <p>Loading your recommendations...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <>
      <AuthorizeView>
        <BarNav />
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">
            Your Movie Recommendations
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {movies.map((movie) => (
              <div
                key={movie.movieId}
                className="rounded-xl shadow-md p-4 bg-white"
              >
                <h2 className="text-lg font-semibold">{movie.title}</h2>
                <p className="text-sm text-gray-600">
                  {movie.genres.join(', ')}
                </p>
                <p className="text-sm font-bold mt-2">
                  ⭐ {movie.rating.toFixed(1)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </AuthorizeView>
    </>
  );
};

export default Recommendations;
