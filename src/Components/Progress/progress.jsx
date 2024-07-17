import React from 'react'
import '../Progress/progress.style.css'
import Card from '../cards/card'
import DashboardNav from '../dashboard/dashboardNav'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { API_ENDPOINT } from '../../services/config'


const Progress = () => {
    const role = useSelector(state => state.firstProfileSlice.profileObj.roleName)
    const [acceptTerms, setAcceptTerms] = useState(false)
    const profileId = useSelector(state => state.firstProfileSlice.profileObj.profileId)
    useEffect(() => {
        const checkTerms = async () => {
            if (profileId) {
                try {
                    const res = await axios.get(`${API_ENDPOINT}/api/user/checkTerms/${profileId}`)
                    if (res.data.status === true) {
                        setAcceptTerms(true)
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }

        checkTerms()
    }, [profileId])

    const techRoles = [
        { name: 'Concept Innovator', description: 'Develops and conceptualizes new ideas  for the product.' },
        { name: 'Frontend Developer', description: 'Builds the visual and interactive aspects of a application.', icon: 'frontend-icon.png' },
        { name: 'Backend Developer', description: 'Handles the server-side logic and database interactions.', icon: 'backend-icon.png' },
        { name: 'Product Manager', description: 'Oversees product development & ensures alignment with goals.', icon: 'pm-icon.png' },
        { name: 'UI/UX Designer', description: 'Designs user interfaces and user experiences.', icon: 'uiux-icon.png' },
        { name: 'Data Scientist', description: 'Analyzes data to extract insights and inform decisions.', icon: 'datascientist-icon.png' },
        { name: 'QA Engineer', description: 'Ensures the quality & functionality of the product through testing.', icon: 'qa-icon.png' },
        { name: 'Marketing Specialist', description: 'Promotes the product and drives user acquisition.', icon: 'marketing-icon.png' },
    ];

    if (acceptTerms) {
        return <div> filled  <Link to={role === 'Concept Innovator' ? '/description' : '/dashboard'}> <button> next </button> </Link> </div>
    }

    return (
        <DashboardNav  >
            <div class="d-flex justify-content-around align-items-center flex-column " style={{ width: '100%' }}>

                <h4 className='mt-4 mb-3' style={{ color: '#286aff', fontWeight: 900 }}>  Choose Your Role ? </h4>

                <div className='d-flex mb-1 align-items-center flex-wrap justify-content-around' style={{ minHeight: "350px", maxHeight: '450px', width: '100%', overflowY: 'scroll' }}>
                    {techRoles.map((role, index) => (
                        <Card key={index} role={role.name} description={role.description} />
                    ))}
                </div>
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


