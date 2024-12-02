import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getEmployeeById, updateEmployee } from '../../services/employees';
import { fetchAllEvents } from '../../services/events';
import { fetchAllShowtimes } from '../../services/showtimes';

function EditEmployeePage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [employee, setEmployee] = useState({ name: '', role: '', employeeId: '', eventsIds: [], showtimesIds: [] });
    const [events, setEvents] = useState([]);
    const [showtimes, setShowtimes] = useState([]);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const loadEmployee = async () => {
            try {
                const data = await getEmployeeById(id);
                setEmployee(data);
            } catch (error) {
                console.error('Failed to fetch employee:', error);
            }
        };

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

        loadEmployee();
        loadEvents();
        loadShowtimes();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee((prevEmployee) => ({
            ...prevEmployee,
            [name]: value,
        }));
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
            await updateEmployee(employee.employeeId, employee);
            navigate('/employees');
        } catch (error) {
            console.error('Failed to update employee:', error);
            setErrors({ submit: 'Ошибка при сохранении изменений. Попробуйте снова.' });
        }
    };

    const handleCancel = () => {
        navigate('/employees');
    };

    return (
        <div style={{ padding: '16px' }}>
            <h2>Редактировать</h2>
            <h4>Сотрудник</h4>
            <hr />
            <div style={{ maxWidth: '400px', margin: '0 auto' }}>
                <form onSubmit={handleSubmit}>
                    {errors.submit && (
                        <div style={{ color: 'red', marginBottom: '16px' }}>{errors.submit}</div>
                    )}
                    <div style={{ marginBottom: '16px' }}>
                        <label htmlFor="name" style={{ display: 'block', marginBottom: '8px' }}>
                            Имя
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={employee.name}
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
                        <label htmlFor="role" style={{ display: 'block', marginBottom: '8px' }}>
                            Роль
                        </label>
                        <input
                            id="role"
                            name="role"
                            type="text"
                            value={employee.role}
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

export default EditEmployeePage;