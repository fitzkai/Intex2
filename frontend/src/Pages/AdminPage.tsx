import { useEffect, useState } from 'react';
import { MoviesTitle } from '../types/MoviesTitle';
import { DeleteMovie, fetchMovies } from '../api/MoviesAPI';
import NewMovieForm from '../components/NewMovieForm';
import EditMovieForm from '../components/EditMovieForm';
import Pagination from '../context/Pagination';
import { Accordion } from 'react-bootstrap';
import BarNav from '../components/BarNav';
import AuthorizeView from '../components/AuthorizeView';

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

  const handleDelete = async (showId: number) => {
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
    // <AuthorizeView>
    <>
      <AuthorizeView>
        <BarNav />
        <div className="container mt-4">
          <h1 className="mb-4">Admin - CineNiche</h1>

          {!showForm && (
            <button
              className="btn btn-success mb-4"
              onClick={() => setShowForm(true)}
            >
              Add Show
            </button>
          )}

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

          <Accordion defaultActiveKey="">
            {movies.map((m, index) => (
              <Accordion.Item eventKey={index.toString()} key={m.showId}>
                <Accordion.Header>
                  <div className="d-flex w-100 justify-content-between align-items-center">
                    <div className="fw-bold">{m.title}</div>
                    <div className="text-muted">{m.releaseYear}</div>
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                  <p>
                    <strong>Director:</strong> {m.director}
                  </p>
                  <p>
                    <strong>Cast:</strong> {m.cast}
                  </p>
                  <p>
                    <strong>Country:</strong> {m.country}
                  </p>
                  <p>
                    <strong>Duration:</strong> {m.duration}
                  </p>
                  <p>
                    <strong>Description:</strong> {m.description}
                  </p>
                  <div className="d-flex justify-content-center gap-4 mt-4">
                    <button
                      className="btn btn-primary px-4"
                      style={{ minWidth: '150px' }}
                      onClick={() => setEditingMovie(m)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger px-4"
                      style={{ minWidth: '150px' }}
                      onClick={() => handleDelete(m.showId!)}
                    >
                      Delete
                    </button>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>

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
      </AuthorizeView>
    </>
    // </AuthorizeView>
  );
};

export default AdminPage;
