import React, { useRef } from 'react'
import DashboardNav from './dashboardNav';
import { useEffect, useState } from 'react';
import { API_ENDPOINT } from '../../services/config'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Tablehead from '../Tableheader/Tablehead'


const DashboardProduct = () => {
    const [data, setData] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [isLoadingDream, setLoadingDream] = useState(false)
    const [profile, setProfile] = useState(null)
    const token = useSelector(state => state.tokenSlice.token)
    const profileObj = useSelector(state => state.firstProfileSlice.profileObj)
    const buttonRef = useRef()
    const [doProfile, setDoProfile] = useState(false)




    useEffect(() => {
        const getDreams = async () => {
            try {
                const res = await axios.get(`${API_ENDPOINT}/api/user/getAllDreams`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        "content-type": "application/json"
                    }
                })
                if (res.data.status === 'okay') {
                    setData(res.data.dreams)
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

        getDreams()

    }, [])


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



    useEffect(() => {
        const getProfile = async () => {
            try {
                const res = await axios.get(`${API_ENDPOINT}/api/user/getProfile/${profileObj.profileId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                if (res.data.status === 'okay') {
                    setProfile(res.data.profile)

                    return res.data.profile.isProfileSet
                } else {
                    return false
                }
            } catch (error) {
                return false
            }
        };

        getProfile()
    }, [doProfile])



    const applyToDream = async (dreamId) => {
        console.log('working');
        setDoProfile(true)
        let btnId = document.getElementById(`${dreamId}`)
        btnId.innerHTML = `<div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>`

        if (profile && profile.isProfileSet === true) {
            console.log('here');
            setLoadingDream(true)
            const { portfolioUrl, cvUrl, userId, coverLetter } = profile
            try {
                const res = await axios.post(`${API_ENDPOINT}/api/user/applytodream`, { dreamId, profileId: profileObj.profileId, portfolioUrl, cvUrl, userId, coverLetter }, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        "content-type": "application/json"
                    }
                })
                if (res.data.status === 'okay') {
                    setLoadingDream(false)
                    btnId.innerHTML = `Apply to Dream`
                    toast.success('applied successfully')
                } else {
                    btnId.innerHTML = `Apply to Dream`
                    toast.error('error applying')
                }

            } catch (error) {
                setLoadingDream(false)
                btnId.innerHTML = `Apply to Dream`
                toast.error(error.response?.data?.message || 'An error occurred while applying')
            }

        } else {
            console.log('there');
            alert('set job details before you apply')
            btnId.innerHTML = `Apply to Dream`

        }


    }

    return (
        <DashboardNav props={'Dreams'}>
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
                    <button class="action-button list " title="List View">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-list"><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></svg>
                    </button>
                    <button class="action-button grid active" title="Grid View">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-grid"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>
                    </button>
                </div>
            </div>
            <div class={isLoading ? 'products-area-wrapper gridView d-flex align-items-center justify-content-center h-100' : "products-area-wrapper gridView"}>

                {isLoading ? '' : <Tablehead one={'Dream'} two={'Dream Creator'} three={'Dream Members'} four={'Dream description'} five={'Join Dream'} />}

                {isLoading ?

                    <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div> :


                    data.filter((data) => !data.dreamMembers.some((d) => d.role === profileObj.roleName)).map((data) =>

                        <div key={data._id} class="products-row">
                            <button class="cell-more-button">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-vertical"><circle cx="12" cy="12" r="1" /><circle cx="12" cy="5" r="1" /><circle cx="12" cy="19" r="1" /></svg>
                            </button>
                            <div class="product-cell image">
                                <img src="https://img.freepik.com/premium-vector/light-bulb-with-word-idea-icon-isolated-white-background-flat-style-bulb-vector-element-can-be-used-idea-bulb-light-design-concept_545793-458.jpg" alt="idea" />
                                <span>{data?.dreamName}</span>
                            </div>
                            <div class="product-cell category"><span class="cell-label">Created by:</span>{data?.createdBy?.username}</div>

                            <div class="product-cell category"><span class="cell-label">Members:</span>{data?.dreamMembers.length}</div>

                            <div class="product-cell category"><span class="cell-label">Description:</span>{'*'.repeat((data?.description.length > 14) ? 14 : data?.description.length )}</div>
                            {/* 

                            <div class="product-cell price"><button disabled={isLoadingDream} onClick={() => applyToDream(data._id)} style={{ height: '45px' , width:"150px" }} class="d-flex align-items-center justify-content-center btn btn-warning"> {isLoadingDream ? <div className="spinner-border text-light" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div> : 'Apply to Dream'} </button></div>
                             */}


                            <div class="product-cell price"><button id={data._id} disabled={isLoadingDream} ref={buttonRef} onClick={() => applyToDream(data._id)} style={{ height: '45px', width: "150px" }} class="d-flex align-items-center justify-content-center btn btn-warning">

                                Apply To Dream

                            </button></div>



                        </div>







                    )
                }





            </div>
        </DashboardNav>
    )
}

export default DashboardProduct