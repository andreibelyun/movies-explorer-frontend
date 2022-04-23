import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import './App.css';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Header from '../Header/Header';
import Main from '../Main/Main';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import Footer from '../Footer/Footer';
import Profile from "../Profile/Profile";
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import NotFound from '../NotFound/NotFound';

import CurrentUserContext from '../../contexts/CurrentUserContext';
import MainApi from '../../utils/MainApi';

export default function App() {

  const [currentUser, setCurrentUser] = React.useState({
    name: '',
    email: '',
  });

  const [loggedIn, setLoggedIn] = React.useState(false);

  const navigate = useNavigate();

  // регистрация/авторизация/проверка токена

  const onRegister = ({ name, email, password }) => {
    MainApi.register(name, email, password)
      .then(() => {
        navigate('/signin');
        console.log('Успешно зарегистрирован');
      })
      .catch(() => {
        // Обрабатываем ошибку
        console.log('Ошибка при регистрации');
      });
  };

  const onLogin = ({ email, password }) => {
    MainApi.login(email, password)
      .then((data) => {
        // Добавляем токен в localStorage
        localStorage.setItem('jwt', data.token);
        // Обновляем информацию о пользователе
        MainApi.getUserInfo(data.token)
          .then((data) => {
            setCurrentUser({
              name: data.name,
              email: data.email,
            });
          })
        setLoggedIn(true);
        // Добавляем авторизационные заголовки
        MainApi._headers['Authorization'] = `Bearer ${data.token}`;
        // Перенаправляем на страницу с фильмами
        navigate('/movies');
      })
      .catch(() => {
        // Обрабатываем ошибку
        console.log('Ошибка при входе');
      });
  };

  const handleTokenCheck = () => {
    const jwt = localStorage.getItem('jwt');
    MainApi.getUserInfo(jwt)
      .then((data) => {
        // Обновляем информацию о пользователе
        setCurrentUser({
          name: data.name,
          email: data.email,
        });
        setLoggedIn(true);
        // Добавляем авторизационные заголовки
        MainApi._headers['Authorization'] = `Bearer ${jwt}`;
      })
      .catch(() => {
        // Обрабатываем ошибку
        console.log('Ошибка при проверке токена');
      });
  };

  // редактирование профиля и выход

  const onEditProfile = ({ name, email }) => {

    // запрос в базу на обновление информации
    MainApi.updateUserInfo(name, email)
      .then(() => {
        // изменяем информацию о пользователе
        setCurrentUser({
          name,
          email,
        });
      })
      .catch(() => {
        // Обрабатываем ошибку
        console.log('Ошибка при обновлении профиля');
      });
  };

  const onSignout = () => {

    localStorage.removeItem('jwt');

    setCurrentUser({
      name: '',
      email: '',
    });
    setLoggedIn(false);
    // удаляем авторизационные заголовки
    MainApi._headers['Authorization'] = '';
  };

  React.useEffect(() => {
    handleTokenCheck();
  }, []);

  return (
    <div className="app">
      <CurrentUserContext.Provider value={currentUser}>
        <Header loggedIn={loggedIn} />
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/signup' element={<Register onRegister={onRegister} />} />
          <Route path='/signin' element={<Login onLogin={onLogin} />} />
          <Route path='/movies' element={<PrivateRoute loggedIn={loggedIn}> <Movies /></PrivateRoute>} />
          <Route path='/saved-movies' element={<PrivateRoute loggedIn={loggedIn}> <SavedMovies /></PrivateRoute>} />
          <Route path='/profile' element={<PrivateRoute loggedIn={loggedIn}> <Profile onEdit={onEditProfile} onSignout={onSignout} /></PrivateRoute>} />
          <Route path='*' element={<PrivateRoute loggedIn={loggedIn}> <NotFound /></PrivateRoute>} />
        </Routes>
        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}
