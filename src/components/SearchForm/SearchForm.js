import './SearchForm.css';

function SearchForm() {
    return (
        <div className='search-form'>
            <div className='search-form__bar'>
                <input className='search-form__input' placeholder='Фильм' />
                <button className='search-form__search'>Поиск</button>
            </div>
            <input className='search-form__film-type' type='checkbox' />
            <label>Короткометражки</label>
        </div>
    );
}

export default SearchForm;
