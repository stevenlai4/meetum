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
    baseURL: 'http://localhost:8080',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    },
});

// Register a new user
export async function registerUser({ cognito_id, address, name }) {
    try {
        const response = await api.post('/user/register', {
            cognito_id,
            name,
            address,
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
}) => {
    try {
        const token = await getToken();
        const response = await api.post(
            `/event`,
            { name, date, description, address, locationPref },
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
