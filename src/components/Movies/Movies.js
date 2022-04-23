import React from 'react';

import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import MoviesApi from '../../utils/MoviesApi';

export default function Movies() {

    const [moviesList, setMoviesList] = React.useState([]);

    React.useEffect(() => {
        MoviesApi.getAllMovies()
            .then((moviesList) => {
                setMoviesList(moviesList);
                console.log(moviesList)
            })
            .catch();
    }, []);

    return (
        <section className='movies'>
            <SearchForm />
            <MoviesCardList movies={moviesList} />
            <Preloader />
        </section>
    );
}
