import './MoviesCardList.css';
import MoviesCard from "../MoviesCard/MoviesCard";

export default function MoviesCardList(props) {

    const isButtonVisible = props.cards.length > 10;

    return(
        <section className='movies-card-list'>

            <div className='movies-card-list__container'>
                {props.cards.map((card, i) => <MoviesCard key={i} img={card.image} status={card.status}/>)}
            </div>
            
            <button className={`movies-card-list__more interactive-button ${isButtonVisible ? 'movies-card-list__more_visible' : ''}`}>Ещё</button>
        </section>
    );
}