import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getTicketById, updateTicket } from '../../services/tickets';
import { fetchAllSeats } from '../../services/seats';

function EditTicketPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [ticket, setTicket] = useState({
        ticketId: '',
        seatId: '',
        purchaseDate: '',
    });
    const [seats, setSeats] = useState([]);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const loadTicket = async () => {
            try {
                const data = await getTicketById(id);
                setTicket({
                    ticketId: data.ticketId,
                    seatId: data.seatId || '',
                    purchaseDate: data.purchaseDate,
                });
            } catch (error) {
                console.error('Failed to fetch ticket:', error);
            }
        };
        loadTicket();
    }, [id]);

    useEffect(() => {
        const loadSeats = async () => {
            try {
                const dataSeats = await fetchAllSeats();
                setSeats(dataSeats);
            } catch (error) {
                console.error('Failed to fetch all seats:', error);
            }
        };
        loadSeats();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTicket((prevTicket) => ({
            ...prevTicket,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateTicket(ticket.ticketId, ticket);
            navigate('/tickets');
        } catch (error) {
            console.error('Failed to update ticket:', error);
            setErrors({ submit: 'Ошибка при сохранении изменений. Попробуйте снова.' });
        }
    };

    const handleCancel = () => {
        navigate('/tickets');
    };

    return (
        <div style={{ padding: '16px' }}>
            <h2>Редактировать билет</h2>
            <h4>Билет</h4>
            <hr />
            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                <form onSubmit={handleSubmit}>
                    {errors.submit && (
                        <div style={{ color: 'red', marginBottom: '16px' }}>{errors.submit}</div>
                    )}
                    <div style={{ marginBottom: '16px' }}>
                        <label htmlFor="purchaseDate" style={{ display: 'block', marginBottom: '8px' }}>
                            Дата покупки
                        </label>
                        <input
                            id="purchaseDate"
                            name="purchaseDate"
                            type="date"
                            value={ticket.purchaseDate}
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
                        {errors.purchaseDate && <span style={{ color: 'red' }}>{errors.purchaseDate}</span>}
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                        <label htmlFor="seatId" style={{ display: 'block', marginBottom: '8px' }}>
                            Место
                        </label>
                        <select
                            id="seatId"
                            name="seatId"
                            value={ticket.seatId}
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
                            <option value="">Выберите место</option>
                            {seats.map((seat) => (
                                <option key={seat.seatId} value={seat.seatId}>
                                    Место {seat.seatNumber}
                                </option>
                            ))}
                        </select>
                        {errors.seatId && <span style={{ color: 'red' }}>{errors.seatId}</span>}
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

export default EditTicketPage;