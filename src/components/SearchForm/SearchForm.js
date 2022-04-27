import React from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

export default function SearchForm({ onSearch, searchOptions }) {

    const [searchKeyword, setSearchKeyword] = React.useState('');
    const [isShort, setIsShort] = React.useState(false);

    const handleChange = (e) => {
        setSearchKeyword(e.target.value);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(searchKeyword, isShort);
    };

    const handleCheckboxClick = () => {
        // Валидировать инпут
        setIsShort(!isShort);
        // e.target.form.submit();
        onSearch(searchKeyword, !isShort);
    }

    React.useEffect(() => {
        setSearchKeyword(searchOptions.keyword);
        setIsShort(searchOptions.isShortFilm);
    }, [searchOptions]);

    return (
        <form className='search-form' onSubmit={handleSearch}>
            <div className='search-form__bar'>
                <input
                    className='search-form__input'
                    type='text'
                    name='keyword'
                    placeholder='Фильм'
                    onChange={handleChange}
                    value={searchKeyword}
                    required
                />
                <button
                    className='search-form__search interactive-button'
                    type='submit'
                >
                    Поиск
                </button>
            </div>

            <FilterCheckbox
                name='Короткометражки'
                onCheckboxClick={handleCheckboxClick}
                isChecked={isShort}
            />
        </form>
    );
}
