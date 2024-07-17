import axios from 'axios';
import { API_ENDPOINT } from './config';


export const generateID = () => {
    let id = '';
    for (let index = 0; index < 6; index++) {
        id += Math.floor(Math.random() * 10);
    }
    return id;
};

export const receiveID = async (username, userName) => {
    try {
        const res = await axios.post(`${API_ENDPOINT}/api/chatroom/getid`, { name: username, user_texted: userName });
        if (res.data.status === 'okay') {
            return res.data.room_id;
        } else if (res.data.status === 'notokay') {
            return generateID();
        } else {
            throw new Error('Could not get ID');
        }
    } catch (error) {
        console.error('Error fetching ID:', error);
        throw error;
    }
};


export const receiveText = async (id) => {
    try {
        const res = await axios.get(`${endPoint}/api/chatroom/${id}`);
        if (res.data.status === 'okay') {
            return res.data.chats;
        } else {
            throw new Error('Could not get chats');
        }
    } catch (error) {
        console.error('Error fetching chats:', error);
        throw error;
    }
};
