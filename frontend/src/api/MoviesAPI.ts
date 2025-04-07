import { MoviesTitle } from '../types/MoviesTitle';

interface FetchMoviesResponse {
  movies: MoviesTitle[];
  totalNumMovies: number;
}

const API_URL = 'https://localhost:5000/Movies';

export const fetchMovies = async (
  pageSize: number,
  pageNum: number
): Promise<FetchMoviesResponse> => {
  try {
    const response = await fetch(
      `${API_URL}/AllMovies?pageSize=${pageSize}&pageNum=${pageNum}`
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
    const response = await fetch(`${API_URL}/AddMoive`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newMovie),
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
  movieId: string,
  updatedMovie: MoviesTitle
): Promise<MoviesTitle> => {
  try {
    const response = await fetch(`${API_URL}/UpdateMovie/${movieId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedMovie),
    });

    return await response.json();
  } catch (error) {
    console.error('Error updating movie', error);
    throw error;
  }
};

export const DeleteMovie = async (movieId: string): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/DeleteMovie/${movieId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete movie');
    }
  } catch (error) {
    console.error('Error deleting movie', error);
    throw error;
  }
};
