import React from 'react';

import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import NotFound from '../NotFound/NotFound';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';

import CurrentUserContext from '../../contexts/CurrentUserContext';
import MainApi from '../../utils/MainApi';

export default function App() {

  const [currentUser, setCurrenUser] = React.useState({
    name: '',
    email: '',
    loggedIn: false,
  });

  const navigate = useNavigate();

  const onRegister = ({ name, email, password }) => {
    MainApi.register(name, email, password)
      .then(() => {
        navigate('/signin');
        console.log('Успешно зарегистрирован');
      })
      .catch(() => {
        console.log('Ошибка при регистрации');
      });
  };

  return (
    <div className="app">
        <CurrentUserContext.Provider value={currentUser}>
          <Header />
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/signin' element={<Login />} />
            <Route path='/signup' element={<Register onRegister={onRegister} />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/movies' element={<Movies />} />
            <Route path='/saved-movies' element={<SavedMovies />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
          <Footer />
        </CurrentUserContext.Provider>
    </div>
  );
}
