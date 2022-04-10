import './Movies.css';

import { images } from '../../utils/constants';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCard from '../MoviesCard/MoviesCard';

function Movies() {
    return(
        <section className='movies'>
            <SearchForm />

            <MoviesCard img={images[0]}/>
        </section>
    );
}

export default Movies;