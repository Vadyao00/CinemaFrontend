import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAllGenres } from '../../services/genres';
import { fetchAllActors } from '../../services/actors';
import { createMovie } from '../../services/movies';
import '../../styles/CreateMoviePage.css';

function CreateMoviePage() {
    const [title, setTitle] = useState('');
    const [duration, setDuration] = useState('');
    const [productionCompany, setProductionCompany] = useState('');
    const [country, setCountry] = useState('');
    const [ageRestriction, setAgeRestriction] = useState('');
    const [description, setDescription] = useState('');
    const [genreId, setGenreId] = useState('');
    const [actorsIds, setActorsIds] = useState([]);
    const [genres, setGenres] = useState([]);
    const [actors, setActors] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const loadGenres = async () => {
            try {
                const dataGenres = await fetchAllGenres();
                setGenres(dataGenres);
            } catch (error) {
                console.error('Failed to fetch genres:', error);
            }
        };

        const loadActors = async () => {
            try {
                const dataActors = await fetchAllActors();
                setActors(dataActors);
            } catch (error) {
                console.error('Failed to fetch actors:', error);
            }
        };

        loadGenres();
        loadActors();
    }, []);

    const handleActorsChange = (e) => {
        const selectedActors = Array.from(e.target.selectedOptions, (option) => option.value);
        setActorsIds(selectedActors);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const newMovie = {
            title,
            duration: duration && duration.trim(),
            productionCompany,
            country,
            ageRestriction: ageRestriction ? parseInt(ageRestriction) : null,
            description,
            genreId,
            actorsIds,
        };

        try {
            await createMovie(genreId, newMovie);
            navigate('/movies');
        } catch (error) {
            console.error('Failed to create movie:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="create-movie-page">
            <h2>Добавить новый фильм</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Название:</label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        placeholder="Введите название"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="duration">Продолжительность (hh:mm:ss):</label>
                    <input
                        id="duration"
                        type="text"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        placeholder="Введите продолжительность"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="productionCompany">Компания:</label>
                    <input
                        id="productionCompany"
                        type="text"
                        value={productionCompany}
                        onChange={(e) => setProductionCompany(e.target.value)}
                        placeholder="Введите компанию"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="country">Страна:</label>
                    <input
                        id="country"
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        placeholder="Введите страну"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="ageRestriction">Возрастное ограничение:</label>
                    <input
                        id="ageRestriction"
                        type="number"
                        value={ageRestriction}
                        onChange={(e) => setAgeRestriction(e.target.value)}
                        placeholder="Выберите возрастное ограничение"
                        min="1"
                        max="120"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Описание:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Введите описание"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="genreId">Жанр:</label>
                    <select
                        id="genreId"
                        value={genreId}
                        onChange={(e) => setGenreId(e.target.value)}
                        required
                    >
                        <option value="">Выберите жанр</option>
                        {genres.map((genre) => (
                            <option key={genre.genreId} value={genre.genreId}>
                                {genre.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="actorsIds">Актеры:</label>
                    <select
                        id="actorsIds"
                        name="actorsIds"
                        multiple
                        value={actorsIds}
                        onChange={handleActorsChange}
                        className="form-control"
                        style={{ height: '120px' }}
                    >
                        {actors.map((actor) => (
                            <option key={actor.actorId} value={actor.actorId}>
                                {actor.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Добавление...' : 'Добавить фильм'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CreateMoviePage;