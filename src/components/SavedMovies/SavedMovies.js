import './SavedMovies.css';
import { useState, useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

export default function SavedMovies({ renderOptions, savedMovies, onMovieSave, onMovieDeletion }) {
    const [savedMoviesList, setSavedMoviesList] = useState(savedMovies);
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
        setSavedMoviesList([]);
        setIsPreloaderVisible(true);
        const sortedMovies = savedMovies.filter(movie => (
            matchedByKeyword(movie, keyword)
            && matchedByDuration(movie, isShortFilm)
        ));
        sortedMovies.length > 0
            ? setText('')
            : setText('Ничего не найдено');
        setSavedMoviesList(sortedMovies);
        setIsPreloaderVisible(false);
    };

    const onKeywordMissing = () => {
        setSavedMoviesList([]);
        setText('Нужно ввести ключевое слово');
    };

    useEffect(() => {
        if (savedMovies.length > 0)
            setSavedMoviesList(savedMovies);
        else
            setText('У вас пока нет сохранённых фильмов');
    }, [savedMovies]);

    return (
        <section className='movies'>
            <SearchForm
                onSearch={handleSearchQuery}
                onKeywordMissing={onKeywordMissing}
                searchOptions={searchOptions}
            />
            {savedMoviesList.length === 0 && !isPreloaderVisible && <p className='movies__text'>{text}</p>}
            {savedMoviesList.length > 0 && !isPreloaderVisible &&
                <MoviesCardList
                    movies={savedMoviesList}
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