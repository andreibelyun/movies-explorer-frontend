import React from 'react';
import './MoviesCard.css';
import activeButtonImg from '../../images/save_movie_button_icon.svg';
import removeButtonImg from '../../images/remove-from-saved-icon.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import MainApi from '../../utils/MainApi';
import CurrentUserContext from '../../contexts/CurrentUserContext';

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
        movieId }
        = props;

    const location = useLocation().pathname;
    const navigate = useNavigate();
    const currentUser = React.useContext(CurrentUserContext);

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

    // Возможные значения статуса карточки:
    // * not-saved: карточка не сохранена
    // * just-saved: карточка сохранена и находится на странице /movies
    // * saved: карточка сохранена и находиться на странице /saved-movies
    const [movieStatus, setMovieStatus] = React.useState('not-saved');

    // Устанавливаем карточке статус
    MainApi.getSavedMovies()
        .then((moviesList) => {
            const isSaved = moviesList
                .filter(item => (item.owner === currentUser.id))
                .find(item => item.movieId === movieId);
            if (location === '/movies' && isSaved) {
                setMovieStatus('just-saved');
            }
            else if (location === '/saved-movies') {
                setMovieStatus('saved');
            } else {
                setMovieStatus('not-saved');
            }
        })
        .catch(() => {
            console.log('Ошибка при получении сохранённых карточек');
        });

    const handleSave = () => {
        MainApi.saveMovie({
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
        })
            .then(() => {
                setMovieStatus('just-saved');
            })
            .catch(() => {
                console.log('Ошибка при сохранении фильма');
            });
    };

    const handleDeletion = () => {
        MainApi.getSavedMovies()
            .then((movies) => {
                const id = movies.find((item) => (item.owner === currentUser.id && item.movieId === movieId))._id;
                MainApi.deleteMovieFromSaved(id)
                    .then(() => {
                        setMovieStatus('not-saved');
                        // для перерендера компонента SavedMovies
                        navigate(location);
                    })
            })
            .catch(() => {
                console.log('Ошибка при удалении фильма');
            });
    };

    let buttonClass, buttonContent, buttonPurpose, buttonAction;

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
                <p className='movie__name'>{nameRU}</p>
                <p className='movie__duration'>{`${durationText}`}</p>
            </div>

            <div className='movie__preview-container'>
                <a href={trailerLink} target='_blank' rel='noreferrer'>
                    <img className='movie__preview' src={image} alt={nameRU} />
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
