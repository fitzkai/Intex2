import { MoviesTitle } from '../types/MoviesTitle';
interface FetchMoviesResponse {
  movies: MoviesTitle[];
  totalNumMovies: number;
}
const API_URL =
  'https://intex2-4-8-backend-bkh8h0caezhmfhcj.eastus-01.azurewebsites.net/Movies';
export const fetchMovies = async (
  pageSize: number = 10,
  pageNum: number = 1
): Promise<FetchMoviesResponse> => {
  try {
    const response = await fetch(
      `${API_URL}/AllMovies?pageSize=${pageSize}&pageNum=${pageNum}`,
      {
        credentials: 'include',
      }
    );
    if (!response.ok) {
      throw new Error('Failed to fetch movies');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};
export const AddMovie = async (newMovie: MoviesTitle): Promise<MoviesTitle> => {
  try {
    const response = await fetch(`${API_URL}/AddMovie`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newMovie),
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error('Failed to add movie');
    }
    return await response.json();
  } catch (error) {
    console.error('Error adding movie', error);
    throw error;
  }
};

export const UpdateMovie = async (
  movieId: number,
  updatedMovie: MoviesTitle
): Promise<MoviesTitle> => {
  try {
    const response = await fetch(`${API_URL}/UpdateMovie/${movieId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedMovie),
      credentials: 'include',
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Update failed: ${response.status} ${text}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating movie', error);
    throw error;
  }
};

export const DeleteMovie = async (movieId: number): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/DeleteMovie/${movieId}`, {
      method: 'DELETE',
      credentials: 'include',
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Delete failed: ${response.status} ${text}`);
    }
  } catch (error) {
    console.error('Error deleting movie', error);
    throw error;
  }
};
