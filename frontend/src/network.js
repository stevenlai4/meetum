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

// get user
export const getUser = async () => {
    try {
        const token = await getToken();
        const response = await api.get('/user', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (response) {
            const user = response.data?.user;
            return user;
        }
    } catch (error) {
        throw error;
    }
};

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
        console.log(response);
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

// Get all user invitations
export const getAllInvitations = async () => {
    try {
        const token = await getToken();
        const response = await api.get('/invitations', {
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

// Response invitation
export const reponseInvitation = async ({
    address,
    is_going,
    invitation_id,
}) => {
    try {
        const token = await getToken();
        const response = await api.post(
            '/invitation',
            { is_going, invitation_id, address },
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
