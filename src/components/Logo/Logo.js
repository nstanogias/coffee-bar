import React from 'react';

import coffeeBarLogo from '../../assets/images/stanos-cb-logo.png';
import classes from './Logo.css';

const logo = (props) => (
    <div className={classes.Logo} style={{height: props.height}}>
        <img src={coffeeBarLogo} alt="MyOrder" />
    </div>
);

export default logo;