import './SearchForm.css';
import { useState, useEffect } from 'react';
import { useInput } from '../../utils/validation';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

export default function SearchForm({ onSearch, onKeywordMissing, searchOptions }) {

    const keyword = useInput('', { required: true }); // на случай, если будет необходимо добавить правила валидации
    const [isShort, setIsShort] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        if (keyword.isValid && keyword.value.length > 0) onSearch(keyword.value, isShort);
        else onKeywordMissing();
    };

    const handleCheckboxClick = () => {
        setIsShort(!isShort);
        if (keyword.isValid && keyword.value.length > 0) onSearch(keyword.value, !isShort);
        else onKeywordMissing();
    }

    useEffect(() => {
        keyword.setValue(searchOptions.keyword);
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
                    onChange={keyword.onChange}
                    value={keyword.value}
                />
                <p></p>
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
