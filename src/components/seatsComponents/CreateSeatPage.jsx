import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAllEvents } from '../../services/events';
import { fetchAllShowtimes } from '../../services/showtimes';
import { createSeatForEvent, createSeatForShowtime } from '../../services/seats';
import '../../styles/CreateSeatPage.css';

function CreateSeatPage() {
    const [seatNumber, setSeatNumber] = useState('');
    const [eventId, setEventId] = useState('');
    const [showtimeId, setShowtimeId] = useState('');
    const [isOccupied, setIsOccupied] = useState(false);
    const [events, setEvents] = useState([]);
    const [showtimes, setShowtimes] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const loadEvents = async () => {
            try {
                const dataEvents = await fetchAllEvents();
                setEvents(dataEvents);
            } catch (error) {
                console.error('Failed to fetch all events:', error);
            }
        };
        loadEvents();
    }, []);

    useEffect(() => {
        const loadShowtimes = async () => {
            try {
                const dataShowtimes = await fetchAllShowtimes();
                setShowtimes(dataShowtimes);
            } catch (error) {
                console.error('Failed to fetch all showtimes:', error);
            }
        };
        loadShowtimes();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const newSeat = {
            seatNumber,
            isOccupied,
        };

        try {
            if (eventId) {
                await createSeatForEvent(eventId, newSeat);
            } else if (showtimeId) {
                await createSeatForShowtime(showtimeId, newSeat);
            } else {
                setErrors({ submit: 'Пожалуйста, выберите событие или сеанс.' });
                return;
            }

            navigate('/seats');
        } catch (error) {
            console.error('Failed to create seat:', error);
            setErrors({ submit: 'Ошибка при сохранении. Попробуйте снова.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        navigate('/seats');
    };

    return (
        <div className="create-seat-page">
            <h2>Добавить новое место</h2>
            {errors.submit && (
                <div style={{ color: 'red', marginBottom: '16px' }}>{errors.submit}</div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="seatNumber">Номер места:</label>
                    <input
                        id="seatNumber"
                        type="text"
                        value={seatNumber}
                        onChange={(e) => setSeatNumber(e.target.value)}
                        placeholder="Введите номер места"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="eventId">Событие:</label>
                    <select
                        id="eventId"
                        value={eventId}
                        onChange={(e) => {
                            setEventId(e.target.value);
                            setShowtimeId('');
                        }}
                    >
                        <option value="">Выберите событие</option>
                        {events.map((event) => (
                            <option key={event.eventId} value={event.eventId}>
                                {event.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="showtimeId">Сеанс:</label>
                    <select
                        id="showtimeId"
                        value={showtimeId}
                        onChange={(e) => {
                            setShowtimeId(e.target.value);
                            setEventId('');
                        }}
                    >
                        <option value="">Выберите сеанс</option>
                        {showtimes.map((showtime) => (
                            <option key={showtime.showtimeId} value={showtime.showtimeId}>
                                {showtime.movieTitle}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="isOccupied">
                        Занято:
                        <input
                            id="isOccupied"
                            type="checkbox"
                            checked={isOccupied}
                            onChange={(e) => setIsOccupied(e.target.checked)}
                        />
                    </label>
                </div>

                <div className="form-actions">
                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Добавление...' : 'Добавить место'}
                    </button>
                    <button type="button" onClick={handleCancel} className="cancel-button">
                        Отменить
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CreateSeatPage;