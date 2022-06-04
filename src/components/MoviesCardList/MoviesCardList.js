import './MoviesCardList.css';
import { useState, useEffect } from 'react';
import MoviesCard from "../MoviesCard/MoviesCard";

export default function MoviesCardList({ movies, renderOptions, savedMovies, onMovieSave, onMovieDeletion }) {
    // показывать кнопку "Ещё" или нет
    const [showMore, setShowMore] = useState(false);
    const [moviesList, setMoviesList] = useState(movies.slice(0, renderOptions.initialCardsNumber));

    const renderMore = () => {
        // добавляем к карточкам подмассив фильмов
        setMoviesList((prevList) =>
            prevList.concat(
                movies.slice(prevList.length, prevList.length + renderOptions.chunkSize)));
    };

    useEffect(() => {
        setShowMore(movies.length > moviesList.length);
    }, [moviesList]);

    useEffect(() => {
        setMoviesList(movies.slice(0, renderOptions.initialCardsNumber));
    }, [movies, renderOptions]);

    const imagesSourse = 'https://api.nomoreparties.co/';

    return (
        <section className='movies-card-list'>
            <div className='movies-card-list__container'>
                {
                    moviesList.map((movie, i) =>
                    (
                        <MoviesCard
                            country={movie.country || ''}
                            director={movie.director || ''}
                            duration={movie.duration || ''}
                            year={movie.year || ''}
                            description={movie.description || ''}
                            image={(movie.image?.url ? imagesSourse + movie.image.url : movie.image) || ''}
                            trailerLink={movie.trailerLink || ''}
                            nameRU={movie.nameRU || ''}
                            nameEN={movie?.nameEN || ''}
                            thumbnail={(movie?.thumbnail || imagesSourse + movie.image.formats.thumbnail.url) || ''}
                            movieId={movie?.id || movie.movieId || ''}
                            key={i}
                            savedMovies={savedMovies}
                            onSave={onMovieSave}
                            onDeletion={onMovieDeletion}
                        />
                    ))
                }
            </div>

            <button
                className={`movies-card-list__more interactive-button ${showMore ? 'movies-card-list__more_visible' : ''}`}
                onClick={renderMore}
            >
                Ещё
            </button>
        </section>
    );
}