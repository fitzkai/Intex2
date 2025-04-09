import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import StarRating from '../components/StarRating';
import AuthorizeView from '../components/AuthorizeView';
// import '../css/MovieDetailPage.css';
import { motion } from 'framer-motion';

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

const MovieDetailPage: React.FC = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [recommendedMovies, setRecommendedMovies] = useState<Movie[]>([]);
  const navigate = useNavigate();
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  useEffect(() => {
    fetch(`https://localhost:5000/Movies/MoviesPage/${id}`, {
      credentials: 'include',
    })
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Fetch failed: ${res.status} - ${text}`);
        }
        return res.json();
      })
      .then((data) => {
        setMovie(data);

        // Fetch recommendations by title
        fetch(
          `https://localhost:5000/api/Recommendations/search?title=${encodeURIComponent(data.title)}`
        )
          .then((res) => res.json())
          .then(async (results) => {
            if (results.length > 0) {
              const rec = results[0];

              const titles = [
                rec.cb_Recommendation2,
                rec.cb_Recommendation3,
                rec.cb_Recommendation4,
                rec.cb_Recommendation5,
                rec.cb_Recommendation6,
                rec.cf_Recommendation2,
                rec.cf_Recommendation3,
                rec.cf_Recommendation4,
                rec.cf_Recommendation5,
                rec.cf_Recommendation6,
              ];

              // Fetch full movie data for each title
              const movieFetches = titles.map((title) =>
                fetch(
                  `https://localhost:5000/Movies/Title/${encodeURIComponent(title)}`
                )
                  .then((res) => (res.ok ? res.json() : null))
                  .catch(() => null)
              );

              const recMovies = (await Promise.all(movieFetches)).filter(
                Boolean
              ) as Movie[];
              setRecommendedMovies(recMovies);
            }
          })
          .catch((err) =>
            console.error('Recommendations fetch failed:', err)
          );
      })
      .catch((err) => {
        console.error('Movie fetch failed:', err.message);
        if (err.message.includes('401')) {
          navigate('/login');
        }
      });
  }, [id, navigate]);

  if (!movie) return <p>Loading...</p>;

  return (
    <AuthorizeView>
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
          {recommendedMovies.length > 0 && (
            <div style={{ marginTop: '2rem' }}>
              <h3>Recommended if you liked this</h3>
              <div className="d-flex flex-wrap gap-4 justify-content-start">
                {recommendedMovies.map((recMovie) => (
                  <div
                    key={recMovie.showId}
                    onClick={() => navigate(`/MoviesPage/${recMovie.showId}`)}
                    style={{
                      width: '200px',
                      cursor: 'pointer',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                      transition: 'transform 0.2s ease-in-out',
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = 'scale(1.03)')
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = 'scale(1)')
                    }
                  >
                    <img
                      src={recMovie.imagePath}
                      alt={recMovie.title}
                      style={{
                        width: '100%',
                        height: '300px',
                        objectFit: 'cover',
                      }}
                    />
                    <div style={{ padding: '0.5rem', textAlign: 'center' }}>
                      <h5 style={{ fontSize: '1rem', margin: '0.5rem 0' }}>
                        {recMovie.title}
                      </h5>
                      <p style={{ fontSize: '0.85rem', color: '#666' }}>
                        {recMovie.genre}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

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
    </AuthorizeView>
  );
};

export default MovieDetailPage;
