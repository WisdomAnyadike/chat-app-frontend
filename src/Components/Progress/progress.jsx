import React from 'react'
import '../Progress/progress.style.css'
import Card from '../cards/card'
import DashboardNav from '../dashboard/dashboardNav'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { API_ENDPOINT } from '../../services/config'
import Loader from '../loader/Loader'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { setDreamName, setProfileId, setProfileRole, setRoleDescription } from '../Redux/FirstProfileSlice'
import Modal from '../modal/modal'


const Progress = () => {
    const token = useSelector(state => state.tokenSlice.token)
    const role = useSelector(state => state.firstProfileSlice.profileObj.roleName)
    const profileId = useSelector(state => state.firstProfileSlice.profileObj.profileId)
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate()

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
                    } else if (res.data.Profile.setRoleDescription === false && res.data.Profile.setAcceptTerms === true && res.data.Profile.setChooseProfile === true && res.data.Profile.ChooseWorker === true && res.data?.Profile?.role.roleName === null) {
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
                        res.data.Profile.role.roleName === 'Concept Innovator' ? navigate('/description') : navigate('/dashboard')
                    } else {
                        dispatch(setProfileId(res.data.Profile._id))
                        dispatch(setProfileRole(res.data.Profile.role.roleName))
                        dispatch(setRoleDescription(res.data.Profile.setRoleDescription))
                        // dispatch(setDreamName(res.data.Profile.))
                        navigate('/dashboard')
                    }
                } else {
                    toast.error('Could not process request, please refresh the page.');
                }
                setLoading(false); // Set loading to false after terms check
            } catch (error) {
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


    const [modal, setmodal] = useState(false)
    const [theRole, setTheRole] = useState('')

    const handleSubmit = (params) => {
        setTheRole(params)
        setmodal(true)
    }


    const closeModal = () => {
        setmodal(false);
    };





    const cards = [
        { title: 'Dreamer', role: 'Concept Innovator', copy: 'Develops and conceptualizes new ideas and creative solutions for the product', button: 'Choose Role' },
        { title: 'Worker', role: 'Worker', copy: ' Performs specific tasks or duties to help build and develop the product or service', button: 'Choose Role' },
        { title: 'Investor', role: 'Investor', copy: 'Provides capital and resources to fund and support product development.', button: 'Choose Role' }
    ];

    if (loading) {
        return <Loader props={'Dreams Loading...'} />; // Add a loading state
    }



    return (

        <DashboardNav  >
            <div class="d-flex justify-content-around align-items-center flex-column " style={{ width: '100%', overflowY: 'scroll' }}>

                <h4 className='mt-4 mb-3' style={{ color: '#286aff', fontWeight: 900 }}>  Choose Your Role ? </h4>

                <main class="page-content">

                    {cards.map(({ title, copy, button, role }, index) =>
                        <div key={index} class="card">
                            <div class="content">
                                <h2 class="title">{role}</h2>
                                <p class="copy">{copy}</p>
                                <button onClick={() => handleSubmit(role)} class="btn">{button}</button>
                            </div>

                        </div>
                    )}

                    {modal && theRole ? <Modal modal={modal} role={theRole} closeModal={closeModal} /> : ''}

                </main>
                <div style={{ backgroundColor: '#00000000' }}>



                    <div class="progress yellow" style={{ backgroundColor: ' #00000000' }}>
                        <span class="progress-left">
                            <span class="progress-bar"></span>
                        </span>
                        <span class="progress-right">
                            <span class="progress-bar"></span>
                        </span>
                        <div class="progress-value">40%</div>
                    </div>
                </div>



            </div>


        </DashboardNav>

    )
}

export default Progress


