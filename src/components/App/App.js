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
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from '../Footer/Footer';
import CurrentUserContext from '../../contexts/CurrentUserContext';

export default function App() {

  const [currentUser, setCurrenUser] = React.useState({
    name: '',
    email: '',
    loggedIn: false,
  });

  return (
    <div className="app">
      <BrowserRouter>
        <CurrentUserContext.Provider value={currentUser}>
          <Header />
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/signin' element={<Login />} />
            <Route path='/signup' element={<Register />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/movies' element={<Movies />} />
            <Route path='/saved-movies' element={<SavedMovies />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
          <Footer />
        </CurrentUserContext.Provider>
      </BrowserRouter>
    </div>
  );
}
