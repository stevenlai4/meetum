import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import { findNearbyPlaces } from '../../network';

export function GoogleMap({ event, centroid }) {
    const classes = useStyles();
    const [locations, setLocations] = useState([]);

    const findPlaces = async () => {
        try {
            const places = await findNearbyPlaces({
                centroid,
                locationPref: event.locationPref,
            });

            setLocations(places);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Map
            google={window.google}
            initialCenter={centroid}
            zoom={14}
            style={{
                width: '70%',
                height: '50%',
                margin: '30px auto',
            }}
            onReady={findPlaces}
        >
            {console.log(locations)}
        </Map>
    );
}

// Google Map API config
export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_API,
})(GoogleMap);

const useStyles = makeStyles((theme) => ({
    mapContainer: {
        maxWidth: '80%',
    },
}));
