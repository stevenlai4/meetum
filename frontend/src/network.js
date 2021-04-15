import axios from 'axios';
import { userToken } from './userAuth';

// Setup user token
const getToken = async () => {
    try {
        const token = await userToken();

        if (token) {
            return token;
        }
    } catch (error) {
        throw error;
    }
};

// Config axios
const api = axios.create({
    baseURL:
        process.env.NODE_ENV !== 'production'
            ? 'http://localhost:8080'
            : ' https://meetum-backend.herokuapp.com',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    },
});

// Register a new user
export async function registerUser({ cognito_id, address, name, email }) {
    try {
        const response = await api.post('/user/register', {
            cognito_id,
            name,
            address,
            email,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

// Create new event
export const createEvent = async ({
    name,
    date,
    description,
    address,
    locationPref,
    participants,
}) => {
    try {
        const token = await getToken();
        const response = await api.post(
            `/event`,
            { name, date, description, address, locationPref, participants },
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );

        if (response) {
            return response.data;
        }
    } catch (error) {
        throw error;
    }
};

// Get all user events
export const getAllEvents = async () => {
    try {
        const token = await getToken();
        const response = await api.get('/events', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response) {
            const events = response.data?.events;

            return events;
        }
    } catch (error) {
        throw error;
    }
};

// Get an event by the event id
export const getEventById = async (event_id) => {
    try {
        const token = await getToken();
        const response = await api.get(`/event/${event_id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response) {
            const event = response.data?.event;
            return event;
        }
    } catch (error) {
        throw error;
    }
};

// Get all invitations by event id
export const getInvitationsByEventId = async (event_id) => {
    try {
        const token = await getToken();
        const response = await api.get(`/${event_id}/invitations`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response) {
            const invitations = response.data?.invitations;
            return invitations;
        }
    } catch (error) {
        throw error;
    }
};

/////////////////////////// Google Map API ///////////////////////////
// Find the centroid
export const findCoordinate = async (address) => {
    try {
        const response = await axios.get(
            'https://maps.googleapis.com/maps/api/geocode/json',
            {
                params: {
                    address,
                    key: process.env.REACT_APP_GOOGLE_API,
                },
            }
        );

        if (response) {
            const result = await response.data.results[0];
            const geometry = await result.geometry;
            const location = await geometry.location;

            return location;
        }
    } catch (error) {
        throw error;
    }
};

// Find nearby locations from the centroid
export const findNearbyPlaces = async ({ centroid, locationPref }) => {
    const token = await getToken();

    try {
        const response = await api.get('/google/nearby', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                lat: centroid.lat,
                lng: centroid.lng,
                locationPref,
            },
        });

        // console.log(`response.data: ${JSON.stringify(response.data)}`);

        if (response) {
            const results = await response.data.locations;

            return results;
        }
    } catch (error) {
        throw error;
    }
};
