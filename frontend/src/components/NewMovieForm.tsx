import { useState } from 'react';
import { MoviesTitle } from '../types/MoviesTitle';
import { AddMovie } from '../api/MoviesAPI';

interface NewMovieFormProps {
    onSuccess: () => void;
    onCancel: () => void;
}

const NewMovieForm = ({ onSuccess, onCancel}: NewMovieFormProps) => {
    const [formData, setFormData] = useState<MoviesTitle>({
        showId: 's0',
        type: '',
        title: '',
        director: '',
        cast: '',
        country: '',
        releaseYear: 0,
        duration: '',
        description: '',
        // genre: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await AddMovie(formData);
        onSuccess();
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add New</h2>
            <div className='form-grid'>
                <label>
                Type:
                <input
                    type="text"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                />
                </label>
                <label>
                Title:
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                />
                </label>
                <label>
                Director:
                <input
                    type="text"
                    name="director"
                    value={formData.director}
                    onChange={handleChange}
                />
                </label>
                <label>
                Cast:
                <input
                    type="text"
                    name="cast"
                    value={formData.cast}
                    onChange={handleChange}
                />
                </label>
                <label>
                Country:
                <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                />
                </label>
                <label>
                Release Year:
                <input
                    type="number"
                    name="releaseYear"
                    value={formData.releaseYear}
                    onChange={handleChange}
                />
                </label>
                <label>
                Duration:
                <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                />
                </label>
                <label>
                Description:
                <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                />
                </label>
                {/* <label>
                Genre:
                <input
                    type="text"
                    name="genre"
                    value={formData.genre}
                    onChange={handleChange}
                />
                </label> */}

                <button className='btn btn-success btn-sm' type="submit">
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