import './Profile.css';
import { useState, useContext } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { useInput } from '../../utils/validation';

export default function Profile({ onEdit, onSignout }) {

    const currentUser = useContext(CurrentUserContext);

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

    const [profileError, setProfileError] = useState('');

    const isProfileError = profileError.length > 0;

    const [isReadOnly, setIsReadOnly] = useState(true);

    const changeInputStatus = () => {
        setIsReadOnly(!isReadOnly);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onEdit({
            name: name.value,
            email: email.value
        })
            .then(() => {
                changeInputStatus();
            })
            .catch((err) => {
                handleError(err);
                setTimeout(() => {
                    setProfileError('');
                    name.setValue(currentUser.name);
                    email.setValue(currentUser.email);
                }, 4000);
            });
    };

    const handleSignout = () => {
        onSignout();
    };

    const handleError = (err) => {
        if (err.status === 409)
            setProfileError(' Пользователь с таким email уже существует.');
        else if (err.status === 500)
            setProfileError('На сервере произошла ошибка.');
        else
            setProfileError('При обновлении профиля произошла ошибка. Попробуйте ещё раз.');
    };

    const isButtonDisabled = (
        isProfileError ||
        !(name.isValid && email.isValid
            && (name.value !== currentUser.name
                || email.value !== currentUser.email))
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
                <div className='profile__save'>
                    {isProfileError ? <p className='form__error'>{profileError}</p> : ''}
                    <button
                        onClick={handleSubmit}
                        className='form__enter interactive-button'
                        disabled={isButtonDisabled}
                    >
                        Сохранить
                    </button>
                </div>
            }
        </section>
    );
}