import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardNav = ({ children, props }) => {
    const navigate = useNavigate()

    const handleSubmit = () => {
        if (props == undefined) {
            navigate('/dashboard')
        } else if (props === 'Profile') {
            navigate('/chooseTeam')
        }
    }



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

    let handleButton = () => {
        if (props === 'Dreams' || props === 'Profiles' || props === 'Profile') {
            return `Add ${props}`
        } else if (props == undefined) {
            return 'Next'
        }

        return 'Submit'

    }

    return (
        <div class="app-content" style={{ height: '100vh', width: '100vw' }} >
            <div class="app-content-header">
                <h1 class="app-content-headerText">{props === 'Profile' ? '' : props}</h1>
                <button class="mode-switch" title="Switch Theme">
                    <svg class="moon" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" width="24" height="24" viewBox="0 0 24 24">
                        <defs></defs>
                        <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
                    </svg>
                </button>

                <button onClick={handleSubmit} class="app-content-headerButton">
                    {handleButton()}
                </button>
            </div>
            {children}
        </div>
    )
}

export default DashboardNav