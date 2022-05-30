import React from 'react';
import './Profile.css';

import CurrentUserContext from '../../contexts/CurrentUserContext';
import { useInput } from '../../utils/validation';

export default function Profile({ onEdit, onSignout }) {

    const currentUser = React.useContext(CurrentUserContext);

    const name = useInput(currentUser.name, {
        required: true,
        minLength: 2,
        maxLength: 30,
        name: true,
    });

    const email = useInput(currentUser.email, {
        required: true,
        email: true,
    });

    const [isReadOnly, setIsReadOnly] = React.useState(true);

    const changeInputStatus = () => {
        setIsReadOnly(!isReadOnly);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onEdit({
            name: name.value,
            email: email.value
        });
        changeInputStatus();
    };

    const handleSignout = () => {
        onSignout();
    };

    const isButtonDisabled = !(
        name.isValid && email.isValid
        && (name.value !== currentUser.name
            || email.value !== currentUser.email)
    );

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
                            value={name.value}
                            onChange={name.onChange}
                            readOnly={isReadOnly}
                            required
                        />
                    </li>
                    <p className='form__input-error profile__input-error' >{name.errorText}</p>
                    <li className='profile__section'>
                        <label className='profile__input-title' htmlFor='email-profile-input'>E-mail</label>
                        <input
                            className='profile__input'
                            id='email-profile-input'
                            type='text'
                            placeholder='Почта'
                            name='email'
                            value={email.value}
                            onChange={email.onChange}
                            readOnly={isReadOnly}
                            required
                        />
                    </li>
                    <p className='form__input-error profile__input-error' >{email.errorText}</p>
                </ul>
            </form>
            {isReadOnly
                ?
                <>
                    <button onClick={changeInputStatus} className='profile__edit interactive-link' type='button'>Редактировать</button>
                    <button onClick={handleSignout} className='profile__exit interactive-link' type='button'>Выйти из аккаунта</button>
                </>
                :
                <>
                    <button
                        onClick={handleSubmit}
                        className='profile__save interactive-button'
                        disabled={isButtonDisabled}
                    >
                        Сохранить
                    </button>
                </>
            }
        </section>
    );
}