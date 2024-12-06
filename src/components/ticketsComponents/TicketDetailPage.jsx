import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTicketById } from '../../services/tickets';

function TicketDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [ticket, setTicket] = useState(null);

    useEffect(() => {
        const loadTicket = async () => {
            try {
                const data = await getTicketById(id);
                setTicket(data);
            } catch (error) {
                console.error('Failed to fetch ticket:', error);
            }
        };
        loadTicket();
    }, [id]);

    if (!ticket) {
        return <p>Загрузка...</p>;
    }

    return (
        <div style={{ padding: '16px' }}>
            <h2>Детали билета</h2>
            <div>
                <h4>Билет</h4>
                <hr />
                <dl style={{ lineHeight: '1.8em' }}>
                    <dt style={{ fontWeight: 'bold' }}>Номер билета (ID)</dt>
                    <dd>{ticket.ticketId}</dd>
                    <dt style={{ fontWeight: 'bold' }}>Номер места</dt>
                    <dd>{ticket.seatNumber} - {ticket.name}</dd>
                    <dt style={{ fontWeight: 'bold' }}>Дата покупки</dt>
                    <dd>{ticket.purchaseDate}</dd>
                </dl>
            </div>
            <div style={{ marginTop: '16px' }}>
                <button
                    onClick={() => navigate('/tickets')}
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
        </div>
    );
}

export default TicketDetailPage;