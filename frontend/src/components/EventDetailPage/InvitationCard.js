import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CardContent, Card, CardHeader, Typography } from '@material-ui/core';
import { getInvitationsByEventId } from '../../network';

export default function InvitationCard({ event_id }) {
    const classes = useStyles();
    const [invitations, setInvitations] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const response = await getInvitationsByEventId(event_id);

                if (response) {
                    setInvitations(response);
                }
            } catch (error) {
                console.error(error.response.data.errMessage);
            }
        })();
    }, []);

    return (
        <Card className={classes.root}>
            <CardHeader className={classes.cardHeader} title="Invitations" />
            <CardContent className={classes.cardContent}>
                {invitations.map((invitation) => {
                    return (
                        <div
                            key={invitation._id}
                            className={classes.invitation}
                        >
                            <Typography className={classes.name}>
                                {invitation.user_id?.name}
                            </Typography>
                            <Typography>{invitation.user_id?.email}</Typography>
                            <Typography>Participant</Typography>
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
    invitation: {
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        padding: 10,
        borderBottom: '1px solid rgba(255,255,255, 0.2)',
    },
    name: {
        textTransform: 'capitalize',
    },
}));
