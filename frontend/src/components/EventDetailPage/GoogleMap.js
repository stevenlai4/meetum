import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import { findNearbyPlaces } from '../../network';

export function GoogleMap({ event, centroid, setNearbys, nearbys }) {
    const classes = useStyles();
    const [showingInfoWindow, setShowingInfoWindow] = useState(false);
    const [activeMarker, setActiveMarker] = useState({});
    const [selectedPlace, setSelectedPlace] = useState({});

    // Find nearby places
    const findPlaces = async () => {
        let slicedArr = [];

        try {
            const places = await findNearbyPlaces({
                centroid,
                locationPref: event.locationPref,
            });

            // Get only first ten nearest locations if possible
            if (places && places.length >= 10) {
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

    // Show info window when marker is clicked
    const onMarkerClick = (props, marker, e) => {
        setSelectedPlace(props);
        setActiveMarker(marker);
        setShowingInfoWindow(true);
    };

    // Remove info window when map is clicked
    const onMapClicked = () => {
        if (showingInfoWindow) {
            setShowingInfoWindow(false);
            setActiveMarker(null);
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
            onClick={onMapClicked}
        >
            {nearbys.map((nearby, index) => {
                if (index === 0) {
                    return (
                        <Marker
                            key={index}
                            title={nearby.name}
                            name={nearby.name}
                            position={{
                                lat: nearby.geometry?.location?.lat,
                                lng: nearby.geometry?.location?.lng,
                            }}
                            icon={{
                                url: 'https://i.imgur.com/HXhQVOo.png',
                                anchor: new window.google.maps.Point(32, 32),
                                scaledSize: new window.google.maps.Size(40, 40),
                            }}
                            onClick={onMarkerClick}
                        />
                    );
                } else {
                    return (
                        <Marker
                            key={index}
                            title={nearby.name}
                            name={nearby.name}
                            position={{
                                lat: nearby.geometry?.location?.lat,
                                lng: nearby.geometry?.location?.lng,
                            }}
                            onClick={onMarkerClick}
                        />
                    );
                }
            })}
            <InfoWindow marker={activeMarker} visible={showingInfoWindow}>
                <div className={classes.infoWindow}>
                    <p className={classes.name}>{selectedPlace.name}</p>
                </div>
            </InfoWindow>
        </Map>
    );
}

// Google Map API config
export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_API,
})(GoogleMap);

const useStyles = makeStyles((theme) => ({
    name: {
        fontWeight: 700,
    },
}));
