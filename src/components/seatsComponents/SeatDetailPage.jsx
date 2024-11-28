import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSeatById } from '../../services/seats';

function SeatDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [seat, setSeat] = useState(null);

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

    if (!seat) {
        return <p>Загрузка...</p>;
    }

    return (
        <div style={{ padding: '16px' }}>
            <h2>Детали места</h2>
            <div>
                <h4>Информация о месте</h4>
                <hr />
                <dl style={{ lineHeight: '1.8em' }}>
                    <dt style={{ fontWeight: 'bold' }}>Номер места (ID)</dt>
                    <dd>{seat.seatId}</dd>
                    <dt style={{ fontWeight: 'bold' }}>Номер места</dt>
                    <dd>{seat.seatNumber || '-'}</dd>
                    <dt style={{ fontWeight: 'bold' }}>Название сеанса</dt>
                    <dd>{seat.showtimeName || '-'}</dd>
                    <dt style={{ fontWeight: 'bold' }}>Название события</dt>
                    <dd>{seat.eventName || '-'}</dd>
                    <dt style={{ fontWeight: 'bold' }}>Занято</dt>
                    <dd>{seat.isOccupied ? 'Да' : 'Нет'}</dd>
                </dl>
            </div>
            <div style={{ marginTop: '16px' }}>
                <button
                    onClick={() => navigate('/seats')}
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

export default SeatDetailPage;