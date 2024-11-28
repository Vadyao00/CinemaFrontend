import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getWorkLogById, updateWorkLog } from '../../services/workLogs';
import { fetchEmployees } from '../../services/employees';

function EditWorkLogPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [workLog, setWorkLog] = useState({
        workLogId: '',
        employeeId: '',
        workExperience: '',
        startDate: '',
        workHours: '',
    });
    const [employees, setEmployees] = useState([]);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const loadWorkLog = async () => {
            try {
                const data = await getWorkLogById(id);
                setWorkLog(data);
            } catch (error) {
                console.error('Failed to fetch work log:', error);
            }
        };
        loadWorkLog();
    }, [id]);

    useEffect(() => {
        const loadEmployees = async () => {
            try {
                const dataEmployees = await fetchEmployees();
                setEmployees(dataEmployees.data);
            } catch (error) {
                console.error('Failed to fetch employees:', error);
            }
        };
        loadEmployees();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setWorkLog((prevWorkLog) => ({
            ...prevWorkLog,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateWorkLog(workLog.workLogId, workLog);
            navigate('/worklogs');
        } catch (error) {
            console.error('Failed to update work log:', error);
            setErrors({ submit: 'Ошибка при сохранении изменений. Попробуйте снова.' });
        }
    };

    const handleCancel = () => {
        navigate('/worklogs');
    };

    return (
        <div style={{ padding: '16px' }}>
            <h2>Редактировать запись о работе</h2>
            <h4>Запись о работе</h4>
            <hr />
            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                <form onSubmit={handleSubmit}>
                    {errors.submit && (
                        <div style={{ color: 'red', marginBottom: '16px' }}>{errors.submit}</div>
                    )}
                    <div style={{ marginBottom: '16px' }}>
                        <label htmlFor="workExperience" style={{ display: 'block', marginBottom: '8px' }}>
                            Опыт работы
                        </label>
                        <input
                            id="workExperience"
                            name="workExperience"
                            type="text"
                            value={workLog.workExperience}
                            onChange={handleChange}
                            className="form-control"
                            style={{
                                width: '100%',
                                padding: '8px',
                                boxSizing: 'border-box',
                                borderRadius: '4px',
                                border: '1px solid #ccc',
                            }}
                        />
                        {errors.workExperience && (
                            <span style={{ color: 'red' }}>{errors.workExperience}</span>
                        )}
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                        <label htmlFor="employeeId" style={{ display: 'block', marginBottom: '8px' }}>
                            Сотрудник
                        </label>
                        <select
                            id="employeeId"
                            name="employeeId"
                            value={workLog.employeeId}
                            onChange={handleChange}
                            className="form-control"
                            style={{
                                width: '100%',
                                padding: '8px',
                                boxSizing: 'border-box',
                                borderRadius: '4px',
                                border: '1px solid #ccc',
                            }}
                        >
                            <option value="">Выберите сотрудника</option>
                            {employees.map((employee) => (
                                <option key={employee.employeeId} value={employee.employeeId}>
                                    {employee.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                        <label htmlFor="startDate" style={{ display: 'block', marginBottom: '8px' }}>
                            Дата начала
                        </label>
                        <input
                            id="startDate"
                            name="startDate"
                            type="date"
                            value={workLog.startDate}
                            onChange={handleChange}
                            className="form-control"
                            style={{
                                width: '100%',
                                padding: '8px',
                                boxSizing: 'border-box',
                                borderRadius: '4px',
                                border: '1px solid #ccc',
                            }}
                        />
                        {errors.startDate && <span style={{ color: 'red' }}>{errors.startDate}</span>}
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                        <label htmlFor="workHours" style={{ display: 'block', marginBottom: '8px' }}>
                            Количество часов
                        </label>
                        <input
                            id="workHours"
                            name="workHours"
                            type="number"
                            value={workLog.workHours}
                            onChange={handleChange}
                            className="form-control"
                            style={{
                                width: '100%',
                                padding: '8px',
                                boxSizing: 'border-box',
                                borderRadius: '4px',
                                border: '1px solid #ccc',
                            }}
                        />
                        {errors.workHours && <span style={{ color: 'red' }}>{errors.workHours}</span>}
                    </div>

                    <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                            type="submit"
                            style={{
                                padding: '8px 16px',
                                background: 'blue',
                                color: 'white',
                                border: 'none',
                                cursor: 'pointer',
                            }}
                        >
                            Сохранить
                        </button>
                        <button
                            type="button"
                            onClick={handleCancel}
                            style={{
                                padding: '8px 16px',
                                background: '#ccc',
                                color: 'black',
                                border: 'none',
                                cursor: 'pointer',
                            }}
                        >
                            Вернуться к списку
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditWorkLogPage;