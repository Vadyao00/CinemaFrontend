import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieById } from '../services/movies';

function MovieDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const loadMovie = async () => {
            try {
                const data = await getMovieById(id);
                setMovie(data);
            } catch (error) {
                console.error('Failed to fetch movie:', error);
            }
        };
        loadMovie();
    }, [id]);

    if (!movie) {
        return <p>Загрузка...</p>;
    }

    return (
        <div style={{ padding: '16px' }}>
            <h2>Детали фильма</h2>
            <div>
                <h4>Фильм</h4>
                <hr />
                <dl style={{ lineHeight: '1.8em' }}>
                    <dt style={{ fontWeight: 'bold' }}>Номер(ID)</dt>
                    <dd>{movie.movieId}</dd>
                    <dt style={{ fontWeight: 'bold' }}>Название</dt>
                    <dd>{movie.title}</dd>
                    <dt style={{ fontWeight: 'bold' }}>Жанр</dt>
                    <dd>{movie.genreName}</dd>
                    <dt style={{ fontWeight: 'bold' }}>Продолжительность</dt>
                    <dd>{movie.duration}</dd>
                    <dt style={{ fontWeight: 'bold' }}>Компания</dt>
                    <dd>{movie.productionCompany}</dd>
                    <dt style={{ fontWeight: 'bold' }}>Страна</dt>
                    <dd>{movie.country}</dd>
                    <dt style={{ fontWeight: 'bold' }}>Возрастное ограничение</dt>
                    <dd>{movie.ageRestriction}</dd>
                    <dt style={{ fontWeight: 'bold' }}>Описание</dt>
                    <dd>{movie.description}</dd>
                </dl>
            </div>
            <div style={{ marginTop: '16px' }}>
                <button
                    onClick={() => navigate('/movies')}
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

export default MovieDetailPage;