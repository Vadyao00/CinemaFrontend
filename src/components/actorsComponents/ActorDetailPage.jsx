import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getActorById } from '../../services/actors';

function ActorDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [actor, setActor] = useState(null);

    useEffect(() => {
        const loadActor = async () => {
            try {
                const data = await getActorById(id);
                setActor(data);
            } catch (error) {
                console.error('Failed to fetch actor:', error);
            }
        };
        loadActor();
    }, [id]);

    if (!actor) {
        return <p>Loading...</p>;
    }

    return (
        <div style={{ padding: '16px' }}>
            <h2>Детально</h2>
            <div>
                <h4>Актер</h4>
                <hr />
                <dl style={{ lineHeight: '1.8em' }}>
                    <dt style={{ fontWeight: 'bold' }}>Номер(Id)</dt>
                    <dd>{actor.actorId}</dd>
                    <dt style={{ fontWeight: 'bold' }}>Имя</dt>
                    <dd>{actor.name}</dd>
                </dl>
            </div>
            <div style={{ marginTop: '16px' }}>
                <button
                    onClick={() => navigate('/actors')}
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

export default ActorDetails;