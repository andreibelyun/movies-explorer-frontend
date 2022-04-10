import './Portfolio.css';

function Portfolio() {
    return(
        <section className='portfolio'>
            <h2 className='portfolio__title'>Портфолио</h2>
            <ul className='portfolio__links'>
                <li className='portfolio__link'>
                    <div className='portfolio__link-container'>
                        <p className='portfolio__link-text'>Статичный сайт</p>
                        <p className='portfolio__link-arrow'>↗</p>
                    </div>
                </li>
                <li className='portfolio__link'>
                    <div className='portfolio__link-container'>
                        <p className='portfolio__link-text'>Адаптивный сайт</p>
                        <p className='portfolio__link-arrow'>↗</p>
                    </div>
                </li>
                <li className='portfolio__link'>
                    <div className='portfolio__link-container'>
                        <p className='portfolio__link-text'>Одностраничное приложение</p>
                        <p className='portfolio__link-arrow'>↗</p>
                    </div>
                </li>
            </ul>
        </section>
    );
}

export default Portfolio;