import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEmployee } from '../../services/employees';

function CreateEmployeePage() {
    const navigate = useNavigate();
    const [employee, setEmployee] = useState({
        name: '',
        role: '',
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee({
            ...employee,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createEmployee(employee); 
            navigate('/employees');
        } catch (error) {
            console.error('Failed to create employee:', error);
            setErrors({ submit: 'Ошибка при создании сотрудника. Попробуйте снова.' });
        }
    };

    return (
        <div style={{ padding: '16px' }}>
            <h2>Создать</h2>
            <h4>Сотрудник</h4>
            <hr />
            <div style={{ maxWidth: '400px', margin: 'auto' }}>
                <form onSubmit={handleSubmit}>
                    {errors.submit && (
                        <div style={{ color: 'red', marginBottom: '16px' }}>{errors.submit}</div>
                    )}
                    <div style={{ marginBottom: '16px' }}>
                        <label htmlFor="name" style={{ display: 'block', fontWeight: 'bold' }}>
                            Имя
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={employee.name}
                            onChange={handleChange}
                            className="form-control"
                            style={{ width: '100%' }}
                        />
                        {errors.name && (
                            <span style={{ color: 'red' }}>{errors.name}</span>
                        )}
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                        <label htmlFor="role" style={{ display: 'block', fontWeight: 'bold' }}>
                            Роль
                        </label>
                        <input
                            type="text"
                            id="role"
                            name="role"
                            value={employee.role}
                            onChange={handleChange}
                            className="form-control"
                            style={{ width: '100%' }}
                        />
                        {errors.role && (
                            <span style={{ color: 'red' }}>{errors.role}</span>
                        )}
                    </div>
                    <div style={{ marginTop: '16px' }}>
                        <button
                            type="submit"
                            style={{
                                padding: '8px 16px',
                                marginRight: '8px',
                                background: 'blue',
                                color: 'white',
                                border: 'none',
                                cursor: 'pointer',
                            }}
                        >
                            Создать
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate('/employees')}
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

export default CreateEmployeePage;