import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getGenreById } from '../services/genres';

function GenreDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [genre, setGenre] = useState(null);

    useEffect(() => {
        const loadGenre = async () => {
            try {
                const data = await getGenreById(id);
                setGenre(data);
            } catch (error) {
                console.error('Failed to fetch genre:', error);
            }
        };
        loadGenre();
    }, [id]);

    if (!genre) {
        return <p>Loading...</p>;
    }

    return (
        <div style={{ padding: '16px' }}>
            <h2>Детально</h2>
            <div>
                <h4>Жанр</h4>
                <hr />
                <dl style={{ lineHeight: '1.8em' }}>
                    <dt style={{ fontWeight: 'bold' }}>Номер(Id)</dt>
                    <dd>{genre.genreId}</dd>
                    <dt style={{ fontWeight: 'bold' }}>Название</dt>
                    <dd>{genre.name}</dd>
                    <dt style={{ fontWeight: 'bold' }}>Описание</dt>
                    <dd>{genre.description}</dd>
                </dl>
            </div>
            <div style={{ marginTop: '16px' }}>
                <button
                    onClick={() => navigate('/genres')}
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

export default GenreDetailPage;