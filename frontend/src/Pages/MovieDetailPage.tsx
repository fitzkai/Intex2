import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import StarRating from '../components/StarRating';
import { useNavigate } from 'react-router-dom';
import AuthorizeView, { AuthorizedUser } from '../components/AuthorizeView';
import Logout from '../components/Logout';
// import '../css/MovieDetailPage.css';
import { motion } from 'framer-motion';
import BarNav from '../components/BarNav';
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
  const navigate = useNavigate();
  const [fadeIn, setFadeIn] = useState(false);
  useEffect(() => {
    setFadeIn(true);
  }, []);
  useEffect(() => {
    fetch(`https://localhost:5000/Movies/MoviesPage/${id}`, {
      credentials: 'include', // important if you're using cookie-based auth
    })
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Fetch failed: ${res.status} - ${text}`);
        }
        return res.json();
      })
      .then((data) => setMovie(data))
      .catch((err) => {
        console.error('❌ Movie fetch failed:', err.message);

        if (err.message.includes('401')) {
          navigate('/login'); // or show a user-friendly message instead
        }
      });
  }, [id]);

  if (!movie) return <p>Loading...</p>;
  return (
    <AuthorizeView>
      <BarNav />
      <div className="d-flex gap-4 align-items-start flex-wrap flex-md-nowrap">
        {/* Poster on the left */}
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
        {/* Info on the right */}
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
          <div style={{ marginTop: '1rem', textAlign: 'center' }}>
            <h3>Description</h3>
            <p style={{ textAlign: 'left' }}>{movie.description}</p>
          </div>
          <div style={{ marginTop: '2rem' }}>
            <h3>Seen this one? Rate it below!</h3>
            <StarRating showId={movie.showId} rating={0} />
          </div>
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
