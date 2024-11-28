import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getWorkLogById, deleteWorkLog } from '../../services/workLogs';

function DeleteWorkLogPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [workLog, setWorkLog] = useState(null);

    useEffect(() => {
        const loadWorkLog = async () => {
            try {
                const data = await getWorkLogById(id);
                setWorkLog(data);
            } catch (error) {
                console.error("Failed to fetch work log:", error);
            }
        };
        loadWorkLog();
    }, [id]);

    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            await deleteWorkLog(id);
            navigate('/worklogs');
        } catch (error) {
            console.error("Failed to delete work log:", error);
        }
    };

    const handleCancel = () => {
        navigate('/worklogs');
    };

    if (!workLog) {
        return <p>Загрузка...</p>;
    }

    return (
        <div style={{ padding: '16px' }}>
            <h2>Удаление записи о работе</h2>
            <h3>Вы уверены, что хотите удалить эту запись?</h3>
            <div>
                <h4>Детали записи</h4>
                <hr />
                <dl style={{ marginBottom: '16px' }}>
                    <dt>Имя сотрудника</dt>
                    <dd>{workLog.employeeName || 'N/A'}</dd>
                    <dt>Опыт работы</dt>
                    <dd>{workLog.workExperience}</dd>
                    <dt>Дата начала</dt>
                    <dd>{workLog.startDate}</dd>
                    <dt>Количество отработанных часов</dt>
                    <dd>{workLog.workHours.toFixed(2)}</dd>
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

export default DeleteWorkLogPage;