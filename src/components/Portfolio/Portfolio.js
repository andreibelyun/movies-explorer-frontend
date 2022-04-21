import './Portfolio.css';

export default function Portfolio() {
    return(
        <section className='portfolio'>
            <h2 className='portfolio__title'>Портфолио</h2>
            <ul className='portfolio__links'>
                <li>
                    <a className='portfolio__link interactive-link' href='https://andreibelyun.github.io/how-to-learn/' target='_blank' rel='noreferrer'>
                        <p className='portfolio__link-text'>Статичный сайт</p>
                        <p className='portfolio__link-arrow'>↗</p>
                    </a>
                </li>
                <li>
                    <a className='portfolio__link interactive-link' href='https://andreibelyun.github.io/russian-travel/' target='_blank' rel='noreferrer'>
                        <p className='portfolio__link-text'>Адаптивный сайт</p>
                        <p className='portfolio__link-arrow'>↗</p>
                    </a>
                </li>
                <li>
                    <a className='portfolio__link interactive-link' href='https://andreibelyun.github.io/mesto/' target='_blank' rel='noreferrer'>
                        <p className='portfolio__link-text'>Одностраничное приложение</p>
                        <p className='portfolio__link-arrow'>↗</p>
                    </a>
                </li>
            </ul>
        </section>
    );
}
