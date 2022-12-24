import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import './Register.css'

import { useDispatch, useSelector } from 'react-redux'
import { registerUser, clearErrors } from '../../redux/reducers/userReducer/user.action'
import { useNavigate } from 'react-router-dom'

import Loader from '../../components/Loader/Loader'

const Register = () => {

    const dispatch = useDispatch()
    const reduxStore = useSelector((store) => store.userReducer)

    const navigate = useNavigate()
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [secretCodee, setSecretCode] = useState('')

    const details = {
        name: userName,
        email: email,
        password: password,
        secretCode: secretCodee
    }

    async function register(event) {
        event.preventDefault()
        dispatch(registerUser({ details }))

    }

    useEffect(() => {

        if (reduxStore.error) {
            alert(reduxStore.error)
            dispatch(clearErrors())
        }

        if (reduxStore.isAuthenticated) {
            alert('You are registered')
            navigate('/login')
        }

    }, [dispatch, reduxStore.error, alert, navigate, reduxStore.isAuthenticated])

    return (
        <>
            {reduxStore.loading ? <Loader /> : (<div id="register">
                <div className="main__register">
                    <div className="register__box">
                        <h1>Register</h1>
                        <form onSubmit={register}>
                            <input type="text" placeholder='Enter UserName' required value={userName} onChange={(e) => setUserName(e.target.value)} />
                            <input type="email" placeholder='Enter Email' required value={email} onChange={(e) => setEmail(e.target.value)} />
                            <input type="password" placeholder='Enter Password' required value={password} onChange={(e) => setPassword(e.target.value)} />
                            <input type="password" placeholder='Enter Secret Code' required value={secretCodee} onChange={(e) => setSecretCode(e.target.value)} />
                            <input type="submit" value="Register" />
                        </form>
                        <p>Already have an Account <Link to="/login" >Login</Link></p>
                    </div>
                </div>
            </div>)}
        </>
    )
}

export default Register