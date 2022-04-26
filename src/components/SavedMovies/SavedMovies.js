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

    const [savedMoviesList, setSavedMoviesList] = React.useState([]);

    const location = useLocation();

    React.useEffect(() => {
        MainApi.getSavedMovies()
            .then((moviesList) => {
                // сортировать по (owner = id пользователя)
                setSavedMoviesList(moviesList.reverse().filter(item => (item.owner === currentUser.id)));
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