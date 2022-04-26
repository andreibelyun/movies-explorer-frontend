import React from 'react';
import './Profile.css';

import CurrentUserContext from '../../contexts/CurrentUserContext';

export default function Profile({ onEdit, onSignout }) {

    const currentUser = React.useContext(CurrentUserContext);

    const [isReadOnly, setIsReadOnly] = React.useState(true);

    const [user, setUser] = React.useState({
        name: currentUser.name,
        email: currentUser.email,
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

    const handleSubmit = (e) => {
        e.preventDefault();
        onEdit(user);
        changeInputStatus();
    };

    const handleSignout = () => {
        onSignout();
    };

    return (
        <section className='profile'>
            <h2 className='profile__title'>{`Привет, ${currentUser.name}!`}</h2>
            <form className='profile__form'>
                <ul className='profile__sections'>
                    <li className='profile__section'>
                        <label className='profile__input-title' htmlFor='name-profile-input'>Имя</label>
                        <input
                            className='profile__input'
                            id='name-profile-input'
                            type='text'
                            placeholder='Имя'
                            name='name'
                            value={user.name}
                            onChange={handleChange}
                            readOnly={isReadOnly}
                            required
                        />
                    </li>
                    <li className='profile__section'>
                        <label className='profile__input-title' htmlFor='email-profile-input'>E-mail</label>
                        <input
                            className='profile__input'
                            id='email-profile-input'
                            type='text'
                            placeholder='Почта'
                            name='email'
                            value={user.email}
                            onChange={handleChange}
                            readOnly={isReadOnly}
                            required
                        />
                    </li>
                </ul>
            </form>
            <button onClick={isReadOnly ? changeInputStatus : handleSubmit } className='profile__edit interactive-link' type='button'>
                {isReadOnly ? 'Редактировать' : 'Сохранить'}
            </button>
            <button onClick={handleSignout} className='profile__exit interactive-link' type='button'>Выйти из аккаунта</button>
        </section>
    );
}