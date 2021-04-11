import React from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from '@material-ui/core';

export default function Dashboard({ setIsAuthenticated }) {
    const history = useHistory();
    const signOut = () => {
        setIsAuthenticated(false);
        localStorage.clear();
        history.push('/');
    };
    return (
        <>
            <Link onClick={signOut}>Sign Out</Link>
        </>
    );
}
