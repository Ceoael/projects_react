import React from 'react';

import classes from './TodoTask.module.css';

const TodoTask = ({
        taskDescription, 
        status, 
        taskListDoneHandler,
        id, taskListDeleteHandler, 
        addedDate, 
        finishedDate,
        turnOnModalHandler}, ref) => {
    let attachClassesToDescription = [classes.TodoTask__description];

    if (status === 'done') {
        attachClassesToDescription = [classes.TodoTask__description, 
                                        classes['TodoTask__description--done']];
    }

    return (
        <div className={classes.TodoTask}>
            <div className={classes.TodoTask__Content}>
                <p 
                    className={attachClassesToDescription.join(' ')}
                    onClick={() => status !== 'done' ? turnOnModalHandler(id) : null}>{taskDescription}</p>
                <button 
                    onClick={() => taskListDoneHandler(id)} 
                    className={[classes.TodoTask__Button, classes['TodoTask__Button--done']].join(' ')}>✓</button>
                <button 
                    onClick={() => taskListDeleteHandler(id)}
                    className={[classes.TodoTask__Button, classes['TodoTask__Button--delete']].join(' ')}>X</button>
            </div>
            <div className={classes.TodoTask__Date}>
                <p>{addedDate}</p>
                <p>{finishedDate}</p>
            </div>
        </div>    
    )
}

export default TodoTask;