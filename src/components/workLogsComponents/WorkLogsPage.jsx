import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchWorkLogs } from '../../services/workLogs';
import '../../styles/ModelsPage.css';

function WorkLogsPage() {
    const [workLogs, setWorkLogs] = useState([]);
    const [metaData, setMetaData] = useState();
    const [searchEmployee, setSearchEmployee] = useState('');
    const [orderBy, setOrderBy] = useState('WorkExperience');
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        loadWorkLogs();
        checkUserRole();
    }, [searchEmployee, orderBy, pageNumber, pageSize]);

    const loadWorkLogs = async () => {
        const { data, metaData } = await fetchWorkLogs({
            SearchName: searchEmployee,
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
        <div className="worklogs-page">
            <h2>Work Logs</h2>

            <div className="create-worklog-container">
                {isAdmin && (
                    <Link to="/worklogs/create" className="create-worklog-link">
                        Create new Work Log
                    </Link>
                )}
            </div>

            <form onChange={handleSearch} className="search-form">
                <div>
                    <label htmlFor="searchEmployee">Search by Employee Name:</label>
                    <input
                        id="searchEmployee"
                        type="text"
                        value={searchEmployee}
                        onChange={(e) => setSearchEmployee(e.target.value)}
                        placeholder="Enter employee name"
                    />
                </div>
            </form>

            <table className="worklogs-table">
                <thead>
                    <tr>
                        <th>Employee Name</th>
                        <th>
                            <button onClick={() => handleSort('WorkExperience')} className="sort-button">
                                Work Experience
                            </button>
                        </th>
                        <th>Start Date</th>
                        <th>
                            <button onClick={() => handleSort('WorkHours')} className="sort-button">
                                Work Hours
                            </button>
                        </th>
                        <th>Actions</th>
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
                                    Details
                                </Link>
                                {isAdmin && (
                                    <>
                                        <Link
                                            to={`/worklogs/update/${log.workLogId}`}
                                            className="action-link"
                                        >
                                            Edit
                                        </Link>
                                        <Link
                                            to={`/worklogs/delete/${log.workLogId}`}
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

export default WorkLogsPage;