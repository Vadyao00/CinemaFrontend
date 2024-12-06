import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchActors } from '../../services/actors';
import '../../styles/ModelsPage.css';

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
            <h2>Актеры</h2>

            <div className="table-header-container">
                <div className="create-item-container">
                    {isAdmin && (
                        <Link to="/actors/create" className="create-item-link">
                            Создать
                        </Link>
                    )}
                </div>

                <form onChange={handleSearch} className="search-form">
                    <div>
                        <label htmlFor="searchName">Найти по имени:</label>
                        <input
                            id="searchName"
                            type="text"
                            value={searchName}
                            onChange={(e) => setSearchName(e.target.value)}
                            placeholder="Введите имя актера"
                        />
                    </div>
                </form>
            </div>

            <table className="actors-table">
                <thead>
                    <tr>
                        <th>
                            <button onClick={() => handleSort('Name')} className="sort-button">
                                Имя
                            </button>
                        </th>
                        <th>Фильмы, в которых снимается</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {actors.map((actor) => (
                        <tr key={actor.actorId}>
                            <td>{actor.name}</td>
                            <td>{actor.movies}</td>
                            <td>
                                <Link to={`/actors/detail/${actor.actorId}`} className="action-link">
                                    Детально
                                </Link>
                                {isAdmin && (
                                    <>
                                        <Link
                                            to={`/actors/update/${actor.actorId}`}
                                            className="action-link"
                                        >
                                            Изменить
                                        </Link>
                                        <Link
                                            to={`/actors/delete/${actor.actorId}`}
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

export default ActorsPage;