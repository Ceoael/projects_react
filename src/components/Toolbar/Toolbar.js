import React from 'react';
import { useHistory } from 'react-router-dom';

import classes from './Toolbar.module.css';

const Toolbar = ({openSideDrawer}) => {
    const history = useHistory();

    const homeRoute = () => {
        history.push('/');
    }

    return (
        <nav className={classes.toolbar}>
            <button className={classes.toolbar__button} onClick={openSideDrawer}>
                <span className={["material-icons", classes.toolbar__icon].join(' ')}>menu</span>
            </button>
            <button className={classes.toolbar__button} onClick={homeRoute}>
                <span className={["material-icons", classes.toolbar__icon].join(' ')}>home</span>
            </button>
        </nav>
    )
}

export default Toolbar;
