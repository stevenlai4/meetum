import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import { findNearbyPlaces } from '../../network';

export function GoogleMap({ event, centroid, setNearbys, nearbys }) {
    const classes = useStyles();

    const findPlaces = async () => {
        let slicedArr = [];

        try {
            const places = await findNearbyPlaces({
                centroid,
                locationPref: event.locationPref,
            });

            // Get only first ten nearest locations if possible
            if (places.length >= 10) {
                for (let i = 0; i < 10; i++) {
                    slicedArr.push(places[i]);
                }

                setNearbys(slicedArr);
            } else {
                setNearbys(places);
            }
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
            {nearbys.map((nearby) => {
                return (
                    <Marker
                        title={nearby.name}
                        name={nearby.name}
                        position={{
                            lat: nearby.geometry?.location?.lat,
                            lng: nearby.geometry?.location?.lng,
                        }}
                    />
                );
            })}
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
