import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import StarRating from '../components/StarRating';
import { useNavigate } from 'react-router-dom';
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
  useEffect(() => {
    fetch(`https://localhost:5000/Movies/MoviesPage/${id}`)
      .then((res) => res.json())
      .then((data) => setMovie(data))
      .catch((err) => console.error(err));
  }, [id]);
  if (!movie) return <p>Loading...</p>;
  return (
    <div
      style={{
        display: 'flex',
        gap: '2rem',
        padding: '2rem',
        maxWidth: '1500px',
        margin: '0 auto',
      }}
    >
      {/* Poster on the left */}
      <img
        src={movie.imagePath}
        alt={movie.title}
        style={{
          width: '400px',
          height: 'auto',
          objectFit: 'cover',
          borderRadius: '10px',
          flexShrink: 0,
        }}
      />
      {/* Info on the right */}
      <div>
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
            {movie.cast
              .match(/\b[A-Z][a-z]+\s[A-Z][a-z]+\b/g)
              ?.join(', ') ?? movie.cast}
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
  );
};
export default MovieDetailPage;