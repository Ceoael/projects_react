import React, {useState, useEffect}  from 'react';
import {v4 as uuidv4 } from 'uuid';

import TodoInput from '../../components/TodoInput/TodoInput';
import TodoTasks from '../../components/TodoTasks/TodoTasks';
import EditTask from '../../components/EditTask/EditTask';
import ToDoAppWrapper from './../../components/ToDoAppWrapper/ToDoAppWrapper';

const TodoAppBuilder = () => {
    const [filterBy, setFilterBy] = useState('all');

    const [taskList, setTaskList] = useState([]);

    const [showEditModal, setShowEditModal] = useState(false);

    const [taskIdForEditModal, setTaskIdForEditModal] = useState(null);

    const getTaskDescription = (id) => {
        if (id === null) return;
        const searchedTask = taskList.filter( task => task.id === id)[0];
        
        return searchedTask.description;
    }

    const changeTaskDescription = (id, newDescription) => {
        const updatedTaskList = taskList.map( task => {
            if ( task.id === id) {
                task.description = newDescription;
                task.addedDate = getCurrentTime();
            }

            return task;
        })

        setTaskList(updatedTaskList);
    }
    
    const turnOnModalHandler = (id) => {
        setTaskIdForEditModal(id);
        setShowEditModal(true);
    }

    const turnOffModalHandler = () => {
        setTaskIdForEditModal(null);
        setShowEditModal(false);
    }
    
    const getCurrentTime = () => {
        const date = new Date();
        const hour = date.getHours();
        const minutes = date.getMinutes();

        return `${date.toLocaleDateString()} ${hour < 10 ? '0' + hour : hour}:${minutes < 10 ? '0' + minutes : minutes}`
    }

    const taskListDoneHandler = (id) => {
        const updatedTaskList = taskList.map((task) => {
            if ( task.id === id) {
                if (task.status === 'done') return {...task, status: 'undone', finishedDate: ''}
                return {...task, status: 'done', finishedDate: getCurrentTime()}
            }
            return task;
        });

        setTaskList(updatedTaskList);
    }  

    const taskListDeleteHandler = (id) => {
        const updatedTaskList = taskList.filter((task) => task.id !== id);

        setTaskList(updatedTaskList);
    }

    const filterListHandler = () => {
        return taskList.filter((task) => {
            if (filterBy === 'all') return true;

            return task.status === filterBy;
        })
    }

    const addNewTaskToList = (description) => {
        const newTask = {
            description,
            id: uuidv4(),
            status: 'undone',
            addedDate: getCurrentTime(),
            finishedDate: ''
        }

        setTaskList([...taskList, newTask]);
    }

    useEffect(() => {
        setTaskList(JSON.parse(localStorage.getItem('taskList')) || []);
    }, [])

    useEffect(() => {
        localStorage.setItem('taskList', JSON.stringify(taskList));
    }, [taskList]);

    return (
        <ToDoAppWrapper>
            <EditTask 
                show={showEditModal}
                turnOffModalHandler={turnOffModalHandler}
                taskId={taskIdForEditModal}
                currentTaskDescription={getTaskDescription}
                changeTaskDescription={changeTaskDescription}/>

            <TodoInput addNewTaskToList={addNewTaskToList}/>

            <TodoTasks 
                taskList={filterListHandler(taskList)} 
                turnOnModalHandler={turnOnModalHandler}
                setFilterBy={setFilterBy}
                taskListDoneHandler={taskListDoneHandler}
                taskListDeleteHandler={taskListDeleteHandler}/>
        </ToDoAppWrapper>
    )
}

export default TodoAppBuilder;