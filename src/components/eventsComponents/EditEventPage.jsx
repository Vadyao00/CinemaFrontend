import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getEventById, updateEvent } from '../../services/events';
import { fetchAllEmployees } from '../../services/employees';

function EditEventPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [event, setEvent] = useState({
        name: '',
        date: '',
        startTime: '',
        endTime: '',
        ticketPrice: '',
        eventId: '',
        employeesIds: [],
    });
    const [allEmployees, setAllEmployees] = useState([]);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const loadEvent = async () => {
            try {
                const data = await getEventById(id);
                setEvent(data);
            } catch (error) {
                console.error('Failed to fetch event:', error);
            }
        };

        const loadEmployees = async () => {
            try {
                const employees = await fetchAllEmployees();
                setAllEmployees(employees);
            } catch (error) {
                console.error('Failed to fetch all employees:', error);
            }
        };

        loadEvent();
        loadEmployees();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEvent((prevEvent) => ({
            ...prevEvent,
            [name]: value,
        }));
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
            await updateEvent(event.eventId, event);
            navigate('/events');
        } catch (error) {
            console.error('Failed to update event:', error);
            setErrors({ submit: 'Ошибка при сохранении изменений. Попробуйте снова.' });
        }
    };

    const handleCancel = () => {
        navigate('/events');
    };

    return (
        <div style={{ padding: '16px' }}>
            <h2>Редактировать</h2>
            <h4>Событие</h4>
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
                            value={event.name}
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
                        <label htmlFor="employees" style={{ display: 'block', marginBottom: '8px' }}>
                            Связанные сотрудники
                        </label>
                        <select
                            id="employees"
                            name="employees"
                            multiple
                            value={event.employeesIds}
                            onChange={handleEmployeesChange}
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
                            {allEmployees.map((employee) => (
                                <option key={employee.employeeId} value={employee.employeeId}>
                                    {employee.name}
                                </option>
                            ))}
                        </select>
                        {errors.employees && (
                            <span style={{ color: 'red' }}>{errors.employees}</span>
                        )}
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                        <label htmlFor="date" style={{ display: 'block', marginBottom: '8px' }}>
                            Дата
                        </label>
                        <input
                            id="date"
                            name="date"
                            type="date"
                            value={event.date}
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
                        {errors.date && <span style={{ color: 'red' }}>{errors.date}</span>}
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                        <label htmlFor="startTime" style={{ display: 'block', marginBottom: '8px' }}>
                            Время начала
                        </label>
                        <input
                            id="startTime"
                            name="startTime"
                            type="time"
                            value={event.startTime}
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
                        {errors.startTime && <span style={{ color: 'red' }}>{errors.startTime}</span>}
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                        <label htmlFor="endTime" style={{ display: 'block', marginBottom: '8px' }}>
                            Время окончания
                        </label>
                        <input
                            id="endTime"
                            name="endTime"
                            type="time"
                            value={event.endTime}
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
                        {errors.endTime && <span style={{ color: 'red' }}>{errors.endTime}</span>}
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                        <label htmlFor="ticketPrice" style={{ display: 'block', marginBottom: '8px' }}>
                            Цена билета
                        </label>
                        <input
                            id="ticketPrice"
                            name="ticketPrice"
                            type="number"
                            step="0.01"
                            value={event.ticketPrice}
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
                        {errors.ticketPrice && <span style={{ color: 'red' }}>{errors.ticketPrice}</span>}
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

export default EditEventPage;