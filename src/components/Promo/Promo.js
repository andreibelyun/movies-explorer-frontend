import web from '../../images/web-world.png';
import './Promo.css'

function Promo() {
    return (
        <div className='promo'>
            <div className='promo__main'>
                <h1 className='promo__title'>
                    Учебный проект студента факультета Веб&#8209;разработки.
                </h1>
                <p className='promo__subtitle'>
                    Листайте ниже, чтобы узнать больше про этот проект и его создателя.
                </p>
                <button className='promo__learn-more'>
                    Узнать больше
                </button>
            </div>

            <img className='promo__image' alt='Земной шар из слов "web"' src={web} />
        </div>
    );
}

export default Promo;