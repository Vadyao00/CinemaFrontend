import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEvent } from '../../services/events';
import { fetchAllEmployees } from '../../services/employees';

function CreateEventPage() {
    const navigate = useNavigate();

    const [event, setEvent] = useState({
        name: '',
        date: '',
        startTime: '',
        endTime: '',
        ticketPrice: '',
        employeesIds: [],
    });
    const [allEmployees, setAllEmployees] = useState([]);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const loadEmployees = async () => {
            try {
                const employees = await fetchAllEmployees();
                setAllEmployees(employees);
            } catch (error) {
                console.error('Failed to fetch employees:', error);
            }
        };

        loadEmployees();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEvent({
            ...event,
            [name]: value,
        });
    };

    const handleEmployeesChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions);
        const selectedIds = selectedOptions.map((option) => option.value);
        setEvent((prevEvent) => ({
            ...prevEvent,
            employeesIds: selectedIds,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
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
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                        <label htmlFor="employees" style={{ display: 'block', fontWeight: 'bold' }}>
                            Связанные сотрудники
                        </label>
                        <select
                            id="employees"
                            name="employees"
                            multiple
                            value={event.employeesIds}
                            onChange={handleEmployeesChange}
                            className="form-control"
                            style={{ width: '100%', height: '120px' }}
                        >
                            {allEmployees.map((employee) => (
                                <option key={employee.employeeId} value={employee.employeeId}>
                                    {employee.name}
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