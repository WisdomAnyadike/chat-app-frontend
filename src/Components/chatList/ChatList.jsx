import React from 'react'
import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { API_ENDPOINT } from '../../services/config'
import Loader from '../loader/Loader'


const ChatList = () => {
    const profileId = useSelector(state => state.firstProfileSlice.profileObj.profileId)
    const token = useSelector(state => state.tokenSlice.token)
    const navigate = useNavigate()
    const [chatUsers, setchatUsers] = useState(null)
    const [User, setUser] = useState({})
    const [dreamId, setDreamId] = useState('')
    const [getId, setGottenId] = useState(false)
    const [Admin, setAdmin] = useState({})
    const [userTexting, setUserTexting] = useState({})
    const [loading, setloading] = useState(true)


    useEffect(() => {
        const getCurrentUser = async () => {
            try {
                const res = await axios.get(`${API_ENDPOINT}/api/user/getCurrentUser`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                if (res.data.status === 'okay') {
                    setUser(res.data.user)
                    console.log(res.data.user);
                    return
                }
            } catch (error) {
                console.log(error);
            }
        };

        getCurrentUser()
    }, [])




    useEffect(() => {
        const getProfile = async () => {
            try {
                const res = await axios.get(`${API_ENDPOINT}/api/user/getProfile/${profileId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                if (res.data.status === 'okay') {
                    setDreamId(res.data.profile.role.dreamId)
                    return res.data.profile.isProfileSet
                } else {
                    return false
                }
            } catch (error) {
                return false
            }
        };

        getProfile()
    }, [getId])


    useEffect(() => {
        setGottenId(true)
        if (dreamId) {
            const getUsers = async () => {
                try {
                    const res = await axios.get(`https://chat-app-backend-uep3.onrender.com/api/apply/getTeam/${dreamId}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    })
                    if (res.data.status === 'okay') {
                        setchatUsers(res.data.dreamMembers)
                        setloading(false)
                        console.log(res.data.dreamMembers);

                    } else {
                        console.log(res.data.message);
                    }

                } catch (error) {
                    console.log(error);
                }
            }

            getUsers()
        }


    }, [dreamId])

    let move = (e) => {
        if (chatUsers) {
            e.target.classList.add('active')
            navigate(`/dashboard/Inbox/${e.target.id}/${userTexting._id}`)
        }
        // socket.emit('create-room', '1234')
    }

    useEffect(() => {
        if (chatUsers) {
            const Admin = chatUsers.find((user) => user.role === 'Concept Innovator')
            setAdmin(Admin)
        }
    }, [chatUsers])

    useEffect(() => {
        if (chatUsers) {
            const userTexting = chatUsers.find((user) => user.profileId === profileId)
            setUserTexting(userTexting)
        }
    }, [chatUsers])




    const totalHeight = useRef(0);

    useEffect(() => {
        const titles = document.querySelectorAll('.chat-list-header');

        const handleToggle = function () {
            const result = this.nextElementSibling;
            const activeSibling = result.classList.contains('active');
            this.classList.toggle('active');
            result.classList.toggle('active');

            if (!activeSibling) {
                let newHeight = 0;
                for (let i = 0; i < result.children.length; i++) {
                    newHeight += result.children[i].scrollHeight + 40;
                }
                totalHeight.current = newHeight;
            } else {
                totalHeight.current = 0;
            }
            result.style.maxHeight = totalHeight.current + 'px';
        };

        titles.forEach((title) => {
            title.addEventListener('click', handleToggle);
        });

        return () => {
            titles.forEach((title) => {
                title.removeEventListener('click', handleToggle);
            });
        };
    }, []);


    if (loading) {
        return <div className='d-flex align-items-center justify-content-center w-100 h-100'>
            <div class="spinner-border text-light" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    }

    return (
        <>
            <div class="app-profile-box">
                <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80" alt="profile" />

                <p class="app-profile-box-title name mt-2 me-1 d-flex align-items-center justify-content-start w-100">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                    <span className='ms-3'> {Admin ? Admin?.userId?.username : 'Loading...'} </span>
                </p>
                <p class="app-profile-box-title mail mt-2  d-flex align-items-center justify-content-start w-100"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-mail"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                    <span className='ms-3'>  {Admin ? Admin?.userId?.email : 'Loading...'} </span>

                </p>


                <button class="archive-btn p-1">Admin <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="feather feather-archive" viewBox="0 0 24 24">
                    <defs />
                    <path d="M21 8v13H3V8M1 3h22v5H1zM10 12h4" />
                </svg></button>

            </div>
            <div class="chat-list-wrapper">
                <div class="chat-list-header">Dream Conversations <span class="c-number p-2">4</span>
                    <svg class="list-header-arrow" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" className="feather feather-chevron-down" viewBox="0 0 24 24">
                        <defs />
                        <path d="M18 15l-6-6-6 6" />
                    </svg>
                </div>
                <ul class="chat-list active">
                    {/* <li class="chat-list-item active">
                    <img src="https://images.unsplash.com/photo-1587080266227-677cc2a4e76e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80" alt="chat" />
                    <span class="chat-list-name">Dwight Schrute</span>
                </li>
                <li class="chat-list-item">
                    <img src="https://images.unsplash.com/photo-1566465559199-50c6d9c81631?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80" alt="chat" />
                    <span class="chat-list-name">Andy Bernard</span>
                </li>
                <li class="chat-list-item">
                    <img src="https://images.unsplash.com/photo-1562788869-4ed32648eb72?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2552&q=80" alt="chat" />
                    <span class="chat-list-name">Michael Scott</span>
                </li>
                <li class="chat-list-item">
                    <img src="https://images.unsplash.com/photo-1604004555489-723a93d6ce74?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=934&q=80" alt="chat" />
                    <span class="chat-list-name">Holy Flax</span>
                </li>
                <li class="chat-list-item">
                    <img src="https://images.unsplash.com/photo-1583864697784-a0efc8379f70?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE1fHx8ZW58MHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60" alt="chat" />
                    <span class="chat-list-name">Jim Halpert</span>
                </li> */}
                    {chatUsers === null ? 'no active members' :
                        chatUsers.filter((user) => user.userId.username !== User.username).map((user) =>

                            <li key={user._id} id={user._id} onClick={(e) => move(e)} class="chat-list-item">
                                <img id={user._id} onClick={(e) => move(e)} src="https://images.unsplash.com/photo-1583864697784-a0efc8379f70?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE1fHx8ZW58MHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60" alt="chat" />
                                <span id={user._id} onClick={(e) => move(e)} class="chat-list-name">{user.userId.username}</span>
                            </li>

                        )


                    }
                </ul>
            </div>
        </>
    )
}

export default ChatList