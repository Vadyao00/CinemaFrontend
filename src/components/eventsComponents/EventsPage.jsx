import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchEvents } from '../../services/events';
import '../../styles/ModelsPage.css';

function EventsPage() {
    const [events, setEvents] = useState([]);
    const [metaData, setMetaData] = useState();
    const [searchName, setSearchName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [orderBy, setOrderBy] = useState('Name');
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        loadEvents();
        checkUserRole();
    }, [searchName, startDate, endDate, orderBy, pageNumber, pageSize]);

    const loadEvents = async () => {
        const { data, metaData } = await fetchEvents({
            SearchName: searchName,
            StartDate: startDate,
            EndDate: endDate,
            OrderBy: orderBy,
            PageNumber: pageNumber,
            PageSize: pageSize,
        });
        setEvents(data);
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
        <div className="events-page">
            <h2>Мероприятия</h2>
            <div className="create-search-container">
                <div className="create-item-container">
                    {isAdmin && (
                        <Link to="/events/create" className="create-item-link">
                            Создать
                        </Link>
                    )}
                </div>

                <form className="search-form">
                    <div className="search-item">
                        <label htmlFor="searchName">Поиск по названию:</label>
                        <input
                            id="searchName"
                            type="text"
                            value={searchName}
                            onChange={(e) => setSearchName(e.target.value)}
                            placeholder="Введите название мероприятия"
                        />
                    </div>
                    <div className="search-item">
                        <label htmlFor="startDate">Начальная дата:</label>
                        <input
                            id="startDate"
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>
                    <div className="search-item">
                        <label htmlFor="endDate">Конечная дата:</label>
                        <input
                            id="endDate"
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>
                </form>
            </div>
            <table className="events-table">
                <thead>
                    <tr>
                        <th>
                            <button onClick={() => handleSort('Name')} className="sort-button">
                                Название
                            </button>
                        </th>
                        <th>Дата</th>
                        <th>Время начала</th>
                        <th>Время окончания</th>
                        <th>Цена билета</th>
                        <th>Работники</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {events.map((event) => (
                        <tr key={event.eventId}>
                            <td>{event.name}</td>
                            <td>{event.date}</td>
                            <td>{event.startTime}</td>
                            <td>{event.endTime}</td>
                            <td>${event.ticketPrice.toFixed(2)}</td>
                            <td>{event.employees}</td>
                            <td>
                                <Link to={`/events/detail/${event.eventId}`} className="action-link">
                                    Детально
                                </Link>
                                {isAdmin && (
                                    <>
                                        <Link
                                            to={`/events/update/${event.eventId}`}
                                            className="action-link"
                                        >
                                            Изменить
                                        </Link>
                                        <Link
                                            to={`/events/delete/${event.eventId}`}
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

export default EventsPage;