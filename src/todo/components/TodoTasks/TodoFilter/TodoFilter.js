import React, {useState} from 'react';

import classes from './TodoFilter.module.css';

const TodoFilter = ({setFilterBy}) => {
    const buttonNames = ['all', 'done', 'undone'];
    const [activeButton, currentActiveButton] = useState('all');

    const clickHandler = (e) => {
        currentActiveButton(e.target.name);

        setFilterBy(e.target.name);
    };
 
    return (
        <div className={classes.TodoFilter}>
            <p className={classes.TodoFilter__description}>Show: </p>
            {buttonNames.map((buttonName) => {
                let attachClasses = [classes.TodoFilter__button];

                if (buttonName === activeButton) {
                    attachClasses.push(classes['TodoFilter__button--active']);
                }

                return <button 
                    key={buttonName} 
                    name={buttonName}
                    onClick={clickHandler}
                    className={attachClasses.join(' ')}>{buttonName}</button>
            })}
        </div>
    )
}

export default TodoFilter;