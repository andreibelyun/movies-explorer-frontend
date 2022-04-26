import React from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import MainApi from '../../utils/MainApi';
import { useLocation } from 'react-router-dom';

export default function SavedMovies({ renderOptions }) {

    const [savedMoviesList, setSavedMoviesList] = React.useState([]);

    const location = useLocation();

    React.useEffect(() => {
        MainApi.getSavedMovies()
            .then((moviesList) => {
                // сортировать по (owner = id пользователя)
                setSavedMoviesList(moviesList.reverse());
            })
            .catch();
    }, [location]);


    return (
        <section className='movies'>
            <SearchForm />
            <MoviesCardList
                movies={savedMoviesList}
                renderOptions={renderOptions} />
            <Preloader />
        </section>
    );
}