import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchEmployees } from '../../services/employees';
import '../../styles/ModelsPage.css';

function EmployeesPage() {
    const [employees, setEmployees] = useState([]);
    const [metaData, setMetaData] = useState();
    const [searchName, setSearchName] = useState('');
    const [orderBy, setOrderBy] = useState('Name');
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        loadEmployees();
        checkUserRole();
    }, [searchName, orderBy, pageNumber, pageSize]);

    const loadEmployees = async () => {
        const { data, metaData } = await fetchEmployees({
            SearchName: searchName,
            OrderBy: orderBy,
            PageNumber: pageNumber,
            PageSize: pageSize,
        });
        setEmployees(data);
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
        <div className="employees-page">
            <h2>Работники</h2>

            <div className="create-search-container">
                <div className="create-item-container">
                    {isAdmin && (
                        <Link to="/employees/create" className="create-item-link">
                            Создать
                        </Link>
                    )}
                </div>

                <form onChange={handleSearch} className="search-form">
                    <div>
                        <label htmlFor="searchName">Поиск по имени:</label>
                        <input
                            id="searchName"
                            type="text"
                            value={searchName}
                            onChange={(e) => setSearchName(e.target.value)}
                            placeholder="Введите имя работника"
                        />
                    </div>
                </form>
            </div>

            <table className="employees-table">
                <thead>
                    <tr>
                        <th>
                            <button onClick={() => handleSort('Name')} className="sort-button">
                                Имя
                            </button>
                        </th>
                        <th>
                            <button onClick={() => handleSort('Role')} className="sort-button">
                                Должность
                            </button>
                        </th>
                        <th>Мероприятия</th>
                        <th>Сеансы</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee.employeeId}>
                            <td>{employee.name}</td>
                            <td>{employee.role}</td>
                            <td>{employee.events}</td>
                            <td>{employee.showtimes}</td>
                            <td>
                                <Link
                                    to={`/employees/detail/${employee.employeeId}`}
                                    className="action-link"
                                >
                                    Детально
                                </Link>
                                {isAdmin && (
                                    <>
                                        <Link
                                            to={`/employees/update/${employee.employeeId}`}
                                            className="action-link"
                                        >
                                            Изменить
                                        </Link>
                                        <Link
                                            to={`/employees/delete/${employee.employeeId}`}
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

export default EmployeesPage;