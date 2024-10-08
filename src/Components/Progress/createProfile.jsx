import DashboardNav from '../dashboard/dashboardNav';
import './createprofile.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { API_ENDPOINT } from '../../services/config';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setDreamName, setProfileId, setProfileRole, setRoleDescription } from '../Redux/FirstProfileSlice';
import Loader from '../loader/Loader';

const CreateProfile = () => {
    const token = useSelector(state => state.tokenSlice.token);
    const navigate = useNavigate();
    // const [chooseProfile, setChooseProfile] = useState(false);
    const profileId = useSelector(state => state.firstProfileSlice.profileObj.profileId);
    const [loading, setLoading] = useState(true);
    const [loadButton, setloadButton] = useState(false)

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

   
  

    const [value, setValue] = useState('');

    const handleSubmit = async () => {
        setloadButton(true)
        try {
            const res = await axios.post(`${API_ENDPOINT}/api/user/createProfile`, { profileName: value }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            if (res.data.status === 'okay') {
                setloadButton(false)
                toast.success(res.data.message);
                dispatch(setProfileId(res.data.profileId));

                setTimeout(() => {
                    navigate('/chooseTeam');
                }, 3000);
            } else {
                setloadButton(false)
                toast.error(res.data.message);
            }
        } catch (error) {
            setloadButton(false)
            toast.error(error.message);
        }
    };

    if (loading) {
        return <Loader props={'Dreams Loading...'} />; // Add a loading state
    }

   

    return (
        <DashboardNav props='Profile'>
            <div className="d-flex justify-content-around align-items-center flex-column" style={{ width: '100%' }}>
                <h4 className='mt-4 mb-3' style={{ color: '#286aff', fontWeight: 900 }}>Create Your First Profile</h4>

                <div className="card p-4 mt-3" style={{ maxHeight: '450px', overflowY: 'scroll' }}>
                    <div className="d-flex justify-content-center px-5">
                        <div className="search">
                            <input value={value} onChange={(e) => setValue(e.target.value)} type="text" className="search-input" placeholder="Type here..." />
                            <button onClick={handleSubmit} disabled={loadButton} className='search-icon app-content-headerButton' style={{ width: 'fit-content' }}>
                                {loadButton ? <div class="spinner-border text-light" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div> : <b className='border-0' style={{ fontSize: '14px', fontWeight: '500' }}>Create</b>}
                            </button>
                        </div>
                    </div>
                    <div className="row mt-4 g-1 px-4 mb-5">
                        <div className="col-md-2">
                            <div className="card-inner p-3 d-flex flex-column align-items-center">
                                <img src="https://i.imgur.com/Mb8kaPV.png" width="50" height={'50'} />
                                <div onClick={(e) => setValue(e.target.innerText)} className="text-center mg-text">
                                    <span className="mg-text">Creative strategist</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="card-inner p-3 d-flex flex-column align-items-center">
                                <img src="https://i.imgur.com/ueLEPGq.png" width="50" height={'50'} />
                                <div onClick={(e) => setValue(e.target.innerText)} className="text-center mg-text">
                                    <span className="mg-text">Money maker</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="card-inner p-3 d-flex flex-column align-items-center">
                                <img src="https://i.imgur.com/tmqv0Eq.png" width="50" height={'50'} />
                                <div onClick={(e) => setValue(e.target.innerText)} className="text-center mg-text">
                                    <span className="mg-text">Delivery manager</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="card-inner p-3 d-flex flex-column align-items-center">
                                <img src="https://i.imgur.com/D0Sm15i.png" width="50" height={'50'} />
                                <div onClick={(e) => setValue(e.target.innerText)} className="text-center mg-text">
                                    <span className="mg-text">Product user</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="card-inner p-3 d-flex flex-column align-items-center">
                                <img src="https://i.imgur.com/Z7BJ8Po.png" width="50" height={'50'} />
                                <div onClick={(e) => setValue(e.target.innerText)} className="text-center mg-text">
                                    <span className="mg-text">Value returner</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="card-inner p-3 d-flex flex-column align-items-center">
                                <img src="https://i.imgur.com/YLsQrn3.png" width="50" height={'50'} />
                                <div onClick={(e) => setValue(e.target.innerText)} className="text-center mg-text">
                                    <span className="mg-text">Guaranteed tester</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ backgroundColor: '#00000000' }}>
                    <div className="progress blue" style={{ backgroundColor: '#00000000' }}>
                        <span className="progress-left">
                            <span className="progress-bar"></span>
                        </span>
                        <span className="progress-right">
                            <span className="progress-bar"></span>
                        </span>
                        <div className="progress-value">10%</div>
                    </div>
                </div>
            </div>

            <ToastContainer />
        </DashboardNav>
    );
};

export default CreateProfile;
