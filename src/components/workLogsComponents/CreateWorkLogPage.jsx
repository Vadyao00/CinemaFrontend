import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchEmployees } from '../../services/employees';
import { createWorkLog } from '../../services/workLogs';
import '../../styles/CreateWorkLogPage.css';

function CreateWorkLogPage() {
    const [employeeId, setEmployeeId] = useState('');
    const [startDate, setStartDate] = useState('');
    const [workHours, setWorkHours] = useState('');
    const [workExperience, setWorkExperience] = useState('');
    const [employees, setEmployees] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const newWorkLog = {
            startDate,
            workHours: workHours ? parseFloat(workHours) : null,
            workExperience: workExperience ? parseInt(workExperience) : null,
        };

        try {
            await createWorkLog(employeeId, newWorkLog);
            navigate('/worklogs');
        } catch (error) {
            console.error('Failed to create work log:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="create-worklog-page">
            <h2>Добавить новый Work Log</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="employeeId">Работник:</label>
                    <select
                        id="employeeId"
                        value={employeeId}
                        onChange={(e) => setEmployeeId(e.target.value)}
                        required
                    >
                        <option value="">Выберите работника</option>
                        {employees.map((employee) => (
                            <option key={employee.employeeId} value={employee.employeeId}>
                                {employee.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="startDate">Дата начала работы:</label>
                    <input
                        id="startDate"
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="workHours">Количество отработанных часов:</label>
                    <input
                        id="workHours"
                        type="number"
                        value={workHours}
                        onChange={(e) => setWorkHours(e.target.value)}
                        placeholder="Введите часы"
                        min="0"
                        step="0.1"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="workExperience">Опыт работы (в годах):</label>
                    <input
                        id="workExperience"
                        type="number"
                        value={workExperience}
                        onChange={(e) => setWorkExperience(e.target.value)}
                        placeholder="Введите опыт работы"
                        min="0"
                    />
                </div>

                <div className="form-group">
                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Добавление...' : 'Добавить Work Log'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CreateWorkLogPage;