import axios from 'axios';
import { API_ENDPOINT } from './config';


export const LoginHelper = async (Username, Password) => {
    try {
        const res = await axios.post(`${API_ENDPOINT}/api/user/login`, { username: Username, password: Password })

        if (res.data.status === 'okay') {
            return { user: res.data.user, token: res.data.token }

        } else {
            throw new Error('invalid credentials')
        }

    } catch (error) {
        console.error('Error loggin in:', error);
        throw error;
    }

}