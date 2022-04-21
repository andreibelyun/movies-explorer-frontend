import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import { savedCards } from '../../utils/cards.js';

export default function SavedMovies() {
    return (
        <section className='movies'>
            <SearchForm />
            <MoviesCardList cards={savedCards} />
            <Preloader />
        </section>
    );
}