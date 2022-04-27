import React from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import MainApi from '../../utils/MainApi';
import { useLocation } from 'react-router-dom';

export default function SavedMovies({ renderOptions }) {

    const currentUser = React.useContext(CurrentUserContext);
    const location = useLocation();

    const [savedMoviesList, setSavedMoviesList] = React.useState([]);

    const [searchOptions, setSearchOptions] = React.useState({
        keyword: '',
        isShortFilm: false
    });

    // Статус отображение прелоудера
    const [isPreloaderVisible, setIsPreloaderVisible] = React.useState(false);

    const matchedByKeyword = (movie, keyword) => (movie.nameRU.toLowerCase().includes(keyword.toLowerCase()));

    const matchedByDuration = (movie, isShort) => (isShort ? movie.duration <= 40 : movie.duration > 40);

    const matchedByUserId = (movie) => (movie.owner === currentUser.id);

    const handleSearchQuery = (keyword, isShortFilm) => {
        setSearchOptions({ keyword, isShortFilm });
        // Убираем дынные прошлого поиска
        setSavedMoviesList([]);
        setIsPreloaderVisible(true);
        // Получаем и фильтруем фильмы
        MainApi.getSavedMovies()
            .then((movies) => {
                const sortedMovies = movies.filter(
                    movie => (
                        matchedByKeyword(movie, keyword)
                        && matchedByDuration(movie, isShortFilm)
                        && matchedByUserId(movie)
                    )
                )
                // Если поиск пустой - отобразить "Ничего не найдено"
                setSavedMoviesList(sortedMovies);
            })
            .catch(() => {
                // Отобразить "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
                console.log('Ошибка при получении всех фильмов');
            })
            .finally(() => {
                setIsPreloaderVisible(false);
            })
    };

    // При удалении карточки показываем текущий поиск
    React.useEffect(() => {
        MainApi.getSavedMovies()
            .then((movies) => {
                setSavedMoviesList(movies.filter(
                    movie => (
                        matchedByKeyword(movie, searchOptions.keyword)
                        && matchedByDuration(movie, searchOptions.isShortFilm)
                        && matchedByUserId(movie)
                    )
                ));
            })
            .catch();
    }, [location]);

    // При загрузке страницы/перезагрузке показываем все сохранённые фильмы
    React.useEffect(() => {
        MainApi.getSavedMovies()
            .then((movies) => {
                setSavedMoviesList(movies.filter(
                    movie => (matchedByUserId(movie))
                ));
            })
            .catch();
    }, []);

    // монтирование компонента
    React.useEffect(() => { }, []);

    return (
        <section className='movies'>
            <SearchForm
                onSearch={handleSearchQuery}
                searchOptions={searchOptions}
            />
            <Preloader isVisible={isPreloaderVisible} />
            <MoviesCardList
                movies={savedMoviesList}
                searchOptions={searchOptions}
                renderOptions={renderOptions}
            />
        </section>
    );
}