import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ParticipantCard from '../components/EventDetailPage/ParticipantCard';
import DetailCard from '../components/EventDetailPage/DetailCard';
import { getEventById } from '../network';
import { makeStyles } from '@material-ui/core/styles';
import InvitationCard from '../components/EventDetailPage/InvitationCard';

export default function EventDetail() {
    const classes = useStyles();
    const { event_id } = useParams();
    const [event, setEvent] = useState({});

    useEffect(() => {
        (async () => {
            try {
                const response = await getEventById(event_id);

                if (response) {
                    setEvent(response);
                }
            } catch (error) {
                console.error(error.response.data.errMessage);
            }
        })();
    }, []);

    return (
        <div className={classes.root}>
            <div className={classes.sideContainer}>
                <DetailCard event={event} />
                <ParticipantCard event={event} />
                <InvitationCard event_id={event_id} />
            </div>
            <div className={classes.mapContainer}></div>
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        margin: '30px 8%',
    },
    sideContainer: {
        width: '25%',
    },
}));
