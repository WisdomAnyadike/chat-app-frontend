import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Chat from './Components/chatpage'
import Login from './Components/login/Login'
import Welcome from './Components/chatwelcome/Welcome'
import Chatbox from './Components/chatbox/Chatbox'
import Dashboard from './Components/dashboard/dashboard'
import DashboardHome from './Components/dashboard/dashboardHome'
import DashboardProduct from './Components/dashboard/dashboardProduct'
import DashboardProfile from './Components/dashboard/dashboardProfiles'
import DashboardNotifications from './Components/dashboard/dashboardNotifications'
import DashboardInbox from './Components/dashboard/dashboardInbox'
import Progress from './Components/Progress/progress'
import CreateProfile from './Components/Progress/createProfile'
import Popup from './Components/pop/popup'
import Description from './Components/Progress/description'
import Admin from './Components/dashboard/Admin'
import JobProfile from './Components/dashboard/JobProfile'

function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/createProfile' element={<CreateProfile />} />
        <Route path='/chooseTeam' element={<Progress />} />
        <Route path='/description' element={<Description />} />
        <Route path='/chat' element={<Chat />} >
          <Route index element={<Welcome />} />

          <Route path="/chat/:name" element={<Chatbox />} />
        </Route>
        <Route path="/dashboard" element={<Dashboard />} >
          <Route index element={<DashboardHome />} />
          <Route path='/dashboard/Ideas' element={<DashboardProduct />} />
          <Route path='/dashboard/Profiles' element={<DashboardProfile />} />
          <Route path='/dashboard/Inbox' element={<DashboardInbox />} />
          <Route path='/dashboard/Notifications' element={<DashboardNotifications />} />
          <Route path='/dashboard/Admin' element={<Admin/>} />
          <Route path='/dashboard/jobProfile' element={<JobProfile/>} />
        </Route>


        <Route path="/popup" element={<Popup />} />
        <Route path="*" element={''} />
      </Routes>

    </>
  )
}

export default App
