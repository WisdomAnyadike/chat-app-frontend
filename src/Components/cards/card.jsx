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
            <button onClick={() => handleSubmit()} class="card1" href="#">
                <h6> <b> {role} </b> </h6>
                <small class="small"> {description}</small>
                <div class="go-corner" href="#">
                    <div class="go-arrow">
                        →
                    </div>
                </div>
            </button>


            <Modal modal={modal} role={role} />
        </>
    )
}

export default Card