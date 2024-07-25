import React from 'react'
import '/src/Components/auth/auth.scss'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { LoginHelper, signUpHelper } from '../../services/loginservice';
import { setToken } from '../Redux/tokenSlice';
import { useDispatch } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import { IoEyeSharp, IoEyeOffSharp } from "react-icons/io5";

const Auth = () => {
    const dispatch = useDispatch()
    const [Username, setUsername] = useState('')
    const [Password, setPassword] = useState('')
    const [username, setusername] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [confirmpassword, setconfirmpassword] = useState('')
    const [loading, setloading] = useState(false)
    const [isloading, setisloading] = useState(false)
    const [pass, setpass] = useState(true)
    const [pass1, setpass1] = useState(true)
    const [pass3, setpass3] = useState(true)
    const login = document.querySelector('.login');

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setloading(true)
        try {
            const { user, token } = await LoginHelper(Username, Password);
            if (user && token) {
                setloading(false)
                console.log(user);
                console.log(token);
                toast.success(`welcome ${user.username}`);
                localStorage.setItem('userObj', JSON.stringify(user));
                dispatch(setToken(token))
                navigate('/createProfile');
            }

        } catch (error) {
            setloading(false)
            toast.error(error.response.data.message);
        }
    }


    const handleSignUp = async (e) => {
        e.preventDefault()
        setisloading(true)
        if (confirmpassword === password) {
            try {
                const { user } = await signUpHelper(username, email, password);
                if (user) {
                    setisloading(false)
                    toast.success(`Sign up successful`);
                    login.style.transform = 'translateY(-500px)';
                }

            } catch (error) {
                setisloading(false)
                toast.error(error.response.data.message);
            }
        } else {
            setisloading(false)
            toast.error('password does not match');
        }


    }

    function checkPassword() {
        setpass(!pass)
    }
    function checkPassword1() {
        setpass1(!pass1)
    }
    function checkPassword3() {
        setpass3(!pass3)
    }
    return (
        <>
            <div className='ground flex-column justify-content-start' style={{ height: "100vh" }}>

                <div className='d-flex align-items-start justify-content-start w-100 ps-3 p-3 mb-2'>
                    <svg width='150px' height='89px' version='1.1' xmlns='http://www.w3.org/2000/svg'>
                        <path class='d-spinner d-spinner__4' d='M144.421372,121.923755 C143.963266,123.384111 143.471366,124.821563 142.945674,126.236112 C138.856723,137.238783 133.098899,146.60351 125.672029,154.330576 C118.245158,162.057643 109.358082,167.978838 99.0105324,172.094341 C89.2149248,175.990321 78.4098994,178.04219 66.5951642,178.25 L0,178.25 L144.421372,121.923755 L144.421372,121.923755 Z' />
                        <path class='d-spinner d-spinner__3' d='M149.033408,92.6053108 C148.756405,103.232477 147.219069,113.005232 144.421372,121.923755 L0,178.25 L139.531816,44.0158418 C140.776016,46.5834381 141.913968,49.2553065 142.945674,52.0314515 C146.681818,62.0847774 148.711047,73.2598899 149.033408,85.5570717 L149.033408,92.6053108 L149.033408,92.6053108 Z' />
                        <path class='d-spinner d-spinner__2' d='M80.3248924,1.15770478 C86.9155266,2.16812827 93.1440524,3.83996395 99.0105324,6.17322306 C109.358082,10.2887257 118.245158,16.2099212 125.672029,23.9369874 C131.224984,29.7143944 135.844889,36.4073068 139.531816,44.0158418 L0,178.25 L80.3248924,1.15770478 L80.3248924,1.15770478 Z' />
                        <path class='d-spinner d-spinner__1' d='M32.2942065,0 L64.5884131,0 C70.0451992,0 75.290683,0.385899921 80.3248924,1.15770478 L0,178.25 L0,0 L32.2942065,0 L32.2942065,0 Z' />
                    </svg>
                </div>

                <div class="maine">
                    <input type="checkbox" id="chk" aria-hidden="true" />

                    <div class="signup">
                        <form action="" onSubmit={(e) => handleSignUp(e)}>
                            <label for="chk" className='mb-4' style={{color: '#A8A3CB'}} aria-hidden="true"> Dreams </label>
                            <input type="text" onChange={(e) => setusername(e.target.value)} name="txt" placeholder="User name" required="" />
                            <input type="email" onChange={(e) => setemail(e.target.value)} name="email" placeholder="Email" required="" />

                            <div className='newInp d-flex align-items-center justify-content-between'>
                                <input type={pass1 ? 'password' : 'text'} className='ps-0' style={{ width: '85%' }} onChange={(e) => setconfirmpassword(e.target.value)} name="pswd" placeholder="Confirm Password" required="" />

                                <button type='button' style={{ backgroundColor: '#1e283c00', width: '15%' }} className='m-0 d-flex justify-content-end align-items-center' onClick={checkPassword1} >{pass1 ? <IoEyeOffSharp color='#101827' /> : <IoEyeSharp color='#101827' />}  </button>

                            </div>

                            <div className='newInp d-flex align-items-center justify-content-between'>
                                <input type={pass ? 'password' : 'text'} className='ps-0' style={{ width: '85%' }} onChange={(e) => setpassword(e.target.value)} name="pswd" placeholder="Password" required="" />

                                <button type='button' style={{ backgroundColor: '#1e283c00', width: '15%' }} className='m-0 d-flex justify-content-end align-items-center' onClick={checkPassword} >{pass ? <IoEyeOffSharp color='#101827' /> : <IoEyeSharp color='#101827' />}  </button>
                            </div>

                            <button type='submit' className='p-1' disabled={isloading} > {isloading ? <div class="spinner-border text-light" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div> : 'Sign up'}</button>
                        </form>
                    </div>

                    <div class="login">
                        <form action="" onSubmit={(e) => handleSubmit(e)} >
                            <label for="chk" aria-hidden="true">Login</label>

                            <input type="username" onChange={(e) => setUsername(e.target.value)} name="username" placeholder="Username" required="true" />

                            <div className='newInp d-flex align-items-center justify-content-between'>
                                <input type={pass3 ? 'password' : 'text'} className='ps-0' style={{ width: '85%' }} onChange={(e) => setPassword(e.target.value)} name="pswd" placeholder="Password" required="true" />

                                <button type='button' style={{ backgroundColor: '#1e283c00', width: '15%' }} className='m-0 d-flex justify-content-end align-items-center' onClick={checkPassword3} >{pass3 ? <IoEyeOffSharp color='#101827' /> : <IoEyeSharp color='#101827' />}  </button>
                            </div>

                            <button type='submit' className='p-1' disabled={loading} > {loading ? <div class="spinner-border text-light" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div> : 'Login'}</button>
                        </form>
                    </div>
                    <ToastContainer />
                </div>
            </div>
        </>
    )
}

export default Auth