import React from 'react'
import '../dashboard/dashboard.styles.scss'
import Sidebar from '../sidebar/sidebar'
import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'
import { setDreamName, setProfileId, setProfileRole, setRoleDescription } from '../Redux/FirstProfileSlice';
import Loader from '../loader/Loader';
import { API_ENDPOINT } from '../../services/config'



const Dashboard = () => {
    const token = useSelector(state => state.tokenSlice.token);
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        const checkTerms = async () => {
            try {
                const res = await axios.get(`${API_ENDPOINT}/api/user/getFirstProfile`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (res.data.status === 'okay') {
                    console.log(res.data.Profile);
                    if (res.data?.Profile?.setChooseProfile === undefined) {
                        navigate('/createProfile')
                        dispatch(setProfileId(''))
                        dispatch(setProfileRole(''))
                        dispatch(setRoleDescription(''))
                        dispatch(setDreamName(''))
                    } else if (res.data.Profile.setAcceptTerms === false && res.data.Profile.setChooseProfile === true) {
                        dispatch(setProfileId(res.data.Profile._id))
                        dispatch(setProfileRole(''))
                        navigate('/chooseTeam')
                    } else if (res.data.Profile.setRoleDescription === false && res.data.Profile.setAcceptTerms === true && res.data.Profile.setChooseProfile === true && res.data.Profile.ChooseWorker === true && res.data?.Profile?.role?.roleName === null) {
                        dispatch(setProfileId(res.data.Profile._id))
                        dispatch(setProfileRole(''))
                        dispatch(setRoleDescription(''))
                        dispatch(setDreamName(''))
                        navigate('/pickrole')
                    }
                    else if (res.data.Profile.setRoleDescription === false && res.data.Profile.setAcceptTerms === true && res.data.Profile.setChooseProfile === true && res.data?.Profile?.role.roleName !== null) {
                        dispatch(setProfileId(res.data.Profile._id))
                        dispatch(setProfileRole(res.data.Profile.role.roleName))
                        dispatch(setRoleDescription(''))
                        dispatch(setDreamName(''))
                        res.data.Profile.role.roleName === 'Concept Innovator' ? navigate('/description') : ''
                    } else {
                        dispatch(setProfileId(res.data.Profile._id))
                        dispatch(setProfileRole(res.data.Profile.role.roleName))
                        dispatch(setRoleDescription(res.data.Profile.setRoleDescription))
                        // dispatch(setDreamName(res.data.Profile.))
                        // navigate('/dashboard')
                    }
                } else {
                    toast.error('Could not process request, please refresh the page.');
                }
                setLoading(false); // Set loading to false after terms check
            } catch (error) {
                console.log(error);
                if (error.response.data.message === 'Error Verifying Token') {
                    toast.error('session expired')
                    setTimeout(() => {
                        navigate('/')
                    }, 5000)
                } else {
                    console.error(error);
                    toast.error('An error occurred while checking terms.');
                }
                setLoading(false); // Set loading to false after error
            }
        };

        if (token) {
            checkTerms();
        } else {
            toast.error('You\'re not authorised')
            setTimeout(() => {
                navigate('/')
            }, 3000)
        }
    }, [token, navigate, dispatch]);


    if (loading) {
        return <Loader props={'Dreams Loading...'} />; // Add a loading state
    }


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