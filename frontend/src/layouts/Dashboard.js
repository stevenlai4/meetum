import React from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import logo from '../images/meetum-logo.png';

export default function Dashboard({ setIsAuthenticated }) {
    const classes = useStyles();
    const history = useHistory();

    //handle sign out
    const signOut = () => {
        setIsAuthenticated(false);
        localStorage.clear();
        history.push('/');
    };
    return (
        <>
            <img src={logo} alt="Logo" className={classes.logo} />
            <Link className={classes.signOutText} onClick={signOut}>
                Sign Out
            </Link>
        </>
    );
}

const useStyles = makeStyles((theme) => ({
    logo: {
        width: '200px',
        position: 'absolute',
        left: 10,
        top: 10,
    },
    signOutText: {
        position: 'absolute',
        right: 10,
        top: 10,
    },
}));