import React from 'react';
import { useInput } from '../../utils/validation';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

export default function SearchForm({ onSearch, searchOptions, onError }) {
    
    const keyword = useInput('', { required: true });
    const [isShort, setIsShort] = React.useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        if(keyword.isValid) onSearch(keyword.value, isShort);
        else onError(''); // показать сообщение
    };

    const handleCheckboxClick = () => {
        setIsShort(!isShort);
        if(keyword.isValid) onSearch(keyword.value, !isShort);
        else onError(''); // показать сообщение
    }

    React.useEffect(() => {
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
                    required
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
