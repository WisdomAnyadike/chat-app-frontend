import React from 'react'
import DashboardNav from './dashboardNav'
import { API_ENDPOINT } from '../../services/config'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import Tablehead from '../Tableheader/Tablehead'
import { useNavigate } from 'react-router-dom'

const Admin = () => {
    const navigate = useNavigate()
    const [data, setData] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [respondApplication, setrespondApplication] = useState(false)
    const [reload, setreload] = useState(false)
    const [getId, setGottenId] = useState(false)
    const profileId = useSelector(state => state.firstProfileSlice.profileObj.profileId)
    const token = useSelector(state => state.tokenSlice.token)
    const [dreamId, setDreamId] = useState('')


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
            const getApplications = async () => {
                try {
                    const res = await axios.post(`${API_ENDPOINT}/api/apply/getapplications`, { dreamId }, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            "content-type": "application/json"
                        }
                    })
                    if (res.data.status === 'okay') {
                        setData(res.data.applications)
                        console.log(res.data.applications)
                        setLoading(false)
                    }

                } catch (error) {
                    setLoading(false)
                    if (error.response.data.message === 'Error Verifying Token') {
                        toast.error('session expired')
                        setTimeout(() => {
                            navigate('/')
                        }, 5000)
                        return
                    }
                    toast.error(error)

                }

            }

            getApplications()
        }


    }, [dreamId, reload])





    useEffect(() => {
        const handleFilterClick = () => {
            document.querySelector(".filter-menu").classList.toggle("active");
        };

        const handleGridClick = () => {
            document.querySelector(".list").classList.remove("active");
            document.querySelector(".grid").classList.add("active");
            document.querySelector(".products-area-wrapper").classList.add("gridView");
            document.querySelector(".products-area-wrapper").classList.remove("tableView");
        };

        const handleListClick = () => {
            document.querySelector(".list").classList.add("active");
            document.querySelector(".grid").classList.remove("active");
            document.querySelector(".products-area-wrapper").classList.remove("gridView");
            document.querySelector(".products-area-wrapper").classList.add("tableView");
        };

        const filterButton = document.querySelector(".jsFilter");
        const gridButton = document.querySelector(".grid");
        const listButton = document.querySelector(".list");

        filterButton.addEventListener("click", handleFilterClick);
        gridButton.addEventListener("click", handleGridClick);
        listButton.addEventListener("click", handleListClick);

        return () => {
            filterButton.removeEventListener("click", handleFilterClick);
            gridButton.removeEventListener("click", handleGridClick);
            listButton.removeEventListener("click", handleListClick);
        };
    }, []);

    function viewLetter(params) {
        navigate(`/dashboard/resume/${params}`)
    }


    function sendResponse(params, userId, profileId, role) {
        setrespondApplication(true)
        if (params === 'accept' && profileId && userId && role && dreamId) {
            const accept = async () => {
                try {
                    const res = await axios.post(`${API_ENDPOINT}/api/apply/acceptApplication`, { profileId, userId, role, dreamId }, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            "content-type": "application/json"
                        }
                    })
                    if (res.data.status === 'okay') {
                        toast.success('User accepted successfully')
                        setrespondApplication(false)
                        setreload(true)
                    }

                } catch (error) {

                    if (error.response.data.message === 'Error Verifying Token') {
                        toast.error('session expired')
                        setTimeout(() => {
                            navigate('/')
                        }, 5000)
                        return
                    }
                    toast.error(error)
                    setrespondApplication(false)
                    setreload(true)

                }

            }

            accept()


        } else {
            toast.error('an error occured in-server')

        }

    }

    const filteredData = data.sort((a, b) => a.profileId.role.roleName > b.profileId.role.roleName ? -1 : 1).filter((data) => data.isAccepted !== true)


    return (
        <DashboardNav props={'Admin'}>


            <div class="app-content-actions">


                <input class="search-bar" placeholder="Search..." type="text" />
                <div class="app-content-actions-wrapper">
                    <div class="filter-button-wrapper">
                        <button class="action-button filter jsFilter"><span>Filter</span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-filter"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /></svg></button>
                        <div class="filter-menu">
                            <label>Category</label>
                            <select>
                                <option>All Categories</option>
                                <option>Furniture</option>                     <option>Decoration</option>
                                <option>Kitchen</option>
                                <option>Bathroom</option>
                            </select>
                            <label>Status</label>
                            <select>
                                <option>All Status</option>
                                <option>Active</option>
                                <option>Disabled</option>
                            </select>
                            <div class="filter-menu-buttons">
                                <button class="filter-button reset">
                                    Reset
                                </button>
                                <button class="filter-button apply">
                                    Apply
                                </button>
                            </div>
                        </div>
                    </div>
                    <button class="action-button list active" title="List View">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-list"><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></svg>
                    </button>
                    <button class="action-button grid" title="Grid View">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-grid"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>
                    </button>
                </div>
            </div>
            <div class={isLoading ? 'products-area-wrapper tableView d-flex align-items-center justify-content-center h-100' : "products-area-wrapper tableView"}>

                {isLoading ? '' : <Tablehead one={'User'} two={'Cover Letter'} three={'Resume'} four={'Accept'} five={'View Portfolio'} six={'Reject'} />}

                {isLoading ? <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div> :


                    filteredData.length === 0 ? 'no pending applications' : filteredData.map((data) =>

                        <div key={data._id} class="products-row">
                            <button class="cell-more-button">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-vertical"><circle cx="12" cy="12" r="1" /><circle cx="12" cy="5" r="1" /><circle cx="12" cy="19" r="1" /></svg>
                            </button>
                            <div class="product-cell image">
                                <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="product" />
                                <span>{data?.userId.username}</span>
                            </div>
                            <div class="product-cell category"><span class="cell-label">Cover Letter:</span><button style={{ height: '30px' }} class="d-flex align-items-center justify-content-center btn btn-primary" onClick={() => viewLetter(data?._id)}> Coverletter </button></div>
                            {/* <div class="product-cell status-cell">
                                <span class="cell-label">Status:</span>
                                <span class="status"> pending </span>
                            </div> */}
                            <div class="product-cell category"> <span class="cell-label">Resume:</span><a href={data?.cvUrl} target='blank' > View resume </a></div>

                            <div class="product-cell category"><span class="cell-label">Accept:</span>

                                <button onClick={() => sendResponse('accept', data?.userId._id, data?.profileId._id, data?.profileId.role.roleName)} style={{ height: '30px' }} class="d-flex align-items-center justify-content-center btn btn-success"> accept </button></div>

                            <div class="product-cell category"> <span class="cell-label"> Portfolio :</span><a href={data?.portfolioUrl} target='blank' > View </a></div>

                            <div class="product-cell price"><span class="cell-label">Reject:</span>

                                <button onClick={() => sendResponse('reject')} style={{ height: '30px' }} class="d-flex align-items-center justify-content-center btn btn-danger"> reject </button></div>

                        </div>







                    )
                }







                {/* <div class="products-row">
                    <button class="cell-more-button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-vertical"><circle cx="12" cy="12" r="1" /><circle cx="12" cy="5" r="1" /><circle cx="12" cy="19" r="1" /></svg>
                    </button>
                    <div class="product-cell image">
                        <img src="https://images.unsplash.com/photo-1484154218962-a197022b5858?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8a2l0Y2hlbnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60" alt="product" />
                        <span>Lou</span>
                    </div>
                    <div class="product-cell category"><span class="cell-label">Category:</span>Kitchen</div>
                    <div class="product-cell status-cell">
                        <span class="cell-label">Status:</span>
                        <span class="status disabled">Disabled</span>
                    </div>
                    <div class="product-cell sales"><span class="cell-label">Sales:</span>6</div>
                    <div class="product-cell stock"><span class="cell-label">Stock:</span>46</div>
                    <div class="product-cell price"><span class="cell-label">Price:</span>$710</div>
                </div> */}
                <ToastContainer />
            </div>
        </DashboardNav>
    )
}

export default Admin