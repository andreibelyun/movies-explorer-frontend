import React from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';

export default function Profile() {

    const [isReadOnly, setIsReadOnly] = React.useState(true);

    const [user, setUser] = React.useState({
        name: 'Андрей',
        email: 'pochta@yandex.ru',
    });

    const changeInputStatus = () => {
        setIsReadOnly(!isReadOnly);
    };

    const handleChange = (e) => {
        setUser(prevVal => ({
            ...prevVal,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <section className='profile'>
            <h2 className='profile__title'>{`Привет, ${user.name}!`}</h2>
            <form className='profile__form'>
                <ul className='profile__sections'>
                    <li className='profile__section'>
                        <label className='profile__input-title' htmlFor='name-profile-input'>Имя</label>
                        <input className='profile__input' name='name' id='name-profile-input' type='text' placeholder='Имя' value={user.name} onChange={handleChange} readOnly={isReadOnly}/>
                    </li>
                    <li className='profile__section'>
                        <label className='profile__input-title' htmlFor='email-profile-input'>E-mail</label>
                        <input className='profile__input' name='email' id='email-profile-input' type='text' placeholder='Почта' value={user.email} onChange={handleChange} readOnly={isReadOnly}/>
                    </li>
                </ul>
            </form>
            <button onClick={changeInputStatus} className='profile__edit interactive-link' type='button' aria-label='Редактировать'>
                { isReadOnly ? 'Редактировать' : 'Сохранить'}
            </button>
            <Link to='/signin' className='profile__exit interactive-link' type='Link' aria-label='Выйти из аккаунта'>
                Выйти из аккаунта
            </Link>
        </section>
    );
}