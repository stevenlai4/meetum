import { Typography, Card, CardContent, CardHeader } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Moment from 'react-moment';

export default function DetailCard({ event }) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardHeader className={classes.cardHeader} title="Detail" />
            <CardContent>
                <Typography className={classes.name} variant="h5">
                    {event.name}
                </Typography>
                <Moment
                    className={`${classes.date} ${classes.text}`}
                    format="YYYY/MM/DD"
                >
                    {event.date}
                </Moment>
                <Moment
                    className={`${classes.date} ${classes.text}`}
                    format="hh:mm"
                >
                    {event.date}
                </Moment>
                <Typography className={classes.text} component="p">
                    {event.location}
                </Typography>
                <Typography className={classes.text} component="p">
                    {event.locationPref}
                </Typography>
                <Typography className={classes.text} component="p">
                    {event.description}
                </Typography>
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
    },
    text: {
        margin: '8px 0',
        fontSize: 18,
    },
    cardHeader: {
        backgroundColor: 'rgba(225,255,255,0.3)',
    },
    name: {
        textTransform: 'capitalize',
    },
    date: {
        display: 'block',
    },
}));
