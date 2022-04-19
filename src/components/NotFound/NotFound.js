import { useNavigate } from 'react-router';
import './NotFound.css';

export default function NotFound() {

    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };

    return(
        <section className='not-found'>
            <h2 className='not-found__title'>404</h2>
            <p className='not-found__subtitle'>Страница не найдена</p>
            <button onClick={goBack} className='not-found__back interactive-link'>Назад</button>
        </section>
    );
}