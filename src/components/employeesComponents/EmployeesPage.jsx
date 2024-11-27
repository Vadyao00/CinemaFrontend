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
            <h2>Employees</h2>

            <div className="create-employee-container">
                {isAdmin && (
                    <Link to="/employees/create" className="create-employee-link">
                        Create new Employee
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
                        placeholder="Enter employee name"
                    />
                </div>
            </form>

            <table className="employees-table">
                <thead>
                    <tr>
                        <th>
                            <button onClick={() => handleSort('Name')} className="sort-button">
                                Name
                            </button>
                        </th>
                        <th>
                            <button onClick={() => handleSort('Role')} className="sort-button">
                                Role
                            </button>
                        </th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee.employeeId}>
                            <td>{employee.name}</td>
                            <td>{employee.role}</td>
                            <td>
                                <Link
                                    to={`/employees/detail/${employee.employeeId}`}
                                    className="action-link"
                                >
                                    Details
                                </Link>
                                {isAdmin && (
                                    <>
                                        <Link
                                            to={`/employees/update/${employee.employeeId}`}
                                            className="action-link"
                                        >
                                            Edit
                                        </Link>
                                        <Link
                                            to={`/employees/delete/${employee.employeeId}`}
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

export default EmployeesPage;