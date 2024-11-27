import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEvent } from '../../services/events';

function CreateEventPage() {
    const navigate = useNavigate();
    const [event, setEvent] = useState({
        name: '',
        date: '',
        startTime: '',
        endTime: '',
        ticketPrice: '',
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEvent({
            ...event,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(event);
            await createEvent(event);
            navigate('/events');
        } catch (error) {
            console.error('Failed to create event:', error);
            setErrors({ submit: 'Ошибка при создании события. Попробуйте снова.' });
        }
    };

    return (
        <div style={{ padding: '16px' }}>
            <h2>Создать</h2>
            <h4>Событие</h4>
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
                            value={event.name}
                            onChange={handleChange}
                            className="form-control"
                            style={{ width: '100%' }}
                        />
                        {errors.name && (
                            <span style={{ color: 'red' }}>{errors.name}</span>
                        )}
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                        <label htmlFor="date" style={{ display: 'block', fontWeight: 'bold' }}>
                            Дата
                        </label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={event.date}
                            onChange={handleChange}
                            className="form-control"
                            style={{ width: '100%' }}
                        />
                        {errors.date && (
                            <span style={{ color: 'red' }}>{errors.date}</span>
                        )}
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                        <label htmlFor="startTime" style={{ display: 'block', fontWeight: 'bold' }}>
                            Время начала
                        </label>
                        <input
                            type="time"
                            id="startTime"
                            name="startTime"
                            value={event.startTime}
                            onChange={handleChange}
                            className="form-control"
                            style={{ width: '100%' }}
                        />
                        {errors.startTime && (
                            <span style={{ color: 'red' }}>{errors.startTime}</span>
                        )}
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                        <label htmlFor="endTime" style={{ display: 'block', fontWeight: 'bold' }}>
                            Время окончания
                        </label>
                        <input
                            type="time"
                            id="endTime"
                            name="endTime"
                            value={event.endTime}
                            onChange={handleChange}
                            className="form-control"
                            style={{ width: '100%' }}
                        />
                        {errors.endTime && (
                            <span style={{ color: 'red' }}>{errors.endTime}</span>
                        )}
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                        <label htmlFor="ticketPrice" style={{ display: 'block', fontWeight: 'bold' }}>
                            Цена билета
                        </label>
                        <input
                            type="number"
                            id="ticketPrice"
                            name="ticketPrice"
                            value={event.ticketPrice}
                            onChange={handleChange}
                            className="form-control"
                            style={{ width: '100%' }}
                            step="0.01"
                        />
                        {errors.ticketPrice && (
                            <span style={{ color: 'red' }}>{errors.ticketPrice}</span>
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
                            onClick={() => navigate('/events')}
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

export default CreateEventPage;