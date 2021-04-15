import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CardContent, Card, CardHeader, Typography } from '@material-ui/core';

export default function ParticipantCard({ event }) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardHeader className={classes.cardHeader} title="Participants" />
            <CardContent className={classes.cardContent}>
                {event.users?.map((user) => {
                    return (
                        <div
                            className={classes.participant}
                            key={user._id?._id}
                        >
                            <Typography className={classes.name}>
                                {user._id.name}
                            </Typography>
                            <Typography>{user._id.email}</Typography>
                            <Typography>{user.role}</Typography>
                        </div>
                    );
                })}
            </CardContent>
        </Card>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        color: 'white',
        margin: '30px auto',
        backgroundColor: 'rgba(225,255,255,0.2)',
        borderRadius: 10,
        height: 350,
    },
    cardHeader: {
        backgroundColor: 'rgba(225,255,255,0.3)',
    },
    cardContent: {
        overflowY: 'auto',
    },
    participant: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        padding: 10,
        borderBottom: '1px solid rgba(255,255,255, 0.2)',
    },
    name: {
        textTransform: 'capitalize',
    },
}));
