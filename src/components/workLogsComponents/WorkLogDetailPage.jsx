import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getWorkLogById } from '../../services/workLogs';

function WorkLogDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [workLog, setWorkLog] = useState(null);

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

    if (!workLog) {
        return <p>Загрузка...</p>;
    }

    return (
        <div style={{ padding: '16px' }}>
            <h2>Детали записи о работе</h2>
            <div>
                <h4>Запись о работе</h4>
                <hr />
                <dl style={{ lineHeight: '1.8em' }}>
                    <dt style={{ fontWeight: 'bold' }}>Номер (ID)</dt>
                    <dd>{workLog.workLogId}</dd>
                    <dt style={{ fontWeight: 'bold' }}>Имя сотрудника</dt>
                    <dd>{workLog.employeeName || 'N/A'}</dd>
                    <dt style={{ fontWeight: 'bold' }}>Опыт работы</dt>
                    <dd>{workLog.workExperience}</dd>
                    <dt style={{ fontWeight: 'bold' }}>Дата начала</dt>
                    <dd>{workLog.startDate}</dd>
                    <dt style={{ fontWeight: 'bold' }}>Количество часов</dt>
                    <dd>{workLog.workHours.toFixed(2)}</dd>
                </dl>
            </div>
            <div style={{ marginTop: '16px' }}>
                <button
                    onClick={() => navigate('/worklogs')}
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

export default WorkLogDetailPage;