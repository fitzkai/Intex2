import React, { useEffect, useState } from 'react';
import AuthorizeView, { AuthorizedUser } from '../components/AuthorizeView';
import Logout from '../components/Logout';

interface Movie {
  id: number;
  title: string;
  description: string;
  genre: string; // Comma-separated string like "Action, Comedy"
}

const PAGE_SIZE = 20;

const MoviesPage: React.FC = () => {
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [visibleMovies, setVisibleMovies] = useState<Movie[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Fetch movies once
  useEffect(() => {
    fetch('https://localhost:5000/Movies/MoviesPage', {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        setAllMovies(data);
        setVisibleMovies(data.slice(0, PAGE_SIZE));
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

  return (
    <>
      <AuthorizeView>
        <span>
          <Logout>
            Logout <AuthorizedUser value="email" />
          </Logout>
        </span>
        {/* <WelcomeBand/> */}
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
            <div key={movie.id} style={styles.card}>
              <h2>{movie.title}</h2>
              <p>{movie.description}</p>
              <small style={{ color: '#777' }}>{movie.genre}</small>
            </div>
          ))}
        </div>
            <div style={styles.grid}>
              {filteredMovies.map((movie) => (
                <div key={movie.id} style={styles.card}>
                  <h2>{movie.title}</h2>
                  <p>{movie.description}</p>
                  <small style={{ color: '#777' }}>{movie.genre}</small>
                </div>
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
};

export default MoviesPage;
