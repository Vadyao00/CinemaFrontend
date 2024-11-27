import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getMovieById, deleteMovie } from '../../services/movies';

function DeleteMoviePage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const loadMovie = async () => {
            try {
                const data = await getMovieById(id);
                setMovie(data);
            } catch (error) {
                console.error("Failed to fetch movie:", error);
            }
        };
        loadMovie();
    }, [id]);

    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            await deleteMovie(id);
            navigate('/movies');
        } catch (error) {
            console.error("Failed to delete movie:", error);
        }
    };

    const handleCancel = () => {
        navigate('/movies');
    };

    if (!movie) {
        return <p>Загрузка...</p>;
    }

    return (
        <div style={{ padding: '16px' }}>
            <h2>Удаление фильма</h2>
            <h3>Вы уверены, что хотите удалить этот фильм?</h3>
            <div>
                <h4>Фильм</h4>
                <hr />
                <dl style={{ marginBottom: '16px' }}>
                    <dt>Название</dt>
                    <dd>{movie.title}</dd>
                    <dt>Жанр</dt>
                    <dd>{movie.genreName}</dd>
                    <dt>Продолжительность</dt>
                    <dd>{movie.duration}</dd>
                    <dt>Компания</dt>
                    <dd>{movie.productionCompany}</dd>
                    <dt>Страна</dt>
                    <dd>{movie.country}</dd>
                    <dt>Возрастное ограничение</dt>
                    <dd>{movie.ageRestriction}</dd>
                    <dt>Описание</dt>
                    <dd>{movie.description}</dd>
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

export default DeleteMoviePage;