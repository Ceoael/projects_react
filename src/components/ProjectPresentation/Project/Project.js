import React from 'react';
import {Link} from 'react-router-dom';

import classes from './Project.module.css';

import GhLogo from './../../../assets/img/GitHub-Mark-Light-32px.png';

const Project = ({title,outside=false,to,githubLink,projectImageMobile,scrollable,children}) => {
    return (
        <div className={classes.project}>
            <h3 className={classes.project__title}>{title}</h3>
            <p className={classes.project__description}>{children}</p>

            <div className={classes.project__links}>
                {!outside ? <Link className={classes.project__link} to={to}>
                    Open <span className={["material-icons", classes.project__icon].join(' ')}>open_in_browser</span>
                </Link> : 
                <a className={classes.project__link} target="_blank" rel="noopener noreferrer" href={to}>
                    Open <span className={["material-icons", classes.project__icon].join(' ')}>open_in_new</span>
                </a>
                }

                <a className={classes.project__link} target="_blank" rel="noopener noreferrer" href={githubLink}>
                    GitHub <img className={classes.project__gitHubImage} src={GhLogo} alt="Github logo"/>
                </a>
            </div>

            <div className={classes.device}>
                <div className={classes.device__inner}>
                    <div className={classes['device__image-wrapper']}>
                        <img className={[classes.device__image, ( scrollable ? classes['device__image--scrollable'] : null)].join(' ')} src={projectImageMobile} alt="project"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Project;
