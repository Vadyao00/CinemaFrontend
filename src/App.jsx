import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate, useLocation} from 'react-router-dom';
import './styles/App.css';
import ActorsPage from './components/actorsComponents/ActorsPage';
import GenresPage from './components/genreComponents/GenresPage';
import MoviesPage from './components/moviesComponents/MoviesPage';
import EmployeesPage from './components/employeesComponents/EmployeesPage';
import EventsPage from './components/eventsComponents/EventsPage';
import ShowtimesPage from './components/showtimesComponents/ShowtimesPage';

import CreateShowtimePage from './components/showtimesComponents/createShowtimePage';
import EditShowtimePage from './components/showtimesComponents/EditShowtimePage';
import DeleteShowtimePage from './components/showtimesComponents/DeleteShowtimePage';
import ShowtimeDetailPage from './components/showtimesComponents/ShowtimeDetailPage';

import CreateEventPage from './components/eventsComponents/CreateEventPage';
import DeleteEventPage from './components/eventsComponents/DeleteEventPage';
import EventDetailPage from './components/eventsComponents/EventDetailPage';
import EditEventPage from './components/eventsComponents/EditEventPage';

import DeleteEmployeePage from './components/employeesComponents/DeleteEmployeePage';
import EmployeeDetailPage from './components/employeesComponents/EmployeeDetailPage';
import CreateEmployeePage from './components/employeesComponents/CreateEmployeePage';
import EditEmployeePage from './components/employeesComponents/EditEmployeePage';

import Login from './components/Login';
import DeleteActorPage from './components/actorsComponents/DeleteActorPage';
import EditActorPage from './components/actorsComponents/EditActorPage';
import ActorDetailPage from './components/actorsComponents/ActorDetailPage';
import CreateActorPage from './components/actorsComponents/CreateActorPage';

import CreateMoviePage from './components/moviesComponents/CreateMoviePage';
import MovieDetailPage from './components/moviesComponents/MovieDetailPage';
import DeleteMoviePage from './components/moviesComponents/DeleteMoviePage';
import EditMoviePage from './components/moviesComponents/EditMoviePage';

import DeleteGenrePage from './components/genreComponents/DeleteGenrePage';
import EditGenrePage from './components/genreComponents/EditGenrePage';
import GenreDetailPage from './components/genreComponents/GenreDetailPage';
import CreateGenrePage from './components/genreComponents/CreateGenrePage';

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
const Events = () => (
  <EventsPage />
);
const Genres = () => (
  <GenresPage />
);
const Movies = () => (
  <MoviesPage />
);
const Employees = () => (
  <EmployeesPage />
);
const EditUs = () => (
  <EditUser />
);

const CreateEvent = () => (
  <CreateEventPage />
);
const CreateShowtime = () => (
  <CreateShowtimePage />
);

const CreateActor = () => (
  <CreateActorPage />
);
const Users = () => (
  <UsersList />
);
const Showtimes = () => (
  <ShowtimesPage />
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
const DeleteEvent = () => (
  <DeleteEventPage />
);
const DeleteEmployee = () => (
  <DeleteEmployeePage />
);
const CreateMovie = () => (
  <CreateMoviePage />
);
const CreateEmployee = () => (
  <CreateEmployeePage />
);
const DetailActor = () => (
  <ActorDetailPage />
);
const DetailShowtime = () => (
  <ShowtimeDetailPage />
);
const DetailEmployee = () => (
  <EmployeeDetailPage />
);
const UpdateActor = () => (
  <EditActorPage />
);
const UpdateEvent = () => (
  <EditEventPage />
);
const UpdateEmployee = () => (
  <EditEmployeePage />
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
const DeleteShowtime = () => (
  <DeleteShowtimePage />
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
const DetailEvent = () => (
  <EventDetailPage />
);
const UpdateGenre = () => (
  <EditGenrePage />
);
const UpdateShowtime = () => (
  <EditShowtimePage />
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
  const handleEmployeesClick = (event) => {
    event.preventDefault();
    const token = localStorage.getItem('accessToken');

    if (!token) {
      navigate('/unathorized');
    }
    else{
      navigate('/employees');
    }
  };
  const handleEventsClick = (event) => {
    event.preventDefault();
    const token = localStorage.getItem('accessToken');

    if (!token) {
      navigate('/unathorized');
    }
    else{
      navigate('/events');
    }
  };
  const handleShowtimesClick = (event) => {
    event.preventDefault();
    const token = localStorage.getItem('accessToken');

    if (!token) {
      navigate('/unathorized');
    }
    else{
      navigate('/showtimes');
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
                  <li>
                    <Link className="nav-link" onClick={handleEmployeesClick}>Работники</Link>
                  </li>
                  <li>
                    <Link className="nav-link" onClick={handleEventsClick}>Мероприятия</Link>
                  </li>
                  <li>
                    <Link className="nav-link" onClick={handleShowtimesClick}>Сеансы</Link>
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
            <Route path="/employees" element={<Employees />} />
            <Route path="/events" element={<Events />} />
            <Route path="/showtimes" element={<Showtimes />} />
            <Route path="/showtimes/create" element={<CreateShowtime />} />
            <Route path="/events/create" element={<CreateEvent />} />
            <Route path="/showtimes/update/:id" element={<UpdateShowtime />} />
            <Route path="/showtimes/detail/:id" element={<DetailShowtime />} />
            <Route path="/showtimes/delete/:id" element={<DeleteShowtime />} />
            <Route path="/events/delete/:id" element={<DeleteEvent />} />
            <Route path="/events/detail/:id" element={<DetailEvent />} />
            <Route path="/events/update/:id" element={<UpdateEvent />} />
            <Route path="/employees/delete/:id" element={<DeleteEmployee />} />
            <Route path="/employees/detail/:id" element={<DetailEmployee />} />
            <Route path="/employees/create" element={<CreateEmployee />} />
            <Route path="/employees/update/:id" element={<UpdateEmployee />} />
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