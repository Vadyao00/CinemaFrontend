import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchEvents } from '../../services/events';
import '../../styles/ModelsPage.css';

function EventsPage() {
    const [events, setEvents] = useState([]);
    const [metaData, setMetaData] = useState();
    const [searchName, setSearchName] = useState('');
    const [orderBy, setOrderBy] = useState('Name');
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        loadEvents();
        checkUserRole();
    }, [searchName, orderBy, pageNumber, pageSize]);

    const loadEvents = async () => {
        const { data, metaData } = await fetchEvents({
            SearchName: searchName,
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
        <div className="events-page">
            <h2>Events</h2>

            <div className="create-event-container">
                {isAdmin && (
                    <Link to="/events/create" className="create-event-link">
                        Create new Event
                    </Link>
                )}
            </div>

            <form onChange={handleSearch} className="search-form">
                <div>
                    <label htmlFor="searchName">Search by Name:</label>
                    <input
                        id="searchName"
                        type="text"
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                        placeholder="Enter event name"
                    />
                </div>
            </form>

            <table className="events-table">
                <thead>
                    <tr>
                        <th>
                            <button onClick={() => handleSort('Name')} className="sort-button">
                                Name
                            </button>
                        </th>
                        <th>Date</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Ticket Price</th>
                        <th>Работники</th>
                        <th>Actions</th>
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
                                    Details
                                </Link>
                                {isAdmin && (
                                    <>
                                        <Link
                                            to={`/events/update/${event.eventId}`}
                                            className="action-link"
                                        >
                                            Edit
                                        </Link>
                                        <Link
                                            to={`/events/delete/${event.eventId}`}
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

export default EventsPage;
