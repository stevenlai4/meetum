import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import {
    Button,
    Typography,
    TextField,
    FormControl,
    Checkbox,
} from '@material-ui/core';
import { createEvent } from '../../network';

export default function EventForm({ user }) {
    const classes = useStyles();
    const history = useHistory();

    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [locationPref, setLocationPref] = useState('');
    const [userLocation, setUserLocation] = useState('');
    const [description, setDescription] = useState('');
    const [participantEmails, setParticipantEmails] = useState('');

    const [isChecked, setIsChecked] = useState(false);

    //handle create event
    const handleCreateEvent = async (event) => {
        event.preventDefault();
        //convert email string into array
        const participants = participantEmails.split(',');

        try {
            const response = await createEvent({
                name: eventName,
                date: eventDate,
                description,
                address: isChecked ? user.address : userLocation,
                locationPref,
                participants,
            });
            alert(response.successMessage);
            history.push('./dashboard');
        } catch (error) {
            alert(error.response.data.errMessage);
            console.error(error.response.data.errMessage);
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
                        InputProps={{
                            className: classes.timepicker,
                            disableUnderline: true,
                        }}
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                    />
                </FormControl>
                <FormControl variant="outlined" fullWidth={true}>
                    <select
                        id="locationPref"
                        className={classes.dropdown}
                        value={locationPref}
                        onChange={(e) => setLocationPref(e.target.value)}
                    >
                        <option value="" disabled>
                            Location Preference
                        </option>
                        <option value="Cafe">Cafe</option>
                        <option value="Park">Park</option>
                        <option value="Library">Library</option>
                        <option value="Restaurant">Restaurant</option>
                    </select>
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
                <div className={classes.addressOptionContainer}>
                    <div>
                        <Typography
                            className={classes.addresstext}
                            component="p"
                        >
                            Default Address
                        </Typography>
                    </div>
                    <div>
                        <Checkbox
                            inputProps={{
                                'aria-label': 'uncontrolled-checkbox',
                            }}
                            onChange={() => setIsChecked(!isChecked)}
                            style={{
                                color: '#FFF',
                            }}
                        />
                    </div>
                </div>
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
                    ></textarea>
                </FormControl>
                <FormControl fullWidth={true}>
                    <input
                        className={classes.input}
                        placeholder="Participant Emai (eg: 1@meetum.com , 2@meetum.com)"
                        type="text"
                        value={participantEmails}
                        autoComplete="on"
                        onChange={(e) => setParticipantEmails(e.target.value)}
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
    card: {
        borderRadius: '10px',
        width: '40%',
        margin: '5% auto 2% auto',
        padding: '10px',
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
        width: '85%',
        margin: '3% auto',
        padding: '3%',
        border: 'none',
        resize: 'none',
        borderRadius: '10px',
        '&:focus': {
            outline: 'none',
        },
        background: 'rgba(0,0,0,0.4)',
        color: 'white',
    },
    input: {
        width: '80%',
        margin: '3% auto',
        padding: '3%',
        border: 'none',
        resize: 'none',
        borderRadius: '10px',
        '&:focus': {
            outline: 'none',
        },
        background: 'rgba(0,0,0,0.4)',
        color: '#FFF',
    },
    timepicker: {
        color: 'white',
    },
    button: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '3%',
    },
    addresstext: { color: '#FFF' },
    submitButton: {
        color: '#FFF',
        fontWeight: 'bold',
        borderRadius: '20px',
        fontSize: '10px',
        border: 'none',
        background: 'rgba(0,0,0,0.4)',
    },
    addressOptionContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginRight: '8%',
    },
}));
