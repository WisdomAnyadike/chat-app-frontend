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
import { useSelector } from 'react-redux'
import Auth from './Components/auth/Auth'
import Resume from './Components/resume/Resume'
import ChatApp from './Components/chatbox/Chat'

function App() {
  const roleName = useSelector(state => state.firstProfileSlice.profileObj.roleName)

  return (
    <>
      <Routes>
        <Route path='/' element={<Auth />} />
        <Route path='/createProfile' element={<CreateProfile />} />
        <Route path='/chooseTeam' element={<Progress />} />
        <Route path='/description' element={<Description />} />
        <Route path='/chat' element={<Chat />} >
          <Route index element={<Welcome />} />

          <Route path="/chat/:name" element={<Chatbox />} />
        </Route>
        <Route path="/dashboard" element={<Dashboard />} >
          {roleName === 'Concept Innovator' ? <Route index element={<DashboardProfile />} /> : <Route index element={<DashboardProduct />} />}
          <Route path='/dashboard/Ideas' element={<DashboardProduct />} />
          <Route path='/dashboard/Profiles' element={<DashboardProfile />} />

          <Route path='/dashboard/Notifications' element={<DashboardNotifications />} />
          <Route path='/dashboard/Admin' element={<Admin />} />
          <Route path='/dashboard/jobProfile' element={<JobProfile />} />
          <Route path='/dashboard/Inbox' element={<DashboardInbox />} >
          <Route index element={<Chatbox />} />
          <Route path="/dashboard/Inbox/:userTexted/:userTexting" element={<ChatApp />} />
        </Route>

        </Route>
        

        <Route path='/dashboard/resume/:Id' element={<Resume />} />

        <Route path="/popup" element={<Popup />} />
        <Route path="*" element={''} />
      </Routes>

    </>
  )
}

export default App
