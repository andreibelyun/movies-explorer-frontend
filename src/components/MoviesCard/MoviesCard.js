import './MoviesCard.css';
import activeButtonImg from '../../images/save_movie_button_icon.svg';
import removeButtonImg from '../../images/remove-from-saved-icon.svg';

export default function MoviesCard(props) {

    const buttonClass = (props.status === 'save')
    ? 'movie__save'
    : (props.status === 'ok')
    ? 'movie__save_active'
    : 'movie__remove';

    const buttonContent= (props.status === 'save')
    ? 'Сохранить'
    : (props.status === 'ok')
    ? <img src={activeButtonImg} alt='Галочка'/>
    : <img src={removeButtonImg} alt='Крестик'/>;


    return (
        <article className='movie'>
            <div className='movie__info'>
                <p className='movie__name'>В погоне за Бенкси</p>
                <p className='movie__duration'>27 минут</p>
            </div>

            <img className='movie__preview' src={props.img} alt='В погоне за Бенкси' />
            <button className={`movie__button ${buttonClass} interactive-button`}>
                {buttonContent}
            </button>
        </article>
    );
}
