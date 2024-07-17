import React from 'react'
import '../login/Login.scss'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { LoginHelper } from '../../services/loginservice';
import { setToken } from '../Redux/tokenSlice';
import { useDispatch } from 'react-redux'




const Login = () => {
    const dispatch = useDispatch()
    const [Username, setUsername] = useState('')
    const [Password, setPassword] = useState('')

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const {user , token } = await LoginHelper(Username, Password);
            if (user && token) {
                console.log(user);
                console.log(token);
                alert('Login successful');
                localStorage.setItem('userObj', JSON.stringify(user));
                dispatch(setToken(token))
                navigate('/createProfile');
            }

        } catch (error) {
            alert(error.message);
        }

    }

    return (
        <>
            <div>
                <div className="bg">

                </div>

                <main className="form-signin">

                    <h1 className="h3">Login</h1>

                    <form action="" onSubmit={(e) => handleSubmit(e)}>


                        <div className="form-floating">
                            <input onChange={(e) => setUsername(e.target.value)} type="text" className="form-control" id="floatingInput" placeholder="name@example.com" required />
                            <label for="floatingInput"> Username </label>
                        </div>
                        <div className="form-floating">
                            <input type="password" onChange={(e) => setPassword(e.target.value)} className="form-control" id="floatingPassword" placeholder="Password" required />
                            <label for="floatingPassword"> Password </label>
                        </div>

                        <div className="checkbox mb-3">
                            <div className="form-check form-switch">
                                <input className="form-check-input " type="checkbox" value="1" name="remember_me" id="rememberMeSwitch" />
                                <label className="form-check-label ms-2" for="rememberMeSwitch"> Remember me</label>
                            </div>

                        </div>
                        <button className="w-100 btn btn-lg" type="submit">Sign in</button>

                    </form>

                </main>


            </div>
        </>
    )
}

export default Login