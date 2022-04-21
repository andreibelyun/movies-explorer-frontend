import webIcon from '../../images/web-world.png';
import './Promo.css'

const scrollToInfo = () => {
    document.querySelector('.about-project')
        .scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
};

export default function Promo() {
    return (
        <section className='promo'>
            <div className='promo__main'>
                <h1 className='promo__title'>
                    Учебный проект студента факультета <br className='promo__title-break' />Веб-разработки.
                </h1>
                <p className='promo__subtitle'>
                    Листайте ниже, чтобы узнать больше про этот проект и его создателя.
                </p>
                <button type='button' onClick={scrollToInfo} className='promo__learn-more interactive-button'>
                    Узнать больше
                </button>
            </div>

            <img className='promo__image' alt='Земной шар из слов "web"' src={webIcon} />
        </section>
    );
}
