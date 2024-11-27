import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEmployeeById } from '../../services/employees';

function EmployeeDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [employee, setEmployee] = useState(null);

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

    if (!employee) {
        return <p>Loading...</p>;
    }

    return (
        <div style={{ padding: '16px' }}>
            <h2>Детально</h2>
            <div>
                <h4>Сотрудник</h4>
                <hr />
                <dl style={{ lineHeight: '1.8em' }}>
                    <dt style={{ fontWeight: 'bold' }}>Номер (Id)</dt>
                    <dd>{employee.employeeId}</dd>
                    <dt style={{ fontWeight: 'bold' }}>Имя</dt>
                    <dd>{employee.name}</dd>
                    <dt style={{ fontWeight: 'bold' }}>Роль</dt>
                    <dd>{employee.role}</dd>
                </dl>
            </div>
            <div style={{ marginTop: '16px' }}>
                <button
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
        </div>
    );
}

export default EmployeeDetailPage;