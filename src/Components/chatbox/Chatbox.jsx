import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';

let socket;

const Chatbox = () => {
    const { name } = useParams();
    const username = decodeURIComponent(name);
    const user = JSON.parse(localStorage.getItem('userObj'));
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [id, setID] = useState('');
    const [idFetched, setIdFetched] = useState(false);

    const endPoint = 'https://chat-app-backend-uep3.onrender.com';

    useEffect(() => {
        const generateID = () => {
            let id = '';
            for (let index = 0; index < 6; index++) {
                id += Math.floor(Math.random() * 10);
            }
            return id;
        };

        const receiveID = async () => {
            try {
                const res = await axios.post(`${endPoint}/api/chatroom/getid`, { name: user.name, user_texted: username });
                if (res.data.status === 'okay') {
                    console.log(res.data.room_id);
                    setID(res.data.room_id);
                } else if (res.data.status === 'notokay') {
                    const newID = generateID();
                    setID(newID);
                } else {
                    alert('Could not get ID');
                }
                setIdFetched(true);
            } catch (error) {
                console.error('Error fetching ID:', error);
            }
        };

        receiveID();
    }, [username, user.name]);


    useEffect(() => {
        if (id) {
            const receiveText = async () => {
                try {
                    const res = await axios.get(`${endPoint}/api/chatroom/${id}`);
                    if (res.data.status === 'okay') {
                        setMessages(res.data.chats);
                    } else {
                        alert('Could not get chats');
                    }
                } catch (error) {
                    console.error('Error fetching chats:', error);
                }
            };

            receiveText();
        }
    }, [id]);

    useEffect(() => {
        if (idFetched) {
            socket = io(endPoint);
            socket.emit('join', { name: user.name, user_id: user.id, user_texted: username, room_id: id });

            socket.on('message', (messages) => {
                setMessages(messages);
            });

            return () => {
                socket.emit('disconnect');
                socket.off();
            };
        }
    }, [endPoint, id, idFetched, user.id, user.name, username]);

    const sendMessage = () => {
        if (message) {
            socket.emit('sendmessage', message, id, () => setMessage(''));
        }
    };

    return (
        <div className="chat">
            <div className="chat-header clearfix">
                <div className="row">
                    <div className="col-lg-6">
                        <a href="javascript:void(0);" data-toggle="modal" data-target="#view_info">
                            <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="avatar" />
                        </a>
                        <div className="chat-about">
                            <h6 className="m-b-0">{username}</h6>
                            <small>Last seen: 2 hours ago</small>
                        </div>
                    </div>
                    <div className="col-lg-6 hidden-sm text-right">
                        <a href="javascript:void(0);" className="btn btn-outline-secondary"><i className="fa fa-camera"></i></a>
                        <a href="javascript:void(0);" className="btn btn-outline-primary"><i className="fa fa-image"></i></a>
                        <a href="javascript:void(0);" className="btn btn-outline-info"><i className="fa fa-cogs"></i></a>
                        <a href="javascript:void(0);" className="btn btn-outline-warning"><i className="fa fa-question"></i></a>
                    </div>
                </div>
            </div>
            <div className="chat-history">
                <ul className="m-b-0">
                    {messages.map((mssg, index) => (
                        mssg.name !== username ? (
                            <li key={index} className="clearfix">
                                <div className="message-data text-right">
                                    <span className="message-data-time">{mssg.createdAt}</span>
                                    <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="avatar" />
                                </div>
                                <div className="message other-message float-right text-dark"> {mssg.message} </div>
                            </li>
                        ) : (
                            <li key={index} className="clearfix">
                                <div className="message-data">
                                    <span className="message-data-time">{mssg.createdAt}</span>
                                </div>
                                <div className="message my-message"> {mssg.message} </div>
                            </li>
                        )
                    ))}
                </ul>
            </div>
            <div className="chat-message clearfix">
                <div className="input-group mb-0">
                    <div className="input-group-prepend">
                        <span onClick={sendMessage} className="input-group-text"><i className="fa fa-send"></i></span>
                    </div>
                    <input onKeyDown={e => e.key === 'Enter' ? sendMessage() : null} type="text" value={message} onChange={(e) => setMessage(e.target.value)} className="form-control" placeholder="Enter text here..." />
                </div>
            </div>
        </div>
    );
};

export default Chatbox;
