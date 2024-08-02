import React from 'react'
import './card.css'

import Modal from '../modal/modal'
import { useState } from 'react'


const Card = ({ role, description }) => {

    const [modal, setmodal] = useState(false)

    const handleSubmit = () => {
        setmodal(true)
    }

    return (
        <>
          
            <div class="card">
                <div class="content">
                    <h2 class="title">{role}</h2>
                    <p class="copy">{description}</p>
                    <button onClick={() => handleSubmit()} class="btn">Choose Role</button>
                </div>
            </div>



            <Modal modal={modal} role={role} />
        </>
    )
}

export default Card