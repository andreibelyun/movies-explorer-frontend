import React from 'react';

import './Header.css';
import logo from '../../images/logo.png';
import { Routes, Route, Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';

import CurrentUserContext from '../../contexts/CurrentUserContext';


export default function Header() {
    
    const needWhiteHeaderEndpoints = ['/movies', '/saved-movies', '/profile'];

    const currentUser = React.useContext(CurrentUserContext);

    return (

        
        <Routes>
            <Route path='/' element={
                <header className='header'>
                    <Link to='/'>
                        <img className='header__logo interactive-button' alt='Логотип' src={logo} />
                    </Link>
                    <ul className='header__links'>
                        <li className='header__link'>
                            <Link className='header__signup interactive-link' to='/signup'>Регистрация</Link>
                        </li>
                        <li className='header__link'>
                            <Link className='header__signin interactive-button' to='/signin'>Войти</Link>
                        </li>
                    </ul>
                </header>
            } />
            {needWhiteHeaderEndpoints.map((endpoint, i) => (
                <Route key={i} path={endpoint} element={
                    <header className='header header_white'>
                        <Link to='/'>
                            <img className='header__logo interactive-button' alt='Логотип' src={logo} />
                        </Link>
                        <Navigation />
                    </header>
                } />
            ))}
        </Routes>
    );
}
