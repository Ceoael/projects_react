import React, { createRef } from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

import TodoFilter from './TodoFilter/TodoFilter';
import TodoTask from './TodoTask/TodoTask';

import classes from './TodoTasks.module.css';

const TodoTasks = ({
        setFilterBy, 
        taskList, 
        taskListDoneHandler, 
        taskListDeleteHandler,
        turnOnModalHandler}) => {

    
    return (
        <div className={classes.TodoTasks}>
            <TodoFilter setFilterBy={setFilterBy}/>

            <TransitionGroup
                component={null} 
            >
                { taskList.map((task)=>{
                const taskRef = createRef(null);
                return (<CSSTransition
                    nodeRef={taskRef}
                    classNames= {{
                        enter: classes['TodoTasks__Task--enter'],
                        enterActive: classes['TodoTasks__Task--enterActive'],
                        exit: classes['TodoTasks__Task--exit'],
                        exitActive: classes['TodoTasks__Task--exitActive']
                    }}
                    key={task.id}
                    timeout={300}>
                        <div ref={taskRef}>
                        <TodoTask
                            turnOnModalHandler={turnOnModalHandler}
                            taskListDoneHandler={taskListDoneHandler}
                            taskListDeleteHandler={taskListDeleteHandler}
                            key={task.id} 
                            id={task.id} 
                            status={task.status} 
                            taskDescription={task.description}
                            addedDate={task.addedDate}
                            finishedDate={task.finishedDate}/>
                        </div>
                    </CSSTransition>
                )
        })}
            </TransitionGroup>

        </div>
    )
}

export default TodoTasks;