import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Link, IconButton, Tooltip, Fade } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { AddCircle } from '@material-ui/icons';
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

    // Handle add event icon on click
    const handleAddEventOnClick = () => {
        history.push('/createEvent');
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
            <Tooltip
                title="Add Event"
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 600 }}
                aria-label="add"
                placement="left"
            >
                <IconButton
                    className={classes.addCircleBtn}
                    onClick={handleAddEventOnClick}
                >
                    <AddCircle className={classes.addCircleIcon} />
                </IconButton>
            </Tooltip>
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
    addCircleBtn: {
        position: 'fixed',
        bottom: 10,
        right: 10,
    },
    addCircleIcon: {
        fontSize: 50,
        color: 'rgba(255,255,255,0.3)',
        transition: 'ease-in-out 0.4s',
        '&:hover': {
            color: 'rgba(255,255,255,0.5)',
            transform: 'scale(1.2)',
        },
    },
}));
