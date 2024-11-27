import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getEmployeeById, deleteEmployee } from '../services/employees';

function DeleteEmployeePage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [employee, setEmployee] = useState(null);

    useEffect(() => {
        const loadEmployee = async () => {
            try {
                const data = await getEmployeeById(id);
                setEmployee(data);
            } catch (error) {
                console.error("Failed to fetch employee:", error);
            }
        };
        loadEmployee();
    }, [id]);

    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            await deleteEmployee(id);
            navigate('/employees');
        } catch (error) {
            console.error("Failed to delete employee:", error);
        }
    };

    const handleCancel = () => {
        navigate('/employees');
    };

    if (!employee) {
        return <p>Loading...</p>;
    }

    return (
        <div style={{ padding: '16px' }}>
            <h2>Удаление</h2>
            <h3>Вы уверены, что хотите удалить это?</h3>
            <div>
                <h4>Сотрудник</h4>
                <hr />
                <dl style={{ marginBottom: '16px' }}>
                    <dt>Имя</dt>
                    <dd>{employee.name}</dd>
                    <dt>Роль</dt>
                    <dd>{employee.role}</dd>
                </dl>
                <form onSubmit={handleDelete}>
                    <button
                        type="submit"
                        style={{
                            maxWidth: '140px',
                            marginRight: '8px',
                            padding: '8px 16px',
                            background: 'red',
                            color: 'white',
                            border: 'none',
                            cursor: 'pointer',
                        }}
                    >
                        Удалить
                    </button>
                    <button
                        type="button"
                        onClick={handleCancel}
                        style={{
                            maxWidth: '140px',
                            padding: '8px 16px',
                            background: '#ccc',
                            color: 'black',
                            border: 'none',
                            cursor: 'pointer',
                        }}
                    >
                        Вернуться к списку
                    </button>
                </form>
            </div>
        </div>
    );
}

export default DeleteEmployeePage;