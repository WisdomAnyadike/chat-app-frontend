import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'



const Peoplelist = () => {
    const navigate = useNavigate()
    
   
    const userObj = JSON.parse(localStorage.getItem('userObj'))
    const [chatUsers, setchatUsers] = useState([])

    useEffect(() => {
        const getUsers = async () => {
            const res = await axios.get('https://chat-app-backend-uep3.onrender.com/api/user/getUsers')
            if (res.data.status === 'okay') {
                setchatUsers(res.data.chatUsers)
            } else {
                console.log(res.data.message);
            }


        }

        getUsers()

    }, [])

    


    let move = (e) => {
        e.target.classList.add('active')
        navigate(`/chat/${e.target.id}`)
        // socket.emit('create-room', '1234')
    }
    return (
        <div id="plist" class="people-list">
            <div class="input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text"><i class="fa fa-search"></i></span>
                </div>
                <input type="text" class="form-control" placeholder="Search..." />
            </div>
            <ul class="list-unstyled chat-list mt-2 mb-0 ">
                {chatUsers.filter((user) => user.name !== userObj.name).map((user) =>
                    <li class="clearfix" id={user.name} onClick={(e) => move(e)}>
                        <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="avatar" />
                        <div class="about">
                            <div class="name">{user.name}</div>
                            <div class="status"> <i class="fa fa-circle online"></i> online </div>
                        </div>
                    </li>
                )}
            </ul>
        </div>
    )
}

export default Peoplelist