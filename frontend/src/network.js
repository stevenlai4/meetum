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
