import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import {
    Button,
    Typography,
    TextField,
    Select,
    FormControl,
    InputLabel,
    MenuItem,
} from '@material-ui/core';
import { createEvent } from '../../network';

export default function CreateEvent() {
    const classes = useStyles();
    const history = useHistory();

    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [locationPref, setLocationPref] = useState('');
    const [userLocation, setUserLocation] = useState('');
    const [description, setDescription] = useState('');
    const [participantEmail_1, setParticipantEmail_1] = useState('');
    const [participantEmail_2, setParticipantEmail_2] = useState('');

    //handle create event
    const handleCreateEvent = async (event) => {
        event.preventDefault();
        try {
            if (eventName && eventDate && userLocation) {
                const response = await createEvent({
                    name: eventName,
                    date: eventDate,
                    description: description,
                    address: userLocation,
                });
                alert(response.successMessage);
                history.push('./dashboard');
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <div className={classes.card}>
            <Typography className={classes.title}>Create an Event</Typography>
            <form onSubmit={handleCreateEvent}>
                <FormControl fullWidth={true}>
                    <input
                        className={classes.input}
                        placeholder="Event Name"
                        type="text"
                        value={eventName}
                        autoComplete="on"
                        onChange={(e) => setEventName(e.target.value)}
                    />
                </FormControl>
                <FormControl fullWidth={true}>
                    <TextField
                        className={classes.input}
                        id="datetime-local"
                        type="datetime-local"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        InputProps={{ disableUnderline: true }}
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                    />
                </FormControl>
                {/* <FormControl fullWidth={true}>
                        <input
                            className={classes.input}
                            placeholder="Event Date"
                            type="text"
                            value={eventDate}
                            autoComplete="on"
                            onChange={(e) => setEventDate(e.target.value)}
                        />
                    </FormControl> */}
                {/* <FormControl fullWidth={true}>
                        <input
                            className={classes.input}
                            placeholder="Location Preference (eg: Cafe,Park,Library...)"
                            type="text"
                            value={locationPref}
                            autoComplete="on"
                            onChange={(e) => setLocationPref(e.target.value)}
                        />
                    </FormControl> */}
                <FormControl
                    variant="outlined"
                    fullWidth={true}
                    className={classes.dropdown}
                >
                    <InputLabel>Location Preference</InputLabel>
                    <Select
                        id="locationPref"
                        className={classes.select}
                        value={locationPref}
                        onChange={(e) => setLocationPref(e.target.value)}
                        label="Location Preference"
                    >
                        <MenuItem value=""></MenuItem>
                        <MenuItem value="cafe">Cafe</MenuItem>
                        <MenuItem value="park">Park</MenuItem>
                        <MenuItem value="library">Library</MenuItem>
                        <MenuItem value="restaurant">Restaurant</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth={true}>
                    <input
                        className={classes.input}
                        placeholder="Your Location"
                        type="text"
                        value={userLocation}
                        autoComplete="on"
                        onChange={(e) => setUserLocation(e.target.value)}
                    />
                </FormControl>
                <FormControl fullWidth={true}>
                    <textarea
                        className={classes.input}
                        placeholder="Description"
                        type="text"
                        rows="5"
                        cols="40"
                        value={description}
                        autoComplete="on"
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </FormControl>

                <FormControl fullWidth={true}>
                    <input
                        className={classes.input}
                        placeholder="Participant Email"
                        type="text"
                        value={participantEmail_1}
                        autoComplete="on"
                        onChange={(e) => setParticipantEmail_1(e.target.value)}
                    />
                </FormControl>
                <FormControl fullWidth={true}>
                    <input
                        className={classes.input}
                        placeholder="Participant Email"
                        type="text"
                        value={participantEmail_2}
                        autoComplete="on"
                        onChange={(e) => setParticipantEmail_2(e.target.value)}
                    />
                </FormControl>
                <div className={classes.button}>
                    <Button
                        type="submit"
                        variant="outlined"
                        className={classes.submitButton}
                    >
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    // select: {
    //     '&:before': {
    //         borderColor: 'rgba(255,255,255,0.1)',
    //     },
    //     '&:after': {
    //         borderColor: 'black',
    //     },
    // },
    root: {
        // height: '100vh',
    },
    logo: {
        width: '200px',
    },
    card: {
        borderRadius: '10px',
        width: '40%',
        margin: '5% auto 2% auto',
        padding: '10px',
        // background:
        //     'linear-gradient(to right bottom, rgba(255,255,255,0.1), rgba(255,255,255,0.1))',
        background: 'rgba(255,255,255,0.1)',
        backdropFilter: `blur(1px)`,
        backgroundClip: 'border-box',
    },
    title: {
        fontSize: 25,
        textAlign: 'center',
        marginTop: '2%',
        color: '#FFF',
    },
    dropdown: {
        width: '65%',
        margin: '3% auto',
        borderRadius: '10px',
        background: 'rgba(255,255,255,0.15)',
        color: '#FFF',
        display: 'flex',
    },
    input: {
        width: '60%',
        margin: '3% auto',
        padding: '3%',
        border: 'none',
        resize: 'none',
        borderRadius: '10px',
        '&:focus': {
            outline: 'none',
        },
        background: 'rgba(255,255,255,0.15)',
        color: '#FFF',
    },
    button: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '3%',
    },
    submitButton: {
        color: '#FFF',
        fontWeight: 'bold',
        borderRadius: '20px',
        fontSize: '10px',
        border: 'none',
        background: '#f0f0f066',
    },
}));
