import React from 'react';

import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import MainApi from '../../utils/MainApi';

export default function SavedMovies() {

    const [savedMoviesList, setSavedMoviesList] = React.useState([]);

    React.useEffect(() => {
        MainApi.getSavedMovies()
            .then((moviesList) => {
                setSavedMoviesList(moviesList);
                console.log(moviesList)
            })
            .catch();
    }, []);

    return (
        <section className='movies'>
            <SearchForm />
            <MoviesCardList movies={savedMoviesList}/>
            <Preloader />
        </section>
    );
}