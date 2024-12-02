import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchMovies } from '../../services/movies';
import '../../styles/ModelsPage.css';

function MoviesPage() {
    const [movies, setMovies] = useState([]);
    const [metaData, setMetaData] = useState();
    const [searchTitle, setSearchTitle] = useState('');
    const [searchProductionCompany, setSearchProductionCompany] = useState('');
    const [orderBy, setOrderBy] = useState('Title');
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        loadMovies();
        checkUserRole();
    }, [searchTitle, searchProductionCompany, orderBy, pageNumber, pageSize]);

    const loadMovies = async () => {
        const { data, metaData } = await fetchMovies({
            SearchTitle: searchTitle,
            SearchProductionCompany: searchProductionCompany,
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

    const handleSort = () => {
        setOrderBy((prevOrderBy) => {
            if (prevOrderBy === `Title desc`) {
                return `Title asc`;
            } else {
                return `Title desc`;
            }
        });
    };

    const handlePageChange = (newPage) => {
        setPageNumber(newPage);
    };

    return (
        <div className="movies-page">
            <h2>Фильмы</h2>
            <div className="create-search-container">
                <div className="create-item-container">
                    {isAdmin && (
                        <Link to="/movies/create" className="create-item-link">
                            Создать
                        </Link>
                    )}
                </div>

            <form className="search-form">
                <div>
                    <label htmlFor="searchTitle">Поиск по названию:</label>
                    <input
                        id="searchTitle"
                        type="text"
                        value={searchTitle}
                        onChange={(e) => {
                            setSearchTitle(e.target.value);
                            setPageNumber(1);
                        }}
                        placeholder="Введите название фильма"
                    />
                </div>
                <div>
                    <label htmlFor="searchProductionCompany">Поиск по компании:</label>
                    <input
                        id="searchProductionCompany"
                        type="text"
                        value={searchProductionCompany}
                        onChange={(e) => {
                            setSearchProductionCompany(e.target.value);
                            setPageNumber(1);
                        }}
                        placeholder="Введите компанию"
                    />
                </div>
            </form>
            </div>
            <table className="movies-table">
                <thead>
                    <tr>
                        <th>
                            <button onClick={handleSort} className="sort-button">
                                Название
                            </button>
                        </th>
                        <th>Жанр</th>
                        <th>Продолжительность</th>
                        <th>Компания</th>
                        <th>Страна</th>
                        <th>Возрастное ограничение</th>
                        <th>Описание</th>
                        <th>Актеры</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {movies.map((movie) => (
                        <tr key={movie.movieId}>
                            <td>{movie.title}</td>
                            <td>{movie.genreName}</td>
                            <td>{movie.duration}</td>
                            <td>{movie.productionCompany || '-'}</td>
                            <td>{movie.country || '-'}</td>
                            <td>{movie.ageRestriction || '-'}</td>
                            <td>{movie.description || '-'}</td>
                            <td>{movie.actors || '-'}</td>
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