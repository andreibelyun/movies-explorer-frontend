import './FilterCheckbox.css';

export default function FilterCheckbox(props) {
    return(
        <div className='filter-checkbox'>
            <input className='filter-checkbox__switch' type='checkbox' id='shorts'/>
            <label htmlFor='shorts' className="filter-checkbox__visible-switch">
                <span className="filter-checkbox__visible-switch-circle"/>
            </label>
            <label className='filter-checkbox__label'>{props.name}</label>
        </div>
    );
}