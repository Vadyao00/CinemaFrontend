import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEmployee } from '../../services/employees';
import { fetchAllEvents } from '../../services/events';
import { fetchAllShowtimes } from '../../services/showtimes';

function CreateEmployeePage() {
    const navigate = useNavigate();
    const [employee, setEmployee] = useState({
        name: '',
        role: '',
        eventsIds: [],
        showtimesIds: [],
    });
    const [events, setEvents] = useState([]);
    const [showtimes, setShowtimes] = useState([]);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const loadEvents = async () => {
            try {
                const eventsData = await fetchAllEvents();
                setEvents(eventsData);
            } catch (error) {
                console.error('Failed to fetch all events:', error);
            }
        };

        const loadShowtimes = async () => {
            try {
                const showtimesData = await fetchAllShowtimes();
                setShowtimes(showtimesData);
            } catch (error) {
                console.error('Failed to fetch all showtimes:', error);
            }
        };

        loadEvents();
        loadShowtimes();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee({
            ...employee,
            [name]: value,
        });
    };

    const handleMultipleSelectChange = (e) => {
        const { name } = e.target;
        const selectedOptions = Array.from(e.target.selectedOptions);
        const selectedIds = selectedOptions.map((option) => option.value);
        setEmployee((prevEmployee) => ({
            ...prevEmployee,
            [name]: selectedIds,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createEmployee(employee);
            navigate('/employees');
        } catch (error) {
            console.error('Failed to create employee:', error);
            setErrors({ submit: 'Ошибка при создании сотрудника. Попробуйте снова.' });
        }
    };

    return (
        <div style={{ padding: '16px' }}>
            <h2>Создать</h2>
            <h4>Сотрудник</h4>
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
                            value={employee.name}
                            onChange={handleChange}
                            className="form-control"
                            style={{ width: '100%' }}
                        />
                        {errors.name && (
                            <span style={{ color: 'red' }}>{errors.name}</span>
                        )}
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                        <label htmlFor="role" style={{ display: 'block', fontWeight: 'bold' }}>
                            Роль
                        </label>
                        <input
                            type="text"
                            id="role"
                            name="role"
                            value={employee.role}
                            onChange={handleChange}
                            className="form-control"
                            style={{ width: '100%' }}
                        />
                        {errors.role && (
                            <span style={{ color: 'red' }}>{errors.role}</span>
                        )}
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                        <label htmlFor="eventsIds" style={{ display: 'block', marginBottom: '8px' }}>
                            События
                        </label>
                        <select
                            id="eventsIds"
                            name="eventsIds"
                            multiple
                            value={employee.eventsIds}
                            onChange={handleMultipleSelectChange}
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
                            {events.map((event) => (
                                <option key={event.eventId} value={event.eventId}>
                                    {event.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                        <label htmlFor="showtimesIds" style={{ display: 'block', marginBottom: '8px' }}>
                            Сеансы
                        </label>
                        <select
                            id="showtimesIds"
                            name="showtimesIds"
                            multiple
                            value={employee.showtimesIds}
                            onChange={handleMultipleSelectChange}
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
                            {showtimes.map((showtime) => (
                                <option key={showtime.showtimeId} value={showtime.showtimeId}>
                                    {showtime.movieTitle}
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
                            onClick={() => navigate('/employees')}
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

export default CreateEmployeePage;