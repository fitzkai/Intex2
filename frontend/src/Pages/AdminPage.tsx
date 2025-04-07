import { useEffect, useState } from 'react';
import { MoviesTitle } from '../types/MoviesTitle';
import { DeleteMovie, fetchMovies } from '../api/MoviesAPI';
import NewMovieForm from '../components/NewMovieForm';
import EditMovieForm from '../components/EditMovieForm';
import Pagination from '../context/Pagination';
const AdminPage = () => {
  const [movies, setMovies] = useState<MoviesTitle[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [showForm, setShowForm] = useState(false);
  const [editingMovie, setEditingMovie] = useState<MoviesTitle | null>(null);
  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await fetchMovies(pageSize, pageNum);
        setMovies(data.movies);
        setTotalPages(Math.ceil(data.totalNumMovies / pageSize));
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };
    loadMovies();
  }, [pageSize, pageNum]);
  const handleDelete = async (showId: string) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this show?'
    );
    if (!confirmDelete) return;
    try {
      await DeleteMovie(showId);
      setMovies(movies.filter((m) => m.showId !== showId));
    } catch (error) {
      alert('Failed to delete show. Please try again');
    }
  };
  if (loading) return <p>Loading shows...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <div>
      <h1>Admin - CineNiche</h1>
      {!showForm && <button onClick={() => setShowForm(true)}>Add Show</button>}
      {showForm && (
        <NewMovieForm
          onSuccess={() => {
            setShowForm(false);
            fetchMovies(pageSize, pageNum).then((data) =>
              setMovies(data.movies)
            );
          }}
          onCancel={() => setShowForm(false)}
        />
      )}
      {editingMovie && (
        <EditMovieForm
          movie={editingMovie}
          onSuccess={() => {
            setEditingMovie(null);
            fetchMovies(pageSize, pageNum).then((data) =>
              setMovies(data.movies)
            );
          }}
          onCancel={() => setEditingMovie(null)}
        />
      )}
      <table>
        <thead>
          <tr>
            <th>ShowId</th>
            <th>Type</th>
            <th>Title</th>
            <th>Director</th>
            <th>Cast</th>
            <th>County</th>
            <th>Release Year</th>
            <th>Duration</th>
            <th>Description</th>
            {/* <th>Genre</th> */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((m) => (
            <tr key={m.showId}>
              <td>{m.type}</td>
              <td>{m.title}</td>
              <td>{m.director}</td>
              <td>{m.cast}</td>
              <td>{m.country}</td>
              <td>{m.releaseYear}</td>
              <td>{m.duration}</td>
              <td>{m.description}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm w-100 mb-1"
                  onClick={() => setEditingMovie(m)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm w-100 mb-1"
                  onClick={() => handleDelete(m.showId!)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={pageNum}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={setPageNum}
        onPageSizeChange={(newSize) => {
          setPageSize(newSize);
          setPageNum(1);
        }}
      />
    </div>
  );
};
export default AdminPage;
