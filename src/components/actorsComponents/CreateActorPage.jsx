import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createActor } from '../../services/actors';
import { fetchAllMovies } from '../../services/movies';

function CreateActorPage() {
    const navigate = useNavigate();
    const [actor, setActor] = useState({
        name: '',
        moviesIds: [], // Добавлено поле для фильмов
    });
    const [movies, setMovies] = useState([]);
    const [errors, setErrors] = useState({});

    // Загрузка фильмов при монтировании
    useEffect(() => {
        const loadMovies = async () => {
            try {
                const moviesData = await fetchAllMovies();
                setMovies(moviesData);
            } catch (error) {
                console.error('Failed to fetch movies:', error);
            }
        };
        loadMovies();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'moviesIds') {
            const selectedMovies = Array.from(e.target.selectedOptions, option => option.value);
            setActor((prevActor) => ({
                ...prevActor,
                [name]: selectedMovies,
            }));
        } else {
            setActor({
                ...actor,
                [name]: value,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createActor(actor);
            navigate('/actors');
        } catch (error) {
            console.error('Failed to create actor:', error);
            setErrors({ submit: 'Ошибка при создании актера. Попробуйте снова.' });
        }
    };

    return (
        <div style={{ padding: '16px' }}>
            <h2>Создать</h2>
            <h4>Актер</h4>
            <hr />
            <div style={{ maxWidth: '400px', margin: 'auto' }}>
                <form onSubmit={handleSubmit}>
                    {errors.submit && (
                        <div style={{ color: 'red', marginBottom: '16px' }}>{errors.submit}</div>
                    )}
                    <div style={{ marginBottom: '16px' }}>
                        <label htmlFor="name" style={{ display: 'block', fontWeight: 'bold' }}>
                            Имя
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={actor.name}
                            onChange={handleChange}
                            className="form-control"
                            style={{ width: '100%' }}
                        />
                        {errors.name && (
                            <span style={{ color: 'red' }}>{errors.name}</span>
                        )}
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                        <label htmlFor="moviesIds" style={{ display: 'block', marginBottom: '8px' }}>
                            Выберите фильмы
                        </label>
                        <select
                            id="moviesIds"
                            name="moviesIds"
                            multiple
                            value={actor.moviesIds}
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
                            {movies.map((movie) => (
                                <option key={movie.movieId} value={movie.movieId}>
                                    {movie.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div style={{ marginTop: '16px' }}>
                        <button
                            type="submit"
                            style={{
                                padding: '8px 16px',
                                marginRight: '8px',
                                background: 'blue',
                                color: 'white',
                                border: 'none',
                                cursor: 'pointer',
                            }}
                        >
                            Создать
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate('/actors')}
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

export default CreateActorPage;