import './Header.css';
import logo from '../../images/logo.png';

function Header() {
    return(
        <header className='header'>
            <img className='header__logo' alt='Логотип' src={logo}/>
            <div className='header__nav'></div>
            <button className='header__signup'>Регистрация</button>
            <button className='header__signin'>Войти</button>
        </header>
    );
}

export default Header;