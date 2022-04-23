import './MoviesCardList.css';
import MoviesCard from "../MoviesCard/MoviesCard";

export default function MoviesCardList({ movies }) {

    const isButtonVisible = false;

    const moviesList = movies.slice(0, 8);

    return (
        <section className='movies-card-list'>

            <div className='movies-card-list__container'>
                {
                    moviesList.map((movie, i) =>
                        <MoviesCard
                            name={movie.nameRU}
                            duration={movie.duration}
                            imageUrl={`https://api.nomoreparties.co/${movie.image.url}`}
                            trailerLink={movie.trailerLink}
                            key={i}
                        />
                    )
                }
            </div>

            <button className={`movies-card-list__more interactive-button ${isButtonVisible ? 'movies-card-list__more_visible' : ''}`}>Ещё</button>
        </section>
    );
}