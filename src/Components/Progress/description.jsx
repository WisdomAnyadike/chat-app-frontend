import React from 'react'
import './description.css'
import DashboardNav from '../dashboard/dashboardNav'
import { toast, ToastContainer } from 'react-toastify'
import { API_ENDPOINT } from '../../services/config'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

const Description = () => {
  const token = useSelector(state => state.tokenSlice.token)
  const roleName = useSelector(state => state.firstProfileSlice.profileObj.roleName)
  const profileId = useSelector(state => state.firstProfileSlice.profileObj.profileId)
  const [isDescriptionSet, setDescription] = useState(false)

  useEffect(() => {
    const checkDescription = async () => {
      if (profileId) {
        try {
          const res = await axios.get(`${API_ENDPOINT}/api/user/checkDescription/${profileId}`)
          if (res.data.status === true) {
            setDescription(true)
          }
        } catch (error) {
          console.log(error);
        }
      }
    }

    checkDescription()
  }, [profileId])


  const navigate = useNavigate()

  const [value, setValue] = useState('')
  const [value2, setValue2] = useState('')

  const handleSubmit = async () => {
    if (value.trim() === '' || value2.trim() === '' || profileId === '') {
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
      toast.success(res.data.message)

      setTimeout(() => {
        navigate('/dashboard')
      }, 3000)


    } else {
      toast.error(res.data.message)
    }

  }




  if (roleName !== "Concept Innovator") {
    return <div> page not found <Link to="/dashboard"> <button> dashboard</button> </Link> </div>
  }

  if (isDescriptionSet) {
    return <div> filled  <Link to="/dashboard"> <button> dashboard</button> </Link> </div>
  }

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
                  <button class="btn text-light border-rad" style={{ backgroundColor: '#101827' }} type="button" id="button-addon2" onClick={handleSubmit}> Submit </button>
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