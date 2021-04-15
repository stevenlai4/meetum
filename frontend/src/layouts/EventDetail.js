import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ParticipantCard from '../components/EventDetailPage/ParticipantCard';
import DetailCard from '../components/EventDetailPage/DetailCard';
import { getEventById } from '../network';
import { makeStyles } from '@material-ui/core/styles';
import InvitationCard from '../components/EventDetailPage/InvitationCard';
import GoogleApiWrapper from '../components/EventDetailPage/GoogleMap';
import findCentroid from '../utils/findCentroid';
import { CircularProgress } from '@material-ui/core';

export default function EventDetail() {
    const classes = useStyles();
    const { event_id } = useParams();
    const [event, setEvent] = useState({});
    const [centroid, setCentroid] = useState({});
    const [nearbys, setNearbys] = useState([]);

    // CDM
    useEffect(() => {
        (async () => {
            try {
                const response = await getEventById(event_id);
                const { lat, lng } = await findCentroid(response.users);

                if (response) {
                    setEvent(response);
                    setCentroid({ lat, lng });
                }
            } catch (error) {
                console.error(error);
            }
        })();
    }, [event_id]);

    return (
        <div className={classes.root}>
            <div className={classes.leftContainer}>
                <DetailCard event={event} />
                <ParticipantCard event={event} />
                <InvitationCard event_id={event_id} />
            </div>
            <div className={classes.rightContainer}>
                {centroid.lat && centroid.lng ? (
                    <GoogleApiWrapper
                        event={event}
                        centroid={centroid}
                        setNearbys={setNearbys}
                        nearbys={nearbys}
                    />
                ) : (
                    <CircularProgress
                        className={classes.loading}
                        color="secondary"
                    />
                )}
            </div>
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        margin: '30px 5%',
    },
    leftContainer: {
        width: '25%',
    },
    rightContainer: {
        width: '75%',
        position: 'relative',
    },
    loading: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
    },
}));
