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
    baseURL: 'https://meetum-backend.herokuapp.com',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
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
export const createEvent = async ({ message, chatboxId }) => {
    try {
        const token = await getToken();
        const response = await api.post(
            `/chatbox/message`,
            { message },
            {
                params: {
                    chatboxId,
                },

                headers: { Authorization: `Bearer ${token}` },
            }
        );

        if (response) {
            const body = response.data?.body;
            const data = await JSON.parse(body);

            return data;
        }
    } catch (error) {
        throw error;
    }
};
