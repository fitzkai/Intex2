import { useState } from 'react';
import { MoviesTitle } from '../types/MoviesTitle';
import { AddMovie } from '../api/MoviesAPI';

interface NewMovieFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const categoryFields: (keyof MoviesTitle)[] = [
  'action', 'adventure', 'animeSeriesInternationalTvShows', 'britishTvShowsDocuseriesInternationalTvShows',
  'children', 'comedies', 'comediesDramasInternationalMovies', 'comediesInternationalMovies',
  'comediesRomanticMovies', 'crimeTvShowsDocuseries', 'documentaries', 'documentariesInternationalMovies',
  'docuseries', 'dramas', 'dramasInternationalMovies', 'dramasRomanticMovies', 'familyMovies',
  'fantasy', 'horrorMovies', 'internationalMoviesThrillers', 'internationalTvShowsRomanticTvShowsTvDramas',
  'kidsTv', 'languageTvShows', 'musicals', 'natureTv', 'realityTv', 'spirituality',
  'tvAction', 'tvComedies', 'tvDramas', 'talkShowsTvComedies', 'thrillers',
];

const formatFieldLabel = (field: string): string => {
  return field
    .replace(/([A-Z])/g, ' $1')       // Add space before capital letters
    .replace(/([a-z])([A-Z])/g, '$1 $2') // Handle edge cases
    .replace(/\s+/g, ' ')              // Clean up extra spaces
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, char => char.toUpperCase()); // Title Case
};


const NewMovieForm = ({ onSuccess, onCancel }: NewMovieFormProps) => {
  const [formData, setFormData] = useState<MoviesTitle>({
    type: '',
    title: '',
    director: '',
    cast: '',
    country: '',
    releaseYear: 0,
    duration: '',
    description: '',
    // genres will default to undefined (unchecked)
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number'
        ? parseInt(value, 10) || 0
        : type === 'checkbox'
        ? checked ? 1 : 0
        : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await AddMovie(formData);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Movie</h2>
      <div className="form-grid">
        <label>
          Type:
          <input type="text" name="type" value={formData.type} onChange={handleChange} />
        </label>
        <label>
          Title:
          <input type="text" name="title" value={formData.title} onChange={handleChange} />
        </label>
        <label>
          Director:
          <input type="text" name="director" value={formData.director} onChange={handleChange} />
        </label>
        <label>
          Cast:
          <input type="text" name="cast" value={formData.cast} onChange={handleChange} />
        </label>
        <label>
          Country:
          <input type="text" name="country" value={formData.country} onChange={handleChange} />
        </label>
        <label>
          Release Year:
          <input type="number" name="releaseYear" value={formData.releaseYear} onChange={handleChange} />
        </label>
        <label>
          Duration:
          <input type="text" name="duration" value={formData.duration} onChange={handleChange} />
        </label>
        <label>
          Description:
          <input type="text" name="description" value={formData.description} onChange={handleChange} />
        </label>

        <fieldset>
          <legend>Categories:</legend>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {categoryFields.map(field => (
              <label key={field} style={{ marginRight: '15px', marginBottom: '10px' }}>
                <input
                  type="checkbox"
                  name={field}
                  checked={formData[field] === 1}
                  onChange={handleChange}
                />
                {formatFieldLabel(field)}
              </label>
            ))}
          </div>
        </fieldset>

        <button className="btn btn-success btn-sm" type="submit">
          Add
        </button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default NewMovieForm;
