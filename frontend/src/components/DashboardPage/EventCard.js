import { Card, Typography } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Moment from 'react-moment';

export default function EventCard({ event }) {
    const classes = useStyles();
    const history = useHistory();

    const handleCardOnClick = () => {
        history.push(`/event/${event._id}`);
    };

    return (
        <Card className={classes.card} onClick={handleCardOnClick}>
            <Typography className={classes.name} variant="h5">
                {event.name}
            </Typography>
            <Moment className={classes.date} format="YYYY/MM/DD">
                {event.date}
            </Moment>
            <Moment className={classes.date} format="hh:mm">
                {event.date}
            </Moment>
            <div className={classes.createdOnContainer}>
                <Typography className={classes.createdOnText} component="p">
                    Create On:
                </Typography>{' '}
                <Moment className={classes.createdOnText}>
                    {event.createdOn}
                </Moment>
            </div>
            <Typography className={classes.location} component="p">
                {event.location}
            </Typography>
        </Card>
    );
}

const useStyles = makeStyles((theme) => ({
    card: {
        width: '80%',
        background: 'rgba(255,255,255,0.2)',
        color: '#fff',
        margin: '20px auto',
        padding: '10px 10px 50px 10px',
        position: 'relative',
        cursor: 'pointer',
        borderRadius: 10,
        transition: 'ease-in-out 0.6s',
        '&:hover': {
            background: 'rgba(255,255,255,0.4)',
        },
    },
    name: {
        textTransform: 'capitalize',
    },
    date: {
        display: 'block',
        fontSize: 18,
        margin: '5px 0',
    },
    location: {
        fontSize: 18,
        margin: '5px 0',
    },
    createdOnContainer: {
        display: 'flex',
        position: 'absolute',
        bottom: 5,
        left: 10,
    },
    createdOnText: {
        fontSize: 12,
    },
}));
