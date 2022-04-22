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
    loggedIn: false,
  });

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
        setCurrentUser({
          name: data.name,
          email: data.email,
          loggedIn: true,
        });
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
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');

      MainApi.checkToken(jwt)
        .then((data) => {
          console.log(currentUser);
          // Обновляем информацию о пользователе
          setCurrentUser({
            name: data.name,
            email: data.email,
            loggedIn: true,
          });
          console.log(currentUser);
          // Добавляем авторизационные заголовки
          MainApi._headers['Authorization'] = `Bearer ${jwt}`;
        })
        .catch(() => {
          // Обрабатываем ошибку
          console.log('Ошибка при проверке токена');
        });
    }
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
          loggedIn: true,
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
      loggedIn: false,
    });
    // удаляем авторизационные заголовки
    MainApi._headers['Authorization'] = '';
  };

  React.useEffect(() => {
    handleTokenCheck();
  }, []);

  return (
    <div className="app">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/signup' element={<Register onRegister={onRegister} />} />
          <Route path='/signin' element={<Login onLogin={onLogin} />} />
          <Route path='/movies' element={<PrivateRoute> <Movies /></PrivateRoute>} />
          <Route path='/saved-movies' element={<PrivateRoute> <SavedMovies /></PrivateRoute>} />
          <Route path='/profile' element={<PrivateRoute> <Profile onEdit={onEditProfile} onSignout={onSignout} /></PrivateRoute>} />
          <Route path='*' element={<PrivateRoute> <NotFound /></PrivateRoute>} />
        </Routes>
        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}
