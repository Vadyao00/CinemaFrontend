import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchWorkLogs } from '../../services/workLogs';
import '../../styles/ModelsPage.css';

function WorkLogsPage() {
    const [workLogs, setWorkLogs] = useState([]);
    const [metaData, setMetaData] = useState();
    const [searchEmployee, setSearchEmployee] = useState('');
    const [searchWorkExperience, setSearchWorkExperience] = useState('');
    const [orderBy, setOrderBy] = useState('WorkExperience');
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        loadWorkLogs();
        checkUserRole();
    }, [searchEmployee, searchWorkExperience, orderBy, pageNumber, pageSize]);

    const loadWorkLogs = async () => {
        const { data, metaData } = await fetchWorkLogs({
            SearchName: searchEmployee,
            SearchWorkExperience: searchWorkExperience,
            OrderBy: orderBy,
            PageNumber: pageNumber,
            PageSize: pageSize,
        });
        setWorkLogs(data);
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
        <div className="worklogs-page">
            <h2>Журнал работников</h2>
        <div className="create-search-container">
            <div className="create-item-container">
                {isAdmin && (
                    <Link to="/worklogs/create" className="create-item-link">
                        Создать
                    </Link>
                )}
            </div>

            <form className="search-form">
                <div>
                    <label htmlFor="searchEmployee">Поиск по имени работника:</label>
                    <input
                        id="searchEmployee"
                        type="text"
                        value={searchEmployee}
                        onChange={(e) => {
                            setSearchEmployee(e.target.value);
                            setPageNumber(1);
                        }}
                        placeholder="Введите имя работника"
                    />
                </div>
                <div>
                    <label htmlFor="searchWorkExperience">Поиск по опыту работы:</label>
                    <input
                        id="searchWorkExperience"
                        type="text"
                        value={searchWorkExperience}
                        onChange={(e) => {
                            setSearchWorkExperience(e.target.value);
                            setPageNumber(1);
                        }}
                        placeholder="Введите опыт работы"
                    />
                </div>
            </form>
            </div>
            <table className="worklogs-table">
                <thead>
                    <tr>
                        <th>Имя работника</th>
                        <th>
                            <button onClick={() => handleSort('WorkExperience')} className="sort-button">
                                Опыт работы
                            </button>
                        </th>
                        <th>Дата начала</th>
                        <th>
                            <button onClick={() => handleSort('WorkHours')} className="sort-button">
                                Количество часов
                            </button>
                        </th>
                        <th>Дейтсвия</th>
                    </tr>
                </thead>
                <tbody>
                    {workLogs.map((log) => (
                        <tr key={log.workLogId}>
                            <td>{log.employeeName || 'N/A'}</td>
                            <td>{log.workExperience}</td>
                            <td>{log.startDate || 'N/A'}</td>
                            <td>{log.workHours.toFixed(2)}</td>
                            <td>
                                <Link to={`/worklogs/detail/${log.workLogId}`} className="action-link">
                                    Детально
                                </Link>
                                {isAdmin && (
                                    <>
                                        <Link
                                            to={`/worklogs/update/${log.workLogId}`}
                                            className="action-link"
                                        >
                                            Изменить
                                        </Link>
                                        <Link
                                            to={`/worklogs/delete/${log.workLogId}`}
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

export default WorkLogsPage;