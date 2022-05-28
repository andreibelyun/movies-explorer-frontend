import React from 'react';
import './Login.css';
import logo from '../../images/logo.png';
import { Link } from 'react-router-dom';
import { useInput } from '../../utils/validation';

export default function Login({ onLogin }) {

    const email = useInput('', {
        required: true,
        email: true,
    });

    const password = useInput('', {
        required: true,
        minLength: 3,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        onLogin({
            email: email.value,
            password: password.value
        });
    };

    const isButtonDisabled = !(
        email.isValid && password.isValid
        && email.value && password.value
    ); // values - для отключения кнопки при первой загрузке страницы (без ошибок)

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
                            value={email.value}
                            onChange={email.onChange}
                            required
                            autoComplete='off'
                        />
                        <p className='form__input-error'>{email.errorText}</p>
                    </li>
                    <li className='form__section'>
                        <label className='form__input-title' htmlFor='password-login-input'>Пароль</label>
                        <input
                            className='form__input form__input_type_password'
                            id='password-login-input'
                            type='password'
                            name='password'
                            value={password.value}
                            onChange={password.onChange}
                            required
                            autoComplete='off'
                        />
                        <p className='form__input-error'>{password.errorText}</p>
                    </li>
                </ul>
                <button
                    className='login__enter form__enter interactive-button'
                    type='submit'
                    disabled={isButtonDisabled}>
                    Войти
                </button>
            </form>
            <p className='form__footnote'>
                Ещё не зарегистрированы?
                <Link to='/signup' className='form__footnote-link interactive-link'>Регистрация</Link>
            </p>
        </section>
    );
}