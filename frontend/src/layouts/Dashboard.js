import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { getAllEvents } from '../network';
import logo from '../images/meetum-logo.png';
import EventCard from '../components/DashboardPage/EventCard';

export default function Dashboard({ setIsAuthenticated }) {
    const classes = useStyles();
    const history = useHistory();
    const [events, setEvents] = useState([]);

    useEffect(() => {
        (async () => {
            const response = await getAllEvents();

            console.log(response);

            if (response) {
                setEvents(response);
            }
        })();
    }, []);

    //handle sign out
    const signOut = () => {
        setIsAuthenticated(false);
        localStorage.clear();
        history.push('/');
    };

    return (
        <div className={classes.root}>
            <img src={logo} alt="Logo" className={classes.logo} />
            <Link className={classes.signOutText} onClick={signOut}>
                Sign Out
            </Link>
            <div className="event-card-container">
                {events.map((event, index) => (
                    <EventCard key={index} event={event} />
                ))}
            </div>
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: 60,
    },
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
