import React, {useState, useEffect} from 'react';

import Backdrop from '../../shared/components/Backdrop/Backdrop';
import Modal from '../../shared/components/Modal/Modal';

import classes from './EditTask.module.css';

const EditTask = ({
        show, 
        turnOffModalHandler,
        taskId,
        currentTaskDescription,
        changeTaskDescription}) => {

    const [inputValue, setInputValue] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        setInputValue(currentTaskDescription(taskId));
    }, [taskId]);

    useEffect(() => {
        if (inputValue !== undefined && (inputValue.trim() === '' || inputValue === '\n' || inputValue === '\r')) {
            setIsFormValid(false);
        } 
        else {
            setIsFormValid(true);
        }
    }, [inputValue])

    const changeTask = () => {
        changeTaskDescription(taskId, inputValue.trim());
        setIsFormValid(false);
        turnOffModalHandler();
    }

    return (
        <React.Fragment>
            <Backdrop show={show} clicked={turnOffModalHandler}/>
                
            <Modal
                modalOFF={turnOffModalHandler} 
                modalOpen={show}
                modalName={'Edit task'}
                background={'linear-gradient(to right, #185a9d, #43cea2)'}>

                <form   
                    className={classes.EditTask}
                    onSubmit={() => changeTask()}
                >
                    <textarea 
                        className={classes.EditTask__textarea}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}/>           
                    <button
                        className={classes.SubmitButton}
                        type="submit"
                        disabled={!isFormValid}
                    >OK</button>
                </form>
            </Modal>
        </React.Fragment>
    )
};

export default EditTask;