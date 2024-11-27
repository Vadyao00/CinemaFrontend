import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createGenre } from '../../services/genres';

function CreateGenrePage() {
    const navigate = useNavigate();
    const [genre, setGenre] = useState({
        name: '',
        description: '',
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setGenre({
            ...genre,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createGenre(genre); 
            navigate('/genres');
        } catch (error) {
            console.error('Failed to create genre:', error);
            setErrors({ submit: 'Ошибка при создании жанра. Попробуйте снова.' });
        }
    };

    return (
        <div style={{ padding: '16px' }}>
            <h2>Создать</h2>
            <h4>Жанр</h4>
            <hr />
            <div style={{ maxWidth: '400px', margin: 'auto' }}>
                <form onSubmit={handleSubmit}>
                    {errors.submit && (
                        <div style={{ color: 'red', marginBottom: '16px' }}>{errors.submit}</div>
                    )}
                    <div style={{ marginBottom: '16px' }}>
                        <label htmlFor="name" style={{ display: 'block', fontWeight: 'bold' }}>
                            Название
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={genre.name}
                            onChange={handleChange}
                            className="form-control"
                            style={{ width: '100%' }}
                        />
                        {errors.name && (
                            <span style={{ color: 'red' }}>{errors.name}</span>
                        )}
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                        <label htmlFor="description" style={{ display: 'block', fontWeight: 'bold' }}>
                            Описание
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={genre.description}
                            onChange={handleChange}
                            className="form-control"
                            rows="4"
                            style={{ width: '100%' }}
                        />
                        {errors.description && (
                            <span style={{ color: 'red' }}>{errors.description}</span>
                        )}
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
                            onClick={() => navigate('/genres')}
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

export default CreateGenrePage;