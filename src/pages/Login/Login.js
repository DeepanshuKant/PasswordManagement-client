import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './Login.css'

import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { loginUser, clearErrors } from '../../redux/reducers/userReducer/user.action'

//import component
import Loader from '../../components/Loader/Loader'

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const reduxStore = useSelector((store) => store.userReducer)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const details = {
        email: email,
        password: password
    }

    function login(event) {
        event.preventDefault()
        dispatch(loginUser({ details }))
    }

    useEffect(() => {

        if (reduxStore.error) {
            alert(reduxStore.error)
            dispatch(clearErrors())
        }

        if (reduxStore.isAuthenticated) {
            navigate('/lists')
        }


    }, [dispatch, reduxStore.error, alert, navigate, reduxStore.isAuthenticated])

    return (
        <>
            {reduxStore.loading ? (<Loader />) : (
                <div id="login">
                    <div className="main__login">
                        <div className="login__box">
                            <h1>Login</h1>
                            <form onSubmit={login}>
                                <input type="email" placeholder='Enter Email' required value={email} onChange={(e) => setEmail(e.target.value)} />
                                <input type="password" placeholder='Enter Password' required value={password} onChange={(e) => setPassword(e.target.value)} />
                                <input type="submit" value="Login" />
                            </form>
                            <p>Don't have an Account <Link to="/register" >Register</Link></p>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Login