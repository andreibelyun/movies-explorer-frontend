import './MoviesCard.css';

function MoviesCard(props) {
    return (
        <article className='movie'>
            <div className='movie__info'>
                <p className='movie__name'>В погоне за Бенкси</p>
                <p className='movie__duration'>27 минут</p>
            </div>

            <img className='movie__preview' src={props.img} alt='В погоне за Бенкси' />
            <button className='movie__save'>Сохранить</button>
        </article>
    );
}

export default MoviesCard;