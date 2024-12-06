import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchSeats } from '../../services/seats';
import '../../styles/ModelsPage.css';

function SeatsPage() {
    const [seats, setSeats] = useState([]);
    const [metaData, setMetaData] = useState();
    const [searchEventName, setSearchEventName] = useState('');
    const [searchShowtimeName, setSearchShowtimeName] = useState('');
    const [orderBy, setOrderBy] = useState('SeatNumber');
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        loadSeats();
        checkUserRole();
    }, [searchEventName, searchShowtimeName, orderBy, pageNumber, pageSize]);

    const loadSeats = async () => {
        const { data, metaData } = await fetchSeats({
            SearchEventName: searchEventName,
            SearchShowtimeName: searchShowtimeName,
            OrderBy: orderBy,
            PageNumber: pageNumber,
            PageSize: pageSize,
        });
        setSeats(data);
        setMetaData(metaData);
    };

    const checkUserRole = () => {
        const role = localStorage.getItem('userRole');
        setIsAdmin(role === 'Administrator');
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setPageNumber(1);
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
        <div className="seats-page">
            <h2>Места</h2>
            <div className="create-search-container">
            <div className="create-item-container">
                {isAdmin && (
                    <Link to="/seats/create" className="create-item-link">
                        Создать
                    </Link>
                )}
            </div>

            <form onChange={handleSearch} className="search-form">
                <div>
                    <label htmlFor="searchEventName">Поиск по названию мероприятия:</label>
                    <input
                        id="searchEventName"
                        type="text"
                        value={searchEventName}
                        onChange={(e) => setSearchEventName(e.target.value)}
                        placeholder="Введите название мероприятия"
                    />
                </div>
                <div>
                    <label htmlFor="searchShowtimeName">Поиск по названию сеанса:</label>
                    <input
                        id="searchShowtimeName"
                        type="text"
                        value={searchShowtimeName}
                        onChange={(e) => setSearchShowtimeName(e.target.value)}
                        placeholder="Введите название сеанса"
                    />
                </div>
            </form>
            </div>
            <table className="seats-table">
                <thead>
                    <tr>
                        <th>
                            <button onClick={() => handleSort('SeatNumber')} className="sort-button">
                                Номер места
                            </button>
                        </th>
                        <th>Название сеанса</th>
                        <th>Название мероприятия</th>
                        <th>Занято</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {seats.map((seat) => (
                        <tr key={seat.seatId}>
                            <td>{seat.seatNumber || 'N/A'}</td>
                            <td>{seat.showtimeName ? seat.showtimeName : <em>-</em>}</td>
                            <td>{seat.eventName ? seat.eventName : <em>-</em>}</td>
                            <td>{seat.isOccupied ? 'Yes' : 'No'}</td>
                            <td>
                                <Link to={`/seats/detail/${seat.seatId}`} className="action-link">
                                    Детально
                                </Link>
                                {isAdmin && (
                                    <>
                                        <Link
                                            to={`/seats/update/${seat.seatId}`}
                                            className="action-link"
                                        >
                                            Изменить
                                        </Link>
                                        <Link
                                            to={`/seats/delete/${seat.seatId}`}
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

export default SeatsPage;