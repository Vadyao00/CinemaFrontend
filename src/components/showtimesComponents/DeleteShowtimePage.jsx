import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getShowtimeById, deleteShowtime } from '../../services/showtimes';

function DeleteShowtimePage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [showtime, setShowtime] = useState(null);

    useEffect(() => {
        const loadShowtime = async () => {
            try {
                const data = await getShowtimeById(id);
                setShowtime(data);
            } catch (error) {
                console.error("Failed to fetch showtime:", error);
            }
        };
        loadShowtime();
    }, [id]);

    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            await deleteShowtime(id);
            navigate('/showtimes');
        } catch (error) {
            console.error("Failed to delete showtime:", error);
        }
    };

    const handleCancel = () => {
        navigate('/showtimes');
    };

    if (!showtime) {
        return <p>Loading...</p>;
    }

    return (
        <div style={{ padding: '16px' }}>
            <h2>Удаление</h2>
            <h3>Вы уверены, что хотите удалить это?</h3>
            <div>
                <h4>Сеанс</h4>
                <hr />
                <dl style={{ marginBottom: '16px' }}>
                    <dt>Дата</dt>
                    <dd>{showtime.date}</dd>
                    <dt>Время начала</dt>
                    <dd>{showtime.startTime}</dd>
                    <dt>Время окончания</dt>
                    <dd>{showtime.endTime}</dd>
                    <dt>Цена билета</dt>
                    <dd>{showtime.ticketPrice}</dd>
                    <dt>Фильм (Название)</dt>
                    <dd>{showtime.movieTitle}</dd>
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

export default DeleteShowtimePage;