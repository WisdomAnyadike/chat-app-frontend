import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import io from 'socket.io-client'
let socket


const Chatbox = () => {
    const { name } = useParams()
    const username = name.replaceAll('20%', ' ')
    const user = JSON.parse(localStorage.getItem('userObj'))
    const [message, setmessage] = useState('')
    const [messages, setmessages] = useState([])


    useEffect(()=> {
        const recieveText = async()=> {
            const res = await axios.get(`http://localhost:4000/api/chatroom/1234` )
            if(res.data.status === 'okay'){
               setmessages(res.data.chats)
            }else{
                alert('couldnt get chats')
            }
        }

        recieveText()

    } , [])


    const endPoint = 'localhost:4000'

    useEffect(() => {
        socket = io(endPoint)
        socket.emit('join', { name: user.name, user_id: user.id, user_texted: username, room_id: '1234' })

        return () => {
            socket.emit('disconnect')
            socket.off()
        }
    }, [endPoint])





    useEffect(() => {
        socket.on('message', message => {
            setmessages([...message])
            console.log(messages);
        })
    }, [ messages])



    const sendMessage = () => {
        if (message) {
            console.log(message);
            socket.emit('sendmessage', message, '1234', () => setmessage(''))

        }

    }

    return (
        <div className="chat" >
            <div className="chat-header clearfix">
                <div className="row">
                    <div className="col-lg-6">
                        <a href="javascript:void(0);" data-toggle="modal" data-target="#view_info">
                            <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="avatar" />
                        </a>
                        <div className="chat-about">
                            <h6 className="m-b-0"> {username}</h6>
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
                            <input onKeyDown={e => e.key === 'Enter' ? sendMessage(e) : null} type="text" value={message} onChange={(e) => setmessage(e.target.value)} className="form-control" placeholder="Enter text here..." />
                        </div>
                    </div>
            </div>
            )
}

            export default Chatbox