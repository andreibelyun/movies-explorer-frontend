import './Register.css';
import logo from '../../images/logo.png';
import { Link } from 'react-router-dom';


export default function Register() {
    return (
        <section className='register form'>
            <Link to='/'>
                <img className='form__logo interactive-button' src={logo} alt='Логотип'/>
            </Link>
            <h2 className='form__title'>Добро пожаловать!</h2>
            <form className='form__content'>
                <ul className='form__sections'>
                    <li className='form__section'>
                        <label className='form__input-title' htmlFor='name-register-input'>Имя</label>
                        <input className='form__input form__input_type_name' id='name-register-input' type='text' />
                        <p className='form__input-error'/>
                    </li>
                    <li className='form__section'>
                        <label className='form__input-title' htmlFor='email-register-input'>E-mail</label>
                        <input className='form__input form__input_type_email' id='email-register-input' type='text' />
                        <p className='form__input-error'/>
                    </li>
                    <li className='form__section'>
                        <label className='form__input-title' htmlFor='password-register-input'>Пароль</label>
                        <input className='form__input form__input_type_password' id='password-register-input' type='password' />
                        <p className='form__input-error'>Что-то пошло не так...</p>
                    </li>
                </ul>
                <button className='register__enter form__enter interactive-button' type='submit'>Зарегистрироваться</button>
            </form>
            <p className='form__footnote'>
                Уже зарегистрированы?
                <Link to='/signin' className='form__footnote-link interactive-link'>Войти</Link>
            </p>
        </section>
    );
}