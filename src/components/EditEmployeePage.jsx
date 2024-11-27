import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getEmployeeById, updateEmployee } from '../services/employees';

function EditEmployeePage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [employee, setEmployee] = useState({ name: '', role: '', employeeId: '' });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const loadEmployee = async () => {
            try {
                const data = await getEmployeeById(id);
                setEmployee(data);
            } catch (error) {
                console.error('Failed to fetch employee:', error);
            }
        };
        loadEmployee();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee((prevEmployee) => ({
            ...prevEmployee,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateEmployee(employee.employeeId, employee);
            navigate('/employees');
        } catch (error) {
            console.error('Failed to update employee:', error);
            setErrors({ submit: 'Ошибка при сохранении изменений. Попробуйте снова.' });
        }
    };

    const handleCancel = () => {
        navigate('/employees');
    };

    return (
        <div style={{ padding: '16px' }}>
            <h2>Редактировать</h2>
            <h4>Сотрудник</h4>
            <hr />
            <div style={{ maxWidth: '400px', margin: '0 auto' }}>
                <form onSubmit={handleSubmit}>
                    {errors.submit && (
                        <div style={{ color: 'red', marginBottom: '16px' }}>{errors.submit}</div>
                    )}
                    <div style={{ marginBottom: '16px' }}>
                        <label htmlFor="name" style={{ display: 'block', marginBottom: '8px' }}>
                            Имя
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={employee.name}
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
                        {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                        <label htmlFor="role" style={{ display: 'block', marginBottom: '8px' }}>
                            Роль
                        </label>
                        <input
                            id="role"
                            name="role"
                            type="text"
                            value={employee.role}
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
                        {errors.role && <span style={{ color: 'red' }}>{errors.role}</span>}
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

export default EditEmployeePage;