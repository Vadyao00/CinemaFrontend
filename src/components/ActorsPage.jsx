import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchActors } from '../services/actors';
import '../styles/ModelsPage.css';

function ActorsPage() {
    const [actors, setActors] = useState([]);
    const [metaData, setMetaData] = useState();
    const [searchName, setSearchName] = useState('');
    const [orderBy, setOrderBy] = useState('Name');
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        loadActors();
        checkUserRole();
    }, [searchName, orderBy, pageNumber, pageSize]);

    const loadActors = async () => {
        const { data, metaData } = await fetchActors({
            SearchName: searchName,
            OrderBy: orderBy,
            PageNumber: pageNumber,
            PageSize: pageSize,
        });
        setActors(data);
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
        <div className="actors-page">
            <h2>Actors</h2>

            <div className="create-actor-container">
                {isAdmin && (
                    <Link to="/actors/create" className="create-actor-link">
                        Create new Actor
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
                        placeholder="Enter actor name"
                    />
                </div>
            </form>

            <table className="actors-table">
                <thead>
                    <tr>
                        <th>
                            <button onClick={() => handleSort('Name')} className="sort-button">
                                Name
                            </button>
                        </th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {actors.map((actor) => (
                        <tr key={actor.actorId}>
                            <td>{actor.name}</td>
                            <td>
                                <Link to={`/actors/detail/${actor.actorId}`} className="action-link">
                                    Details
                                </Link>
                                {isAdmin && (
                                    <>
                                        <Link
                                            to={`/actors/update/${actor.actorId}`}
                                            className="action-link"
                                        >
                                            Edit
                                        </Link>
                                        <Link
                                            to={`/actors/delete/${actor.actorId}`}
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

export default ActorsPage;