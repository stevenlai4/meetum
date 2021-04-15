import { Card, Typography, Button, Input } from '@material-ui/core';
import React from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Moment from 'react-moment';
import { green, red } from '@material-ui/core/colors';

export default function InvitationCard({ invitation }) {
    const classes = useStyles();
    const history = useHistory();

    const handleCardOnClick = () => {
        alert('see more');
        // history.push(`/invitation/${invitation._id}`);
    };

    return (
        <Card className={classes.card}>
            <div>
                <Typography className={classes.name} variant="h5">
                    {invitation?.event_id?.name}
                </Typography>
                <Moment className={classes.date} format="YYYY/MM/DD">
                    {invitation?.event_id?.date}
                </Moment>
                <Moment className={classes.date} format="hh:mm:ss">
                    {invitation?.event_id?.date}
                </Moment>
                <div className={classes.createdOnContainer}>
                    <Typography className={classes.createdOnText} component="p">
                        Create On:
                    </Typography>{' '}
                    <Moment className={classes.createdOnText}>
                        {invitation.createdOn}
                    </Moment>
                </div>
            </div>
            <div className={classes.buttonContainer}>
                <div className={classes.acceptContainer}>
                    <input
                        className={classes.input}
                        placeholder="Add your location"
                        type="text"
                        // value={participantEmails}
                        autoComplete="on"
                        // onChange={(e) => setParticipantEmails(e.target.value)}
                    ></input>
                    <AcceptButton> Accept</AcceptButton>
                </div>
                <div className={classes.declineContainer}>
                    <DeclineButton>Decline</DeclineButton>
                </div>
            </div>
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
        borderRadius: 10,
        display: 'flex',
        justifyContent: 'space-between',
    },
    input: {
        width: '60%',
        // marginLeft: '20px',
        padding: '3%',
        border: 'none',
        borderRadius: '10px',
        '&:focus': {
            outline: 'none',
        },
        background: 'rgba(255,255,255,0.2)',
        color: 'black',
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
    buttonContainer: {
        width: '40%',
    },
    acceptContainer: { display: 'flex' },
    declineContainer: { display: 'flex', justifyContent: 'flex-end' },
    createdOnText: {
        fontSize: 12,
    },
}));

//style for decline button
const DeclineButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText(red[500]),
        backgroundColor: red[500],
        '&:hover': {
            backgroundColor: red[700],
        },
        marginTop: '20px',
        width: '37%',
    },
}))(Button);

//style for accept button
const AcceptButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText(green[500]),
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
        marginLeft: '10px',
        color: '#FFF',
        width: '40%',
    },
}))(Button);
