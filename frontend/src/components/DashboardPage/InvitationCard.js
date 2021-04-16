import { Card, Typography, Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Moment from 'react-moment';
import { green, red } from '@material-ui/core/colors';
import { reponseInvitation } from '../../network';

export default function InvitationCard({ invitation, setRerender }) {
    const classes = useStyles();

    const [address, setAddress] = useState('');

    //handle Accept Invitation
    const handleAcceptInvitation = async (e) => {
        try {
            const response = await reponseInvitation({
                is_going: true,
                address,
                invitation_id: invitation?._id,
            });
            if (response.successMessage) {
                setRerender((prev) => !prev);
            }
            alert(response.successMessage);
        } catch (error) {
            alert(error.response.data.errMessage);
            console.error(error.response);
        }
    };

    //handle decline invitation
    const handleDeclineInvitation = async (e) => {
        try {
            const response = await reponseInvitation({
                is_going: false,
                invitation_id: invitation._id,
            });
            if (response.successMessage) {
                setRerender((prev) => !prev);
            }
            alert(response.successMessage);
        } catch (error) {
            alert(error.response.data.errMessage);
            console.error(error.response);
        }
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
                <Typography className={classes.name} component="p">
                    Organiser : {invitation?.event_id?.users[0]?._id?.name}
                </Typography>
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
                        value={address}
                        autoComplete="on"
                        onChange={(e) => setAddress(e.target.value)}
                    ></input>
                    <AcceptButton
                        onClick={() =>
                            handleAcceptInvitation({ address, is_going: true })
                        }
                    >
                        Accept
                    </AcceptButton>
                </div>
                <div className={classes.declineContainer}>
                    <DeclineButton
                        onClick={() =>
                            handleDeclineInvitation({ is_going: false })
                        }
                    >
                        Decline
                    </DeclineButton>
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
