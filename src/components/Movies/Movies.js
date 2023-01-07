import './Movies.css';
import { useState, useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import MoviesApi from '../../utils/MoviesApi';

export default function Movies({ renderOptions, savedMovies, onMovieSave, onMovieDeletion }) {
    const [moviesList, setMoviesList] = useState([]);
    const [searchOptions, setSearchOptions] = useState({
        keyword: '',
        isShortFilm: false
    });
    const [isPreloaderVisible, setIsPreloaderVisible] = useState(false);
    const [text, setText] = useState('');

    const matchedByKeyword = (movie, keyword) => (movie.nameRU.toLowerCase().includes(keyword.toLowerCase()));
    const matchedByDuration = (movie, isShort) => (isShort ? movie.duration <= 40 : movie.duration > 40);

    const handleSearchQuery = (keyword, isShortFilm) => {
        setSearchOptions({ keyword, isShortFilm });
        localStorage.searchOptions = JSON.stringify({ keyword, isShortFilm });
        setMoviesList([]);
        setIsPreloaderVisible(true);
        // Добавлена задержка для демонстрации работы прелоудера
        setTimeout(() => {
            MoviesApi.getAllMovies()
                .then((movies) => {
                    const sortedMovies = movies.filter(movie => (
                        matchedByKeyword(movie, keyword)
                        && matchedByDuration(movie, isShortFilm))
                    );
                    sortedMovies.length > 0
                        ? setText('')
                        : setText('Ничего не найдено');
                    setMoviesList(sortedMovies);
                    localStorage.moviesList = JSON.stringify(sortedMovies);
                })
                .catch(() => {
                    setText(`Во время запроса произошла ошибка. 
                    Возможно, проблема с соединением или сервер недоступен.
                    Подождите немного и попробуйте ещё раз.`
                    );
                })
                .finally(() => {
                    setIsPreloaderVisible(false);
                })
        }, 1500);
    };

    const onKeywordMissing = () => {
        setMoviesList([]);
        setText('Нужно ввести ключевое слово');
    };

    useEffect(() => {
        // Достаём объёкт запроса и фильмы при монтировании компонента
        if (!localStorage.searchOptions) {
            // Пользователь ничего не искал или только зашёл в аккаунт
            setText('Начните поиск');
        } else if (!localStorage.moviesList || JSON.parse(localStorage.moviesList).length === 0) {
            // С прошлого поиска ничего не найдено
            setText('Ничего не найдено');
            setSearchOptions(JSON.parse(localStorage.searchOptions));
        } else {
            setSearchOptions(JSON.parse(localStorage.searchOptions));
            setMoviesList(JSON.parse(localStorage.moviesList));
        }
    }, []);

    return (
        <section className='movies'>
            <SearchForm
                onSearch={handleSearchQuery}
                onKeywordMissing={onKeywordMissing}
                searchOptions={searchOptions}
            />
            {moviesList.length === 0 && !isPreloaderVisible && <p className='movies__text'>{text}</p>}
            {moviesList.length > 0 && !isPreloaderVisible &&
                <MoviesCardList
                    movies={moviesList}
                    renderOptions={renderOptions}
                    savedMovies={savedMovies}
                    onMovieSave={onMovieSave}
                    onMovieDeletion={onMovieDeletion}
                />
            }
            <Preloader isVisible={isPreloaderVisible} />
        </section>
    );
}
