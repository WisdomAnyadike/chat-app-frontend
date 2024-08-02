import React from 'react';
import '/src/Components/pickRole/pickrole.scss'
import DashboardNav from '../dashboard/dashboardNav';
import { useState, useEffect } from 'react';
import axios from 'axios'
import { API_ENDPOINT } from '../../services/config'
import Loader from '../loader/Loader'
import { useDispatch } from 'react-redux'
import { toast , ToastContainer } from 'react-toastify'
import { setDreamName, setProfileId, setProfileRole, setRoleDescription } from '../Redux/FirstProfileSlice'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'







const PickRole = () => {
    const token = useSelector(state => state.tokenSlice.token)
    const profileId = useSelector(state => state.firstProfileSlice.profileObj.profileId)
    const [loading, setLoading] = useState(false)
    const [isloading, setIsLoading] = useState(false)
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


    const handleSubmit = async (role) => {
        try {
            setIsLoading(true)
            dispatch(setProfileRole(`${role}`))
            const res = await axios.get(`${API_ENDPOINT}/api/user/setTerms/${profileId}/${role}`)
            if (res.data.status === true) {
                setIsLoading(false)
                toast.success('role accepted success')
                setTimeout(() => {
                    navigate('/dashboard')
                }, 3000);
            }

        } catch (error) {
            setIsLoading(false)
            console.log(error)
        }
    }




    const cards = [
        {
            id: 1,
            backgroundImage: 'https://www.freecodecamp.org/news/content/images/2022/02/shutterstock_1610721214-min.jpg',
            category: 'Category',
            heading: 'Frontend Developer',
            position: 'Builds the visual and interactive aspects of a application',
            
        },
        {
            id: 2,
            backgroundImage: 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/66elDNIP6hdzmhFgPms16Q/513f814a2ffe9f142ad19d69b47e1abc/H0MKswdw.jpeg?w=1500&h=680&q=60&fit=fill&f=faces&fm=jpg&fl=progressive&auto=format%2Ccompress&dpr=1&w=1000',
            category: 'Category',
            heading: 'Backend Developer',
            position: 'Handles the server-side logic and database interactions.',
            
        },
        {
            id: 3,
            backgroundImage: 'https://www.mediabistro.com/wp-content/uploads/2017/05/Product-Manager.jpg',
            category: 'Category',
            heading: 'Product Manager',
            position: 'Oversees product development & ensures alignment with goals.',
            
        },
        {
            id: 4,
            backgroundImage: 'https://usa.bootcampcdn.com/wp-content/uploads/sites/108/2021/08/tes_gen_blog_post_071921_1668379891-800x412.jpg',
            category: 'Category',
            heading: 'UI/UX Designer',
            position: 'Designs user interfaces and user experiences.',
            
        },
        {
            id: 5,
            backgroundImage: 'https://onlinedegrees.sandiego.edu/wp-content/uploads/2023/04/data-scientist-vs-ai-engineer.jpg',
            category: 'Category',
            heading: 'Data Scientist',
            position: 'Analyzes data to extract insights and inform decisions.',
            
        },
        {
            id: 6,
            backgroundImage: 'https://miro.medium.com/v2/resize:fit:1000/1*NqTKUmCe3KW9WmNcBqndSA.jpeg',
            category: 'Category',
            position: 'Ensures the quality & functionality of the product through testing.',
            heading: 'QA Engineer',
            
        },
        {
            id: 7,
            backgroundImage: 'https://static.archerdxp.io/cms/3ef40c3a-efee-4bc3-b326-7fc1ec5b059e.jpg',
            category: 'Category',
            heading: 'Marketing Specialist',
            position: 'Promotes the product and drives user acquisition.',
            
        },
        {
            id: 8 ,
            backgroundImage: 'https://www.theforage.com/blog/wp-content/uploads/2023/01/What-is-a-project-manager-1.jpg',
            category: 'Category',
            heading: 'Project Manager',
            
        }

    ];






    if (loading) {
        return <Loader props={'Dreams Loading...'} />; // Add a loading state
    }




    return (
        <DashboardNav>
            <section className="hero-section p-0 pt-4">
                <div className="card-grid">
                    {cards.map(card => (
                        <a key={card.id} onClick={()=>handleSubmit(card.category)} className="card" >
                            <div
                                className="card__background"
                                style={{ backgroundImage: `url(${card.backgroundImage})` }}
                            ></div>
                            <div className="card__content">
                                <p className="card__category">{card.category}</p>
                                <h3 className="card__heading">{card.heading}</h3>
                                <p className="card__category text-light">{card.position}</p>
                            </div>
                        </a>
                    ))}
                </div>
            </section>
            <ToastContainer/>
        </DashboardNav>
    );
};

export default PickRole;
