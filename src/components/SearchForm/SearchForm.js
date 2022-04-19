import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

export default function SearchForm() {
    return (
        <form className='search-form'>
            <div className='search-form__bar'>
                <input className='search-form__input' placeholder='Фильм' />
                <button className='search-form__search interactive-button'>Поиск</button>
            </div>
            <FilterCheckbox name='Короткометражки'/>
        </form>
    );
}
