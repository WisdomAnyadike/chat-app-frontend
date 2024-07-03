import { useState } from 'react'
import { Routes , Route } from 'react-router-dom'
import Chat from './Components/chatpage'
import Login from './Components/login/Login'
import Welcome from './Components/chatwelcome/Welcome'
import Chatbox from './Components/chatbox/Chatbox'


function App() {
  

  return (
    <>
    <Routes>
    <Route path='/' element={<Login/>} /> 
      <Route path='/chat' element={<Chat/>} > 
       <Route index element={<Welcome/>} />   
      
       <Route path="/chat/:name" element={<Chatbox/>} />  
      </Route>

      <Route path="*" element={''} />  
    </Routes>
     
    </>
  )
}

export default App
