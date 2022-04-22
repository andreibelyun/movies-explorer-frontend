import React from 'react';

import './Login.css';
import logo from '../../images/logo.png';
import { Link } from 'react-router-dom';

export default function Login({ onLogin }) {

    const [user, setUser] = React.useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setUser((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        onLogin(user);
    };


    return (
        <section className='login form'>
            <Link to='/'>
                <img className='form__logo interactive-button' src={logo} alt='Логотип' />
            </Link>
            <h2 className='form__title'>Рады видеть!</h2>
            <form className='form__content' onSubmit={handleSubmit}>
                <ul className='form__sections'>
                    <li className='form__section'>
                        <label className='form__input-title' htmlFor='email-login-input'>E-mail</label>
                        <input
                            className='form__input form__input_type_email'
                            id='email-login-input'
                            type='text'
                            name='email'
                            value={user.email}
                            onChange={handleChange}
                            required
                        />
                        <p className='form__input-error' />
                    </li>
                    <li className='form__section'>
                        <label className='form__input-title' htmlFor='password-login-input'>Пароль</label>
                        <input
                            className='form__input form__input_type_password'
                            id='password-login-input'
                            type='password'
                            name='password'
                            value={user.password}
                            onChange={handleChange}
                            required
                        />
                        <p className='form__input-error' />
                    </li>
                </ul>
                <button className='login__enter form__enter interactive-button' type='submit'>Войти</button>
            </form>
            <p className='form__footnote'>
                Ещё не зарегистрированы?
                <Link to='/signup' className='form__footnote-link interactive-link'>Регистрация</Link>
            </p>
        </section>
    );
}