import React from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import MoviesApi from '../../utils/MoviesApi';

export default function Movies({ renderOptions }) {

    const [moviesList, setMoviesList] = React.useState([]);

    const [searchOptions, setSearchOptions] = React.useState({
        keyWord: '',
        isShortFilm: false
    });

    const handleSearchQuery = (keyWord, isShortFilm) => {
        setSearchOptions({ keyWord, isShortFilm });
        localStorage.setItem('searchOptions', searchOptions);
    };

    // Статус отображение прелоудера
    const [isPreloaderVisible, setIsPreloaderVisible] = React.useState(false);

    // componentDidMount
    // Добавлена задержка для демонстрации работы прелоудера
    React.useEffect(() => {
        // Не показываем старый результат поиска
        setMoviesList([]);
        setIsPreloaderVisible(true)
        setTimeout(() => {
            MoviesApi.getAllMovies()
            .then((movies) => {
                setMoviesList(movies.slice(0, 21));
            })
            .catch(() => {
                console.log('Ошибка при получении всех фильмов');
            })
            .finally(() => {
                setIsPreloaderVisible(false);
            })
        }, 1000);
    }, []);

    React.useEffect(() => {
        const searchOptions = localStorage.getItem('searchOptions');
        if(searchOptions?.keyWord) {
            
        }
    }, []);

    return (
        <section className='movies'>
            <SearchForm
                onSearch={handleSearchQuery}
            />
            <Preloader isVisible={isPreloaderVisible}/>
            <MoviesCardList
                movies={moviesList}
                searchOptions={searchOptions}
                renderOptions={renderOptions}
            />
        </section>
    );
}
