import React from 'react';
import './FilterCheckbox.css';

export default function FilterCheckbox({ name, onCheckboxClick, isChecked }) {

    return (
        <div className='filter-checkbox'>
            <input className='filter-checkbox__switch' type='checkbox' id='shorts' onChange={onCheckboxClick} checked={isChecked}/>
            <label htmlFor='shorts' className="filter-checkbox__visible-switch">
                <span className="filter-checkbox__visible-switch-circle"/>
            </label>
            <label className='filter-checkbox__label'>{name}</label>
        </div>
    );
}