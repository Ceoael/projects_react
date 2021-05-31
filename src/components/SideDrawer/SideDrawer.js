import React from 'react';
import {useHistory} from 'react-router-dom';

import classes from './SideDrawer.module.css';

const SideDrawer = ({show, closeSideDrawer}) => {
    const history = useHistory();
    
    const paths = [
        {
            title: 'Todo List',
            path: 'todo',
            outside: false
        },
        {
            title: 'Pomodoro Clock',
            path: 'pomodoro',
            outside: false
        },
        // {
        //     title: 'Countdown Timer',
        //     path: 'countdown',
        //     outside: false
        // },
        {
            title: 'Weather App',
            path: 'https://ceoael-weather-app-react.herokuapp.com/',
            outside: true
        }
    ];

    const routeTo = (path, outside) => {
        closeSideDrawer();
        if (outside) {
            window.open(path, '_blank');
            return;
        }
        history.push(`/${path}`);
    }

    return (
        <div className={[classes.sideDrawer, (show ? classes['sideDrawer--show'] : null)].join(' ')}>
            <div className={classes.sideDrawer__close}>
                <button className={classes.closeButton} onClick={closeSideDrawer}>
                    <span className={['material-icons', classes.closeButton__icon].join(' ')}>close</span>
                </button>
            </div>

            { paths.map((path) => 
            (<button className={classes.project} key={path.path} onClick={() => routeTo(path.path, path.outside)}>
                <p className={classes.project__name}>{path.title}</p>
                <span className={['material-icons', classes.project__icon].join(' ')} >chevron_right</span>
            </button>)
            )}
        </div>
    )
}

export default SideDrawer;
