import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchGenres } from '../../services/genres';
import '../../styles/ModelsPage.css';

function GenresPage() {
    const [genres, setGenres] = useState([]);
    const [metaData, setMetaData] = useState();
    const [searchName, setSearchName] = useState('');
    const [orderBy, setOrderBy] = useState('Name');
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        loadGenres();
        checkUserRole();
    }, [searchName, orderBy, pageNumber, pageSize]);

    const loadGenres = async () => {
        const { data, metaData } = await fetchGenres({
            SearchName: searchName,
            OrderBy: orderBy,
            PageNumber: pageNumber,
            PageSize: pageSize,
        });
        setGenres(data);
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
            <h2>Жанры</h2>
            <div className="create-search-container">
                <div className="create-item-container">
                    {isAdmin && (
                        <Link to="/genres/create" className="create-item-link">
                            Создать
                        </Link>
                    )}
                </div>

                <form onChange={handleSearch} className="search-form">
                    <div>
                        <label htmlFor="searchName">Поиск по названию:</label>
                        <input
                            id="searchName"
                            type="text"
                            value={searchName}
                            onChange={(e) => setSearchName(e.target.value)}
                            placeholder="Введите название жанра"
                        />
                    </div>
                </form>
            </div>
            <table className="actors-table">
                <thead>
                    <tr>
                        <th>
                            <button onClick={() => handleSort('Name')} className="sort-button">
                                Названия
                            </button>
                        </th>
                        <th>Описание</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {genres.map((genre) => (
                        <tr key={genre.genreId}>
                            <td>{genre.name}</td>
                            <td>{genre.description}</td>
                            <td>
                                <Link to={`/genres/detail/${genre.genreId}`} className="action-link">
                                    Детально
                                </Link>
                                {isAdmin && (
                                    <>
                                        <Link
                                            to={`/genres/update/${genre.genreId}`}
                                            className="action-link"
                                        >
                                            Изменить
                                        </Link>
                                        <Link
                                            to={`/genres/delete/${genre.genreId}`}
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

export default GenresPage;