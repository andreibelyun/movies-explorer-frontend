import './Header.css';
import logo from '../../images/logo.png';
import { Link, useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';

export default function Header() {

    const location = useLocation();
    const headerClass = location.pathname === '/' ? 'header header_black' : 'header';

    return (
        <header className={headerClass}>
            <Link to='/'>
                <img className='header__logo interactive-button' alt='Логотип' src={logo}/>
            </Link>
            <Navigation />
        </header>
    );
}
