import React, { useEffect, useState } from 'react';
import { fetchRecommendations, RecommendedMovie } from '../api/recommender';

const Recommendations: React.FC = () => {
  const [movies, setMovies] = useState<RecommendedMovie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Replace this with real user preferences from auth/context later
  const userPreferences = {
    age: 28,
    gender: 'female',
    platforms: ['Netflix', 'Hulu'],
    genres: ['Action', 'Romance'],
  };

  useEffect(() => {
    const getRecommendations = async () => {
      try {
        const recs = await fetchRecommendations(userPreferences);
        setMovies(recs);
      } catch (err) {
        setError('Something went wrong fetching recommendations.');
        console.error(err);
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
          <div
            key={movie.showId}
            className="rounded-xl shadow-md p-4 bg-white"
          >
            <h2 className="text-xl font-semibold">{movie.title}</h2>
            <p className="text-sm text-gray-600">{movie.genres.join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommendations;
