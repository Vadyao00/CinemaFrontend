import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getActorById, deleteActor } from '../../services/actors';

function DeleteActor() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [actor, setActor] = useState(null);

    useEffect(() => {
        const loadActor = async () => {
            try {
                const data = await getActorById(id);
                setActor(data);
            } catch (error) {
                console.error("Failed to fetch actor:", error);
            }
        };
        loadActor();
    }, [id]);

    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            await deleteActor(id);
            navigate('/actors');
        } catch (error) {
            console.error("Failed to delete actor:", error);
        }
    };

    const handleCancel = () => {
        navigate('/actors');
    };

    if (!actor) {
        return <p>Loading...</p>;
    }

    return (
        <div style={{ padding: '16px' }}>
            <h2>Удаление</h2>
            <h3>Вы уверены, что хотите удалить это?</h3>
            <div>
                <h4>Актер</h4>
                <hr />
                <dl style={{ marginBottom: '16px' }}>
                    <dt>Имя</dt>
                    <dd>{actor.name}</dd>
                </dl>
                <form onSubmit={handleDelete}>
                    <button type="submit" style={{maxWidth: '140px', marginRight: '8px', padding: '8px 16px', background: 'red', color: 'white', border: 'none', cursor: 'pointer' }}>
                        Удалить
                    </button>
                    <button type="button" onClick={handleCancel} style={{maxWidth: '140px', padding: '8px 16px', background: '#ccc', color: 'black', border: 'none', cursor: 'pointer' }}>
                        Вернуться к списку
                    </button>
                </form>
            </div>
        </div>
    );
}

export default DeleteActor;