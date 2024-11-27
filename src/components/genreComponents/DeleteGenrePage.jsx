import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getGenreById, deleteGenre } from '../../services/genres';

function DeleteGenrePage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [genre, setGenre] = useState(null);

    useEffect(() => {
        const loadGenre = async () => {
            try {
                const data = await getGenreById(id);
                setGenre(data);
            } catch (error) {
                console.error("Failed to fetch genre:", error);
            }
        };
        loadGenre();
    }, [id]);

    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            await deleteGenre(id);
            navigate('/genres');
        } catch (error) {
            console.error("Failed to delete genre:", error);
        }
    };

    const handleCancel = () => {
        navigate('/genres');
    };

    if (!genre) {
        return <p>Loading...</p>;
    }

    return (
        <div style={{ padding: '16px' }}>
            <h2>Удаление</h2>
            <h3>Вы уверены, что хотите удалить это?</h3>
            <div>
                <h4>Жанр</h4>
                <hr />
                <dl style={{ marginBottom: '16px' }}>
                    <dt>Название</dt>
                    <dd>{genre.name}</dd>
                    <dt>Описание</dt>
                    <dd>{genre.description}</dd>
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

export default DeleteGenrePage;