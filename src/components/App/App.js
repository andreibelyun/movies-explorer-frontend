import React from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
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
    id: ''
  });

  const navigate = useNavigate();
  const location = useLocation();

  // Регистрация, авторизация, проверка токена
  const onRegister = ({ name, email, password }) => {
    MainApi.register(name, email, password)
      .then(() => {
        navigate('/signin');
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
        // Добавляем авторизационные заголовки
        MainApi._headers['Authorization'] = `Bearer ${data.token}`;
        // Обновляем информацию о пользователе
        MainApi.getUserInfo(data.token)
          .then((data) => {
            setCurrentUser({
              name: data.name,
              email: data.email,
              loggedIn: true,
              id: data._id
            });
            // Перенаправляем на страницу с фильмами
            navigate('/movies');
          })
      })
      .catch(() => {
        // Обрабатываем ошибку
        console.log('Ошибка при входе');
      });
  };

  const handleTokenCheck = () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      MainApi.checkToken(jwt)
        .then((data) => {
          // Обновляем информацию о пользователе
          setCurrentUser({
            name: data.name,
            email: data.email,
            loggedIn: true,
            id: data._id
          });
          // Добавляем авторизационные заголовки
          MainApi._headers['Authorization'] = `Bearer ${jwt}`;
          // Перенаправляем на текущую страницу
          navigate(location.pathname);
        })
        .catch(() => {
          // Обрабатываем ошибку
          console.log('Ошибка при проверке токена');
          // Удаляем невалидный токен
          localStorage.removeItem('jwt');
        });
    }
  };

  // Редактирование профиля и выход
  const onEditProfile = ({ name, email }) => {
    // Запрос в базу на обновление информации
    MainApi.updateUserInfo(name, email)
      .then(() => {
        // Изменяем информацию о пользователе
        setCurrentUser(prev => ({
          ...prev,
          name,
          email,
          loggedIn: true
        }));
      })
      .catch(() => {
        // Обрабатываем ошибку
        console.log('Ошибка при обновлении профиля');
      });
  };

  const onSignout = () => {
    // Удаляем токен
    localStorage.removeItem('jwt');
    // Изменяем информацию о пользователе
    setCurrentUser({
      name: '',
      email: '',
      loggedIn: false,
      id: ''
    });
    // Удаляем авторизационные заголовки
    MainApi._headers['Authorization'] = '';
  };

  // При монтировании App
  React.useEffect(() => {
    handleTokenCheck();
  }, []);

  // Рендер карточек в зависимости от ширины экрана
  const [renderOptions, setRenderOptions] = React.useState({
    initialCardsNumber: 12,
    chunkSize: 3
  });

  const onResize = () => {
    // Ширина экрана
    const windowWidth = document.querySelector('.app').clientWidth;
    // 1280px
    if (windowWidth >= 1100) {
      setRenderOptions({
        initialCardsNumber: 12,
        chunkSize: 3
      });
      // 768px
    } else if (windowWidth >= 684) {
      setRenderOptions({
        initialCardsNumber: 8,
        chunkSize: 2
      });
      // 480-320px
    } else {
      setRenderOptions({
        initialCardsNumber: 5,
        chunkSize: 2
      });
    }
  };

  // Задержка выполнения функции onResize
  let resizeTimeout;

  // При монтировании App
  React.useEffect(() => {
    // при первой загрузке страницы
    window.addEventListener('load', onResize);
    // при изменении ширины экрана
    window.addEventListener('resize', () => {
      // Удаляем предыдущий вызов onResize
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(onResize, 500);
    });
  }, []);

  return (
    <div className="app">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/signup' element={<Register onRegister={onRegister} />} />
          <Route path='/signin' element={<Login onLogin={onLogin} />} />
          <Route path='/movies' element={
            <PrivateRoute>
              <Movies renderOptions={renderOptions} />
            </PrivateRoute>} />
          <Route path='/saved-movies' element={
            <PrivateRoute>
              <SavedMovies renderOptions={renderOptions} />
            </PrivateRoute>} />
          <Route path='/profile' element={
            <PrivateRoute>
              <Profile onEdit={onEditProfile} onSignout={onSignout} />
            </PrivateRoute>} />
          <Route path='*' element={
            <PrivateRoute>
              <NotFound />
            </PrivateRoute>} />
        </Routes>
        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}
