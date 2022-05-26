import React from 'react';
import './Register.css';
import logo from '../../images/logo.png';
import { Link } from 'react-router-dom';
import { useInput } from '../../utils/validation';


export default function Register({ onRegister }) {

    const name = useInput('', {
        required: true,
        name: true,
        minLength: 2,
        maxLength: 30,
    });

    const email = useInput('', {
        required: true,
        email: true,
    });
    
    const password = useInput('', {
        required: true,
        minLength: 3
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        onRegister({
            name: name.value,
            email: email.value,
            password: password.value
        });
    };

    return (
        <section className='register form'>
            <Link to='/'>
                <img className='form__logo interactive-button' src={logo} alt='Логотип' />
            </Link>
            <h2 className='form__title'>Добро пожаловать!</h2>
            <form className='form__content' onSubmit={handleSubmit}>
                <ul className='form__sections'>
                    <li className='form__section'>
                        <label className='form__input-title' htmlFor='name-register-input'>Имя</label>
                        <input
                            className='form__input form__input_type_name'
                            id='name-register-input'
                            type='text'
                            name='name'
                            value={name.value}
                            onChange={name.onChange}
                            required
                            autoComplete='off'
                        />
                        { !name.isValid && <p className='form__input-error' >{name.errorText}</p>}
                    </li>
                    <li className='form__section'>
                        <label className='form__input-title' htmlFor='email-register-input'>E-mail</label>
                        <input
                            className='form__input form__input_type_email'
                            id='email-register-input'
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
                        <label className='form__input-title' htmlFor='password-register-input'>Пароль</label>
                        <input
                            className='form__input form__input_type_password'
                            id='password-register-input'
                            type='password'
                            name='password'
                            value={password.value}
                            onChange={password.onChange}
                        />
                        <p className='form__input-error'>{password.errorText}</p>
                    </li>
                </ul>
                <button
                    className='register__enter form__enter interactive-button'
                    type='submit'
                    disabled={ !(name.isValid && email.isValid && password.isValid) }>
                    Зарегистрироваться
                </button>
            </form>
            <p className='form__footnote'>
                Уже зарегистрированы?
                <Link to='/signin' className='form__footnote-link interactive-link'>Войти</Link>
            </p>
        </section>
    );
}