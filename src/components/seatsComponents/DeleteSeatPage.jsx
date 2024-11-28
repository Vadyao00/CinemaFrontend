import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getSeatById, deleteSeat } from '../../services/seats';

function DeleteSeatPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [seat, setSeat] = useState(null);

    useEffect(() => {
        const loadSeat = async () => {
            try {
                const data = await getSeatById(id);
                setSeat(data);
            } catch (error) {
                console.error("Failed to fetch seat:", error);
            }
        };
        loadSeat();
    }, [id]);

    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            await deleteSeat(id);
            navigate('/seats');
        } catch (error) {
            console.error("Failed to delete seat:", error);
        }
    };

    const handleCancel = () => {
        navigate('/seats');
    };

    if (!seat) {
        return <p>Загрузка...</p>;
    }

    return (
        <div style={{ padding: '16px' }}>
            <h2>Удаление места</h2>
            <h3>Вы уверены, что хотите удалить это место?</h3>
            <div>
                <h4>Детали места</h4>
                <hr />
                <dl style={{ marginBottom: '16px' }}>
                    <dt>Номер места</dt>
                    <dd>{seat.seatNumber || '-'}</dd>
                    <dt>Название сеанса</dt>
                    <dd>{seat.showtimeName || '-'}</dd>
                    <dt>Название события</dt>
                    <dd>{seat.eventName || '-'}</dd>
                    <dt>Занято</dt>
                    <dd>{seat.isOccupied ? 'Да' : 'Нет'}</dd>
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

export default DeleteSeatPage;