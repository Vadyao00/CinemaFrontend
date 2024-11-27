import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createActor } from '../../services/actors';

function CreateActor() {
    const navigate = useNavigate();
    const [actor, setActor] = useState({
        name: '',
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setActor({
            ...actor,
            [name]: value,
        });
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

export default CreateActor;