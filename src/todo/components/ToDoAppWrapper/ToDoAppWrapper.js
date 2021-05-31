import React from 'react';

import classes from './ToDoAppWrapper.module.css';

const ToDoAppWrapper = (props) => {
    return (
        <div className={classes.TodoApp__Background}>
            <div className={classes.TodoApp__Wrapper}>
                {props.children}
            </div>
        </div>
    )
}

export default ToDoAppWrapper;
