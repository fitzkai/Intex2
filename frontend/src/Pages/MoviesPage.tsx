import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthorizeView, { AuthorizedUser } from '../components/AuthorizeView';
// import Logout from '../components/Logout';
// import '../css/MovieCard.css';
import { motion } from 'framer-motion';
// import Navbar from '../components/Navbar';

interface Movie {
  showId: string;
  title: string;
  description: string;
  genre: string;
  imagePath: string;
}
const PAGE_SIZE = 16;
const MoviesPage: React.FC = () => {
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [visibleMovies, setVisibleMovies] = useState<Movie[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();
  // Fetch movies once
  useEffect(() => {
    fetch('https://localhost:5000/Movies/MoviesPage', {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        setAllMovies(data);
        setVisibleMovies(data.slice(0, PAGE_SIZE));
        console.log(data.imagePath);
      })
      .catch((err) => console.error(err));
  }, []);
  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      const nearBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
      if (nearBottom && hasMore) {
        const nextPage = page + 1;
        const nextMovies = allMovies.slice(0, nextPage * PAGE_SIZE);
        setVisibleMovies(nextMovies);
        setPage(nextPage);
        if (nextMovies.length >= allMovies.length) {
          setHasMore(false);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [page, allMovies, hasMore]);
  // Extract individual genres
  const genres = Array.from(
    new Set(
      allMovies.flatMap((movie) => movie.genre.split(', ').map((g) => g.trim()))
    )
  ).sort();
  // Toggle genre chip
  const toggleGenre = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };
  // Filtered + visible movies
  const filteredMovies = visibleMovies.filter((movie) => {
    const matchesTitle = movie.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesGenre =
      selectedGenres.length === 0
        ? true
        : selectedGenres.some((g) => movie.genre.split(', ').includes(g));
    return matchesTitle && matchesGenre;
  });
  const handleCardClick = (
    e: React.MouseEvent<HTMLDivElement>,
    showId: string
  ) => {
    const card = e.currentTarget;
    card.classList.add('zooming');
    setTimeout(() => {
      navigate(`/MoviesPage/${showId}`);
    }, 300); // match transition duration
  };
  return (
    <>
      <AuthorizeView>
        {/* <Navbar /> */}
        <div>
          <h1>All Movies</h1>
          <div style={{ padding: '2rem' }}>
            <input
              type="text"
              placeholder="Search by title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={styles.search}
            />
            <div style={styles.genreContainer}>
              <button
                onClick={() => setSelectedGenres([])}
                style={{
                  ...styles.genreButton,
                  backgroundColor:
                    selectedGenres.length === 0 ? '#333' : '#bbb',
                  color: selectedGenres.length === 0 ? '#fff' : '#000',
                  fontWeight: 'bold',
                }}
              >
                Clear Filters
              </button>
              {genres.map((genre) => (
                <button
                  key={genre}
                  onClick={() => toggleGenre(genre)}
                  style={{
                    ...styles.genreButton,
                    backgroundColor: selectedGenres.includes(genre)
                      ? '#333'
                      : '#eee',
                    color: selectedGenres.includes(genre) ? '#fff' : '#000',
                  }}
                >
                  {genre}
                </button>
              ))}
            </div>
            <div style={styles.grid}>
              {filteredMovies.map((movie) => (
                <motion.div
                  key={movie.showId}
                  layoutId={`movie-${movie.showId}`}
                  style={styles.card}
                  onClick={() => navigate(`/MoviesPage/${movie.showId}`)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <img
                    src={movie.imagePath}
                    alt={movie.title}
                    style={styles.poster}
                  />
                  <h2>{movie.title}</h2>
                  <p>{movie.description}</p>
                  <small style={{ color: '#777' }}>{movie.genre}</small>
                </motion.div>
              ))}
            </div>
            {hasMore && (
              <p
                style={{ textAlign: 'center', padding: '1rem', color: '#666' }}
              >
                Loading more movies...
              </p>
            )}
          </div>
        </div>
      </AuthorizeView>
    </>
  );
};
const styles: { [key: string]: React.CSSProperties } = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '20px',
    marginTop: '1rem',
  },
  card: {
    backgroundColor: '#fff',
    padding: '1rem',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  search: {
    padding: '0.5rem 1rem',
    width: '100%',
    marginBottom: '1rem',
    fontSize: '1rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
  },
  genreContainer: {
    marginBottom: '1rem',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
  },
  genreButton: {
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '20px',
    cursor: 'pointer',
    backgroundColor: '#eee',
    transition: 'all 0.2s',
  },
  poster: {
    width: '100%',
    height: '300px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginBottom: '0.5rem',
  },
};
export default MoviesPage;
