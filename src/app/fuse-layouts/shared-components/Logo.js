import React from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    root      : {
        '& .logo-icon'                : {
            width     : 246,
            height    : 96,
            marginTop : 50,
            transition: theme.transitions.create(['width', 'height'], {
                duration: theme.transitions.duration.shortest,
                easing  : theme.transitions.easing.easeInOut
            })
        },
       
    },

}));

function Logo()
{
    const classes = useStyles();

    return (
        <div className={clsx(classes.root, "flex items-center")}>
            <img className="logo-icon" src="assets/images/logos/logo_novelis.svg" alt="logo"/>
            
        </div>
    );
}

export default Logo;
