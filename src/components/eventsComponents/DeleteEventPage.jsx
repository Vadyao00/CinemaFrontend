import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getEventById, deleteEvent } from '../../services/events';

function DeleteEventPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);

    useEffect(() => {
        const loadEvent = async () => {
            try {
                const data = await getEventById(id);
                setEvent(data);
            } catch (error) {
                console.error("Failed to fetch event:", error);
            }
        };
        loadEvent();
    }, [id]);

    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            await deleteEvent(id);
            navigate('/events');
        } catch (error) {
            console.error("Failed to delete event:", error);
        }
    };

    const handleCancel = () => {
        navigate('/events');
    };

    if (!event) {
        return <p>Loading...</p>;
    }

    return (
        <div style={{ padding: '16px' }}>
            <h2>Удаление</h2>
            <h3>Вы уверены, что хотите удалить это событие?</h3>
            <div>
                <h4>Событие</h4>
                <hr />
                <dl style={{ marginBottom: '16px' }}>
                    <dt>Название</dt>
                    <dd>{event.name}</dd>
                    <dt>Дата</dt>
                    <dd>{event.date}</dd>
                    <dt>Время начала</dt>
                    <dd>{event.startTime}</dd>
                    <dt>Время окончания</dt>
                    <dd>{event.endTime}</dd>
                    <dt>Цена билета</dt>
                    <dd>{event.ticketPrice}</dd>
                </dl>
                <form onSubmit={handleDelete}>
                    <button
                        type="submit"
                        style={{
                            maxWidth: '140px',
                            marginRight: '8px',
                            padding: '8px 16px',
                            background: 'red',
                            color: 'white',
                            border: 'none',
                            cursor: 'pointer',
                        }}
                    >
                        Удалить
                    </button>
                    <button
                        type="button"
                        onClick={handleCancel}
                        style={{
                            maxWidth: '140px',
                            padding: '8px 16px',
                            background: '#ccc',
                            color: 'black',
                            border: 'none',
                            cursor: 'pointer',
                        }}
                    >
                        Вернуться к списку
                    </button>
                </form>
            </div>
        </div>
    );
}

export default DeleteEventPage;