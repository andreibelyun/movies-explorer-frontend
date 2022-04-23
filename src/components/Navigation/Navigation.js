import React from 'react';

import './Navigation.css';
import accountIcon from '../../images/account-icon.svg';
import { NavLink, useLocation } from 'react-router-dom';

import CurrentUserContext from '../../contexts/CurrentUserContext';

export default function Navigation({ loggedIn }) {

    const currentUser = React.useContext(CurrentUserContext);

    const activeClass = ({ isActive }) => `menu__item interactive-link ${isActive ? 'menu__item_active' : ''}`;

    const location = useLocation();
    const menuClass = location.pathname === '/' ? 'menu menu_black' : 'menu';

    return (
        loggedIn
            ? (
                <nav className={`navbar ${menuClass}`}>
                    <input className='menu__switch' id='menu__switch' type='checkbox' />
                    <label htmlFor='menu__switch' className='menu__btn interactive-button' aria-label='Кнопка открыть/закрыть меню' />
                    <ul className='menu__box'>
                        <li><NavLink to='/' className={activeClass}>Главная</NavLink></li>
                        <li><NavLink to='/movies' className={activeClass}>Фильмы</NavLink></li>
                        <li><NavLink to='/saved-movies' className={activeClass}>Сохранённые фильмы</NavLink></li>
                        <li>
                            <NavLink to='/profile' className={activeClass}>
                                <p className='account__text'>Аккаунт</p>
                                <div className='account__icon-container'>
                                    <img className='account__icon' alt='Профиль человека' src={accountIcon} />
                                </div>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            )
            : (
                <nav className='navbar'>
                    <ul className='navbar__links'>
                        <li className='navbar__link'>
                            <NavLink className='navbar__signup interactive-link' to='/signup'>Регистрация</NavLink>
                        </li>
                        <li className='navbar__link'>
                            <NavLink className='navbar__signin interactive-button' to='/signin'>Войти</NavLink>
                        </li>
                    </ul>
                </nav>
            )
    );
}