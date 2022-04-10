import './Footer.css';


const thisYear = new Date().getFullYear();

function Footer() {
    return (
        <footer className='footer'>
            <p className='footer__text'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <div className='footer__bottom'>
                <p className='footer__copyright'>&copy;{thisYear}</p>
                <ul className='footer__links'>
                    <li className='footer__link'>Яндекс.Практикум</li>
                    <li className='footer__link'>Github</li>
                    <li className='footer__link'>Facebook</li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;