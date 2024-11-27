import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getActorById, updateActor } from '../../services/actors';

function EditActor() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [actor, setActor] = useState({ name: '', actorId: '' });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const loadActor = async () => {
            try {
                const data = await getActorById(id);
                setActor(data);
            } catch (error) {
                console.error('Failed to fetch actor:', error);
            }
        };
        loadActor();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setActor((prevActor) => ({
            ...prevActor,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateActor(actor.actorId, actor);
            navigate('/actors');
        } catch (error) {
            console.error('Failed to update actor:', error);
            setErrors({ name: 'Failed to save changes. Please try again.' });
        }
    };

    const handleCancel = () => {
        navigate('/actors');
    };

    return (
        <div style={{ padding: '16px' }}>
            <h2>Редактировать</h2>
            <h4>Актер</h4>
            <hr />
            <div style={{ maxWidth: '400px', margin: '0 auto' }}>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '16px' }}>
                        <label htmlFor="name" style={{ display: 'block', marginBottom: '8px' }}>
                            Имя
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={actor.name}
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

export default EditActor;