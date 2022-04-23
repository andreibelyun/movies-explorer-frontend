import React from 'react';

import './MoviesCard.css';
import activeButtonImg from '../../images/save_movie_button_icon.svg';
import removeButtonImg from '../../images/remove-from-saved-icon.svg';

export default function MoviesCard({ name, duration, imageUrl, trailerLink }) {

    // устанавливаем статус карточки:
    // 1. Карточка не сохранена (не находиться в нашей БД)
    // 2. Карточка сохранена и находится на странице /movies
    // 3. Карточка сохранена и находиться на странице /saved-movies
    const [movieStatus, setMovieStatus] = React.useState('not-saved');

    let buttonClass, buttonContent, buttonPurpose, buttonAction;

    const handleSave = () => {
        console.log('Фильм сохранён');
        setMovieStatus('just-saved');
    };
    const handleDeletion = () => {
        console.log('Фильм удалён');
        setMovieStatus('not-saved');
    };

    if (movieStatus === 'not-saved') {
        buttonClass = 'movie__save';
        buttonContent = 'Сохранить';
        buttonPurpose = 'Сохранить фильм';
        buttonAction = handleSave;
    } else if (movieStatus === 'just-saved') {
        buttonClass = 'movie__save_active';
        buttonContent = <img src={activeButtonImg} alt='Галочка' />;
        buttonPurpose = 'Отменить сохранение фильма';
        buttonAction = handleDeletion;
    } else {
        buttonClass = 'movie__remove';
        buttonContent = <img src={removeButtonImg} alt='Крестик' />;
        buttonPurpose = 'Удалить фильм из сохранённых';
        buttonAction = handleDeletion;
    }

    return (
        <article className='movie'>

            <div className='movie__info'>
                <p className='movie__name'>{name}</p>
                <p className='movie__duration'>{`${duration} минут`}</p>
            </div>

            <div className='movie__preview-container'>
                <a href={trailerLink} target='_blank' rel='noreferrer'>
                    <img className='movie__preview' src={imageUrl} alt={name} />
                </a>
            </div>

            <button
                className={`movie__button ${buttonClass} interactive-button`}
                onClick={buttonAction}
                aria-label={buttonPurpose}
            >
                {buttonContent}
            </button>

        </article>
    );
}
