import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getShowtimeById } from '../../services/showtimes';

function ShowtimeDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [showtime, setShowtime] = useState(null);

    useEffect(() => {
        const loadShowtime = async () => {
            try {
                const data = await getShowtimeById(id);
                setShowtime(data);
            } catch (error) {
                console.error('Failed to fetch showtime:', error);
            }
        };
        loadShowtime();
    }, [id]);

    if (!showtime) {
        return <p>Loading...</p>;
    }

    return (
        <div style={{ padding: '16px' }}>
            <h2>Детально</h2>
            <div>
                <h4>Сеанс</h4>
                <hr />
                <dl style={{ lineHeight: '1.8em' }}>
                    <dt style={{ fontWeight: 'bold' }}>Номер (Id)</dt>
                    <dd>{showtime.showtimeId}</dd>
                    <dt style={{ fontWeight: 'bold' }}>Дата</dt>
                    <dd>{showtime.date}</dd>
                    <dt style={{ fontWeight: 'bold' }}>Время начала</dt>
                    <dd>{showtime.startTime}</dd>
                    <dt style={{ fontWeight: 'bold' }}>Время окончания</dt>
                    <dd>{showtime.endTime}</dd>
                    <dt style={{ fontWeight: 'bold' }}>Цена билета</dt>
                    <dd>{showtime.ticketPrice}</dd>
                    <dt style={{ fontWeight: 'bold' }}>Фильм (Название)</dt>
                    <dd>{showtime.movieTitle}</dd>
                    <dt style={{ fontWeight: 'bold' }}>Работники</dt>
                    <dd>{showtime.employees}</dd>
                </dl>
            </div>
            <div style={{ marginTop: '16px' }}>
                <button
                    onClick={() => navigate('/showtimes')}
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

export default ShowtimeDetailPage;