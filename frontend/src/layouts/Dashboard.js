import React from 'react';
import Logout from '../components/DashboardPage/Logout';

export default function Dashboard({ setIsAuthenticated }) {
    return (
        <>
            <h2>im dashboard!</h2>
            <Logout setIsAuthenticated={setIsAuthenticated} />
        </>
    );
}
