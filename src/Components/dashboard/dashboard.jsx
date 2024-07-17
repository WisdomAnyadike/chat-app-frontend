import React from 'react'
import '../dashboard/dashboard.styles.scss'
import Sidebar from '../sidebar/sidebar'
import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify'


const Dashboard = () => {
    const navigate = useNavigate()
    const acceptTerms = useSelector(state => state.firstProfileSlice.acceptTerms)
    console.log(acceptTerms);
    useEffect(() => {
        if (!acceptTerms) {
            toast.error('youre not authorized')
            navigate('/chooseteam')
        }
    }, [acceptTerms])




    return (
        <>
            <div class="app-container">
                <Sidebar />
                <Outlet />
                <ToastContainer />
            </div>
        </>

    )
}

export default Dashboard