import './AboutMe.css';
import photo from '../../images/photo.jpg';
import Portfolio from '../Portfolio/Portfolio';

const thisDay = new Date();
const birthday = new Date(1998, 6, 15); // 15.07.1998

const myAge = (thisDay.getMonth() >= birthday.getMonth() && thisDay.getDate() >= birthday.getDate()) 
? thisDay.getFullYear() - birthday.getFullYear() 
: thisDay.getFullYear() - birthday.getFullYear() - 1;


export default function AboutMe() {
    return (
        <section className='about-me'>
            <h2 className='about-me__title'>Студент</h2>
            <div className='about-me__container'>
                <div className='about-me__resume'>
                    <h3 className='about-me__name'>Андрей</h3>
                    <p className='about-me__main'>Веб-разработчик, {myAge} года</p>
                    <p className='about-me__info'>
                        Закончил факультет информационных технологий и робототехники БНТУ, 
                        в настоящий момент живу в Минске. Люблю узнавать новое и стараюсь 
                        постоянно развиваться. Познакомился с программированием ещё в 
                        университете, но только после его окончания понял, что хочу 
                        связать свою жизнь с веб-разработкой.
                    </p>
                    <ul className='about-me__links'>
                        <li><a className='about-me__link interactive-link' href='https://www.facebook.com/andreibelyun' target='_blank' rel='noreferrer'>Facebook</a></li>
                        <li><a className='about-me__link interactive-link' href='https://github.com/andreibelyun' target='_blank' rel='noreferrer'>Github</a></li>
                    </ul>
                </div>
                <img className='about-me__photo' src={photo} alt='Фотография студента'/>
            </div>
            <Portfolio />
        </section>
    );
}
