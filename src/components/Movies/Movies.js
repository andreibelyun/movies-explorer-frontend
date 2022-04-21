import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import { cards } from '../../utils/cards.js';

export default function Movies() {
    return (
        <section className='movies'>
            <SearchForm />
            <MoviesCardList cards={cards} />
            <Preloader/>
        </section>
    );
}
