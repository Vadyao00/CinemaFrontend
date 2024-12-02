import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getShowtimeById, updateShowtime } from '../../services/showtimes';
import { fetchAllMovies } from '../../services/movies';
import { fetchAllEmployees } from '../../services/employees';

function EditShowtimePage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [showtime, setShowtime] = useState({
        date: '',
        startTime: '',
        endTime: '',
        ticketPrice: '',
        movieId: '',
        showtimeId: '',
        employeesIds: [],
    });
    const [movies, setMovies] = useState([]);
    const [allEmployees, setAllEmployees] = useState([]);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const loadShowtime = async () => {
            try {
                const data = await getShowtimeById(id);
                setShowtime(data);
            } catch (error) {
                console.error('Failed to fetch showtime:', error);
            }
        };

        const loadMovies = async () => {
            try {
                const dataMovies = await fetchAllMovies();
                setMovies(dataMovies);
            } catch (error) {
                console.error('Failed to fetch all movies:', error);
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

        loadShowtime();
        loadMovies();
        loadEmployees();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setShowtime((prevShowtime) => ({
            ...prevShowtime,
            [name]: value,
        }));
    };

    const handleEmployeesChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions);
        const selectedIds = selectedOptions.map((option) => option.value);
        setShowtime((prevShowtime) => ({
            ...prevShowtime,
            employeesIds: selectedIds,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateShowtime(showtime.showtimeId, showtime);
            navigate('/showtimes');
        } catch (error) {
            console.error('Failed to update showtime:', error);
            setErrors({ submit: 'Ошибка при сохранении изменений. Попробуйте снова.' });
        }
    };

    const handleCancel = () => {
        navigate('/showtimes');
    };

    return (
        <div style={{ padding: '16px' }}>
            <h2>Редактировать</h2>
            <h4>Сеанс</h4>
            <hr />
            <div style={{ maxWidth: '400px', margin: '0 auto' }}>
                <form onSubmit={handleSubmit}>
                    {errors.submit && (
                        <div style={{ color: 'red', marginBottom: '16px' }}>{errors.submit}</div>
                    )}
                    <div style={{ marginBottom: '16px' }}>
                        <label htmlFor="movieId" style={{ display: 'block', marginBottom: '8px' }}>
                            Фильм
                        </label>
                        <select
                            id="movieId"
                            name="movieId"
                            value={showtime.movieId}
                            onChange={handleChange}
                            className="form-control"
                            style={{
                                width: '100%',
                                padding: '8px',
                                boxSizing: 'border-box',
                                borderRadius: '4px',
                                border: '1px solid #ccc',
                            }}
                            required
                        >
                            <option value="">Выберите фильм</option>
                            {movies.map((movie) => (
                                <option key={movie.movieId} value={movie.movieId}>
                                    {movie.title}
                                </option>
                            ))}
                        </select>
                        {errors.movieId && <span style={{ color: 'red' }}>{errors.movieId}</span>}
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                        <label htmlFor="employees" style={{ display: 'block', marginBottom: '8px' }}>
                            Связанные сотрудники
                        </label>
                        <select
                            id="employees"
                            name="employees"
                            multiple
                            value={showtime.employeesIds}
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
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                        <label htmlFor="date" style={{ display: 'block', marginBottom: '8px' }}>
                            Дата
                        </label>
                        <input
                            id="date"
                            name="date"
                            type="date"
                            value={showtime.date}
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
                            value={showtime.startTime}
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
                            value={showtime.endTime}
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
                            value={showtime.ticketPrice}
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
                        {errors.ticketPrice && (
                            <span style={{ color: 'red' }}>{errors.ticketPrice}</span>
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

export default EditShowtimePage;