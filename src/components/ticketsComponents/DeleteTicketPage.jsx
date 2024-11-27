import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getTicketById, deleteTicket } from '../../services/tickets';

function DeleteTicketPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [ticket, setTicket] = useState(null);

    useEffect(() => {
        const loadTicket = async () => {
            try {
                const data = await getTicketById(id);
                setTicket(data);
            } catch (error) {
                console.error("Failed to fetch ticket:", error);
            }
        };
        loadTicket();
    }, [id]);

    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            await deleteTicket(id);
            navigate('/tickets');
        } catch (error) {
            console.error("Failed to delete ticket:", error);
        }
    };

    const handleCancel = () => {
        navigate('/tickets');
    };

    if (!ticket) {
        return <p>Загрузка...</p>;
    }

    return (
        <div style={{ padding: '16px' }}>
            <h2>Удаление билета</h2>
            <h3>Вы уверены, что хотите удалить этот билет?</h3>
            <div>
                <h4>Билет</h4>
                <hr />
                <dl style={{ marginBottom: '16px' }}>
                    <dt>Номер места</dt>
                    <dd>{ticket.seatNumber}</dd>
                    <dt>Дата покупки</dt>
                    <dd>{ticket.purchaseDate}</dd>
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

export default DeleteTicketPage;