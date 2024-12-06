import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchTickets } from '../../services/tickets';
import '../../styles/ModelsPage.css';

function TicketsPage() {
    const [tickets, setTickets] = useState([]);
    const [metaData, setMetaData] = useState();
    const [orderBy, setOrderBy] = useState('PurchaseDate');
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        loadTickets();
        checkUserRole();
    }, [orderBy, pageNumber, pageSize]);

    const loadTickets = async () => {
        const { data, metaData } = await fetchTickets({
            OrderBy: orderBy,
            PageNumber: pageNumber,
            PageSize: pageSize,
        });
        setTickets(data);
        setMetaData(metaData);
    };

    const checkUserRole = () => {
        const role = localStorage.getItem('userRole');
        setIsAdmin(role === 'Administrator');
    };

    const handleSort = (field) => {
        setOrderBy((prevOrderBy) => {
            if (prevOrderBy === `${field} desc`) {
                return `${field} asc`;
            } else {
                return `${field} desc`;
            }
        });
    };

    const handlePageChange = (newPage) => {
        setPageNumber(newPage);
    };

    return (
        <div className="tickets-page">
            <h2>Билеты</h2>

            <div className="create-item-container">
                {isAdmin && (
                    <Link to="/tickets/create" className="create-item-link">
                        Создать
                    </Link>
                )}
            </div>

            <table className="tickets-table">
                <thead>
                    <tr>
                        <th>Номер места</th>
                        <th>
                            <button onClick={() => handleSort('PurchaseDate')} className="sort-button">
                                Дата
                            </button>
                        </th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {tickets.map((ticket) => (
                        <tr key={ticket.ticketId}>
                            <td>{ticket.seatNumber} - {ticket.name}</td>
                            <td>{ticket.purchaseDate}</td>
                            <td>
                                <Link to={`/tickets/detail/${ticket.ticketId}`} className="action-link">
                                    Детально
                                </Link>
                                {isAdmin && (
                                    <>
                                        <Link
                                            to={`/tickets/update/${ticket.ticketId}`}
                                            className="action-link"
                                        >
                                            Изменить
                                        </Link>
                                        <Link
                                            to={`/tickets/delete/${ticket.ticketId}`}
                                            className="action-link delete"
                                        >
                                            Удалить
                                        </Link>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {metaData && (
                <div className="pagination">
                    <button
                        onClick={() => handlePageChange(metaData.CurrentPage - 1)}
                        disabled={!metaData.HasPrevious}
                    >
                        &laquo; Previous
                    </button>
                    <span>
                        Page {metaData.CurrentPage} of {metaData.TotalPages}
                    </span>
                    <button
                        onClick={() => handlePageChange(metaData.CurrentPage + 1)}
                        disabled={!metaData.HasNext}
                    >
                        Next &raquo;
                    </button>
                </div>
            )}
        </div>
    );
}

export default TicketsPage;