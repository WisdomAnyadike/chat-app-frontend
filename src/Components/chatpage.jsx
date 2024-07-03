import React from 'react'
import '../Components/chatpage.css'
import Peoplelist from './peoplelist/Peoplelist'

import { Outlet } from 'react-router-dom'



const Chat = () => {
   


  return (
    <>
   <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />

<div className="container mt-4">
<div className="row clearfix">
    <div className="col-lg-12">
        <div className="card chat-app">
           <Peoplelist/>
           <Outlet/>
        </div>
    </div>
</div>
</div>

</>
    
 
  )
}

export default Chat