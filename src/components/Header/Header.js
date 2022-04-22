import './Header.css';
import logo from '../../images/logo.png';
import { Link, useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';

export default function Header() {

    const currentPath = useLocation().pathname;
    const headerClass = currentPath === '/' ? 'header header_black' : 'header';
    const needHeaderEndpoints = ['/', '/movies', '/saved-movies', '/profile'];
    const isVisible = needHeaderEndpoints.includes(currentPath);

    if (isVisible) return (
        <header className={headerClass}>
            <Link to='/'>
                <img className='header__logo interactive-button' alt='Логотип' src={logo} />
            </Link>
            <Navigation />
        </header>
    );
}
