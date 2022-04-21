import { Routes, Route } from 'react-router-dom';
import './Footer.css';

const thisYear = new Date().getFullYear();

export default function Footer() {

    const needFooterEndpoints = ['/', '/movies', '/saved-movies'];

    return (
        <Routes>
            {needFooterEndpoints.map((endpoint, i) =>
                <Route key={i} path={endpoint} element={
                    <footer className='footer'>
                        <p className='footer__text'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
                        <div className='footer__bottom'>
                            <p className='footer__copyright'>&copy; {thisYear}</p>
                            <ul className='footer__links'>
                                <li>
                                    <a className='footer__link interactive-link' href='https://practicum.yandex.ru' target='_blank' rel='noreferrer'>Яндекс.Практикум</a>
                                </li>
                                <li>
                                    <a className='footer__link interactive-link' href='https://github.com/' target='_blank' rel='noreferrer'>Github</a>
                                </li>
                                <li>
                                    <a className='footer__link interactive-link' href='https://www.facebook.com/' target='_blank' rel='noreferrer'>Facebook</a>
                                </li>
                            </ul>
                        </div>
                    </footer>
                } />
            )}
        </Routes>
    );
}
