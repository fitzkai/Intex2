import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import StarRating from '../components/StarRating';
// import AuthorizeView from '../components/AuthorizeView';
import { motion } from 'framer-motion';
import { RecommendationRow } from '../types/Movie';

interface Movie {
  showId: string;
  title: string;
  type: string;
  director: string;
  cast: string;
  releaseYear: string;
  country: string;
  rating: string;
  duration: string;
  description: string;
  genre: string;
  imagePath: string;
}

interface RecommendedMovie {
  title: string;
}

const MovieDetailPage: React.FC = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [recommendedMovies, setRecommendedMovies] = useState<
    RecommendedMovie[]
  >([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;

    // Fetch movie details
    fetch(
      `https://intex2-4-8-backend-bkh8h0caezhmfhcj.eastus-01.azurewebsites.net/Movies/MoviesPage/${id}`
      // {
      //   credentials: 'include',
      // }
    )
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Fetch failed: ${res.status} - ${text}`);
        }
        return res.json();
      })
      .then((data) => {
        setMovie(data);
        console.log('Movie ID:', data.showId);

        // Fetch recommendations by showId
        fetch(
          `https://intex2-4-8-backend-bkh8h0caezhmfhcj.eastus-01.azurewebsites.net/api/Recommendations/${data.showId}`
        )
          .then((res) => res.json())
          .then((rec: RecommendationRow) => {
            const recommendedList: RecommendedMovie[] = [];

            for (let i = 1; i <= 10; i++) {
              const key = `recommendation${i}` as keyof RecommendationRow;
              const title = rec[key];
              if (title) {
                recommendedList.push({ title: String(title) });
              }
            }

            setRecommendedMovies(recommendedList);
            console.log('Recommended movies:', recommendedList);
          });
      });
  }, [id, navigate]);

  if (!movie) return <p>Loading...</p>;

  return (
    // <AuthorizeView>
    <div className="d-flex gap-4 align-items-start flex-wrap flex-md-nowrap">
      {/* Poster */}
      <motion.div
        layoutId={`movie-${movie.showId}`}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.4 }}
        style={{ flex: '0 0 350px', maxWidth: '350px' }}
      >
        <img
          src={movie.imagePath}
          alt={movie.title}
          style={{
            width: '100%',
            height: 'auto',
            maxHeight: '500px',
            objectFit: 'cover',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            marginBottom: '1rem',
          }}
        />
      </motion.div>

      {/* Info */}
      <div style={{ flex: '1 1 auto' }}>
        <h1 style={{ marginBottom: '0.5rem' }}>{movie.title}</h1>
        <p style={{ fontStyle: 'italic', color: '#777' }}>{movie.type}</p>
        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            lineHeight: '1.6',
            textAlign: 'left',
          }}
        >
          <li>
            <strong>Director:</strong> {movie.director}
          </li>
          <li>
            <strong>Cast:</strong>{' '}
            {movie.cast?.match(/\b[A-Z][a-z]+\s[A-Z][a-z]+\b/g)?.join(', ') ??
              movie.cast}
          </li>
          <li>
            <strong>Year:</strong> {movie.releaseYear}
          </li>
          <li>
            <strong>Country:</strong> {movie.country}
          </li>
          <li>
            <strong>Rating:</strong> {movie.rating}
          </li>
          <li>
            <strong>Duration:</strong> {movie.duration}
          </li>
          <li>
            <strong>Genre:</strong> {movie.genre}
          </li>
        </ul>

        {/* Description */}
        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          <h3>Description</h3>
          <p style={{ textAlign: 'left' }}>{movie.description}</p>
        </div>

        {/* Star Rating */}
        <div style={{ marginTop: '2rem' }}>
          <h3>Seen this one? Rate it below!</h3>
          <StarRating showId={movie.showId} rating={0} />
        </div>

        {/* Recommended Movies */}
        <div style={{ marginTop: '2rem' }}>
          <h3>You might like...</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
            {recommendedMovies.map((rec, index) => (
              <div key={index} style={{ width: '180px', textAlign: 'center' }}>
                <div
                  style={{
                    width: '100%',
                    height: '250px',
                    backgroundColor: '#f2f2f2',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#aaa',
                    fontStyle: 'italic',
                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                    marginBottom: '0.5rem',
                  }}
                >
                  image coming soon
                </div>
                <strong>{rec.title}</strong>
              </div>
            ))}
          </div>
        </div>

        {/* Back Button */}
        <button
          style={{
            marginTop: '2rem',
            padding: '0.5rem 1rem',
            borderRadius: '5px',
            backgroundColor: '#007BFF',
            color: '#fff',
            border: 'none',
          }}
          onClick={() => navigate('/MoviesPage')}
        >
          Back to Movies
        </button>
      </div>
    </div>
    // </AuthorizeView>
  );
};

export default MovieDetailPage;
