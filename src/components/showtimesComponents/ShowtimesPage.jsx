import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchShowtimes } from '../../services/showtimes';
import '../../styles/ModelsPage.css';

function ShowtimesPage() {
    const [showtimes, setShowtimes] = useState([]);
    const [metaData, setMetaData] = useState();
    const [searchTitle, setSearchTitle] = useState('');
    const [searchTicketPrice, setSearchTicketPrice] = useState('');
    const [searchMonth, setSearchMonth] = useState('');
    const [orderBy, setOrderBy] = useState('Date');
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        loadShowtimes();
        checkUserRole();
    }, [searchTitle, searchTicketPrice, searchMonth, orderBy, pageNumber, pageSize]);

    const loadShowtimes = async () => {
        const { data, metaData } = await fetchShowtimes({
            SearchTitle: searchTitle,
            SearchTicketPrice: searchTicketPrice,
            SearchMonth: searchMonth,
            OrderBy: orderBy,
            PageNumber: pageNumber,
            PageSize: pageSize,
        });
        setShowtimes(data);
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
        <div className="showtimes-page">
            <h2>Сеансы</h2>
            <div className="create-search-container">
            <div className="create-item-container">
                {isAdmin && (
                    <Link to="/showtimes/create" className="create-item-link">
                        Создать
                    </Link>
                )}
            </div>

            <form onSubmit={handleSearch} className="search-form">
                <div>
                    <label htmlFor="searchTitle">Поиск по названию фильма:</label>
                    <input
                        id="searchTitle"
                        type="text"
                        value={searchTitle}
                        onChange={(e) => setSearchTitle(e.target.value)}
                        placeholder="Введите название фильма"
                    />
                </div>
                <div>
                    <label htmlFor="searchTicketPrice">Поиск по цене билета:</label>
                    <input
                        id="searchTicketPrice"
                        type="number"
                        value={searchTicketPrice}
                        onChange={(e) => setSearchTicketPrice(e.target.value)}
                        placeholder="Введите цену"
                    />
                </div>
                <div>
                    <label htmlFor="searchMonth">Поиск по месяцу:</label>
                    <input
                        id="searchMonth"
                        type="number"
                        min="1"
                        max="12"
                        value={searchMonth}
                        onChange={(e) => setSearchMonth(e.target.value)}
                        placeholder="Введите месяц (1-12)"
                    />
                </div>
            </form>
            </div>
            <table className="showtimes-table">
                <thead>
                    <tr>
                        <th>
                            <button onClick={() => handleSort('Date')} className="sort-button">
                                Дата
                            </button>
                        </th>
                        <th>
                            <button onClick={() => handleSort('StartTime')} className="sort-button">
                                Время начала
                            </button>
                        </th>
                        <th>
                            <button onClick={() => handleSort('EndTime')} className="sort-button">
                                Время окончания
                            </button>
                        </th>
                        <th>
                            <button onClick={() => handleSort('TicketPrice')} className="sort-button">
                                Цена билета
                            </button>
                        </th>
                        <th>Название фильма</th>
                        <th>Работники</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {showtimes.map((showtime) => (
                        <tr key={showtime.showtimeId}>
                            <td>{showtime.date}</td>
                            <td>{showtime.startTime}</td>
                            <td>{showtime.endTime}</td>
                            <td>{showtime.ticketPrice}</td>
                            <td>{showtime.movieTitle || '-'}</td>
                            <td>{showtime.employees || '-'}</td>
                            <td>
                                <Link to={`/showtimes/detail/${showtime.showtimeId}`} className="action-link">
                                    Details
                                </Link>
                                {isAdmin && (
                                    <>
                                        <Link
                                            to={`/showtimes/update/${showtime.showtimeId}`}
                                            className="action-link"
                                        >
                                            Edit
                                        </Link>
                                        <Link
                                            to={`/showtimes/delete/${showtime.showtimeId}`}
                                            className="action-link delete"
                                        >
                                            Delete
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

export default ShowtimesPage;