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
    };

    const [isVisible, setIsVisible] = React.useState(false);

    // componentDidMount
    // Добавлена задержка для демонстрации работы прелоудера
    React.useEffect(() => {
        setSearchOptions(localStorage.getItem('searchOptions'));
        setMoviesList([]);
        setIsVisible(true)
        setTimeout(() => {
            MoviesApi.getAllMovies()
            .then((movies) => {
                setMoviesList(movies.slice(0, 21));
            })
            .catch(() => {
                console.log('Ошибка при получении всех фильмов');
            })
            .finally(() => {
                setIsVisible(false);
            })
        }, 1000);
    }, []);

    return (
        <section className='movies'>
            <SearchForm
                onSearch={handleSearchQuery}
            />
            <Preloader isVisible={isVisible}/>
            <MoviesCardList
                movies={moviesList}
                searchOptions={searchOptions}
                renderOptions={renderOptions}
            />
        </section>
    );
}
