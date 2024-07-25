import React from 'react'
import { API_ENDPOINT } from '../../services/config'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom';
import Loader from '../loader/Loader';
import { useSelector } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import '/src/Components/resume/resume.scss'



const Resume = () => {
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(true)
    const token = useSelector(state => state.tokenSlice.token)
    const navigate = useNavigate()

    const { Id } = useParams()

    useEffect(() => {
        if (Id && token) {
            const getApplication = async () => {
                try {
                    const res = await axios.get(`${API_ENDPOINT}/api/apply/getapplications/${Id}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            "content-type": "application/json"
                        }
                    })
                    if (res.data.status === 'okay') {
                        setData(res.data.application)
                        console.log(res.data.application)
                        setLoading(false)
                    }

                } catch (error) {

                    if (error.response.data.message === 'Error Verifying Token') {
                        toast.error('session expired')
                        setTimeout(() => {
                            navigate('/')
                        }, 5000)
                        return
                    }
                    toast.error(error.response.data.message)
                    setLoading(false)

                }

            }

            getApplication()
        }


    }, [Id])

    function routeIt() {
        navigate('/dashboard/admin')
    }

    if (isLoading) {
        return <Loader props={'Cover Letter Loading...'} />; // Add a loading state
    }


    return (
        <>


            <ToastContainer />


            <div class="main-container d-flex flex-column align-items-center">
                <h3 className='mt-3'> Username: {data?.userId.username.toUpperCase()} </h3>
                <div class="fixed-container w-100 ">
                    <header className='d-flex align-items-center justify-content-center w-100 h-100'>

                        <h2>  Application For {data?.profileId.role.roleName} Role</h2>

                    </header>
                </div>
                <div class="content-wrapper">

                    <div class="overflow-container">

                        <div class="overflow-content">
                            <h4 className='mb-2' style={{ textDecoration: "underline" }}> Cover Letter </h4>

                            <p> {data?.coverLetter}</p>
                            {/* For Non-Chrome browsers (Firefox, Safari, etc):<br />
                            Without <code>min-height:0px;</code> on the content-wrapper,
                            this content will not scroll but instead will expand to its
                            full height. */}
                            <br /><br />
                            Note that if you're satisfied with this applicant,you can accept or reject on the admin dashboard here.
                            <code style={{ cursor: 'pointer' }} onClick={routeIt}> admin dashboard</code>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Resume