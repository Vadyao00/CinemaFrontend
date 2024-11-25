import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchMovies } from '../services/movies';
import '../styles/ModelsPage.css';

function MoviesPage() {
    const [movies, setMovies] = useState([]);
    const [metaData, setMetaData] = useState();
    const [searchTitle, setSearchTitle] = useState('');
    const [orderBy, setOrderBy] = useState('Title');
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        loadMovies();
        checkUserRole();
    }, [searchTitle, orderBy, pageNumber, pageSize]);

    const loadMovies = async () => {
        const { data, metaData } = await fetchMovies({
            SearchTitle: searchTitle,
            OrderBy: orderBy,
            PageNumber: pageNumber,
            PageSize: pageSize,
        });
        setMovies(data);
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
        <div className="movies-page">
            <h2>Movies</h2>

            <div className="create-movie-container">
                {isAdmin && (
                    <Link to="/movies/create" className="create-movie-link">
                        Create new Movie
                    </Link>
                )}
            </div>

            <form onChange={handleSearch} className="search-form">
                <div>
                    <label htmlFor="searchTitle">Search by Title:</label>
                    <input
                        id="searchTitle"
                        type="text"
                        value={searchTitle}
                        onChange={(e) => setSearchTitle(e.target.value)}
                        placeholder="Enter movie title"
                    />
                </div>
            </form>

            <table className="movies-table">
                <thead>
                    <tr>
                        <th>
                            <button onClick={() => handleSort('Title')} className="sort-button">
                                Title
                            </button>
                        </th>
                        <th>Genre</th>
                        <th>Duration</th>
                        <th>Production Company</th>
                        <th>Country</th>
                        <th>Age Restriction</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {movies.map((movie) => (
                        <tr key={movie.movieId}>
                            <td>{movie.title}</td>
                            <td>{movie.genreName}</td>
                            <td>{movie.duration}</td>
                            <td>{movie.productionCompany || 'N/A'}</td>
                            <td>{movie.country || 'N/A'}</td>
                            <td>{movie.ageRestriction || 'N/A'}</td>
                            <td>{movie.description || 'No description available'}</td>
                            <td>
                                <Link to={`/movies/detail/${movie.movieId}`} className="action-link">
                                    Details
                                </Link>
                                {isAdmin && (
                                    <>
                                        <Link
                                            to={`/movies/update/${movie.movieId}`}
                                            className="action-link"
                                        >
                                            Edit
                                        </Link>
                                        <Link
                                            to={`/movies/delete/${movie.movieId}`}
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

export default MoviesPage;