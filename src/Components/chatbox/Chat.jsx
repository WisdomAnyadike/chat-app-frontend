import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import { API_ENDPOINT } from '../../services/config';
import { receiveID, receiveText } from '../../services/chatservice';
import { useSelector } from 'react-redux';

let socket;

const ChatApp = () => {
    const profileId = useSelector(state => state.firstProfileSlice.profileObj.profileId)
    const { userTexted, userTexting } = useParams();
    const username = decodeURIComponent(userTexted);
    const user2 = decodeURIComponent(userTexting);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [id, setID] = useState('');
    const [idFetched, setIdFetched] = useState(false);

    useEffect(() => {
        const fetchID = async () => {
            try {
                const roomId = await receiveID( username , user2);
                setID(roomId);
                setIdFetched(true);
            } catch (error) {
                console.error('Error fetching ID:', error);
            }
        };

        fetchID();
    }, [username, user2]);

    useEffect(() => {
        if (id) {
            const fetchText = async () => {
                try {
                    const chats = await receiveText(id);
                    console.log(chats);
                    setMessages(chats);
                } catch (error) {
                    console.error('Error fetching chats:', error);
                }
            };

            fetchText();
        }
    }, [id]);



    useEffect(() => {
        if (idFetched) {
            socket = io(API_ENDPOINT);
            socket.emit('join', { name: user2, user_id: profileId, user_texted: username, room_id: id });

            socket.on('message', (messages) => {
                setMessages(messages);
            });

            return () => {
                socket.emit('disconnect');
                socket.off();
            };
        }
    }, [id, idFetched, profileId, user2, username]);

    const sendMessage = () => {
        if (message) {
            socket.emit('sendmessage', message, id, () => setMessage(''));
        }
    };

    return (
        <div class="app-main">
            <div class="chat-wrapper">
                {messages.map((mssg, index) => (
                    mssg.name !== username ? (
                        <div key={index} class="message-wrapper reverse">
                            <img class="message-pp" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80" alt="profile-pic" />
                            <div class="message-box-wrapper">
                                <div class="message-box">
                                    {mssg.message}
                                </div>
                                <span>{mssg.createdAt}</span>
                            </div>
                        </div>
                    ) : (
                        <div key={index} class="message-wrapper">
                            <img class="message-pp" src="https://images.unsplash.com/photo-1587080266227-677cc2a4e76e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=934&amp;q=80" alt="profile-pic" />
                            <div class="message-box-wrapper">
                                <div class="message-box">
                                    {mssg.message}
                                </div>
                                <span>{mssg.createdAt}</span>
                            </div>
                        </div>
                    )
                ))}


            </div>
            <div class="chat-input-wrapper">
                <button class="chat-attachment-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="feather feather-paperclip" viewBox="0 0 24 24">
                        <defs />
                        <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
                    </svg>
                </button>
                <div class="input-wrapper">
                    <input onKeyDown={e => e.key === 'Enter' ? sendMessage() : null} type="text" value={message} onChange={(e) => setMessage(e.target.value)} class="chat-input" placeholder="Enter your message here" />
                    <button class="emoji-btn">

                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="feather feather-smile" viewBox="0 0 24 24">
                            <defs />
                            <circle cx="12" cy="12" r="10" />
                            <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" />
                        </svg>
                    </button>
                </div>
                <button onClick={sendMessage} class="chat-send-btn">Send</button>
            </div>
        </div>
    )
}

export default ChatApp