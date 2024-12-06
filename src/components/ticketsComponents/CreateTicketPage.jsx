import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAllSeats } from '../../services/seats';
import { createTicket } from '../../services/tickets';
import '../../styles/CreateTicketPage.css';

function CreateTicketPage() {
    const [seatId, setSeatId] = useState('');
    const [purchaseDate, setPurchaseDate] = useState('');
    const [seats, setSeats] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const loadSeats = async () => {
            try {
                const dataSeats = await fetchAllSeats();
                setSeats(dataSeats);
            } catch (error) {
                console.error('Failed to fetch seats:', error);
            }
        };
        loadSeats();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const newTicket = {
            purchaseDate,
        };

        try {
            await createTicket(seatId, newTicket);
            navigate('/tickets');
        } catch (error) {
            console.error('Failed to create ticket:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="create-ticket-page">
            <h2>Добавить новый билет</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="purchaseDate">Дата покупки:</label>
                    <input
                        id="purchaseDate"
                        type="date"
                        value={purchaseDate}
                        onChange={(e) => setPurchaseDate(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="seatId">Место:</label>
                    <select
                        id="seatId"
                        value={seatId}
                        onChange={(e) => setSeatId(e.target.value)}
                        required
                    >
                        <option value="">Выберите место</option>
                        {seats.map((seat) => (
                            <option key={seat.seatId} value={seat.seatId}>
                                Место {seat.seatNumber} - {seat.eventName ? seat.eventName : seat.showtimeName}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Добавление...' : 'Добавить билет'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CreateTicketPage;