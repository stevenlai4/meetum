import { Card, CardHeader, CardContent } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LocationCard from './LocationCard';

export default function Locations({ nearbys }) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardHeader className={classes.cardHeader} title="Locations" />
            <CardContent className={classes.cardContent}>
                {nearbys.map((nearby) => {
                    return (
                        <LocationCard key={nearby.place_id} nearby={nearby} />
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
        width: '75%',
    },
    cardHeader: {
        backgroundColor: 'rgba(225,255,255,0.3)',
    },
    cardContent: {
        height: 550,
        overflowY: 'auto',
        '-ms-overflow-style': 'none' /* Hide scrollbar in IE and Edge */,
        'scrollbar-width': 'none' /* Hide scrollbar in Firefox */,
        '&::-webkit-scrollbar': {
            display: 'none' /* Hide scrollbar in Chrome, Safari and Oper */,
        },
    },
}));
