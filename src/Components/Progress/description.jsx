import React from 'react'
import './description.css'
import DashboardNav from '../dashboard/dashboardNav'
import { toast, ToastContainer } from 'react-toastify'
import { API_ENDPOINT } from '../../services/config'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Loader from '../loader/Loader'
import { setDreamName, setProfileId, setProfileRole, setRoleDescription } from '../Redux/FirstProfileSlice'

const Description = () => {
  const token = useSelector(state => state.tokenSlice.token)
  const roleName = useSelector(state => state.firstProfileSlice.profileObj.roleName)
  const profileId = useSelector(state => state.firstProfileSlice.profileObj.profileId)
  const [loading, setLoading] = useState(true);
  const [loadbutton, setLoadButton] = useState(false);
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


  // useEffect(() => {
  //   const checkDescription = async () => {
  //     if (profileId && !loading) {
  //       try {
  //         const res = await axios.get(`${API_ENDPOINT}/api/user/checkDescription/${profileId}`)
  //         if (res.data.status === true) {
  //           setDescription(true)
  //         }
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }
  //   }

  //   checkDescription()
  // }, [profileId])




  const [value, setValue] = useState('')
  const [value2, setValue2] = useState('')

  const handleSubmit = async () => {
    setLoadButton(true)
    if (value.trim() === '' || value2.trim() === '' || profileId === '') {
      setLoadButton(false)
      toast.error('enter a description')
      return
    }

    const res = await axios.post(`${API_ENDPOINT}/api/user/addRole/${profileId}`, { roleName, dreamName: value2, description: value }, {
      headers: {
        'Authorization': `Bearer ${token}`,
        "content-type": "application/json"
      }
    })
    if (res.data.status === 'okay') {
      setLoadButton(false)
      toast.success(res.data.message)

      setTimeout(() => {
        navigate('/dashboard')
      }, 3000)


    } else {
      setLoadButton(false)
      toast.error(res.data.message)
    }

  }


  if (loading) {
    return <Loader props={'Dreams Loading...'} />; // Add a loading state
  }

  // if (roleName !== "Concept Innovator") {
  //   return <div> page not found <Link to="/dashboard"> <button> dashboard</button> </Link> </div>
  // }

  // if (isDescriptionSet) {
  //   return <Loader props={`Please wait... <Link to="/dashboard"> <button> dashboard</button> </Link>`} />
  // }

  return (
    <DashboardNav>
      <div class="row d-flex justify-content-center align-items-center rows">

        <div class="col-md-6">


          <div class="card">


            <div class="text-center">

              <img src="https://t4.ftcdn.net/jpg/07/89/52/35/240_F_789523513_vvIHyfampf0bnXOZlGTXRXIfhAEQd7pP.jpg" width="200" />
              <span class="d-block mt-3"> Share your idea name & Idea with us , Provide a consise (brief and clear ) description of your concept </span>

              <div class="mx-5">


                <div class="input-group mb-3 mt-4">

                  <input type="text" class="form-control " onChange={(e) => setValue2(e.target.value)} placeholder="Name Here" aria-label="Recipient's username" aria-describedby="button-addon2" />
                </div>

                <div class="input-group mb-3 mt-4">

                  <input type="text" class="form-control" onChange={(e) => setValue(e.target.value)} placeholder="Describe Here" aria-label="Recipient's username" aria-describedby="button-addon2" />
                  <button class="btn text-light border-rad" disabled={loadbutton} style={{ backgroundColor: '#101827' }} type="button" id="button-addon2" onClick={handleSubmit}> {loadbutton ? <div class="spinner-border text-light" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div> : 'Submit'} </button>
                </div>


              </div>

            </div>

          </div>

        </div>



        <ToastContainer />
      </div>
    </DashboardNav>

  )
}

export default Description