import React, { useRef } from 'react'
import Section1 from '../Components/ForLandingPage/Section1'
import '/src/Components/ForLandingPage/section1.styles.scss'
import Nav from '../Components/Navbar/Nav'




const LandingPage = () => {
    const scrollRef = useRef(null);
    return (
        <>
            <div ref={scrollRef} style={{ width: '100%', height: '100vh', overflowY: "scroll" }}>
                <Nav scrollRef={scrollRef} />
                <Section1 />
                
               

              
            </div>


        </>

    )
}

export default LandingPage