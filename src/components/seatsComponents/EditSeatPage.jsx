import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSeatById, updateSeat } from '../../services/seats';
import { fetchAllEvents } from '../../services/events';
import { fetchAllShowtimes } from '../../services/showtimes';

function EditSeatPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [seat, setSeat] = useState({
        seatId: '',
        seatNumber: '',
        eventId: null,
        showtimeId: null,
        isOccupied: false,
    });
    const [events, setEvents] = useState([]);
    const [showtimes, setShowtimes] = useState([]);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const loadSeat = async () => {
            try {
                const data = await getSeatById(id);
                setSeat(data);
            } catch (error) {
                console.error('Failed to fetch seat:', error);
            }
        };
        loadSeat();
    }, [id]);

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

    const handleChange = (e) => {
        const { name, value } = e.target;

        setSeat((prevSeat) => {
            let updatedSeat = { ...prevSeat, [name]: value };

            if (name === 'eventId') {
                updatedSeat.showtimeId = value ? null : prevSeat.showtimeId;
            }

            if (name === 'showtimeId') {
                updatedSeat.eventId = value ? null : prevSeat.eventId;
            }

            return updatedSeat;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateSeat(seat.seatId, seat);
            navigate('/seats');
        } catch (error) {
            console.error('Failed to update seat:', error);
            setErrors({ submit: 'Ошибка при сохранении изменений. Попробуйте снова.' });
        }
    };

    const handleCancel = () => {
        navigate('/seats');
    };

    return (
        <div style={{ padding: '16px' }}>
            <h2>Редактировать место</h2>
            <h4>Детали места</h4>
            <hr />
            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                <form onSubmit={handleSubmit}>
                    {errors.submit && (
                        <div style={{ color: 'red', marginBottom: '16px' }}>{errors.submit}</div>
                    )}

                    <div style={{ marginBottom: '16px' }}>
                        <label htmlFor="seatNumber" style={{ display: 'block', marginBottom: '8px' }}>
                            Номер места
                        </label>
                        <input
                            id="seatNumber"
                            name="seatNumber"
                            type="text"
                            value={seat.seatNumber}
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
                        <label htmlFor="eventId" style={{ display: 'block', marginBottom: '8px' }}>
                            Событие
                        </label>
                        <select
                            id="eventId"
                            name="eventId"
                            value={seat.eventId || ''}
                            onChange={handleChange}
                            className="form-control"
                            style={{
                                width: '100%',
                                padding: '8px',
                                boxSizing: 'border-box',
                                borderRadius: '4px',
                                border: '1px solid #ccc',
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

                    <div style={{ marginBottom: '16px' }}>
                        <label htmlFor="showtimeId" style={{ display: 'block', marginBottom: '8px' }}>
                            Сеанс
                        </label>
                        <select
                            id="showtimeId"
                            name="showtimeId"
                            value={seat.showtimeId || ''}
                            onChange={handleChange}
                            className="form-control"
                            style={{
                                width: '100%',
                                padding: '8px',
                                boxSizing: 'border-box',
                                borderRadius: '4px',
                                border: '1px solid #ccc',
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

                    <div style={{ marginBottom: '16px' }}>
                        <label htmlFor="isOccupied" style={{ display: 'block', marginBottom: '8px' }}>
                            Занято
                        </label>
                        <input
                            id="isOccupied"
                            name="isOccupied"
                            type="checkbox"
                            checked={seat.isOccupied}
                            onChange={(e) =>
                                setSeat((prevSeat) => ({
                                    ...prevSeat,
                                    isOccupied: e.target.checked,
                                }))
                            }
                            style={{
                                marginRight: '8px',
                            }}
                        />
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

export default EditSeatPage;