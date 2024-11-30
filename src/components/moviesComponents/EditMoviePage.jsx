import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getMovieById, updateMovie } from '../../services/movies';
import { fetchGenres } from '../../services/genres';
import { fetchActors } from '../../services/actors';

function EditMoviePage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState({
        genreId: '',
        title: '',
        duration: '',
        productionCompany: '',
        country: '',
        ageRestriction: '',
        description: '',
        movieId: '',
        actorsIds: [],
    });
    const [genres, setGenres] = useState([]);
    const [actors, setActors] = useState([]);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const loadMovie = async () => {
            try {
                const data = await getMovieById(id);
                setMovie(data);
            } catch (error) {
                console.error('Failed to fetch movie:', error);
            }
        };
        loadMovie();
    }, [id]);

    useEffect(() => {
        const loadGenres = async () => {
            try {
                const dataGenres = await fetchGenres();
                setGenres(dataGenres.data);
            } catch (error) {
                console.error('Failed to fetch genres:', error);
            }
        };

        const loadActors = async () => {
            try {
                const dataActors = await fetchActors();
                setActors(dataActors.data);
            } catch (error) {
                console.error('Failed to fetch actors:', error);
            }
        };

        loadGenres();
        loadActors();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'actorsIds') {
            const selectedActors = Array.from(e.target.selectedOptions, (option) => option.value);
            setMovie((prevMovie) => ({
                ...prevMovie,
                [name]: selectedActors,
            }));
        } else {
            setMovie((prevMovie) => ({
                ...prevMovie,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { genreName, ...movieToUpdate } = movie;
        try {
            await updateMovie(movieToUpdate.movieId, movieToUpdate);
            navigate('/movies');
        } catch (error) {
            console.error('Failed to update movie:', error);
            setErrors({ submit: 'Ошибка при сохранении изменений. Попробуйте снова.' });
        }
    };

    const handleCancel = () => {
        navigate('/movies');
    };

    return (
        <div style={{ padding: '16px' }}>
            <h2>Редактировать фильм</h2>
            <h4>Фильм</h4>
            <hr />
            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                <form onSubmit={handleSubmit}>
                    {errors.submit && (
                        <div style={{ color: 'red', marginBottom: '16px' }}>{errors.submit}</div>
                    )}
                    <div style={{ marginBottom: '16px' }}>
                        <label htmlFor="title" style={{ display: 'block', marginBottom: '8px' }}>
                            Название
                        </label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            value={movie.title}
                            onChange={handleChange}
                            className="form-control"
                            style={{
                                width: '100%',
                                padding: '8px',
                                boxSizing: 'border-box',
                                borderRadius: '4px',
                                border: '1px solid #ccc',
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                        <label htmlFor="genreId" style={{ display: 'block', marginBottom: '8px' }}>
                            Жанр
                        </label>
                        <select
                            id="genreId"
                            name="genreId"
                            value={movie.genreId}
                            onChange={handleChange}
                            className="form-control"
                            style={{
                                width: '100%',
                                padding: '8px',
                                boxSizing: 'border-box',
                                borderRadius: '4px',
                                border: '1px solid #ccc',
                            }}
                        >
                            <option value="">Выберите жанр</option>
                            {genres.map((genre) => (
                                <option key={genre.genreId} value={genre.genreId}>
                                    {genre.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                        <label htmlFor="actorsIds" style={{ display: 'block', marginBottom: '8px' }}>
                            Актеры
                        </label>
                        <select
                            id="actorsIds"
                            name="actorsIds"
                            multiple
                            value={movie.actorsIds}
                            onChange={handleChange}
                            className="form-control"
                            style={{
                                width: '100%',
                                padding: '8px',
                                boxSizing: 'border-box',
                                borderRadius: '4px',
                                border: '1px solid #ccc',
                                height: '120px',
                            }}
                        >
                            {actors.map((actor) => (
                                <option key={actor.actorId} value={actor.actorId}>
                                    {actor.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                        <label htmlFor="duration" style={{ display: 'block', marginBottom: '8px' }}>
                            Продолжительность
                        </label>
                        <input
                            id="duration"
                            name="duration"
                            type="text"
                            value={movie.duration}
                            onChange={handleChange}
                            className="form-control"
                            style={{
                                width: '100%',
                                padding: '8px',
                                boxSizing: 'border-box',
                                borderRadius: '4px',
                                border: '1px solid #ccc',
                            }}
                        />
                        {errors.duration && <span style={{ color: 'red' }}>{errors.duration}</span>}
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                        <label htmlFor="productionCompany" style={{ display: 'block', marginBottom: '8px' }}>
                            Компания
                        </label>
                        <input
                            id="productionCompany"
                            name="productionCompany"
                            type="text"
                            value={movie.productionCompany}
                            onChange={handleChange}
                            className="form-control"
                            style={{
                                width: '100%',
                                padding: '8px',
                                boxSizing: 'border-box',
                                borderRadius: '4px',
                                border: '1px solid #ccc',
                            }}
                        />
                        {errors.productionCompany && <span style={{ color: 'red' }}>{errors.productionCompany}</span>}
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                        <label htmlFor="country" style={{ display: 'block', marginBottom: '8px' }}>
                            Страна
                        </label>
                        <input
                            id="country"
                            name="country"
                            type="text"
                            value={movie.country}
                            onChange={handleChange}
                            className="form-control"
                            style={{
                                width: '100%',
                                padding: '8px',
                                boxSizing: 'border-box',
                                borderRadius: '4px',
                                border: '1px solid #ccc',
                            }}
                        />
                        {errors.country && <span style={{ color: 'red' }}>{errors.country}</span>}
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                        <label htmlFor="ageRestriction" style={{ display: 'block', marginBottom: '8px' }}>
                            Возрастное ограничение
                        </label>
                        <input
                            id="ageRestriction"
                            name="ageRestriction"
                            type="text"
                            value={movie.ageRestriction}
                            onChange={handleChange}
                            className="form-control"
                            style={{
                                width: '100%',
                                padding: '8px',
                                boxSizing: 'border-box',
                                borderRadius: '4px',
                                border: '1px solid #ccc',
                            }}
                        />
                        {errors.ageRestriction && <span style={{ color: 'red' }}>{errors.ageRestriction}</span>}
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                        <label htmlFor="description" style={{ display: 'block', marginBottom: '8px' }}>
                            Описание
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={movie.description}
                            onChange={handleChange}
                            className="form-control"
                            rows="4"
                            style={{
                                width: '100%',
                                padding: '8px',
                                boxSizing: 'border-box',
                                borderRadius: '4px',
                                border: '1px solid #ccc',
                            }}
                        />
                        {errors.description && <span style={{ color: 'red' }}>{errors.description}</span>}
                    </div>
                    
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                            type="submit"
                            style={{
                                padding: '8px 16px',
                                background: 'blue',
                                color: 'white',
                                border: 'none',
                                cursor: 'pointer',
                            }}
                        >
                            Сохранить
                        </button>
                        <button
                            type="button"
                            onClick={handleCancel}
                            style={{
                                padding: '8px 16px',
                                background: '#ccc',
                                color: 'black',
                                border: 'none',
                                cursor: 'pointer',
                            }}
                        >
                            Вернуться к списку
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditMoviePage;