import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import StarRating from '../components/StarRating';
// import AuthorizeView from '../components/AuthorizeView';
import { motion } from 'framer-motion';
import { RecommendationRow } from '../types/Movie';
import '../styles/MovieDetailPage.css';

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

  function sanitizeFileName(title: string): string {
    return title.replace(/[^\p{L}\p{Nd} ]+/gu, '');
  }
  if (!movie) return <p>Loading...</p>;

  return (
    <div className="movie-detail-page fade-in">
      <div className="movie-detail-container">
        <motion.div
          layoutId={`movie-${movie.showId}`}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.4 }}
          className="movie-poster"
        >
          <img
            src={movie.imagePath}
            alt={movie.title}
            className="movie-poster-img"
          />
        </motion.div>

        <div className="movie-info">
          <h1>{movie.title}</h1>
          <p>{movie.type}</p>
          <ul>{/* Movie Details */}</ul>

          <div className="movie-description">
            <h3>Description</h3>
            <p>{movie.description}</p>
          </div>

          <div className="star-rating">
            <h3>Seen this one? Rate it below!</h3>
            <StarRating showId={movie.showId} rating={0} />
          </div>

          <div className="recommendations">
            <h3>You might like...</h3>
            <div className="movie-carousel">
              {recommendedMovies.map((movie, index) => (
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

          <button
            className="back-button"
            onClick={() => navigate('/MoviesPage')}
          >
            Back to Movies
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
