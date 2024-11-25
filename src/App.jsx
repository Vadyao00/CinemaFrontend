import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate, useLocation} from 'react-router-dom';
import './styles/App.css';
import ActorsPage from './components/ActorsPage';
import GenresPage from './components/GenresPage';
import MoviesPage from './components/MoviesPage';

import Login from './components/Login';
import DeleteActorPage from './components/DeleteActorPage';
import EditActorPage from './components/EditActorPage';
import ActorDetailPage from './components/ActorDetailPage';
import CreateActorPage from './components/CreateActorPage';

import CreateMoviePage from './components/CreateMoviePage';
import MovieDetailPage from './components/MovieDetailPage';
import DeleteMoviePage from './components/DeleteMoviePage';
import EditMoviePage from './components/EditMoviePage';

import DeleteGenrePage from './components/DeleteGenrePage';
import EditGenrePage from './components/EditGenrePage';
import GenreDetailPage from './components/GenreDetailPage';
import CreateGenrePage from './components/CreateGenrePage';

import RegistrationForm from './components/RegistrationForm';
import Profile from './components/Profile';
import UsersList from './components/UsersList';
import EditUser from './components/EditUser';
import { Provider } from "./components/ui/provider"
import { Button } from "./components/ui/button"
//import './components/axiosSetup';

const Actors = () => (
    <ActorsPage />
);
const Genres = () => (
  <GenresPage />
);
const Movies = () => (
  <MoviesPage />
);
const EditUs = () => (
  <EditUser />
);

const CreateActor = () => (
  <CreateActorPage />
);
const Users = () => (
  <UsersList />
);
const Prof = () => (
  <Profile />
);
const Regist = () => (
  <RegistrationForm />
);
const DeleteActor = () => (
  <DeleteActorPage />
);
const CreateMovie = () => (
  <CreateMoviePage />
);
const DetailActor = () => (
  <ActorDetailPage />
);
const UpdateActor = () => (
  <EditActorPage />
);
const UpdateMovie = () => (
  <EditMoviePage />
);
const DeleteGenre = () => (
  <DeleteGenrePage />
);
const DeleteMovie = () => (
  <DeleteMoviePage />
);
const CreateGenre = () => (
  <CreateGenrePage />
);
const DetailGenre = () => (
  <GenreDetailPage />
);
const DetailMovie = () => (
  <MovieDetailPage />
);
const UpdateGenre = () => (
  <EditGenrePage />
);
const Log = () => (
  <Login/>
);
const Unathorized = () => (
  <div>
    <p>Для начала авторизуйтесь</p>
  </div>
);
const Home = () => (
  <div>
    <h1>Главная страница</h1>
    <p>Добро пожаловать в кинотеатр!</p>
  </div>
);

function App() {
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [username, setUsername] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuthentication = () => {
      const token = localStorage.getItem('accessToken');
      const userRole = localStorage.getItem('userRole');

      if (token) {
        const payload = parseJwt(token);
        setIsUserSignedIn(true);
        let userName = payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
        if(localStorage.getItem('userName')){
          userName = localStorage.getItem('userName');
        }
        setUsername(userName);
        setIsUserAdmin(userRole === 'Administrator');
      }
    };

    checkAuthentication();
  }, [location.pathname]);

  const parseJwt = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userRole');
    setIsUserSignedIn(false);
    setIsUserAdmin(false);
    setUsername('');
    navigate('/');
  };

  const handleActorsClick = (event) => {
    event.preventDefault();
    const token = localStorage.getItem('accessToken');

    if (!token) {
      navigate('/unathorized');
    }
    else{
      navigate('/actors');
    }
  };
  const handleGenresClick = (event) => {
    event.preventDefault();
    const token = localStorage.getItem('accessToken');

    if (!token) {
      navigate('/unathorized');
    }
    else{
      navigate('/genres');
    }
  };
  const handleMoviesClick = (event) => {
    event.preventDefault();
    const token = localStorage.getItem('accessToken');

    if (!token) {
      navigate('/unathorized');
    }
    else{
      navigate('/movies');
    }
  };

  return (
    <Provider>
      <div>
        <header className="header">
          <nav className="navbar">
            <div className="container">
              <a className="navbar-brand" href="/">Кинотеатр</a>
              <div className="navbar-links">
                <ul className="nav-links">
                  <li>
                    <Link className="nav-link" onClick={handleActorsClick}>Актеры</Link>
                  </li>
                  <li>
                    <Link className="nav-link" onClick={handleGenresClick}>Жанры</Link>
                  </li>
                  <li>
                    <Link className="nav-link" onClick={handleMoviesClick}>Фильмы</Link>
                  </li>
                </ul>
                <div className="auth-links">
                  {!isUserSignedIn ? (
                    <>
                    <Link to="/authentication/login" className="auth-link">Вход</Link>
                    <Link to="/authentication" className="auth-link">Регистрация</Link>
                  </>
                    
                  ) : (
                    <>
                      <Link to="/profile" className="auth-link">Логин: {username}</Link>
                      {isUserAdmin && (
                        <Link to="/users" className="auth-link">Пользователи</Link>
                      )}
                      <button onClick={logout} className="auth-link logout-button">Выход</button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </nav>
        </header>

        <main className="main-content">
          <Routes>
            <Route path="/actors" element={<Actors />} />
            <Route path="/authentication/login" element={<Log/>} />
            <Route path="/authentication" element={<Regist/>} />
            <Route path="/unathorized" element={<Unathorized />} />
            <Route path="/actors/delete/:id" element={<DeleteActor />} />
            <Route path="/actors/update/:id" element={<UpdateActor />} />
            <Route path="/actors/detail/:id" element={<DetailActor />} />
            <Route path="/actors/create" element={<CreateActor />} />
            <Route path="/profile" element={<Prof />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/create" element={<Regist />} />
            <Route path="/edituser" element={<EditUs />} />
            <Route path="/genres" element={<Genres />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movies/create" element={<CreateMovie />} />
            <Route path="/movies/detail/:id" element={<DetailMovie />} />
            <Route path="/movies/delete/:id" element={<DeleteMovie />} />
            <Route path="/movies/update/:id" element={<UpdateMovie />} />
            <Route path="/genres/delete/:id" element={<DeleteGenre />} />
            <Route path="/genres/update/:id" element={<UpdateGenre />} />
            <Route path="/genres/detail/:id" element={<DetailGenre />} />
            <Route path="/genres/create" element={<CreateGenre />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
      </div>
    </Provider>
  );
}

export default App;