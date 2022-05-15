import React from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import MoviesApi from '../../utils/MoviesApi';

export default function Movies({ renderOptions }) {

    const [moviesList, setMoviesList] = React.useState([]);

    const [searchOptions, setSearchOptions] = React.useState({
        keyword: '',
        isShortFilm: false
    });

    // Статус отображение прелоудера
    const [isPreloaderVisible, setIsPreloaderVisible] = React.useState(false);

    const matchedByKeyword = (movie, keyword) => (movie.nameRU.toLowerCase().includes(keyword.toLowerCase()));

    const matchedByDuration = (movie, isShort) => (isShort ? movie.duration <= 40 : movie.duration > 40);

    const handleSearchQuery = (keyword, isShortFilm) => {
        setSearchOptions({ keyword, isShortFilm });
        // Добавляем объект запроса в локальное хранилище
        localStorage.searchOptions = JSON.stringify({ keyword, isShortFilm });
        // Убираем данные прошлого поиска
        setMoviesList([]);
        // Получаем, фильтруем и добавляем в хранилище фильмы
        setIsPreloaderVisible(true);
        // Добавлена задержка для демонстрации работы прелоудера
        setTimeout(() => {
            MoviesApi.getAllMovies()
                .then((movies) => {
                    const sortedMovies = movies.filter(
                        movie => (matchedByKeyword(movie, keyword) && matchedByDuration(movie, isShortFilm))
                    )
                    // Если поиск пустой - отобразить "Ничего не найдено"
                    setMoviesList(sortedMovies);
                    localStorage.moviesList = JSON.stringify(sortedMovies);
                })
                .catch(() => {
                    // Отобразить "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
                    console.log('Ошибка при получении всех фильмов');
                })
                .finally(() => {
                    setIsPreloaderVisible(false);
                })
        }, 5000);
    };

    // Монтирование компонента
    React.useEffect(() => {
        // Достаём объёкт запроса и фильмы при загрузке компонента
        if (!localStorage.searchOptions) {
            // Пользователь ничего не искал или только зашёл в аккаунт
            console.log('Пользователь ничего не искал');
        } else if (!localStorage.moviesList || JSON.parse(localStorage.moviesList).length === 0) {
            // Ничего не найдено
            // Отобразить "Ничего не найдено"
            console.log('Ничего не найдено');
            setSearchOptions(JSON.parse(localStorage.searchOptions));
        } else {
            console.log('Подтягиваем фильмы из хранилища');
            setSearchOptions(JSON.parse(localStorage.searchOptions));
            setMoviesList(JSON.parse(localStorage.moviesList));
        }
    }, []);

    return (
        <section className='movies'>
            <SearchForm
                onSearch={handleSearchQuery}
                searchOptions={searchOptions}
            />
            <Preloader isVisible={isPreloaderVisible} />
            <MoviesCardList
                movies={moviesList}
                searchOptions={searchOptions}
                renderOptions={renderOptions}
            />
        </section>
    );
}
