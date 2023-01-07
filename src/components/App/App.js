import './App.css';
import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
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

  const [currentUser, setCurrentUser] = useState({
    name: '',
    email: '',
    loggedIn: false,
    id: ''
  });
  const [savedMovies, setSavedMovies] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const setAuthorizationHeaders = (value) => {
    MainApi._headers['Authorization'] = value;
  };

  const loadSavedMovies = () => {
    MainApi.getSavedMovies()
      .then((movies) => {
        setSavedMovies(movies.reverse());
      })
      .catch(() => {
        console.error('Ошибка при получении сохранённых фильмов');
      });
  };

  const onLogin = ({ email, password }) => {
    return MainApi.login(email, password)
      .then((data) => {
        localStorage.setItem('jwt', data.token);
        setAuthorizationHeaders(`Bearer ${data.token}`);
        // Обновляем информацию о пользователе
        MainApi.getUserInfo(data.token)
          .then((data) => {
            setCurrentUser({
              name: data.name,
              email: data.email,
              loggedIn: true,
              id: data._id
            });
            loadSavedMovies();
            // Перенаправляем на страницу с фильмами
            navigate('/movies');
          });
      });
  };

  const onRegister = ({ name, email, password }) => {
    return MainApi.register(name, email, password)
      .then(() => {
        onLogin({ email, password });
      });
  };

  const handleTokenCheck = () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      MainApi.checkToken(jwt)
        .then((data) => {
          setCurrentUser({
            name: data.name,
            email: data.email,
            loggedIn: true,
            id: data._id
          });
          setAuthorizationHeaders(`Bearer ${jwt}`);
          loadSavedMovies();
          // Перенаправляем на текущую страницу
          navigate(location.pathname);
        })
        .catch(() => {
          console.error('Ошибка при проверке токена');
          // Удаляем невалидный токен
          localStorage.removeItem('jwt');
        });
    }
  };

  const onEditProfile = ({ name, email }) => {
    return MainApi.updateUserInfo(name, email)
      .then(() => {
        setCurrentUser(prev => ({
          ...prev,
          name,
          email,
          loggedIn: true
        }));
      });
  };

  const onSignout = () => {
    // Удаляем токен и данные поиска
    localStorage.clear();
    // Изменяем информацию о пользователе
    setCurrentUser({
      name: '',
      email: '',
      loggedIn: false,
      id: ''
    });
    setSavedMovies([]);
    // Удаляем авторизационные заголовки
    setAuthorizationHeaders('');
  };

  const onMovieSave = (movie, callback) => {
    MainApi.saveMovie(movie)
      .then(() => {
        setSavedMovies(savedMovies => [movie, ...savedMovies]);
        callback();
      })
      .catch(() => {
        console.error('Ошибка при сохранении фильма');
      });
  };

  const onMovieDeletion = (movieId, callback) => {
    MainApi.getSavedMovies()
      .then((movies) => {
        const id = movies.find(item => (item.movieId === movieId))._id;
        return MainApi.deleteMovieFromSaved(id);
      })
      .then(() => {
        setSavedMovies(savedMovies =>
          (savedMovies.filter(item => !(item.movieId === movieId)))
        );
        callback();
      })
      .catch(() => {
        console.error('Ошибка при отмене сохранения фильма');
      });
  };

  useEffect(() => {
    handleTokenCheck();
  }, []);

  const [renderOptions, setRenderOptions] = useState({
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

  useEffect(() => {
    // при первой загрузке страницы
    window.addEventListener('load', onResize);
    // при изменении ширины экрана
    window.addEventListener('resize', () => {
      // Удаляем предыдущий вызов onResize
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(onResize, 500);
    });
  }, []);

  const [savedRenderOptions, setSavedRenderOptions] = useState({
    initialCardsNumber: savedMovies.length,
    chunkSize: 1
  });

  useEffect(() => {
    setSavedRenderOptions({
      initialCardsNumber: savedMovies.length,
      chunkSize: 1
    })
  }, [savedMovies]);

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
              <Movies
                renderOptions={renderOptions}
                savedMovies={savedMovies}
                onMovieSave={onMovieSave}
                onMovieDeletion={onMovieDeletion}
              />
            </PrivateRoute>} />
          <Route path='/saved-movies' element={
            <PrivateRoute>
              <SavedMovies
                renderOptions={savedRenderOptions}
                savedMovies={savedMovies}
                onMovieSave={onMovieSave}
                onMovieDeletion={onMovieDeletion}
              />
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
