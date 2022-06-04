import './MoviesCard.css';
import React from 'react';
import activeButtonImg from '../../images/save_movie_button_icon.svg';
import removeButtonImg from '../../images/remove-from-saved-icon.svg';
import { useLocation } from 'react-router-dom';

export default function MoviesCard(props) {

    const {
        country,
        director,
        duration,
        year,
        description,
        image,
        trailerLink,
        nameRU,
        nameEN,
        thumbnail,
        movieId,
        savedMovies,
        onSave,
        onDeletion
    } = props;

    const location = useLocation().pathname;

    // изменяет склонение слова "минут" в зависимости от длительности
    const getDurationText = (duration) => {
        const tensAndOnes = duration % 100;
        const ones = tensAndOnes % 10;
        if (tensAndOnes > 10 && tensAndOnes < 20) { return `${duration} минут` }
        if (ones > 1 && ones < 5) { return `${duration} минуты` }
        if (ones === 1) { return `${duration} минута` }
        return `${duration} минут`;
    };

    const durationText = getDurationText(duration);

    const handleSave = () => {
        onSave({
            country,
            director,
            duration,
            year,
            description,
            image,
            trailerLink,
            nameRU,
            nameEN,
            thumbnail,
            movieId,
        }, () => {
            setMovieStatus('saved');
        });
    };

    const handleDeletion = () => {
        onDeletion(movieId, () => {
            setMovieStatus('not-saved');
        });
    };

    // Возможные значения статуса карточки:
    // * not-saved: карточка не сохранена
    // * saved: карточка сохранена и находится на странице /movies
    // * in-saved: карточка сохранена и находиться на странице /saved-movies
    const [movieStatus, setMovieStatus] = React.useState('not-saved');

    const [buttonProperties, setButtonProperties] = React.useState({
        buttonClass: 'movie__save',
        buttonContent: 'Сохранить',
        buttonPurpose: 'Сохранить фильм',
        buttonAction: handleSave
    });

    const setStatus = () => {
        const isSaved = savedMovies.find(item => item.movieId === movieId);
        if (location === '/movies' && isSaved) {
            setMovieStatus('saved');
        }
        else if (location === '/saved-movies') {
            setMovieStatus('in-saved');
        } else {
            setMovieStatus('not-saved');
        };
    };

    const setButton = () => {
        if (movieStatus === 'saved') {
            setButtonProperties({
                buttonClass: 'movie__save_active',
                buttonContent: <img src={activeButtonImg} alt='Галочка' />,
                buttonPurpose: 'Отменить сохранение фильма',
                buttonAction: handleDeletion
            });
        } else if (movieStatus === 'in-saved') {
            setButtonProperties({
                buttonClass: 'movie__remove',
                buttonContent: <img src={removeButtonImg} alt='Крестик' />,
                buttonPurpose: 'Удалить фильм из сохранённых',
                buttonAction: handleDeletion
            });
        } else {
            setButtonProperties({
                buttonClass: 'movie__save',
                buttonContent: 'Сохранить',
                buttonPurpose: 'Сохранить фильм',
                buttonAction: handleSave
            });
        }
    };

    React.useEffect(() => {
        setStatus();
        setButton();
    }, [props, movieStatus]);

    return (
        <article className='movie'>
            <div className='movie__info'>
                <p className='movie__name'>{nameRU}</p>
                <p className='movie__duration'>{`${durationText}`}</p>
            </div>

            <div className='movie__preview-container'>
                <a href={trailerLink} target='_blank' rel='noreferrer'>
                    <img className='movie__preview' src={image} alt={nameRU} />
                </a>
            </div>

            <button
                className={`movie__button ${buttonProperties.buttonClass} interactive-button`}
                onClick={buttonProperties.buttonAction}
                aria-label={buttonProperties.buttonPurpose}
            >
                {buttonProperties.buttonContent}
            </button>
        </article>
    );
}
