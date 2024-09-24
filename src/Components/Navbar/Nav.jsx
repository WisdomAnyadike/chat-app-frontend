import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '/src/Components/Navbar/Nav.scss';

const Nav = ({ scrollRef }) => {

    const navigate = useNavigate()
    function signUp() {
        navigate('/')
    }

    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (scrollRef.current.scrollTop > 600) {
                console.log('Setting isScrolled to true');
                setIsScrolled(true);
            } else {
                console.log('Setting isScrolled to false');
                setIsScrolled(false);
            }
        };

        const scrollableDiv = scrollRef.current;
        scrollableDiv.addEventListener('scroll', handleScroll);

        return () => {
            scrollableDiv.removeEventListener('scroll', handleScroll);
        };
    }, []);



    return (

        <>
            <nav className={` navbarr ${isScrolled ? 'scrolled' : ''} `} >

                <h3 className="title d-flex align-items-center ps-3" style={{ width: '40%' }}>
                    <span className="gradient-text" style={{ color: '#6f97ea' }}>Dreams</span>
                </h3>


                <div class="hamburger">
                    <div class="line1"></div>
                    <div class="line2"></div>
                    <div class="line3"></div>
                </div>
                <ul class="nav-links ">
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Solutions</a></li>
                    <li><a href="#">Contact Us</a></li>
                    <li><button class="login-button " onClick={signUp} style={{ color: '#6f97ea' }} href="#">Login</button></li>
                    <li><button onClick={signUp} class="join-button" href="#"> Get Started </button></li>
                </ul>
            </nav>
        </>
    );
};

export default Nav;


