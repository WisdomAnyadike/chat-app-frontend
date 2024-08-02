import React, { useEffect, useCallback } from 'react';
import Swiper  from 'swiper';
import 'swiper/swiper-bundle.css';
import { loadFull } from 'tsparticles';
import Particles from 'react-tsparticles';
import '/src/Components/ForLandingPage/section3.styles.scss'


const Section3 = () => {
  
    
    const particlesInit = useCallback(async (engine) => {
        console.log(engine);
        await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(async (container) => {
        console.log(container);
    }, []);

    useEffect(() => {
        const swiper = new Swiper('.swiper', {
            effect: 'cube',
            grabCursor: true,
            loop: true,
            speed: 1000,
            cubeEffect: {
                shadow: true,
                slideShadows: true,
                shadowOffset: 20,
                shadowScale: 0.94,
            },
            autoplay: {
                delay: 2600,
                pauseOnMouseEnter: true,
            },
        });

    }, []);

    const particlesOptions = {
        fpsLimit: 60,
        backgroundMode: {
            enable: true,
            zIndex: -1,
        },
        particles: {
            number: {
                value: 30,
                density: {
                    enable: true,
                    area: 800,
                },
            },
            color: {
                value: [
                    '#3998D0',
                    '#2EB6AF',
                    '#A9BD33',
                    '#FEC73B',
                    '#F89930',
                    '#F45623',
                    '#D62E32',
                ],
            },
            destroy: {
                mode: 'split',
                split: {
                    count: 1,
                    factor: {
                        value: 5,
                        random: {
                            enable: true,
                            minimumValue: 4,
                        },
                    },
                    rate: {
                        value: 10,
                        random: {
                            enable: true,
                            minimumValue: 5,
                        },
                    },
                    particles: {
                        collisions: {
                            enable: false,
                        },
                        destroy: {
                            mode: 'none',
                        },
                        life: {
                            count: 1,
                            duration: {
                                value: 1,
                            },
                        },
                    },
                },
            },
            shape: {
                type: 'circle',
                stroke: {
                    width: 0,
                    color: '#000000',
                },
                polygon: {
                    sides: 5,
                },
            },
            opacity: {
                value: 1,
                random: false,
                animation: {
                    enable: false,
                    speed: 1,
                    minimumValue: 0.1,
                    sync: false,
                },
            },
            size: {
                value: 8,
                random: {
                    enable: true,
                    minimumValue: 4,
                },
                animation: {
                    enable: false,
                    speed: 40,
                    minimumValue: 0.1,
                    sync: false,
                },
            },
            collisions: {
                enable: true,
                mode: 'destroy',
            },
            move: {
                enable: true,
                speed: 7,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200,
                },
            },
        },
        detectRetina: true,


    };

    return (
        <section className='sectionn'>
            <div className="content mt-5 ">
                <h1 className='text-start'>Become a Tech CEO with 1 $Dollar!</h1>
                <p>
                    Welcome to our revolutionary platform that brings dreamers, investors, and tech enthusiasts together to create the companies of tomorrow with just a dollar. Our application is designed to connect visionary minds with the resources they need to turn their dreams into reality. Whether you have a groundbreaking idea, the financial means to support innovation, or the technical expertise to build cutting-edge solutions, our platform is your gateway to collaborative success.
                </p>
                <button>Explore Dreams</button>
            </div>

            <div className="swiper" style={{ marginTop: "100px" }}>
                <div className="swiper-wrapper">
                    <div className="swiper-slide">
                        <img src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/49db1b5f-09f6-4433-be57-51687585600c" alt="Walking Tour in Florence" />
                        <div className="cost">from 5% per applicant </div>
                        <div className="overlay text-start">
                            <h1 className='me-1 mt-1'> World Simulator App</h1>
                            <p>
                                Discover the fascinating beauty of this historic city by
                                strolling through the rich cultural tapestry that makes Florence
                                a timeless destination.
                            </p>
                            <div className="ratings">
                                <div className="stars">
                                    <ion-icon className="star" name="star"></ion-icon>
                                    <ion-icon className="star" name="star"></ion-icon>
                                    <ion-icon className="star" name="star"></ion-icon>
                                    <ion-icon className="star" name="star"></ion-icon>
                                    <ion-icon className="star" name="star-half-outline"></ion-icon>
                                </div>
                                <span>138 reviews</span>
                            </div>
                        </div>
                    </div>
                    <div className="swiper-slide">
                        <img src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/2d165721-fe2e-4cf0-a63e-20bc5bc3f847" alt="Edinburgh Guided Tour" />
                        <div className="cost">from $380 per group</div>
                        <div className="overlay">
                            <h1>Edinburgh Guided Tour</h1>
                            <p>
                                Explore the city's majestic castles and fascinating history by
                                joining our guided tour for an unforgettable journey through
                                Scotland's capital.
                            </p>
                            <div className="ratings">
                                <div className="stars">
                                    <ion-icon className="star" name="star"></ion-icon>
                                    <ion-icon className="star" name="star"></ion-icon>
                                    <ion-icon className="star" name="star"></ion-icon>
                                    <ion-icon className="star" name="star"></ion-icon>
                                    <ion-icon className="star" name="star"></ion-icon>
                                </div>
                                <span>307 reviews</span>
                            </div>
                        </div>
                    </div>
                    <div className="swiper-slide">
                        <img src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/d311d1de-7382-4c03-b083-5f7e88458158" alt="New York Sightseeing Tour" />
                        <div className="cost dark-text">from $99 per adult</div>
                        <div className="overlay">
                            <h1>New York Sightseeing Tour</h1>
                            <p>
                                Experience the energy and excitement of New York City from Times
                                Square's dazzling lights to the serene beauty of Central Park.
                            </p>
                            <div className="ratings">
                                <div className="stars">
                                    <ion-icon className="star" name="star"></ion-icon>
                                    <ion-icon className="star" name="star"></ion-icon>
                                    <ion-icon className="star" name="star"></ion-icon>
                                    <ion-icon className="star" name="star"></ion-icon>
                                    <ion-icon className="star" name="star-half-outline"></ion-icon>
                                </div>
                                <span>1152 reviews</span>
                            </div>
                        </div>
                    </div>
                    <div className="swiper-slide">
                        <img src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/be223a30-52d1-4a0b-8d57-2e52f02e2245" alt="Japan Panoramic Tours" />
                        <div className="cost dark-text">from $117 per adult</div>
                        <div className="overlay">
                            <h1>Japan Panoramic Tours</h1>
                            <p>
                                Embark on a magical journey through Tokyo by discovering the
                                beauty of the city as cherry blossom trees paint the streets in
                                hues of pink.
                            </p>
                            <div className="ratings">
                                <div className="stars">
                                    <ion-icon className="star" name="star"></ion-icon>
                                    <ion-icon className="star" name="star"></ion-icon>
                                    <ion-icon className="star" name="star"></ion-icon>
                                    <ion-icon className="star" name="star"></ion-icon>
                                    <ion-icon className="star" name="star-outline"></ion-icon>
                                </div>
                                <span>619 reviews</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <Particles id="tsparticles"  loaded={particlesLoaded} init={particlesInit} options={particlesOptions} /> */}
        </section>
    );
};

export default Section3;
