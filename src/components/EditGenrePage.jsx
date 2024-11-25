import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getGenreById, updateGenre } from '../services/genres';

function EditGenrePage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [genre, setGenre] = useState({ name: '', description: '', genreId: '' });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const loadGenre = async () => {
            try {
                const data = await getGenreById(id);
                setGenre(data);
            } catch (error) {
                console.error('Failed to fetch genre:', error);
            }
        };
        loadGenre();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setGenre((prevGenre) => ({
            ...prevGenre,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateGenre(genre.genreId, genre);
            navigate('/genres');
        } catch (error) {
            console.error('Failed to update genre:', error);
            setErrors({ submit: 'Ошибка при сохранении изменений. Попробуйте снова.' });
        }
    };

    const handleCancel = () => {
        navigate('/genres');
    };

    return (
        <div style={{ padding: '16px' }}>
            <h2>Редактировать</h2>
            <h4>Жанр</h4>
            <hr />
            <div style={{ maxWidth: '400px', margin: '0 auto' }}>
                <form onSubmit={handleSubmit}>
                    {errors.submit && (
                        <div style={{ color: 'red', marginBottom: '16px' }}>{errors.submit}</div>
                    )}
                    <div style={{ marginBottom: '16px' }}>
                        <label htmlFor="name" style={{ display: 'block', marginBottom: '8px' }}>
                            Название
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={genre.name}
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
                        {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                        <label htmlFor="description" style={{ display: 'block', marginBottom: '8px' }}>
                            Описание
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={genre.description}
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
                        {errors.description && (
                            <span style={{ color: 'red' }}>{errors.description}</span>
                        )}
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

export default EditGenrePage;