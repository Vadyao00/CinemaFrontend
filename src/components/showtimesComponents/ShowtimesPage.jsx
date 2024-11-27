import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchShowtimes } from '../../services/showtimes';
import '../../styles/ModelsPage.css';

function ShowtimesPage() {
    const [showtimes, setShowtimes] = useState([]);
    const [metaData, setMetaData] = useState();
    const [searchTitle, setSearchTitle] = useState('');
    const [orderBy, setOrderBy] = useState('Date');
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        loadShowtimes();
        checkUserRole();
    }, [searchTitle, orderBy, pageNumber, pageSize]);

    const loadShowtimes = async () => {
        const { data, metaData } = await fetchShowtimes({
            SearchTitle: searchTitle,
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
            <h2>Showtimes</h2>

            <div className="create-showtime-container">
                {isAdmin && (
                    <Link to="/showtimes/create" className="create-showtime-link">
                        Create new Showtime
                    </Link>
                )}
            </div>

            <form onChange={handleSearch} className="search-form">
                <div>
                    <label htmlFor="searchTitle">Search by Movie Title:</label>
                    <input
                        id="searchTitle"
                        type="text"
                        value={searchTitle}
                        onChange={(e) => setSearchTitle(e.target.value)}
                        placeholder="Enter movie title"
                    />
                </div>
            </form>

            <table className="showtimes-table">
                <thead>
                    <tr>
                        <th>
                            <button onClick={() => handleSort('Date')} className="sort-button">
                                Date
                            </button>
                        </th>
                        <th>
                            <button onClick={() => handleSort('StartTime')} className="sort-button">
                                Start Time
                            </button>
                        </th>
                        <th>
                            <button onClick={() => handleSort('EndTime')} className="sort-button">
                                End Time
                            </button>
                        </th>
                        <th>
                            <button onClick={() => handleSort('TicketPrice')} className="sort-button">
                                Ticket Price
                            </button>
                        </th>
                        <th>Movie Title</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {showtimes.map((showtime) => (
                        <tr key={showtime.showtimeId}>
                            <td>{showtime.date}</td>
                            <td>{showtime.startTime}</td>
                            <td>{showtime.endTime}</td>
                            <td>{showtime.ticketPrice}</td>
                            <td>{showtime.movieTitle || 'N/A'}</td>
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