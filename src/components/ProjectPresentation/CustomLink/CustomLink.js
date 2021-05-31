import React from 'react';

import classes from './CustomLink.module.css';

const CustomLink = ({linkTo, children}) => {
    return (
        <a className={classes.customLink} target="_blank" rel="noopener noreferrer" href={linkTo}>{children}</a>
    )
}

export default CustomLink;
