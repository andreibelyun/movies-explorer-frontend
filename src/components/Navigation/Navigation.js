import './Navigation.css';
import accountIcon from '../../images/account-icon.svg';
import { NavLink } from 'react-router-dom';

export default function Navigation() {

    const activeClass = ({isActive}) => `menu__item interactive-link ${isActive ? 'menu__item_active' : ' '}`;

    return (
        <nav className='navbar menu'>
            <input className='menu__switch' id='menu__switch' type='checkbox'/>
            <label htmlFor='menu__switch' className='menu__btn interactive-button' aria-label='Кнопка открыть/закрыть меню'/>
            <ul className='menu__box'>
                <li><NavLink to='/' className={activeClass}>Главная</NavLink></li>
                <li><NavLink to='/movies' className={activeClass}>Фильмы</NavLink></li>
                <li><NavLink to='/saved-movies' className={activeClass}>Сохранённые фильмы</NavLink></li>
                <li>
                    <NavLink to='/profile' className={activeClass}>
                        <p className='account__text'>Аккаунт</p>
                        <div className='account__icon-container'>
                            <img className='account__icon' alt='Профиль человека' src={accountIcon} />
                        </div>
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}