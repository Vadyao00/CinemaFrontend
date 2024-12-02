import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEventById } from '../../services/events';

function EventDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);

    useEffect(() => {
        const loadEvent = async () => {
            try {
                const data = await getEventById(id);
                setEvent(data);
            } catch (error) {
                console.error('Failed to fetch event:', error);
            }
        };
        loadEvent();
    }, [id]);

    if (!event) {
        return <p>Loading...</p>;
    }

    return (
        <div style={{ padding: '16px' }}>
            <h2>Детально</h2>
            <div>
                <h4>Событие</h4>
                <hr />
                <dl style={{ lineHeight: '1.8em' }}>
                    <dt style={{ fontWeight: 'bold' }}>Номер(Id)</dt>
                    <dd>{event.eventId}</dd>
                    <dt style={{ fontWeight: 'bold' }}>Название</dt>
                    <dd>{event.name}</dd>
                    <dt style={{ fontWeight: 'bold' }}>Дата</dt>
                    <dd>{event.date}</dd>
                    <dt style={{ fontWeight: 'bold' }}>Время начала</dt>
                    <dd>{event.startTime}</dd>
                    <dt style={{ fontWeight: 'bold' }}>Время окончания</dt>
                    <dd>{event.endTime}</dd>
                    <dt style={{ fontWeight: 'bold' }}>Цена билета</dt>
                    <dd>{event.ticketPrice}</dd>
                    <dt style={{ fontWeight: 'bold' }}>Работники</dt>
                    <dd>{event.employees}</dd>
                </dl>
            </div>
            <div style={{ marginTop: '16px' }}>
                <button
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
        </div>
    );
}

export default EventDetailPage;