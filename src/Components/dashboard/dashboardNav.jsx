import React from 'react'
import { useNavigate } from 'react-router-dom';
import '/src/Components/dashboard/nav.scss'
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const DashboardNav = ({ children, props }) => {
    // const navigate = useNavigate()

    // const handleSubmit = () => {
    //     if (props == undefined) {
    //         navigate('/dashboard')
    //     } else if (props === 'Profile') {
    //         navigate('/chooseTeam')
    //     }
    // }
    const [dashboard, setDashboard] = useState(false);
    const profileObj = useSelector(state => state.firstProfileSlice.profileObj.roleName)
    console.log(profileObj);
    console.log(dashboard);

    useEffect(() => {
        if (profileObj === 'Concept Innovator') {
            setDashboard(true)
        }
    }, [profileObj])

    const userObj = JSON.parse(localStorage.getItem('userObj'))


    const [activeTab, setActiveTab] = useState('');
    const navigate = useNavigate()

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
        if (tabId === 'Home') {
            navigate(`/dashboard`)
            return
        }
        navigate(`/dashboard/${tabId}`)
    };



    useEffect(() => {
        const handleModeSwitchClick = () => {
            document.documentElement.classList.toggle('light');
            modeSwitch.classList.toggle('active');
        };

        const modeSwitch = document.querySelector('.mode-switch');
        modeSwitch.addEventListener("click", handleModeSwitchClick);

        return () => {
            modeSwitch.removeEventListener("click", handleModeSwitchClick);
        };
    }, []);

    // let handleButton = () => {
    //     if (props === 'Dreams' || props === 'Profiles' || props === 'Profile') {
    //         return `Add ${props}`
    //     } else if (props == undefined) {
    //         return 'Next'
    //     }

    //     return 'Submit'

    // }

    return (
        <div class="app-content" style={{ height: '100vh', width: '100vw' }} >
            <div class="app-content-header">
                <header class="app-content offcanvas-menu ">
                    <input type="checkbox" id="toogle-menu" />

                    <label for="toogle-menu" class="toogle-open">
                        <span className='bg-light'></span>
                    </label>

                    <nav>
                        <div >
                            <a href="#"> <i class="fab fa-css3-alt"></i>offcanvas </a>
                            <label for="toogle-menu" class="toogle-close">
                                <span> </span>
                            </label>
                        </div>
                        <ul>
                            {
                                dashboard ? " " : <>

                                    <li onClick={() => handleTabClick('Ideas')} class={`sidebar-list-item ${activeTab === 'Ideas' ? 'active' : ''}`}>
                                        <a href="#">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-shopping-bag"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
                                            <span>Dreams</span>
                                        </a>
                                    </li>
                                </>

                            }

                            <li onClick={() => handleTabClick('Profiles')} class={`sidebar-list-item ${activeTab === 'Profiles' ? 'active' : ''}`}>
                                <a href="#">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-pie-chart"><path d="M21.21 15.89A10 10 0 1 1 8 2.83" /><path d="M22 12A10 10 0 0 0 12 2v10z" /></svg>
                                    <span>Profiles</span>
                                </a>
                            </li>
                            <li onClick={() => handleTabClick('Inbox')} class={`sidebar-list-item ${activeTab === 'Inbox' ? 'active' : ''}`}>
                                <a href="#">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-inbox"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12" /><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" /></svg>
                                    <span>Inbox</span>
                                </a>
                            </li>
                            <li onClick={() => handleTabClick('Notifications')} class={`sidebar-list-item ${activeTab === 'Notifications' ? 'active' : ''}`}>
                                <a href="#">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-bell"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
                                    <span>Notifications</span>
                                </a>
                            </li>
                            {
                                dashboard && <li onClick={() => handleTabClick('Admin')} class={`sidebar-list-item ${activeTab === 'Admin' ? 'active' : ''}`}>
                                    <a href="#">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
                                        <span> Admin </span>
                                    </a>
                                </li>
                            }
                            {
                                dashboard ? '' : <li onClick={() => handleTabClick('jobprofile')} class={`sidebar-list-item ${activeTab === 'jobprofile' ? 'active' : ''}`}>
                                    <a href="#">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
                                        <span> Job profile </span>
                                    </a>
                                </li>
                            }
                        </ul>
                    </nav>
                </header>



                <h1 class="app-content-headerText me-3">{props === 'Profile' ? '' : props}</h1>
                <button class="mode-switch" title="Switch Theme">
                    <svg class="moon" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" width="24" height="24" viewBox="0 0 24 24">
                        <defs></defs>
                        <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
                    </svg>
                </button>

                {/* <button onClick={handleSubmit} class="app-content-headerButton">
                    {handleButton()}
                </button> */}
            </div>
            {children}
        </div>
    )
}

export default DashboardNav