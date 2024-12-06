import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAllMovies } from '../../services/movies';
import { fetchAllEmployees } from '../../services/employees';
import { createShowtime } from '../../services/showtimes';
import '../../styles/CreateShowtimePage.css';

function CreateShowtimePage() {
    const [movieId, setMovieId] = useState('');
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [ticketPrice, setTicketPrice] = useState('');
    const [employeesIds, setEmployeesIds] = useState([]);
    const [movies, setMovies] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const loadMoviesAndEmployees = async () => {
            try {
                const [dataMovies, dataEmployees] = await Promise.all([
                    fetchAllMovies(),
                    fetchAllEmployees(),
                ]);
                setMovies(dataMovies);
                setEmployees(dataEmployees);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };
        loadMoviesAndEmployees();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const newShowtime = {
            date,
            startTime,
            endTime,
            ticketPrice: ticketPrice && parseFloat(ticketPrice),
            employeesIds,
        };

        try {
            await createShowtime(movieId, newShowtime);
            navigate('/showtimes');
        } catch (error) {
            console.error('Failed to create showtime:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEmployeesChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions);
        const selectedIds = selectedOptions.map((option) => option.value);
        setEmployeesIds(selectedIds);
    };

    return (
        <div className="create-showtime-page">
            <h2>Добавить новый сеанс</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="movieId">Фильм:</label>
                    <select
                        id="movieId"
                        value={movieId}
                        onChange={(e) => setMovieId(e.target.value)}
                        required
                        className="form-control"
                    >
                        <option value="">Выберите фильм</option>
                        {movies.map((movie) => (
                            <option key={movie.movieId} value={movie.movieId}>
                                {movie.title}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="employees">Сотрудники:</label>
                    <select
                        id="employees"
                        multiple
                        value={employeesIds}
                        onChange={handleEmployeesChange}
                        className="form-control"
                        style={{ height: '120px' }}
                    >
                        {employees.map((employee) => (
                            <option key={employee.employeeId} value={employee.employeeId}>
                                {employee.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="date">Дата сеанса:</label>
                    <input
                        id="date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="startTime">Время начала:</label>
                    <input
                        id="startTime"
                        type="time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        required
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="endTime">Время окончания:</label>
                    <input
                        id="endTime"
                        type="time"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        required
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="ticketPrice">Цена билета:</label>
                    <input
                        id="ticketPrice"
                        type="number"
                        value={ticketPrice}
                        onChange={(e) => setTicketPrice(e.target.value)}
                        min="0"
                        step="0.01"
                        required
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <button type="submit" disabled={isSubmitting} className="submit-button">
                        {isSubmitting ? 'Добавление...' : 'Добавить сеанс'}
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/showtimes')}
                        className="cancel-button"
                    >
                        Вернуться к списку
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CreateShowtimePage;