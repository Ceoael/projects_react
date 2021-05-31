import React, {useState} from 'react';

import classes from './TodoInput.module.css';

const TodoInput = ({addNewTaskToList}) => {

    const [inputValue, setInputValue] = useState('');

    let buttonAttachedClasses = [classes.TodoInput__button];
    
    if (!inputValue.length) {
        buttonAttachedClasses = [classes.TodoInput__button, classes['TodoInput__button--disable']]
    }
    
    const onClickHandler = (e) => {
        e.preventDefault();
        if (inputValue.trim()) {
            addNewTaskToList(inputValue);
        };
        
        setInputValue('');
    }

    return (
        <form onSubmit={onClickHandler} className={classes.TodoInput}>
            <input 
                className={classes.TodoInput__input} 
                value={inputValue} 
                onChange={e => setInputValue(e.target.value)}
                type="text"
                placeholder="I have to do..."/>
            <button 
                onClick={onClickHandler} 
                type="submit" 
                className={buttonAttachedClasses.join(' ')}>Add</button>
        </form>
    )
}

export default TodoInput;